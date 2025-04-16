"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesByGenre = exports.getMoviesByYear = exports.getMovieDetails = exports.getAllMovies = void 0;
const movieService = __importStar(require("../services/movie.service"));
const getAllMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const movies = await movieService.listMovies(page);
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};
exports.getAllMovies = getAllMovies;
const getMovieDetails = async (req, res) => {
    try {
        const movieId = parseInt(req.params.id);
        const movie = await movieService.getMovieDetails(movieId);
        res.json(movie);
    }
    catch (error) {
        res.status(404).json({ error: 'Movie not found' });
    }
};
exports.getMovieDetails = getMovieDetails;
const getMoviesByYear = async (req, res) => {
    try {
        const year = req.params.year;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || 'asc';
        const movies = await movieService.listMoviesByYear(year, page, sort);
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies by year' });
    }
};
exports.getMoviesByYear = getMoviesByYear;
const getMoviesByGenre = async (req, res) => {
    try {
        const genre = req.params.genre;
        const page = parseInt(req.query.page) || 1;
        const movies = await movieService.listMoviesByGenre(genre, page);
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies by genre' });
    }
};
exports.getMoviesByGenre = getMoviesByGenre;
