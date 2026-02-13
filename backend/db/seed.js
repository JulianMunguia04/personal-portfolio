const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "database.db");

const db = new Database(dbPath);

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    short_description TEXT NOT NULL,
    photo_link TEXT NOT NULL,
    technologies TEXT NOT NULL -- JSON stored as TEXT
  )
`);

console.log("Table ready.");

const projects = [
  {
    id: 1,
    name: "LadLadder",
    shortDescription:
      "Full-stack real-time multiplayer game using Node.js, Socket.IO, and MongoDB with live rooms, scoring logic, and consensus-based gameplay.",
    photoLink: "/project-previews/ladladder-preview.png",
    technologies: [
      "javascript","html","css","node","express",
      "socketio","mongodb","mongoose","ejs","aws","pm2"
    ]
  },
  {
    id: 2,
    name: "MinesweeperVs",
    shortDescription:
      "Real-time competitive multiplayer Minesweeper built with Next.js and Socket.IO. Features live matchmaking, power-ups, ELO rankings, friend challenges, and low-latency gameplay powered by Redis and PostgreSQL.",
    photoLink: "/project-previews/minesweepervs-preview.png",
    technologies: [
      "javascript","typescript","react","nextjs",
      "node","socketio","postgresql","redis","docker"
    ]
  },
  {
    id: 3,
    name: "Music Transcriber",
    shortDescription:
      "Transformer-based deep learning model that converts WAV audio into precise MIDI sequences.",
    photoLink: "/project-previews/music-transcriber-preview.png",
    technologies: [
      "python","tensorflow","keras","numpy",
      "librosa","midi","jupyter","git"
    ]
  }
];

const insert = db.prepare(`
  INSERT OR REPLACE INTO projects
  (id, name, short_description, photo_link, technologies)
  VALUES (?, ?, ?, ?, ?)
`);

for (const project of projects) {
  insert.run(
    project.id,
    project.name,
    project.shortDescription,
    project.photoLink,
    JSON.stringify(project.technologies) // 🔥 key line
  );
}

console.log("Projects inserted.");
