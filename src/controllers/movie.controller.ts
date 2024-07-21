import { FastifyRequest, FastifyReply } from 'fastify';
import { MovieService } from '@services/movie.service';

export class MovieController {
  static async getMovies(req: FastifyRequest, reply: FastifyReply) {
    try {
      const movies = await MovieService.getMovies(req.user, req.query.page, req.query.limit, req.query.genre);
      reply.status(200).send(movies);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }
}
