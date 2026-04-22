# PixelDSA

PixelDSA is a full-stack MERN project for practicing Data Structures and Algorithms in a game-like pixel UI.
Users can create an account, log in, solve coding problems, earn XP, and build a daily streak.

## Live Demo

- Frontend: https://your-frontend-url.vercel.app
- Backend API: https://your-backend-url.onrender.com

Update both links after deployment.

## Project Highlights

- JWT based authentication (signup, login, protected routes)
- MongoDB persistence for users and problems
- Gamified progress system: XP, levels, streaks, solved history
- Difficulty filters (Easy, Medium, Hard)
- Problem cards include direct LeetCode links
- Pixel themed responsive frontend built with React

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Auth/Security: JWT, bcryptjs, route protection middleware

## Folder Structure

```text
pixeldsa/
  client/
    public/
    src/
      components/
      context/
      pages/
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
    seed.js
    server.js
```

## Features

### Authentication

- Signup with name, email, password
- Login with JWT token generation
- Protected endpoints using auth middleware
- Persisted login via localStorage token

### Problems

- Fetch all problems
- Filter by difficulty
- Mark a problem as solved
- Open external LeetCode link from each problem card

### Progress System

- XP reward by difficulty
- Auto level system (every 100 XP)
- Daily streak tracking

## API Overview

### Auth

- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me

### Problems

- GET /api/problems
- GET /api/problems/:id
- POST /api/problems
- PUT /api/problems/:id
- DELETE /api/problems/:id
- POST /api/problems/:id/solve

### Users

- GET /api/users/profile
- GET /api/users/progress

## Local Setup

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure environment

Create server/.env using server/.env.example as template.

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/pixeldsa
JWT_SECRET=<your_generated_secret>
NODE_ENV=development
```

### 3. Seed problems

```bash
cd server
node seed.js
```

### 4. Run backend

```bash
cd server
npm run dev
```

### 5. Run frontend

```bash
cd client
npm start
```

Frontend runs on http://localhost:3000 and backend on http://localhost:5000.


## Environment Variables

Server environment variables used by this project:

- PORT
- MONGO_URI
- JWT_SECRET
- NODE_ENV

## Project Status

This project is complete as a full-stack MVP and ready to deploy.

Recommended future improvements:

- Add automated API and UI tests
- Add rate limiting and stronger production security headers
- Add admin role and content management dashboard

## Author

- Name: Apoorv Sethi
- GitHub: https://github.com/<your-username>
- LinkedIn: https://www.linkedin.com/in/<your-linkedin>
