import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '@services/user.service';
import { UpdatePasswordData, UserCredentialsRequest } from 'src/middlewares/interfaces';

export class UserController {
  static async register(req: FastifyRequest<{ Body: UserCredentialsRequest }>, reply: FastifyReply) {
    try {
      const user = await UserService.register(req.body);
      reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async login(req: FastifyRequest<{ Body: UserCredentialsRequest }>, reply: FastifyReply) {
    try {
      const token = await UserService.login(req.body);
      reply.status(200).send({ token });
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async resetPassword(req: FastifyRequest<{ Body: UserCredentialsRequest }>, reply: FastifyReply) {
    try {
      await UserService.resetPassword(req.body);
      reply.status(200).send({ message: 'Password reset link sent' });
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }

  static async updatePassword(req: FastifyRequest<{ Body: UpdatePasswordData }>, reply: FastifyReply) {
    try {
      const { token, newPassword } = req.body;

      await UserService.updatePassword(token, newPassword, { token, newPassword });
      reply.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  }
}
