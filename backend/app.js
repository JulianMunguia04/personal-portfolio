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
  try {
    const rows = db.prepare("SELECT * FROM projects").all();

    // Convert technologies JSON string → array
    const projects = rows.map(row => ({
      id: row.id,
      name: row.name,
      shortDescription: row.short_description,
      photoLink: row.photo_link,
      technologies: JSON.parse(row.technologies)
    }));

    res.json(projects);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Serve static files from Vue build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
