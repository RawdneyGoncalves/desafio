
import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root123',
            database: 'sys',
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

export default config;
