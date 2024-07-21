import { FastifyRequest, FastifyReply } from 'fastify';
import { ThemeService } from '../services/theme.service';

export class ThemeController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const theme = await ThemeService.create(req.body);
      reply.status(201).send(theme);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async getAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const themes = await ThemeService.getAll();
      reply.status(200).send(themes);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async getById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const theme = await ThemeService.getById(req.params.id);
      reply.status(200).send(theme);
    } catch (error) {
      reply.status(404).send({ message: 'Theme not found' });
    }
  }
}
