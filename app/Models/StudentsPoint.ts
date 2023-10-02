import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, ModelQueryBuilderContract, beforeFetch, beforeFind, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Point from './Point'

export default class StudentsPoint extends BaseModel {
 
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @column()
  public value: number

  @column()
  public pointId

  @manyToMany(() => Student)
  public student: ManyToMany<typeof Student>

  @manyToMany(() => Point)
  public points: ManyToMany<typeof Point>

  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }
  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof StudentsPoint>) {
    void query.whereNull('students_points.deleted_at')
  }

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
