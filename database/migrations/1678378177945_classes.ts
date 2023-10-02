import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'classes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('weekday', 45).nullable()
      table.string('time', 45).notNullable()
      table.string('acronym', 255).notNullable()
      table.string('period', 45).nullable()
      table.string('localite', 255).nullable()
      table.string('start_hours').notNullable()
      table.string('end_hours').notNullable()
      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').notNullable()
      table.dateTime('start_subscription').nullable()
      table.dateTime('end_subscription').nullable()
      table.boolean('visible').nullable()
      table.integer('quantity').nullable()
      table.integer('course_id').unsigned()
      table.foreign('course_id').references('id').inTable('courses')

      table.timestamp('deleted_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
