# MERN + TypeScript Developer Portfolio

A full-stack, production-ready developer portfolio built with React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB. Includes a public-facing portfolio site and a JWT-protected admin dashboard for managing projects and viewing contact messages.

## 1. Project Structure

```
portfolio/
├── backend/                 # Node + Express + TypeScript API
│   ├── src/
│   │   ├── config/db.ts             # MongoDB connection
│   │   ├── models/                  # Mongoose schemas
│   │   │   ├── Admin.ts             # Admin user (bcrypt password hashing)
│   │   │   ├── Contact.ts           # Contact form submissions
│   │   │   ├── Profile.ts           # Profile / about / skills / experience
│   │   │   └── Project.ts           # Portfolio projects
│   │   ├── controllers/             # Route handlers / business logic
│   │   ├── routes/                  # Express routers
│   │   ├── middleware/
│   │   │   ├── auth.ts              # JWT protect middleware
│   │   │   ├── errorHandler.ts      # Centralized error handling
│   │   │   └── validate.ts          # express-validator wrapper
│   │   ├── data/seed.ts             # Sample data + admin seeding script
│   │   ├── app.ts                   # Express app (middleware + routes)
│   │   └── server.ts                # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/                # React + TypeScript + Tailwind (Vite)
    ├── src/
    │   ├── components/
    │   │   ├── layout/      # Navbar, Footer
    │   │   ├── sections/    # Hero, About, Skills, Projects, Experience, Contact
    │   │   ├── ui/          # ThemeToggle, etc.
    │   │   └── admin/       # ProtectedRoute
    │   ├── pages/           # HomePage, AdminLoginPage, AdminDashboardPage
    │   ├── context/         # ThemeContext, AuthContext
    │   ├── api/client.ts    # Axios instance
    │   └── types/           # Shared TypeScript types
    ├── package.json
    ├── tailwind.config.js
    └── .env.example
```

## 2. Prerequisites

- Node.js 18+ and npm
- A MongoDB Atlas account (free tier is enough) or a local MongoDB instance
- Git

## 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
CLIENT_URL=http://localhost:5173
```

**Get a MongoDB Atlas connection string:**
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Database Access → add a database user with a password
3. Network Access → add your IP (or `0.0.0.0/0` for development)
4. Connect → "Drivers" → copy the connection string into `MONGO_URI`

**Seed the database** (creates an admin user, a sample profile, and 3 sample projects):

```bash
npm run seed
```

**Run the API in development:**

```bash
npm run dev
```

The API will start on `http://localhost:5000`. Test it: `GET http://localhost:5000/api/health`.

**Build for production:**

```bash
npm run build
npm start
```

### Backend API Reference

| Method | Endpoint                | Auth required | Description                       |
|--------|--------------------------|---------------|------------------------------------|
| GET    | `/api/health`            | No            | Health check                       |
| GET    | `/api/profile`           | No            | Get profile/about/skills/experience|
| PUT    | `/api/profile`           | Yes (admin)   | Update profile                     |
| GET    | `/api/projects`          | No            | List all projects                  |
| GET    | `/api/projects/:id`      | No            | Get a single project                |
| POST   | `/api/projects`          | Yes (admin)   | Create a project                   |
| PUT    | `/api/projects/:id`      | Yes (admin)   | Update a project                   |
| DELETE | `/api/projects/:id`      | Yes (admin)   | Delete a project                   |
| POST   | `/api/contact`           | No            | Submit a contact form (validated)  |
| GET    | `/api/contact`           | Yes (admin)   | List all contact messages          |
| PATCH  | `/api/contact/:id/read`  | Yes (admin)   | Mark a message as read             |
| DELETE | `/api/contact/:id`       | Yes (admin)   | Delete a message                   |
| POST   | `/api/auth/login`        | No            | Admin login → returns JWT          |
| GET    | `/api/auth/me`           | Yes (admin)   | Get current admin info             |

Authenticated requests use a standard bearer token:
`Authorization: Bearer <token>`

## 4. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

**Run the dev server:**

```bash
npm run dev
```

Visit `http://localhost:5173`.

**Add your resume:** drop a `resume.pdf` file into `frontend/public/` — the Hero section's "Download Resume" button links to `/resume.pdf` by default (or set a custom `resumeUrl` in the Profile).

**Admin dashboard:** visit `http://localhost:5173/admin/login` and sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set before running the seed script.

**Build for production:**

```bash
npm run build   # outputs static files to frontend/dist
npm run preview # preview the production build locally
```

## 5. Customizing Content

- **Profile, bio, skills, social links, experience/education**: edit directly via the seed script (`backend/src/data/seed.ts`) before seeding, or update later via `PUT /api/profile` (e.g. with a tool like Postman, using your admin JWT).
- **Projects**: manage from the Admin Dashboard (`/admin/dashboard`) — add or delete projects through the UI, which calls the protected `/api/projects` endpoints.
- **Theme colors**: edit the `primary` color palette in `frontend/tailwind.config.js`.
- **Dark/light mode**: toggled via the navbar button; persisted in `localStorage` and respects the user's OS preference on first visit.

## 6. Security Notes

- Passwords are hashed with **bcrypt** (10 salt rounds) before being stored — never stored in plain text.
- Admin routes are protected with **JWT** middleware (`backend/src/middleware/auth.ts`).
- All form inputs are validated server-side with **express-validator** (`backend/src/middleware/validate.ts`).
- **Helmet** is used for secure HTTP headers, and **CORS** is restricted to `CLIENT_URL`.
- Change `JWT_SECRET` and `ADMIN_PASSWORD` to strong, unique values before deploying to production. Never commit your real `.env` file.

## 7. Deployment

### Database — MongoDB Atlas
Already covered in step 3. Use a production cluster with a strong DB user password and restrict Network Access to your hosting provider's IPs (or `0.0.0.0/0` if your host uses dynamic IPs, combined with a strong password and IP-allow-listing where possible).

### Backend — Render / Railway / Fly.io (example: Render)
1. Push your code to a GitHub repository.
2. On Render: New → Web Service → connect your repo, set **Root Directory** to `backend`.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables (`MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_URL`, `NODE_ENV=production`, `PORT` is provided automatically by Render).
6. After first deploy, run the seed script once (Render Shell tab): `npm run seed`.
7. Note your backend URL, e.g. `https://your-api.onrender.com`.

(Railway and Fly.io follow the same pattern: set root directory/Dockerfile, build/start commands, and environment variables.)

### Frontend — Vercel / Netlify (example: Vercel)
1. New Project → import your repo → set **Root Directory** to `frontend`.
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Add environment variable: `VITE_API_URL=https://your-api.onrender.com/api`.
4. Deploy. Update the backend's `CLIENT_URL` env var to your new Vercel domain and redeploy the backend so CORS allows it.

### Custom domain
Point your domain's DNS to your frontend host (Vercel/Netlify) and, optionally, a subdomain (e.g. `api.yourdomain.com`) to your backend host.

## 8. Tech Stack Summary

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, Axios, React Icons, React Hot Toast
**Backend:** Node.js, Express, TypeScript, Mongoose, JWT, bcryptjs, express-validator, Helmet, Morgan
**Database:** MongoDB (Atlas)

## 9. Sample Admin Credentials (after seeding)

```
Email:    value of ADMIN_EMAIL in backend/.env
Password: value of ADMIN_PASSWORD in backend/.env
```

Change these immediately after your first login in any real deployment.
