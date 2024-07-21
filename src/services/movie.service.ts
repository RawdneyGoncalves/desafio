import { AppDataSource } from '../config/database';
import { Movie } from '../entities/movie.entity';
import axios from 'axios';

const movieRepository = AppDataSource.getRepository(Movie);

export class MovieService {
  static async fetchMoviesByTheme(themeIds: number[]) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${themeIds.join(',')}`);
      const movies = response.data.results.map((movie: any) => movieRepository.create({
        id: movie.id,
        title: movie.title,
        details: movie,
      }));
      await movieRepository.save(movies);
      return movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Unable to fetch movies');
    }
  }

  static async getMoviesByUserTheme(userId: number) {
    const userPackages = await AppDataSource.getRepository(Package).find({
      relations: ['themes'],
      where: { users: { id: userId } },
    });

    const themeIds = userPackages.flatMap(pkg => pkg.themes.map(theme => theme.id));
    const movies = await movieRepository.find({
      where: { details: { genres: { id: In(themeIds) } } },
    });
    return movies;
  }
}
