import express from 'express';
import * as movieController from '../controllers/movie.controller';

const router = express.Router();

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieDetails);
router.get('/year/:year', movieController.getMoviesByYear);
router.get('/genre/:genre', movieController.getMoviesByGenre);

export default router;
