import fastify from 'fastify';
import userRoutes from '@routes/user.routes';
import packageRoutes from '@routes/package.routes';
import genreRoutes from '@routes/genre.routes';
import movieRoutes from '@routes/movie.routes';
import watchedRoutes from '@routes/watched.routes';
import { GenreScheduler } from '@schedulers/genre.scheduler';
import '@config/mongoose';
import db from '@config/database';

const app = fastify();

app.register(require('fastify-jwt'), {
  secret: process.env.JWT_SECRET,
});

app.decorate('authenticate', function () {
  return async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  };
});

app.register(userRoutes, { prefix: '/api/users' });
app.register(packageRoutes, { prefix: '/api/packages' });
app.register(genreRoutes, { prefix: '/api/genres' });
app.register(movieRoutes, { prefix: '/api/movies' });
app.register(watchedRoutes, { prefix: '/api/watched' });

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  GenreScheduler.start();
});
