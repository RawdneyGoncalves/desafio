import axios from 'axios';
import mongoose from 'mongoose';
import { UserService } from '@services/user.service';

const MovieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  genre_ids: [Number],
  release_date: String,
}, { timestamps: true });

const Movie = mongoose.model('Movie', MovieSchema);

export class MovieService {
  static getMovieById(movieId: number) {
    throw new Error('Method not implemented.');
  }
  static fetchMoviesByTheme(themeIds: any) {
    throw new Error('Method not implemented.');
  }
  static async getMovies(user: any, page: number = 1, limit: number = 10, genre: number | null = null) {
    const userPackages = await UserService.getUserPackages(user.id);
    const allowedGenres: number[] = userPackages.reduce((themes: number[], pkg: any) => {
      return themes.concat(pkg.themes);
    }, []);

    let query: { genre_ids: { $in: any; } } = { genre_ids: { $in: allowedGenres } };

    if (genre) {
      query = { ...query, genre_ids: { $in: [genre] } };
    }

    return Movie.find(query).skip((page - 1) * limit).limit(limit);
  }

  static async updateMovies() {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });
    const movies = response.data.results;
    await Movie.deleteMany({});
    await Movie.insertMany(movies);
  }
}
