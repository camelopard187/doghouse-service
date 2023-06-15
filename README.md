# 🐶 Doghouse Service

The Doghouse service is a user-friendly REST API that enables users to create and view dogs effortlessly. Users can create a new dog by providing basic information like weight and color, and the service allows users to view all existing dogs on a list. The service is straightforward to use and provides a convenient way to manage and view dogs

## 🐕‍🦺 Getting Started

To begin using this service, you will need to provide the required configuration in a `.env` file:

```env
NODE_ENV = "development"

POSTGRES_USER = "username"
POSTGRES_PASSWORD = "password"
POSTGRES_HOST = "host"
POSTGRES_DB = "database_name"

DATABASE_URL = "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}"

THROTTLE_TTL = 60
THROTTLE_LIMIT = 10
```

> **Note** - Make sure to substitute the placeholders with your own configuration

### 💻 Local

To run this service on your local computer, please follow these steps:

1. Firstly, install all dependencies by using [pnpm](https://pnpm.io/):

```bash
$ pnpm install --frozen-lockfile
```

2. Next, Migrate the [PostgreSQL](https://www.postgresql.org/) database by typing the following command in your terminal:

```bash
$ pnpm migrate --url $DATABASE_URL
```

> **Warning** If `$DATABASE_URL` is empty then try to paste variable manualy

3. Finally, start the [Nest.js](https://nestjs.com/) server by entering the following command:

```bash
$ pnpm start:development
```

> **Note** - If you want to activate watch mode for the server, simply add the `--watch` flag

### 🐳 Docker

Alternatively, you can run the service in a [Docker](https://www.docker.com/) container with the following command:

```bash
$ docker compose -f docker/docker-compose.yaml up -d --build
```

> **Note** - Replace `POSTGRES_HOST` from "localhost" to "postgres" in [Docker](https://www.docker.com/) container

## ✅ Tests

### 🧩 Integration

Our service also offers integration tests, which can be run using a single command:

```bash
$ pnpm test:integration
```

> **Note** - You can also generate code coverage using the `--coverage` flag

## 📜 License

The MIT License (MIT) 2023 - [camelopard187](https://github.com/camelopard187). Please have a look at the [LICENSE.md](LICENSE.md) for more details
