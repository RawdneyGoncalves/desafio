import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('packages', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.specificType('themes', 'text[]').notNullable();
    table.string('version').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('packages');
}
