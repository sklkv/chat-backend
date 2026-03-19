# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run start:dev       # Start with watch mode
npm run start:debug     # Start with debugger

# Build & Production
npm run build           # Compile TypeScript to dist/
npm run start:prod      # Run compiled output

# Code Quality
npm run lint            # ESLint with auto-fix
npm run format          # Prettier formatting

# Testing
npm test                # Unit tests
npm run test:watch      # Watch mode
npm run test:cov        # With coverage
npm run test:e2e        # End-to-end tests
```

To run a single test file: `npx jest src/modules/auth/auth.service.spec.ts`

## Architecture

**Stack:** NestJS + TypeScript, PostgreSQL via Sequelize ORM, Socket.IO for WebSockets, Passport.js + JWT for auth, Swagger at `/swagger`.

**Environment:** Loaded from `.development.env` or `.production.env` via `ConfigModule`. The app HTTP server runs on `PORT=4000` and the WebSocket gateway runs on `WS_PORT=3000`.

### Module Structure

Each feature module under `src/modules/` follows: `*.module.ts` → `*.controller.ts` → `*.service.ts` → `*.model.ts` + `dto/`.

| Module | Responsibility |
|--------|---------------|
| `auth` | Signup/signin, JWT issuance. Imports `UsersModule` and `JwtModule`. |
| `users` | User CRUD, repository for other modules. |
| `chats` | Chat creation and participant management. |
| `messages` | Message storage and range-based retrieval. |
| `events` | Socket.IO WebSocket gateway. |

### Path Aliases (tsconfig)

```
@constants/*  → src/constants/
@exception/*  → src/exception/
@modules/*    → src/modules/
@strategy/*   → src/strategy/
@swagger/*    → src/swagger/
```

### Auth Flow

JWT-based via Passport. `JwtAuthGuard` (from `AuthModule`) protects routes. The JWT secret lives in `src/constants/index.ts` — it should eventually move to `ConfigService`.

### Error Handling

`HttpExceptionFilter` is registered globally in `main.ts`. `BadBaseException` (in `src/exception/`) returns HTTP 200 with `status: 'FAILED'` for validation/business errors. All success responses use `status: 'OK'`.

### Database Models

- `User` — email, username, phoneNumber, password (bcrypt)
- `Chats` — UUID id, participants array
- `Messages` — UUID id, chat_id, user_id, type, text

Models are auto-loaded by Sequelize via `SequelizeModule.forRootAsync` in `app.module.ts`.

## API Routes

| Method | Path | Auth |
|--------|------|------|
| POST | `/auth/signup` | Public |
| POST | `/auth/signin` | Public |
| GET | `/auth/profile` | JWT |
| GET | `/users` | Public |
| GET | `/chats/all` | JWT |
| POST | `/chats/create` | Public |
| GET | `/messages/:chat_id/:from/:to` | Public |
| POST | `/messages/create` | Public |
