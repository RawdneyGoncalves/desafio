import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '@services/user.service';

export class UserController {
  static async register(req: FastifyRequest, reply: FastifyReply) {
    try {
      const user = await UserService.register(req.body);
      reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async login(req: FastifyRequest, reply: FastifyReply) {
    try {
      const token = await UserService.login(req.body);
      reply.status(200).send({ token });
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async resetPassword(req: FastifyRequest, reply: FastifyReply) {
    try {
      await UserService.resetPassword(req.body);
      reply.status(200).send({ message: 'Password reset link sent' });
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async updatePassword(req: FastifyRequest, reply: FastifyReply) {
    try {
      await UserService.updatePassword(req.body);
      reply.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }
}
