import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, beforeFetch, beforeFind, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from './Permission'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @manyToMany(() => Permission, {
    pivotTable: 'permission_roles',
  })

  public permissions: ManyToMany<typeof Permission>

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null

  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }

  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof Role>) {
    void query.whereNull('roles.deleted_at')
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
