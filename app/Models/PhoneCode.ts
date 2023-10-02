import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PhoneCode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public phoneCodes: string

  @column()
  public phone: string

  @column()
  public verified: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
