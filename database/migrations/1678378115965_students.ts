
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).nullable()
      table.string('cpf', 45).nullable()
      table.date('date_of_birth').nullable()
      table.string('email', 190).nullable()
      table.string('phone').nullable()
      table.string('responsible_phone', 45).nullable()
      table.string('marital_status', 45).nullable()
      table.string('grade_level').nullable()
      table.string('job_situation').nullable()
      table.string('family_income', 45).nullable()
      table.string('family_house_hold_size').nullable()
      table.string('gender', 255).nullable()
      table.integer('age').nullable()
      table.string('street', 100).nullable()
      table.integer('number', 45).nullable()
      table.string('complement', 255).nullable()
      table.string('neighborhood', 255).nullable()
      table.string('city', 100).nullable()
      table.string('state', 45).nullable()
      table.string('zip_code').nullable()
      table.string('nis', 100).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.datetime('deleted_at', { useTz: true }).nullable()

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

