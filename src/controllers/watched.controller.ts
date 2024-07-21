import { FastifyRequest, FastifyReply } from 'fastify';
import { WatchedService } from '@services/watched.service';
import { AuthenticatedRequest } from 'src/middlewares/interfaces';

export class WatchedController {
    static async markWatched(req: AuthenticatedRequest, reply: FastifyReply) {
        try {
            const watched = await WatchedService.markWatched(req.user, req.body.movieId);
            reply.status(200).send(watched);
        } catch (error) {
            reply.status(400).send({ message: error });
        }
    }

    static async unmarkWatched(req: AuthenticatedRequest, reply: FastifyReply) {
        try {
            const watched = await WatchedService.unmarkWatched(req.user, req.body.movieId);
            reply.status(200).send(watched);
        } catch (error) {
            reply.status(400).send({ message: error });
        }
    }

    static async getWatchedReport(req: AuthenticatedRequest, reply: FastifyReply) {
        try {
            const report = await WatchedService.getWatchedReport(req.user);
            reply.status(200).send(report);
        } catch (error) {
            reply.status(400).send({ message: error });
        }
    }
}
