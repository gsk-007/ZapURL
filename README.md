# ZapURL - URL Shortening Service

A modern, efficient URL shortening service built with Node.js, Express, and PostgreSQL. The project follows Test-Driven Development (TDD) principles and uses Docker for consistent development and testing environments.

## 🚀 Features

- URL shortening with custom nanoid-based short codes
- Fast redirects to original URLs
- RESTful API design
- PostgreSQL database for persistent storage
- Docker-based development environment
- Comprehensive test suite using Vitest
- TypeScript for type safety

## 🛠️ Tech Stack

- **Runtime**: Node.js 20.17.0
- **Framework**: Express.js
- **Database**: PostgreSQL 17
- **Testing**: Vitest
- **Logging**: Winston
- **Monitoring**: Prometheus and Grafana
- **Language**: TypeScript
- **Development Tools**:
  - Docker & Docker Compose
  - ESLint & Prettier for code quality
  - Husky for git hooks
  - Morgan for HTTP request logging

## 🏗️ Prerequisites

- Docker and Docker Compose
- Node.js 20.17.0 (managed via Volta)
- npm or yarn

## 🚦 Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ZapURL
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development environment:
   ```bash
   docker-compose up
   ```

The service will be available at `http://localhost:5000`.

## 🧪 Running Tests

The project uses Vitest for testing and follows TDD practices. To run tests:

```bash
# Run tests once
docker compose --rm app npm run test:run
```

## 📝 Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the TypeScript project
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🐳 Docker Setup

The project includes a Docker development environment with:
- Node.js application container
- PostgreSQL 17 database
- Volume mapping for hot-reload during development
- Health checks for database availability

## 🗄️ Database Schema

The database schema is managed through SQL migrations. Initial tables can be created using the `create-tables.sql` file.

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
TEST_DB_URL=postgresql://postgres:password@postgres:5432/testdb
NODE_ENV=development
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
