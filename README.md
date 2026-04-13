# Fight Club Monorepo

A monorepo with a Node.js API backend and React + Vite frontend.

## Structure

```
backend/   — Express API serving Fight Club rules (port 3001)
frontend/  — React + Vite app with dark-themed UI
```

## Local Development

```bash
# Install all dependencies
npm install

# Start the backend
cd backend && npm start

# In another terminal, start the frontend
cd frontend && npm run dev
```

The frontend reads `VITE_API_URL` to locate the backend. It defaults to `http://localhost:3001`.

## Deployment

### Backend (Railway)

1. Create a new Railway project and connect this repo.
2. Set the root directory to `backend/`.
3. Railway will detect the `Procfile` and run `node index.js`.
4. Set the `PORT` environment variable if needed (Railway provides one automatically).

### Frontend (Vercel)

1. Import this repo into Vercel.
2. Set the root directory to `frontend/`.
3. Add the environment variable `VITE_API_URL` pointing to your deployed backend URL (e.g. `https://your-backend.up.railway.app`).
4. Vercel will detect Vite and build automatically.

## API

### GET /api/rules

Returns all 8 rules of Fight Club as JSON:

```json
{
  "rules": [
    { "number": 1, "rule": "You do not talk about Fight Club." },
    ...
  ]
}
```
