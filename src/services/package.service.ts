import { AppDataSource } from '../config/database';
import { Package } from '../entities/package.entity';

const packageRepository = AppDataSource.getRepository(Package);

export class PackageService {
  static async create(packageData: Partial<Package>) {
    const packageEntity = packageRepository.create(packageData);
    await packageRepository.save(packageEntity);
    return packageEntity;
  }

  static async findAll() {
    return await packageRepository.find({ relations: ['themes'] });
  }

  static async findById(id: number) {
    return await packageRepository.findOne({ where: { id }, relations: ['themes'] });
  }
}
