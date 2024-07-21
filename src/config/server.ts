import 'module-alias/register';
import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import AppDataSource from './config/database';
import userRouter from '@modules/users/user.module';
import packageRouter from '@modules/packages/package.module';
import movieRouter from '@modules/movies/movie.module';
import themeRouter from '@modules/themes/theme.module';

config();

const app = express();
app.use(express.json());

// Setup routes
app.use('/users', userRouter);
app.use('/packages', packageRouter);
app.use('/movies', movieRouter);
app.use('/themes', themeRouter);

// Connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
