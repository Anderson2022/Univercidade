import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class DocumentPolicy extends BasePolicy {
  public async before(user: User | null) {
    const userRoot = await User.findOrFail(user?.id)
    const roles = await userRoot.related('roles').query()
    if (roles.find((role) => role.name == 'root')) {
      return true
    }
  }
  public async view(user: User) {
    return await this.hasPermission(user, 'download_document')
  }
  public async viewRoot(user: User) {
    return await this.hasPermission(user, 'dashboard_root')
  }
  public async viewAdmin(user: User) {
    return await this.hasPermission(user, 'dashboard_adm')
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
