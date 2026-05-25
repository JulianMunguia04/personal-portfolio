# 👤 Personal Portfolio

My **Personal Portfolio** is a full-stack web application showcasing my projects, experience, technical skills, and credentials. Built with a modern Vue + Vite frontend and a Node.js + Express backend, the site is production-ready with SQLite, deployed on Render, and supported by an automated CI/CD pipeline for continuous integration and deployment.

---

## 🧰 Tech Stack

![Vue.js](https://img.shields.io/badge/Vue.js-42B883?logo=vue.js&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white&style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge)
![Render](https://img.shields.io/badge/Render-000000?logo=render&logoColor=white&style=for-the-badge)

---

## 🌐 Features

- Responsive modern UI built with Vue 3 + Vite  
- Backend API powered by Express  
- SQLite database integration  
- Modular component architecture  
- Animated section reveals using IntersectionObserver  
- Dedicated sections for:
  - Home  
  - Projects  
  - Technologies  
  - Experience  
  - Credentials  
  - Contact  
- Production deployment via Render  

---

## 🖼️ Application Screenshots

### Home
![Home](./screenshots/home.png)

### Projects
![Projects](./screenshots/projects.png)

### Technologies
![Technologies](./screenshots/technologies.png)

### Experience
![Experience](./screenshots/experience.png)

### Credentials
![Credentials](./screenshots/credentials.png)

### Contact
![Contact](./screenshots/contact.png)

---
## 🔗 Live Demo

🌍 https://jmportfolio.onrender.com

## 🛠️ Local Setup

Follow these steps to run the portfolio locally.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/personal_portfolio.git
cd personal_portfolio
```

### 2. Install dependencies (frontend + backend)

```bash
npm run install-all
```

Or manually:

```bash
npm install --prefix backend
npm install --prefix frontend
```

---

### 3. Create Environment Variables

You need environment variables for both backend and frontend.

#### Backend `.env` (inside `/backend`)

```env
PORT=5000
NODE_ENV=development
```

#### Frontend `.env` (inside `/frontend`)

```env
VITE_EXPRESS_API_URL=http://localhost:5000
```

---

### 4. Run Development Mode

```bash
npm run dev
```

This runs both:

- Express backend  
- Vite frontend  

---

### 5. Production Build

To build for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## 📦 Project Structure

```
personal_portfolio/
│
├── backend/
│   ├── app.js
│   └── ...
│
├── frontend/
│   ├── src/
│   └── ...
│
├── screenshots/
│   ├── home.png
│   ├── projects.png
│   ├── technologies.png
│   ├── experience.png
│   ├── credentials.png
│   └── contact.png
│
└── package.json
```

---

## 🚀 Deployment

The application is configured for deployment on Render.

- Backend runs as a Node service  
- Frontend is built via Vite  
- SQLite is used as a lightweight production database  
- Environment variables are configured in the Render dashboard  

---

## 📈 Future Improvements

- Admin dashboard for project management  
- Blog integration  
- Enhanced analytics  
- Performance optimization & caching  
- Expanded API functionality
- Improve UI and features for each project page
