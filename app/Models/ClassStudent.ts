import { DateTime } from 'luxon'
import { BaseModel, ModelQueryBuilderContract, beforeFetch, beforeFind, column} from '@ioc:Adonis/Lucid/Orm'


export default class ClassStudent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @column()
  public classId: number

  @column()
  public status: string

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null



  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }
  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof ClassStudent>) {
    void query.whereNull('class_students.deleted_at')
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
