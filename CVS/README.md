
# 🎬 Movie API

Movie API built with Node.js v18.20.7 and SQLite.

## 🧰 Tech Stack

- Node.js v18.20.7
- Express.js
- SQLite
- Jest (for testing)
- TypeScript

## 🚀 How to Run

1. **Clone the repository**

```bash
git clone <repository-url>
```

2. **Install dependencies**

```bash
npm install
```

3. **Add the SQLite database**

Place `movies.db` and `ratings.db` inside a folder named `db` in the root of your project.

4. **Build the project**

Before running the server, build the TypeScript files:

```bash
npm run build
```

5. **Run the server**

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## 📘 API Endpoints

- `GET /api/movies?page=1` — List all movies (paginated, with optional query parameter `page`)
- `GET /api/movies/:id` — Get movie details by ID
- `GET /api/movies/year/:year?page=1&sort=asc|desc` — Movies filtered by year (with optional query parameters `page` and `sort` for sorting order)
- `GET /api/movies/genre/:genre?page=1` — Movies filtered by genre (with optional query parameter `page`)

### Example Requests:

- `GET http://localhost:3000/api/movies?page=1`
- `GET http://localhost:3000/api/movies/80`
- `GET http://localhost:3000/api/movies/year/2010?page=1&sort=desc`
- `GET http://localhost:3000/api/movies/genre/Drama?page=1`

## 🧪 Running Tests

```bash
npm test
```

This will run all the unit tests using Jest.
