import { FastifyRequest, FastifyReply } from 'fastify';
import { MovieService } from '@services/movie.service';
import { MovieRequest } from 'src/middlewares/interfaces';

export class MovieController {
  static async getMovies(req: MovieRequest, reply: FastifyReply) {
    try {
      const movies = await MovieService.getMovies(req.user, req.query.page, req.query.limit, req.query.genre);
      reply.status(200).send(movies);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }
}
