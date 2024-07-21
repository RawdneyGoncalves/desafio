import { Router } from 'express';
import { MovieController } from '../controllers/movie.controller';

const router = Router();

router.post('/fetch', MovieController.getMoviesByTheme);
router.post('/watchlist/:movieId', MovieController.addToWatchlist);
router.delete('/watchlist/:movieId', MovieController.removeFromWatchlist);
router.get('/watchlist', MovieController.getWatchlist);

export default router;
