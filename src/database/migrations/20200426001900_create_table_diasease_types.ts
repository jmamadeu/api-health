import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('tb_diasease_types', (table) => {
    table.uuid('dty_id').primary();
    table.string('dty_name').notNullable().unique();
    table.text('description').nullable();
    table.text('notes').nullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('tb_diasease_types');
}
