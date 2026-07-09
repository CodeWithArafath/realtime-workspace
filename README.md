# Real-Time Collaboration Workspace

A Slack/Notion-style B2B collaboration platform built with the MERN stack, TypeScript, Socket.IO, and Redis — developed as part of the Infotact Solutions Web Development (SDE) internship program.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), Socket.IO, JWT, bcrypt
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4 (in progress)
- **Real-time & Caching:** Socket.IO, Redis (planned)

## Current Status
- [x] Project scaffolding (/client, /server split)
- [x] User model, JWT authentication (signup/login), auth middleware
- [x] Workspace and Message models
- [x] Workspace CRUD routes (create, join via invite code, list) with JWT protection
- [x] Socket.IO real-time chat (JWT-authenticated sockets, channel-based broadcasting)
- [ ] Redis pub/sub for horizontal scaling
- [ ] React frontend (auth pages, workspace UI, chat UI)
- [ ] Docker + CI/CD pipeline
- [ ] MongoDB Atlas connection (blocked locally by a DNS/SRV resolution issue - under investigation)

## Setup
1. Clone the repo
2. cd server and run npm install
3. Create a .env file in /server with PORT, MONGO_URI, and JWT_SECRET
4. Run npm run dev

## Roadmap
This project follows a 4-week engineering roadmap (auth and scaffolding, data modeling and REST APIs, real-time features, caching optimization and deployment). See commit history for weekly progress.