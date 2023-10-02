import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, BelongsTo, belongsTo, column, HasMany, hasMany, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Institution from './Institution'
import Class from './Class'
import Requirement from './Requirement'
import Point from './Point'

export default class Course extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string


  @column()
  public cover: string

  @column()
  public institutionId: number


  @belongsTo(() => Institution)
  public institution: BelongsTo<typeof Institution>

  @hasMany(() => Requirement)
  public requirements: HasMany<typeof Requirement>

  @hasMany(() => Point)
  public points: HasMany<typeof Point>

  @hasMany(() => Class)
  public class: HasMany<typeof Class>

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }
  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof Class>) {
    void query.whereNull('courses.deleted_at')
  }
}
