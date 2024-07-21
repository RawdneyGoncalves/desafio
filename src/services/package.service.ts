import db from '@config/database';

export class PackageService {
  static async create(packageData: { name: string; themes: string[]; version: string }) {
    const [packageRecord] = await db('packages').insert(packageData).returning('*');
    return packageRecord;
  }

  static async getAll() {
    return db('packages').select('*');
  }

  static async getById(id: number) {
    return db('packages').where({ id }).first();
  }
}
