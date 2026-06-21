# Fake Store System Frontend

A Vite + React + TypeScript frontend for the existing FastAPI Fake Store System backend.

## Tech stack

- Vite, React, and TypeScript
- React Router
- Axios with JWT/refresh interceptors
- Zustand
- React Hook Form and Zod
- SCSS

## Install

```powershell
npm install
```

## Environment setup

Copy `.env.example` to `.env` if needed:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Run

Start the FastAPI backend from:

```text
E:\New Job 2026\Z-PREPA\MEAN Apps\Fake Store System
```

```powershell
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

Then start the frontend:

```powershell
npm run dev
```

Open `http://localhost:5173`.

## Build

```powershell
npm run build
```

Preview a production build:

```powershell
npm run preview
```

## Backend connection

All network calls use the Axios instance in `src/lib/axios.ts`. API modules live under `src/features/*/*Api.ts`, making paths easy to update without changing page components.

The current FastAPI backend supports:

- users (read)
- categories (read)
- products and product reviews (read)
- carts by user (read)
- wishlists by user (read)
- orders and order details (read)
- payments (read)
- coupon lookup
- payment report upload, status, and error rows

The requested authentication and most write routes are not currently exposed by the backend. The frontend is prepared for conventional routes such as `/auth/login`, `POST /products`, and `PATCH /products/{id}`. Until those backend routes are implemented, those actions display the real backend error instead of using mock APIs or fake success responses.

Expected auth response:

```json
{
  "access_token": "jwt",
  "refresh_token": "jwt",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "user",
    "first_name": "Store",
    "last_name": "User"
  }
}
```

Refresh endpoint expected by the interceptor:

```text
POST /auth/refresh
```
