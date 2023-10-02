import { DateTime } from 'luxon'
import { BaseModel, HasMany, ModelQueryBuilderContract, beforeFetch, beforeFind, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Course from './Course'

export default class Institution extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null

  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }

  @hasMany(() => Course)
  public courses: HasMany<typeof Course>

  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof Institution>) {
    void query.whereNull('institutions.deleted_at')
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
