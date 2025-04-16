import request from 'supertest';
import express from 'express';
import movieRoutes from '../routes/movie.routes';
import { moviesDb, ratingsDb } from '../config/db';

const app = express();
app.use(express.json());
app.use('/api/movies', movieRoutes);

describe('🎬 Movie API Endpoints', () => {
  it('GET /api/movies should return 200 and a list of movies', async () => {
    const res = await request(app).get('/api/movies?page=1');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/movies/:id should return movie details for a valid ID', async () => {
    const res = await request(app).get('/api/movies/80');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('imdbId');
    expect(res.body).toHaveProperty('title');
  });


  it(
    'GET /api/movies/year/:year should return movies by year',
    async () => {
      const res = await request(app).get('/api/movies/year/2004?page=1&sort=asc');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    },
    10000 // ⏱️ Extended timeout to 10s
  );

  it(
    'GET /api/movies/genre/:genre should return movies by genre',
    async () => {
      const res = await request(app).get('/api/movies/genre/Drama?page=1');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    },
    10000 // ⏱️ Extended timeout to 10s
  );

  afterAll(() => {
    moviesDb.close();
    ratingsDb.close();
  });
});
