import { FastifyInstance } from 'fastify';
import { WatchedController } from '@controllers/watched.controller';

export default async function watchedRoutes(fastify: FastifyInstance) {
    fastify.post('/mark', { preHandler: [fastify.authenticate] }, WatchedController.markWatched);
    fastify.post('/unmark', { preHandler: [fastify.authenticate] }, WatchedController.unmarkWatched);
    fastify.get('/report', { preHandler: [fastify.authenticate] }, WatchedController.getWatchedReport);
}
