import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Institution from 'App/Models/Institution'

export default class extends BaseSeeder {

  public async run() {
    await Institution.createMany([
      {
        "name": "SENAI"
      },
      {
        "name": "SENAC"
      }


    ])
  }
}
