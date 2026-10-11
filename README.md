# StackPath Academy

> **Tagline:** Start from zero. Understand the code. Build real applications.  
> **Mission:** A complete, interactive, premium-quality full-stack university taking learners from absolute zero to industry-ready software engineers.

---

## 1. System Overview & Architecture

StackPath Academy is architected as a modern, maintainable monorepo with clear separation of concerns:

```
StackPath Academy/
├── apps/
│   ├── api/            # Node.js + Express + TypeScript + Prisma REST API
│   │   ├── prisma/     # SQLite (zero-config local dev) & PostgreSQL schemas
│   │   ├── src/        # Routes, controllers, middleware, and seed scripts
│   │   └── test/       # Vitest + Supertest integration tests
│   └── web/            # React + Vite + Tailwind CSS frontend
│       ├── src/        # Pages, components, hooks, and context
│       └── test/       # Component and view tests
├── packages/
│   ├── shared/         # Shared TypeScript interfaces, types & Zod schemas
│   └── content/        # Comprehensive 7-phase, 25-module curriculum, 11-section lessons, quizzes & projects
├── docker-compose.yml  # Multi-tier containerization (Postgres, API, Web)
└── package.json        # Workspace scripts & dependencies
```

---

## 2. Technology Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, React Router, Lucide icons.
- **Backend:** Node.js, Express.js, TypeScript, REST APIs, Zod, bcryptjs, jsonwebtoken, CORS, Helmet.
- **Database:** Prisma ORM. Configured with SQLite (`dev.db`) by default for instant local setup with zero external installations, and fully compatible with PostgreSQL via `prisma/schema.postgresql.prisma`.
- **Testing:** Vitest, Supertest.
- **DevOps:** Docker, Docker Compose, multi-stage container builds.

---

## 3. Getting Started & Installation

### Prerequisites
- **Node.js:** v18.0.0 or later (v20+ or v24+ recommended).
- **npm:** v9.0.0 or later.
- *(Optional)* **Docker & Docker Compose** for containerized PostgreSQL deployment.

### Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize Database & Seed Data:**
   ```bash
   npm run db:push --workspace=apps/api
   npm run db:seed --workspace=apps/api
   ```
   *This automatically generates the database tables and seeds a demo student account (`student@stackpath.dev`, password `Student123!`) with initial progress, study notes, and bookmarks.*

3. **Start Development Servers:**
   ```bash
   # Starts both frontend (port 5173) and backend (port 4000):
   npm run dev
   ```

4. **Open in Browser:**
   - Frontend UI: `http://localhost:5173`
   - Backend API: `http://localhost:4000/healthz`

---

## 4. One-Click Demo Learner Credentials

You can instantly test all authenticated features (notes, bookmarks, quiz scores, progress tracking) either by:
- Clicking the **"Sign In as Demo Student (1-Click)"** button on the `/auth` page, or
- Manually signing in with:
  - **Email:** `student@stackpath.dev`
  - **Password:** `Student123!`

---

## 5. Running Automated Tests

Run the end-to-end test suite:
```bash
npm run test --workspace=apps/api
```

---

## 6. Switching to PostgreSQL

To connect to a live PostgreSQL instance (local or hosted):

1. Update `apps/api/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/stackpath_academy?schema=public"
   ```
2. Replace `apps/api/prisma/schema.prisma` with `apps/api/prisma/schema.postgresql.prisma`.
3. Push schema:
   ```bash
   npm run db:push --workspace=apps/api
   ```

---

## 7. Recommended First-Day Learning Plan

1. **Orientation:** Open the **Welcome Guide** (`Start Guide` in top navigation) to review what full-stack development means in simple English.
2. **First Lesson:** Begin with **Phase 1, Module 1, Lesson 1: How Computers Think & Execute Code**.
3. **Practice:** Write your first line of logic in the **Interactive Sandbox**.
4. **Knowledge Check:** Take the Module 1 Quiz to test your understanding.
5. **Inspect Project 1:** Review **Project 1: Personal Web Page** to prepare for your first portfolio build.
