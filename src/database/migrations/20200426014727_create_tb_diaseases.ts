import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('tb_diaseases', (table) => {
    table.uuid('dia_id').primary().notNullable();
    table.string('dia_name').notNullable();
    table.text('dia_description').nullable();
    table.text('dia_history').nullable();
    table.string('dia_current_status').nullable();
    table.string('dia_code').nullable();
    table.string('dia_notes').nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('tb_diaseases');
}
