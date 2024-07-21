import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.date('releaseDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('movies');
}
