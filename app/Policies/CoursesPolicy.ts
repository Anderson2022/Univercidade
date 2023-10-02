import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class CoursesPolicy extends BasePolicy {
  public async before(user: User | null) {
    const userRoot = await User.findOrFail(user?.id)
    const roles = await userRoot.related('roles').query()
    if (roles.find((role) => role.name == 'root')) {
      return true
    }
  }
  public async view(user: User) {
    return await this.hasPermission(user, 'list_courses')
  }
  public async create(user: User) {
    return await this.hasPermission(user, 'create_courses')
  }
  public async update(user: User) {
    return await this.hasPermission(user, 'update_courses')
  }
  public async delete(user: User) {
    return await this.hasPermission(user, 'delete_courses')
  }

  private async hasPermission(user: User, permission: string) {
    const userLoaded = await (user.related('roles')
      .query()
      .preload('permissions'))

    return userLoaded.
      flatMap(
        role => Array.from(new Set(role.permissions.map(
          permission => permission.name
        )))).includes(permission)

  }
}
