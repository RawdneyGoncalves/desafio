import axios from 'axios';
import { AppDataSource } from '../config/database';
import { Theme } from '../entities/theme.entity';

const themeRepository = AppDataSource.getRepository(Theme);

export class ThemeService {
  static async fetchAndUpdateThemes() {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);
      const themes = response.data.genres.map((genre: any) => themeRepository.create({ id: genre.id, name: genre.name }));
      await themeRepository.save(themes);
      return themes;
    } catch (error) {
      console.error('Error fetching themes:', error);
      throw new Error('Unable to fetch themes');
    }
  }

  static async getAllThemes() {
    return await themeRepository.find();
  }
}
