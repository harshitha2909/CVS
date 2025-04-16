"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMoviesByGenre = exports.listMoviesByYear = exports.getMovieDetails = exports.listMovies = void 0;
const db_1 = require("../config/db");
const pagination_1 = require("../utils/pagination");
// Helper to safely parse JSON fields
const tryParseJson = (val) => {
    try {
        return JSON.parse(val);
    }
    catch {
        return val;
    }
};
// Parses one movie row's JSON fields
const parseMovieRow = (row) => ({
    ...row,
    genres: tryParseJson(row.genres),
    productionCompanies: tryParseJson(row.productionCompanies),
});
const parseMovieRows = (rows) => rows.map(parseMovieRow);
const listMovies = (page) => {
    const { offset, limit } = (0, pagination_1.getPagination)(page);
    const query = `
    SELECT imdbId, title, genres, releaseDate, budget, productionCompanies
    FROM movies
    LIMIT ? OFFSET ?
  `;
    return new Promise((resolve, reject) => {
        db_1.moviesDb.all(query, [limit, offset], (err, rows) => {
            if (err)
                return reject(err);
            resolve(parseMovieRows(rows));
        });
    });
};
exports.listMovies = listMovies;
const getMovieDetails = (movieId) => {
    const movieQuery = `
    SELECT imdbId, title, overview, releaseDate, budget, runtime, language, genres, productionCompanies
    FROM movies WHERE movieId = ?
  `;
    const ratingQuery = `
    SELECT AVG(rating) as averageRating FROM ratings WHERE movieId = ?
  `;
    return new Promise((resolve, reject) => {
        db_1.moviesDb.get(movieQuery, [movieId], (err, movie) => {
            if (err || !movie)
                return reject(err || 'Movie not found');
            const parsedMovie = parseMovieRow(movie);
            db_1.ratingsDb.get(ratingQuery, [movieId], (err2, rating) => {
                if (err2)
                    return reject(err2);
                parsedMovie.averageRating = rating?.averageRating || 0;
                resolve(parsedMovie);
            });
        });
    });
};
exports.getMovieDetails = getMovieDetails;
const listMoviesByYear = (year, page, sort) => {
    const { offset, limit } = (0, pagination_1.getPagination)(page);
    const order = sort === 'desc' ? 'DESC' : 'ASC';
    const query = `
    SELECT imdbId, title, genres, releaseDate, budget, productionCompanies
    FROM movies
    WHERE substr(releaseDate, 1, 4) = ?
    ORDER BY releaseDate ${order}
    LIMIT ? OFFSET ?
  `;
    return new Promise((resolve, reject) => {
        db_1.moviesDb.all(query, [year, limit, offset], (err, rows) => {
            if (err)
                return reject(err);
            resolve(parseMovieRows(rows));
        });
    });
};
exports.listMoviesByYear = listMoviesByYear;
const listMoviesByGenre = (genre, page) => {
    const { offset, limit } = (0, pagination_1.getPagination)(page);
    const query = `
    SELECT imdbId, title, genres, releaseDate, budget, productionCompanies
    FROM movies
    WHERE genres LIKE '%' || ? || '%'
    LIMIT ? OFFSET ?
  `;
    return new Promise((resolve, reject) => {
        db_1.moviesDb.all(query, [genre, limit, offset], (err, rows) => {
            if (err)
                return reject(err);
            resolve(parseMovieRows(rows));
        });
    });
};
exports.listMoviesByGenre = listMoviesByGenre;
