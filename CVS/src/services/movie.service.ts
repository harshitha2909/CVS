import { moviesDb, ratingsDb } from '../config/db';
import { getPagination } from '../utils/pagination';

// Helper to safely parse JSON fields
const tryParseJson = (val: string) => {
  try {
    return JSON.parse(val);
  } catch {
    return val;
  }
};

// Parses one movie row's JSON fields
const parseMovieRow = (row: any) => ({
  ...row,
  genres: tryParseJson(row.genres),
  productionCompanies: tryParseJson(row.productionCompanies),
});

const parseMovieRows = (rows: any[]) => rows.map(parseMovieRow);

export const listMovies = (page: number): Promise<any[]> => {
  const { offset, limit } = getPagination(page);
  const query = `
    SELECT imdbId, title, genres, releaseDate, budget, productionCompanies
    FROM movies
    LIMIT ? OFFSET ?
  `;
  return new Promise((resolve, reject) => {
    moviesDb.all(query, [limit, offset], (err, rows) => {
      if (err) return reject(err);
      resolve(parseMovieRows(rows));
    });
  });
};

export const getMovieDetails = (movieId: number): Promise<any> => {
  const movieQuery = `
    SELECT imdbId, title, overview, releaseDate, budget, runtime, language, genres, productionCompanies
    FROM movies WHERE movieId = ?
  `;
  const ratingQuery = `
    SELECT AVG(rating) as averageRating FROM ratings WHERE movieId = ?
  `;
  return new Promise((resolve, reject) => {
    moviesDb.get(movieQuery, [movieId], (err: any, movie: any) => {
      if (err || !movie) return reject(err || 'Movie not found');
      const parsedMovie = parseMovieRow(movie);
      ratingsDb.get(ratingQuery, [movieId], (err2: any, rating: any) => {
        if (err2) return reject(err2);
        parsedMovie.averageRating = rating?.averageRating || 0;
        resolve(parsedMovie);
      });
    });
  });
};

export const listMoviesByYear = (year: string, page: number, sort: string): Promise<any[]> => {
  const { offset, limit } = getPagination(page);
  const order = sort === 'desc' ? 'DESC' : 'ASC';
  const query = `
    SELECT imdbId, title, genres, releaseDate, budget, productionCompanies
    FROM movies
    WHERE substr(releaseDate, 1, 4) = ?
    ORDER BY releaseDate ${order}
    LIMIT ? OFFSET ?
  `;
  return new Promise((resolve, reject) => {
    moviesDb.all(query, [year, limit, offset], (err, rows) => {
      if (err) return reject(err);
      resolve(parseMovieRows(rows));
    });
  });
};

export const listMoviesByGenre = (genre: string, page: number): Promise<any[]> => {
  const { offset, limit } = getPagination(page);
  const query = `
    SELECT imdbId, title, genres, releaseDate, budget, productionCompanies
    FROM movies
    WHERE genres LIKE '%' || ? || '%'
    LIMIT ? OFFSET ?
  `;
  return new Promise((resolve, reject) => {
    moviesDb.all(query, [genre, limit, offset], (err, rows) => {
      if (err) return reject(err);
      resolve(parseMovieRows(rows));
    });
  });
};
