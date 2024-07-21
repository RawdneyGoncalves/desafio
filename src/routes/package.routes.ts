import { FastifyInstance } from 'fastify';
import { PackageController } from '@controllers/package.controller';

export default async function packageRoutes(fastify: FastifyInstance) {
    fastify.post('/', PackageController.create);
    fastify.get('/', PackageController.getAll);
    fastify.get('/:id', PackageController.getById);
}
