import { FastifyInstance } from 'fastify';
import { GenreController } from '@controllers/genre.controller';

export default async function genreRoutes(fastify: FastifyInstance) {
    fastify.get('/', GenreController.getAll);
}
