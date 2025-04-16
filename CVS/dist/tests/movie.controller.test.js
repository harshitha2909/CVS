"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const movie_routes_1 = __importDefault(require("../routes/movie.routes"));
const db_1 = require("../config/db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/movies', movie_routes_1.default);
describe('🎬 Movie API Endpoints', () => {
    it('GET /api/movies should return 200 and a list of movies', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/movies?page=1');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('GET /api/movies/:id should return movie details for a valid ID', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/movies/80');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('imdbId');
        expect(res.body).toHaveProperty('title');
    });
    /*   it('GET /api/movies/:id should return 400 for invalid ID', async () => {
        const res = await request(app).get('/api/movies/notanumber');
        expect(res.status).toBe(400);
      }); */
    /* it('GET /api/movies/:id should return 404 for non-existent movie', async () => {
      const res = await request(app).get('/api/movies/999999'); // assuming this ID doesn't exist
      expect(res.status).toBe(404);
    }); */
    it('GET /api/movies/year/:year should return movies by year', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/movies/year/2004?page=1&sort=asc');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 10000 // ⏱️ Extended timeout to 10s
    );
    it('GET /api/movies/genre/:genre should return movies by genre', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/movies/genre/Drama?page=1');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 10000 // ⏱️ Extended timeout to 10s
    );
    afterAll(() => {
        db_1.moviesDb.close();
        db_1.ratingsDb.close();
    });
});
