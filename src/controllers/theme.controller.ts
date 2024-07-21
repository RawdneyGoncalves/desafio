import { FastifyRequest, FastifyReply } from 'fastify';
import { ThemeService } from '../services/theme.service';
import { ThemeRequest } from 'src/middlewares/interfaces';

export class ThemeController {
  static async create(req: ThemeRequest, reply: FastifyReply) {
    try {
      const themeData: ThemeRequest = req.body as ThemeRequest;
      const theme = await ThemeService.create(themeData);
      reply.status(201).send(theme);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async getAll(req: ThemeRequest, reply: FastifyReply) {
    try {
      const themes = await ThemeService.getAll();
      reply.status(200).send(themes);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async getById(req: ThemeRequest, reply: FastifyReply) {
    try {
      const theme = await ThemeService.getById(req.params.id);
      reply.status(200).send(theme);
    } catch (error) {
      reply.status(404).send({ message: 'Theme not found' });
    }
  }
}
