# LifeTwin AI — AI Digital Twin for Human Health

A health monitoring and risk-screening platform: Next.js frontend + FastAPI backend + PostgreSQL.

> **Medical disclaimer:** LifeTwin AI is a screening/informational tool. It does not diagnose disease,
> prescribe treatment, or replace a licensed healthcare professional. In a medical emergency, call your
> local emergency number (e.g. **108** in India) immediately.

## Project status

This repo is being built out **phase by phase** (see `IMPLEMENTATION_PLAN` notes below / prior chat).
Currently implemented and real (no mocked responses):

- ✅ FastAPI backend + PostgreSQL + Docker Compose (Phase 2)
- ✅ Authentication: signup, login, JWT, Google OAuth, forgot-password via emailed OTP (Phase 3)

Not yet implemented (frontend pages for these still show placeholder/demo UI until their phase lands):
health profile API, vitals/Bluetooth, digital twin, disease risk engine, AI assistant, family system,
SOS/emergency, WebSockets.

## Architecture

```
Next.js Frontend  ───HTTPS/REST──▶  FastAPI Backend  ───▶ PostgreSQL
   (port 3000)                        (port 8000)
```

## Tech stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Recharts
- **Backend:** Python, FastAPI, SQLAlchemy, Alembic
- **Database:** PostgreSQL 16
- **Auth:** JWT (Argon2 password hashing), Google OAuth 2.0, email OTP for password reset
- **Infra:** Docker, Docker Compose

## Folder structure

```
lifetwin-ai/
├── app/                # Next.js App Router pages
├── components/         # UI components (AppShell, Navbar, Sidebar, ...)
├── hooks/useAuth.tsx    # Auth context (talks to the backend)
├── lib/api.ts           # Central typed API client — all backend calls go through here
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI routers (auth.py, ...)
│   │   ├── core/         # config.py (env settings), security.py (JWT/hashing)
│   │   ├── db/           # database.py, models.py
│   │   ├── schemas/      # Pydantic request/response models
│   │   ├── services/     # business logic (auth, OTP, email, Google OAuth)
│   │   └── main.py
│   ├── migrations/       # Alembic migrations
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── Dockerfile / Dockerfile.dev   # frontend containers
```

## Environment setup

```bash
cp .env.example .env
```

Fill in the values you have. The app runs with auth working (signup/login/JWT) even with everything
else blank — Google login and OTP emails will clearly error out ("not configured") instead of pretending
to work, until you add real credentials.

### Google OAuth setup

1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
2. Create an **OAuth 2.0 Client ID** of type "Web application".
3. Authorized JavaScript origins: `http://localhost:3000`
4. Authorized redirect URIs: `http://localhost:8000/auth/google/callback`
5. Copy the Client ID/Secret into `.env` as `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.

### SMTP setup (for OTP emails)

Any SMTP provider works (Gmail app password, SendGrid, Mailgun, Postmark, etc). Set `SMTP_HOST`,
`SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM` in `.env`. Until these are set, signup still
works but skips sending the verification email (and forgot-password will return a clear
`SMTP_NOT_CONFIGURED` error instead of silently succeeding).

#### Using Gmail specifically

Gmail no longer accepts your normal account password for SMTP login — you need an **App Password**:

1. Enable 2-Step Verification on the Gmail account: <https://myaccount.google.com/security>.
2. Go to <https://myaccount.google.com/apppasswords> and generate an app password (choose "Mail" /
   "Other" as the app).
3. Set:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-address@gmail.com
   SMTP_PASSWORD=<the 16-character app password, not your Gmail login password>
   SMTP_FROM=your-address@gmail.com
   ```
4. Never commit this value or put it in `.env.example` — it only belongs in your local/deployed `.env`.

Use a Gmail account you're comfortable using for development/testing sends, not a personal primary
inbox.

### Gemini setup (used by the AI assistant — later phase)

Create a key at [Google AI Studio](https://aistudio.google.com/) and set `GEMINI_API_KEY`. It is read
**only** by the backend; it is never sent to the frontend.

## Running with Docker (recommended)

```bash
docker compose up --build
```

This starts `postgres`, `backend` (FastAPI, runs Alembic migrations automatically on boot), and
`frontend` (Next.js production build). Frontend: http://localhost:3000 · API docs: http://localhost:8000/docs

For hot-reload frontend development instead of the production build:

```bash
docker compose --profile dev up dev
```

## Running locally without Docker

**Backend**

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

**Frontend**

```bash
npm install
npm run dev
```

## Database migrations

New migration after changing `backend/app/db/models.py`:

```bash
cd backend
alembic revision --autogenerate -m "describe the change"
alembic upgrade head
```

## API documentation

FastAPI auto-generates interactive docs:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Auth endpoints implemented so far

| Method | Path                       | Description                                  |
|--------|----------------------------|-----------------------------------------------|
| POST   | `/auth/signup`             | Create account, returns JWT                   |
| POST   | `/auth/login`               | Email/password login, returns JWT             |
| GET    | `/auth/me`                  | Current authenticated user                    |
| GET    | `/auth/google/login`        | Returns the Google OAuth consent URL          |
| GET    | `/auth/google/callback`     | Google redirects here; issues app JWT         |
| POST   | `/auth/forgot-password`     | Emails a 6-digit OTP (5 min expiry)           |
| POST   | `/auth/verify-otp`          | Verifies the OTP                               |
| POST   | `/auth/reset-password`      | Verifies OTP + sets new password              |

All error responses follow: `{"success": false, "message": "...", "code": "..."}`.

## Security notes

- Passwords hashed with Argon2, never stored or logged in plaintext.
- OTPs are hashed at rest, never returned in API responses or logged, expire after 5 minutes, capped at
  5 attempts, with a 60s resend cooldown.
- JWT secret, Google client secret, SMTP password, and Gemini key live only in backend environment
  variables — never in frontend code or bundles.
- Auth endpoints are rate-limited (`slowapi`).
- CORS restricted to `CORS_ORIGINS`.

## Medical disclaimer

LifeTwin AI provides risk *estimates* and *screening support*, not medical diagnoses. Always consult a
qualified healthcare professional for diagnosis and treatment decisions.
