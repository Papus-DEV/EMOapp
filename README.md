# EMO App

Monorepo for Epic Marketing Orchestrator.

## Structure

- `frontend` - Angular standalone application
- `backend` - .NET 8 Web API using minimal APIs, EF Core, and PostgreSQL

## Prerequisites

- Node.js 20 or newer
- .NET 8 SDK or newer
- PostgreSQL running locally

## Database

Create a PostgreSQL database named `emoapp`, or change the connection string in `backend/appsettings.Development.json`.

Default connection string:

```text
Host=localhost;Port=5432;Database=emoapp;Username=postgres;Password=postgres
```

## Run The Backend

```powershell
cd backend
dotnet restore
dotnet run
```

The API runs at `http://localhost:5100`.

Useful endpoints:

- `GET /health`
- `GET /api/tasks`
- `POST /api/tasks`

## Run The Frontend

```powershell
cd frontend
npm install
npm start
```

The Angular app runs at `http://localhost:4200`.

## Development Notes

Both apps run independently. The backend allows CORS requests from `http://localhost:4200` for local development.

## Run Both Apps

From the repository root:

```powershell
npm install
npm start
```

This starts Angular on `http://localhost:4200` and the .NET API using the `http` launch profile.

## Development Rules for Frontend (Angular)

Before generating code, ALWAYS follow:
- CODEX_RULES.md
- UI_ARCHITECTURE.md