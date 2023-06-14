# 🐶 Doghouse Service

Welcome to the Doghouse Service! Our microservice makes use of Nest.js and Sequelize to provide an API for managing data related to doghouses. You can store and retrieve information about doghouses with ease, all while ensuring security and reliability

## 🐕‍🦺 Getting Started

### 💻 Local

To run this service on your local computer, please follow these steps:

1. Firstly, create a .env file in the project root directory and include the following environment variables:

```env
NODE_ENV = "development"

POSTGRES_DB = "database_name"
POSTGRES_USER = "username"
POSTGRES_PASSWORD = "password"

DATABASE_URL = "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"

THROTTLE_TTL = 60
THROTTLE_LIMIT = 10
```

> **Note** - Make sure to substitute the placeholders with your own configuration

2.  Next, install all dependencies by using [pnpm](https://pnpm.io/) and start the server:

```bash
$ pnpm install --frozen-lockfile
```

3. Migrate the [PostgreSQL](https://www.postgresql.org/) database by typing the following command in your terminal:

```bash
$ pnpm migrate --url $DATABASE_URL
```

> **Warning** If `$DATABASE_URL` is empty then try to paste variable manualy

4. Finally, start the Nest.js server by entering the following command:

```bash
$ pnpm start:development
```

> **Note** - If you want to activate watch mode for the server, simply add the `--watch` flag

## ✅ Tests

### 🧩 Integration

Our service also offers integration tests, which can be run using a single command:

```bash
$ pnpm test:integration
```

> **Note** - You can also generate code coverage using the `--coverage` flag

## 📜 License

The MIT License (MIT) 2023 - [camelopard187](https://github.com/camelopard187). Please have a look at the [LICENSE.md](LICENSE.md) for more details