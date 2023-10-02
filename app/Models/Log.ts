import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column()
  public type: string

  @column()
  public table: string

  @column()
  public level: string

  @column()
  public msg: any

  @column()
  public oldJson: JSON

  @column()
  public newJson: JSON

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toISO()
    }
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
