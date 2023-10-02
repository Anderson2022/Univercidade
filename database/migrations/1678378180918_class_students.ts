import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'class_students'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('status', ['pending', 'canceled', 'confirmed']).notNullable();
      table.integer('student_id').unsigned()
      table.integer('class_id').unsigned()
      table.foreign('student_id').references('id').inTable('students')
      table.foreign('class_id').references('id').inTable('classes')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.datetime('deleted_at', { useTz: true }).nullable()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
