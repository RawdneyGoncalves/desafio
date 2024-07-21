import { FastifyRequest, FastifyReply } from 'fastify';
import { PackageService } from '@services/package.service';
import { PackageRequest } from 'src/middlewares/interfaces';

export class PackageController {
  static async create(req: PackageRequest, reply: FastifyReply) {
    try {
      const packageData: PackageRequest = req.body as unknown as PackageRequest;

      if (!packageData || !packageData.name || !packageData.themes || !packageData.version) {
        throw new Error('Invalid package data');
      }

      const createdPackage = await PackageService.create(packageData);
      reply.status(201).send(createdPackage);
    } catch (error) {
      reply.status(400).send({ message: error.message });
    }
  }

  static async getAll(req: PackageRequest, reply: FastifyReply) {
    try {
      const packages = await PackageService.getAll();
      reply.status(200).send(packages);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async getById(req: PackageRequest, reply: FastifyReply) {
    try {
      const packageData = await PackageService.getById(req.params.id);
      if (packageData) {
        reply.status(200).send(packageData);
      } else {
        reply.status(404).send({ message: 'Package not found' });
      }
    } catch (error) {
      reply.status(404).send({ message: 'Package not found' });
    }
  }
}
