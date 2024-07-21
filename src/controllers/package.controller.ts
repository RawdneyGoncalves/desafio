import { FastifyRequest, FastifyReply } from 'fastify';
import { PackageService } from '@services/package.service';

export class PackageController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const packageData = await PackageService.create(req.body);
      reply.status(201).send(packageData);
    } catch (error) {
      reply.status(400).send({ message: error.message });
    }
  }

  static async getAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const packages = await PackageService.getAll();
      reply.status(200).send(packages);
    } catch (error) {
      reply.status(400).send({ message: error.message });
    }
  }

  static async getById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const packageData = await PackageService.getById(req.params.id);
      reply.status(200).send(packageData);
    } catch (error) {
      reply.status(404).send({ message: 'Package not found' });
    }
  }
}
