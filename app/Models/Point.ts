import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Course from './Course'
import Requirement from './Requirement'
import { HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Point extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public value: number

  @column()
  public courseId: number

  @column()
  public requirementId: number

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  @belongsTo(() => Requirement)
  public requirements: BelongsTo<typeof Requirement>

  @hasMany(() => Course)
  public point: HasMany<typeof Course>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
