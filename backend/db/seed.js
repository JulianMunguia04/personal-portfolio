const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "database.db");
const db = new Database(dbPath);

// 🔥 Recreate table with GitHub fields
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    short_description TEXT NOT NULL,
    photo_link TEXT NOT NULL,
    technologies TEXT NOT NULL,
    github_owner TEXT NOT NULL,
    github_repo TEXT NOT NULL
  )
`);

console.log("Table ready.");

const projects = [
  {
    id: 1,
    name: "Distributed API Gateway & Rate Limiter",
    shortDescription:
      "High-performance distributed API Gateway in Go featuring reverse proxying, pluggable load balancing (Round Robin & Least Connections), and a Redis-based distributed rate limiter. Handles ~1700–2400 req/sec with ~55ms avg latency (~75ms p99). Includes middleware pipeline, circuit breakers, and Prometheus observability.",
    photoLink: "/project-previews/apigateway-preview.png",
    technologies: [
      "go","redis","docker","prometheus","yaml"
    ],
    githubOwner: "JulianMunguia04",
    githubRepo: "distributed-rate-limiter-api-gateway-in-go"
  },
  {
    id: 2,
    name: "LadLadder",
    shortDescription:
      "Full-stack real-time multiplayer game using Node.js, Socket.IO, and MongoDB with live rooms, scoring logic, and consensus-based gameplay.",
    photoLink: "/project-previews/ladladder-preview.png",
    technologies: [
      "javascript","html","css","node","express",
      "socketio","mongodb","mongoose","ejs","aws","pm2"
    ],
    githubOwner: "JulianMunguia04",
    githubRepo: "LadLadder"
  },
  {
    id: 3,
    name: "MinesweeperVs",
    shortDescription:
      "Real-time competitive multiplayer Minesweeper built with Next.js and Socket.IO. Features live matchmaking, power-ups, ELO rankings, friend challenges, and low-latency gameplay powered by Redis and PostgreSQL.",
    photoLink: "/project-previews/minesweepervs-preview.png",
    technologies: [
      "javascript","typescript","react","nextjs",
      "node","socketio","postgresql","redis","docker"
    ],
    githubOwner: "JulianMunguia04",
    githubRepo: "minesweepervs"
  },
  {
    id: 4,
    name: "Music Transcriber",
    shortDescription:
      "Transformer-based deep learning model that converts WAV audio into precise MIDI sequences.",
    photoLink: "/project-previews/music-transcriber-preview.png",
    technologies: [
      "python","tensorflow","keras","numpy",
      "librosa","midi","jupyter","git"
    ],
    githubOwner: "JulianMunguia04",
    githubRepo: "music-transcriber"
  },
  {
    id: 5,
    name: "Personal Portfolio",
    shortDescription:
      "A modern personal portfolio built with Vite, Vue, and Express, hosted on Render with CI/CD. Showcases projects, technologies, and interactive features.",
    photoLink: "/project-previews/portfolio-preview.png",
    technologies: [
      "javascript","typescript","vue","vite",
      "node","express","npm","html","css",
      "render","ci/cd"
    ],
    githubOwner: "JulianMunguia04",
    githubRepo: "personal-portfolio"
  }
];

// 🔥 Updated insert query
const insert = db.prepare(`
  INSERT OR REPLACE INTO projects
  (id, name, short_description, photo_link, technologies, github_owner, github_repo)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

for (const project of projects) {
  insert.run(
    project.id,
    project.name,
    project.shortDescription,
    project.photoLink,
    JSON.stringify(project.technologies),
    project.githubOwner,
    project.githubRepo
  );
}

console.log("Projects inserted.");