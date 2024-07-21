import 'module-alias/register';
import express from 'express';
import { createConnection } from 'typeorm';
import userRouter from '@modules/users/user.module';
import packageRouter from '@modules/packages/package.module';
import movieRouter from '@modules/movies/movie.module';
import themeRouter from '@modules/themes/theme.module';

const app = express();
app.use(express.json());

// Setup routes
app.use('/users', userRouter);
app.use('/packages', packageRouter);
app.use('/movies', movieRouter);
app.use('/themes', themeRouter);

// Connect to the database
createConnection().then(() => {
  console.log('Connected to the database');
  app.listen(3000, () => console.log('Server is running on port 3000'));
}).catch((error) => {
  console.error('Database connection error:', error);
});
