import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, belongsTo, BelongsTo, column, ManyToMany, manyToMany, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Course from './Course'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public weekday: string

  @column()
  public time: string

  @column()
  public acronym: string

  @column()
  public period: string

  @column()
  public localite: string

  @column()
  public quantity: number

  @column.dateTime()
  public startSubscription: DateTime

  @column.dateTime()
  public endSubscription: DateTime

  @column()
  public startHours: string

  @column()
  public endHours: string

  @column.date()
  public startDate: DateTime

  @column.date()
  public endDate: DateTime


  @column()
  public visible: boolean

  @column()
  public courseId: number

  @manyToMany(() => Student, {
    pivotTable: 'class_students',
    localKey: 'id',
    pivotForeignKey: 'class_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'student_id',
  })
  public students: ManyToMany<typeof Student>

  @belongsTo(() => Course)
  public courses: BelongsTo<typeof Course>

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null

  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }

  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof Class>) {
    void query.whereNull('classes.deleted_at')
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
