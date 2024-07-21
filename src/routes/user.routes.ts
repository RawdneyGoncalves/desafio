import { FastifyInstance } from 'fastify';
import { UserController } from '@controllers/user.controller';

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/register', UserController.register);
    fastify.post('/login', UserController.login);
    fastify.post('/reset-password', UserController.resetPassword);
    fastify.post('/update-password', UserController.updatePassword);
}
