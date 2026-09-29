# Real-Time Collaborative Task & Status Engine: Frontend

React + Vite frontend for a collaborative task management app. Multiple authenticated users can create, assign, and update tasks. The UI uses optimistic updates with rollback on failure, toast notifications, and 10-second polling to keep clients in sync.

> This repository contains the **frontend only**. It needs the companion backend API (Node.js, Express, MongoDB) running to work.

---

## Features

- Login and registration with password visibility toggle
- Task creation form with user assignment
- Task cards with status transitions (Pending → In Progress → Completed)
- Optimistic status updates with automatic rollback on failure
- Configurable 50% simulated request failure (for demoing rollback)
- Toast notifications
- 10-second polling with cleanup on unmount
- Task metrics dashboard
- Responsive UI

## Tech Stack

React, Vite, React Router, Axios, React Hot Toast, Lucide React, CSS

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm
- Git
- The backend API running locally (or a deployed URL)

Check your installs:

```bash
node --version
npm --version
git --version
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Abhishekn1234/tasks_frontend.git
cd tasks_frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (next to `package.json`):

```env
VITE_API_URL=http://localhost:5000/api

```

| Variable | Description | Default / Example |
| --- | --- | --- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |
| `VITE_SIMULATE_FAILURE` | `true` makes ~50% of status updates fail randomly to demo optimistic rollback. `false` sends requests normally. | `false` |

> Vite only reads `.env` at startup. **Restart the dev server** after changing any variable.

### 4. Start the backend

The frontend expects the backend at the URL set in `VITE_API_URL`. Make sure:

1. MongoDB is running.
2. The backend is started (typically `npm install` then `npm run dev` in the backend project).
3. The backend's `CLIENT_URL` (CORS) is set to `http://localhost:5173`.

Quick check: opening `http://localhost:5000/` should return a JSON success message.

### 5. Run the frontend

```bash
npm run dev
```

Open the URL Vite prints, normally:

```
http://localhost:5173
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Usage

1. Open the app and **register** at least two users (use different browsers or an incognito window for the second).
2. **Log in** and create a task, assigning it to a user.
3. Move the task through **Pending → In Progress → Completed**.
4. Watch the dashboard update automatically every 10 seconds, including changes made by another user.

### Testing optimistic UI rollback

1. Set `VITE_SIMULATE_FAILURE=true` in `.env`.
2. Restart the dev server.
3. Change a task's status. The UI updates immediately, and when a simulated failure occurs it rolls back to the previous status and shows a toast.

### Testing concurrent updates

1. Log in as two users in two browser sessions.
2. Have both open the same task, then both attempt the same status change.
3. The first succeeds. The second receives a `409 Conflict` (handled by the backend's optimistic concurrency control).

---

## Project Structure

```text
tasks_frontend/
├── public/
├── src/
│   ├── api/          # Axios API calls (auth, tasks)
│   ├── components/   # Navbar, TaskForm, TaskList, TaskCard, Metrics
│   ├── pages/        # Login, Register, Dashboard
│   ├── utils/        # Auth helpers
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## Production Build

```bash
npm run build
npm run preview
```

Set `VITE_API_URL` to your deployed backend URL before building, since Vite embeds env variables at build time.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Blank page or network errors | Confirm the backend is running and `VITE_API_URL` is correct |
| CORS errors in the browser console | Set the backend's `CLIENT_URL` to `http://localhost:5173` and restart it |
| Env changes not applied | Restart `npm run dev` |
| `429 Too Many Requests` when creating tasks | The backend allows 5 task creations per minute per user; wait a minute |
| Port 5173 already in use | Vite picks the next free port; use the URL shown in the terminal |

---

## Notes

- Do not commit real secrets. Make sure `.env` is listed in `.gitignore`.
- Polling every 10 seconds is used instead of WebSockets to keep the implementation simple.

## License

Created as a take-home coding challenge.
