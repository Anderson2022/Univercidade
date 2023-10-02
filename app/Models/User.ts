import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, ModelQueryBuilderContract, beforeFetch, beforeFind, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Permission from './Permission'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cpf: string

  @column()
  public phone: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public password: string

  @column()
  public passwordHash: string

  @manyToMany(() => Permission, {
    pivotTable: 'users_permissions',
  })
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Role, {
    pivotTable: 'user_roles',
  })
  public roles: ManyToMany<typeof Role>

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null

  public async softDelete() {
    this.deletedAt = DateTime.now()
    await this.save()
  }
  @beforeFind()
  @beforeFetch()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof User>) {
    void query.whereNull('users.deleted_at')
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime



}
