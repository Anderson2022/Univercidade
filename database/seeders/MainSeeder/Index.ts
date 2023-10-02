import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'


export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in dev mode and seeder is development
     * only
     */
    if (Seeder.default.developmentOnly && !Application.inDev) {
      return
    }

    await new Seeder.default(this.client).run()
  }
  public async run() {
    await this.runSeeder(await import('../Institution'))
    await this.runSeeder(await import('../Course'))
    await this.runSeeder(await import('../Class'))
    await this.runSeeder(await import('../Permission'))
    await this.runSeeder(await import('../Role'))
    await this.runSeeder(await import('../PermissionRole'))
    await this.runSeeder(await import('../Users'))
    await this.runSeeder(await import('../Requirement'))
    await this.runSeeder(await import('../Point'))

  }
}
