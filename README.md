# Chess Game

A real‑time, multiplayer chess game built with React on the frontend and Node.js/Express + Socket.IO on the backend. Play chess against friends in your browser—with audio feedback and optional peer‑to‑peer video chat!

---

## 🚀 Live Demo

Try it now: [https://bkmchess.vercel.app](https://bkmchess.vercel.app)

---

## 📋 Table of Contents

- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Prerequisites](#-prerequisites)  
- [Installation](#-installation)  
- [Running with Docker](#-running-with-docker)  
- [Project Structure](#-project-structure)  
- [Usage](#-usage)  
- [Contributing](#-contributing)  
- [License](#-license)  

---

## ✨ Features

- **Real‑time gameplay** via Socket.IO  
- **Chess move validation** using chess.js  
- **Board rendering** with react‑konva  
- **Audio feedback** on moves with use‑sound  
- **Peer‑to‑peer video chat** powered by simple‑peer  
- **Unique game rooms** via UUIDs  
- Responsive UI with styled‑components  

---

## 🛠 Tech Stack

- **Frontend**  
  - React (Create React App)  
  - react‑konva, Konva  
  - chess.js  
  - socket.io‑client  
  - simple‑peer (WebRTC)  
  - styled‑components  
- **Backend**  
  - Node.js + Express  
  - Socket.IO  
  - PostgreSQL client (`pg`) (for potential persistence)  
- **DevOps**  
  - Docker & Docker Compose  
  - GitHub Actions (in `.github/workflows`)  

---

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/) ≥ 14  
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (optional)  

---

## ⚙️ Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/BKM8383/Chess.git
   cd Chess
   ```
2. **Install dependencies**  
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

---

## 📦 Running with Docker

> Requires Docker and Docker Compose installed on your machine.

```bash
# From project root
docker-compose up --build
```

- **Backend** will run at `http://localhost:5000`  
- **Frontend** will serve at `http://localhost:3000`  

---

## ▶️ Usage

1. **Start backend**  
   ```bash
   cd backend
   npm run dev      # nodemon on port 5000
   ```
2. **Start frontend**  
   ```bash
   cd frontend
   npm start        # runs on port 3000
   ```
3. Open your browser to `http://localhost:3000`, create or join a game room, and enjoy!

---
