import { FastifyRequest, FastifyReply } from 'fastify';
import { GenreService } from '@services/genre.service';

export class GenreController {
    static async getAll(req: FastifyRequest, reply: FastifyReply) {
        try {
            const genres = await GenreService.getAll(req.query.page, req.query.limit);
            reply.status(200).send(genres);
        } catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }
}
