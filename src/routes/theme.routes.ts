import { FastifyInstance } from 'fastify';
import { ThemeController } from '../controllers/theme.controller';

export default async function themeRoutes(fastify: FastifyInstance) {
    fastify.post('/', ThemeController.create);
    fastify.get('/', ThemeController.getAll);
    fastify.get('/:id', ThemeController.getById);
}
