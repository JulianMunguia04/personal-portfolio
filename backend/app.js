const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// API routes MUST come before static files and catch-all
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');

app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

// Serve static files from Vue build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
