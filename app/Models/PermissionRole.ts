import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, column, ManyToMany, manyToMany, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Permission from './Permission'

export default class PermissionRoles extends BaseModel {
  @column({ isPrimary: true })
  @column()
  public roleId: number

  @column()
  public permissionId: number

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  public id: number


  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }
  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof PermissionRoles>) {
    void query.whereNull('permissionRoles.deleted_at')
  }

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
