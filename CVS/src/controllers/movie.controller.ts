import { Request, Response } from 'express';
import * as movieService from '../services/movie.service';

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const movies = await movieService.listMovies(page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

export const getMovieDetails = async (req: Request, res: Response) => {
  try {
    const movieId = parseInt(req.params.id);
    const movie = await movieService.getMovieDetails(movieId);
    res.json(movie);
  } catch (error) {
    res.status(404).json({ error: 'Movie not found' });
  }
};

export const getMoviesByYear = async (req: Request, res: Response) => {
  try {
    const year = req.params.year;
    const page = parseInt(req.query.page as string) || 1;
    const sort = (req.query.sort as string) || 'asc';
    const movies = await movieService.listMoviesByYear(year, page, sort);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies by year' });
  }
};

export const getMoviesByGenre = async (req: Request, res: Response) => {
  try {
    const genre = req.params.genre;
    const page = parseInt(req.query.page as string) || 1;
    const movies = await movieService.listMoviesByGenre(genre, page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies by genre' });
  }
};
