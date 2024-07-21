import db from '../config/database'
import { Movie } from '../entities/movie.entity'
import { User } from '../entities/user.entity'

export class WatchlistService {
  static async addMovieToWatchlist(userId: number, movieId: number) {
    try {
      const movie = await db('movies').where({ id: movieId }).first<Movie>();
      if (!movie) throw new Error('Movie not found');
      movie.users = [...movie.users, userId];
      await db('movies').where({ id: movieId }).update(movie);
      return movie;
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
      throw error;
    }
  }

  static async removeMovieFromWatchlist(userId: number, movieId: number) {
    try {
      const movie = await db('movies').where({ id: movieId }).first<Movie>();
      if (!movie) throw new Error('Movie not found');
      movie.users = movie.users.filter(id => id !== userId);
      await db('movies').where({ id: movieId }).update(movie);
      return movie;
    } catch (error) {
      console.error('Error removing movie from watchlist:', error);
      throw error;
    }
  }

  static async getWatchlist(userId: number) {
    try {
      const movies = await db('movies').where('users', 'like', `%${userId}%`);
      return movies;
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      throw error;
    }
  }
}
