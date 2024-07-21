import { Request, Response } from 'express';
import { MovieService } from '@services/movie.service';
import { WatchlistService } from '@services/watchlist.service';

export class MovieController {
  static async getMoviesByTheme(req: Request, res: Response) {
    try {
      const movies = await MovieService.fetchMoviesByTheme(req.body.themeIds);
      res.status(200).json(movies);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  static async addToWatchlist(req: Request & { user: any }, res: Response) {
    try {
      const movie = await WatchlistService.addMovieToWatchlist(req.user.id, req.params.movieId);
      res.status(200).json(movie);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  static async removeFromWatchlist(req: Request & { user: any }, res: Response) {
    try {
      const movie = await WatchlistService.removeMovieFromWatchlist(req.user.id, req.params.movieId);
      res.status(200).json(movie);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  static async getWatchlist(req: Request & { user: any }, res: Response) {
    try {
      const movies = await WatchlistService.getWatchlist(req.user.id);
      res.status(200).json(movies);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
