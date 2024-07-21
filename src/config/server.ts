import fastify from 'fastify';
import userRoutes from '../routes/user.routes';
import packageRoutes from '../routes/package.routes';
import movieRoutes from '../routes/movie.routes';
import themeRoutes from '../routes/theme.routes';

const app = fastify({ logger: true });

app.register(userRoutes, { prefix: '/users' });
app.register(packageRoutes, { prefix: '/packages' });
app.register(movieRoutes, { prefix: '/movies' });
app.register(themeRoutes, { prefix: '/themes' });

export default app;
