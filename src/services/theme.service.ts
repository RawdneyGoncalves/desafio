import db from '../config/database';

export class ThemeService {
  static getAllThemes() {
    throw new Error('Method not implemented.');
  }
  static async create(themeData: { name: string; description: string }) {
    const [theme] = await db('themes').insert(themeData).returning('*');
    return theme;
  }

  static async getAll() {
    return db('themes').select('*');
  }

  static async getById(id: number) {
    return db('themes').where({ id }).first();
  }
}
