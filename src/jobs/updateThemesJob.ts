import { ThemeService } from '@services/theme.service';

export const updateThemesJob = async () => {
  try {
    await ThemeService.fetchAndUpdateThemes();
    console.log('Themes updated successfully');
  } catch (error) {
    console.error('Error updating themes:', error);
  }
};
