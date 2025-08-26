# Waterlily Survey Project

This repository contains a full-stack survey application with a backend (Node.js/Express/Sequelize) and a frontend (Next.js/React).

## Structure

- **backend/**: REST API server, authentication, database models, and seeding scripts.
- **frontend/**: Next.js app for survey UI, user authentication, and API integration.

## Backend

- Express server with authentication and survey management.
- Sequelize ORM for MySQL.
- Environment variables in `.env`.
- Scripts for seeding admin users.

## Frontend

- Next.js 15, React 19.
- API integration via Axios.
- Environment variables in `.env`.
- Tailwind CSS for styling.

## Getting Started

1. Copy `.env.example` to `.env` in both `backend/` and `frontend/` and fill in your values.
2. Install dependencies:
   - `cd backend && npm install`
   - `cd frontend && npm install`
3. Start servers:
   - Backend: `npm run dev`
   - Frontend: `npm run dev`
4. (Optional) Create default admin user:
    - `cd backend && npm run seed:admin`
## License

MIT