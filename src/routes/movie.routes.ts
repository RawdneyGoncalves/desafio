import { FastifyInstance } from 'fastify';
import { MovieController } from '@controllers/movie.controller';

export default async function movieRoutes(fastify: FastifyInstance) {
    fastify.get('/', { preHandler: [fastify.authenticate] }, MovieController.getMovies);
}
