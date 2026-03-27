const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./db/db.js");
require('dotenv').config();

app.use(cors());
app.use(express.json());

// API routes MUST come before static files and catch-all
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');

//API
app.get("/api/projects", (req, res) => {
  const rows = db.prepare("SELECT * FROM projects").all();

  const formatted = rows.map(row => ({
    id: row.id,
    name: row.name,
    shortDescription: row.short_description,
    photoLink: row.photo_link,
    technologies: JSON.parse(row.technologies),
    githubOwner: row.github_owner,
    githubRepo: row.github_repo
  }));

  res.json(formatted);
});

// Serve static files from Vue build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

//Github Readme API
app.get("/api/readme/:owner/:repo", async (req, res) => {
  const { owner, repo } = req.params;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json"
        }
      }
    );

    console.log('GitHub status:', response.status);

    const data = await response.json();
    console.log(data); // <-- See if "content" exists

    if (!data.content) return res.status(404).json({ message: "README not found" });

    const markdown = Buffer.from(data.content, "base64").toString("utf-8");

    res.json({ markdown });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
