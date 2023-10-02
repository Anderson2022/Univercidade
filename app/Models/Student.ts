import { DateTime } from 'luxon'
import { BaseModel, beforeFind, column, HasMany, hasMany, ManyToMany, manyToMany, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'
import Benefit from './Benefit'
import Point from './Point'
import { beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import ClassStudent from './ClassStudent'


export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cpf: string

  @column.date()
  public dateOfBirth: DateTime

  @column()
  public phoneCodeID: string

  @column()
  public gradeLevel: string

  @column()
  public jobSituation: string

  @column()
  public gender: string

  @column()
  public age: number

  @column()
  public familyIncome: string

  @column()
  public familyHouseHoldSize: string

  @column()
  public street: string

  @column()
  public number: number

  @column()
  public neighborhood: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public zipCode: string

  @column()
  public phone: string

  @column()
  public nis: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null

  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }
  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof Student>) {
    void query.whereNull('students.deleted_at')
  }

  @manyToMany(() => Class, {
    pivotTable: 'class_students',
    localKey: 'id',
    pivotForeignKey: 'student_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'class_id',
  })
  public classes: ManyToMany<typeof Class>

  @manyToMany(() => Benefit, {
    pivotTable: 'benefit_students',
    localKey: 'id',
    pivotForeignKey: 'student_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'benefit_id',


  }) public benefits: ManyToMany<typeof Benefit>

  @hasMany(() => ClassStudent)
  public status: HasMany<typeof ClassStudent>

  @manyToMany(() => Point, {
    pivotTable: 'students_points',
    localKey: 'id',
    pivotForeignKey: 'student_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'point_id',


  }) public points: ManyToMany<typeof Point>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  length: number
}
