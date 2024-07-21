import { AppDataSource } from '../config/database';
import { Movie } from '../entities/movie.entity';
import { User } from '../entities/user.entity';

const watchlistRepository = AppDataSource.getRepository(Movie);

export class WatchlistService {
  static async addMovieToWatchlist(userId: number, movieId: number) {
    const movie = await watchlistRepository.findOne({ where: { id: movieId } });
    if (!movie) throw new Error('Movie not found');
    movie.users = [...movie.users, userId];
    await watchlistRepository.save(movie);
    return movie;
  }

  static async removeMovieFromWatchlist(userId: number, movieId: number) {
    const movie = await watchlistRepository.findOne({ where: { id: movieId } });
    if (!movie) throw new Error('Movie not found');
    movie.users = movie.users.filter(id => id !== userId);
    await watchlistRepository.save(movie);
    return movie;
  }

  static async getWatchlist(userId: number) {
    const movies = await watchlistRepository.find({ where: { users: userId } });
    return movies;
  }
}
