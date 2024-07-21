import { MovieService } from '@services/movie.service';
import { ThemeService } from '@services/theme.service';

export const updateMoviesJob = async () => {
  try {
    const themes = await ThemeService.getAllThemes();
    const themeIds = themes.map(theme => theme.id);
    await MovieService.fetchMoviesByTheme(themeIds);
    console.log('Movies updated successfully');
  } catch (error) {
    console.error('Error updating movies:', error);
  }
};
