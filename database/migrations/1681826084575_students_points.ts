import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students_points'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('point_id').unsigned()
      table.integer('student_id').unsigned()
      table.integer('value').nullable()
      table
        .foreign('student_id')
        .references('id')
        .inTable('students')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      table
        .foreign('point_id')
        .references('id')
        .inTable('points')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
      table.datetime('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
