# Relay

Video call app with a React (JavaScript) + Vite frontend, an ASP.NET Core (.NET 10) backend, and Postgres 17.

## Development

Set Postgres credentials in `.env` (copy `.env.example` to `.env` on a fresh checkout). Docker Compose loads this file automatically; `.env` is ignored by Git.

Start Docker Desktop with Linux containers, then run from the repo root:

```sh
docker compose up
```

- Frontend: http://localhost:5173
- API: http://localhost:8080/api
- Database health check: http://localhost:8080/api/health
- Postgres: `localhost:5432`, using the database, user, and password from `.env`

Docker supplies Node.js and the .NET SDK. The first start downloads images and dependencies. Source files are mounted into the containers, with Vite hot reload and `dotnet watch` enabled. The frontend proxies `/api` requests to the backend.

`frontend/` contains the React app; `backend/` contains the C# API. The starter page checks the API and database connection.

Stop the services with:

```sh
docker compose down
```

Postgres data persists in a named volume. To delete development data and dependency caches, run `docker compose down -v`.

The supplied database credentials are for local development only. Published ports are bound to localhost. Postgres uses these credentials when initializing an empty data volume; editing `.env` does not update credentials in an existing database.

## Frontend commands outside Docker

With Node.js 24 installed:

```sh
cd frontend
npm ci
npm run dev
```

Run `npm run build` for a production frontend build. Local Vite proxies API requests to `http://localhost:8080`; keep the backend running through Compose.
