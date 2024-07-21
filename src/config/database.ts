import { DataSource } from 'typeorm';
import { User } from '@entities/user.entity';
import { Package } from '@entities/package.entity';
import { Theme } from '@entities/theme.entity';
import { Movie } from '@entities/movie.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  synchronize: true,
  logging: false,
  entities: [User, Package, Theme, Movie],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
