import db from '../config/database';

export class ThemeService {
  static fetchAndUpdateThemes() {
    throw new Error('Method not implemented.');
  }
  static async getAllThemes() {
    try {
      const themes = await db('themes').select('*');
      return themes
    } catch (error) {
      console.error('Error fetching themes:', error);
      throw error
    }
  }

  static async create(themeData: { name: string; description: string }) {
    try {
      const [theme] = await db('themes').insert(themeData).returning('*');
      return theme;
    } catch (error) {
      console.error('Error creating theme:', error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const themes = await db('themes').select('*');
      return themes;
    } catch (error) {
      console.error('Error fetching themes:', error);
      throw error;
    }
  }

  static async getById(id: number) {
    try {
      const theme = await db('themes').where({ id }).first();
      return theme;
    } catch (error) {
      console.error(`Error fetching theme with id ${id}:`, error);
      throw error;
    }
  }
}
