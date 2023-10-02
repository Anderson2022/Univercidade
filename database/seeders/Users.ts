import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import UserRoles from 'App/Models/UserRole'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Anderson Barbosa Pereira',
        cpf: '69353050120',
        phone: '65999892800',
        city: 'Cáceres',
        state: 'MT',
      },
      {
        name: 'Danielly',
        cpf: '05268899180',
        phone: '65996231392',
        city: 'Cuiabá',
        state: 'MT',
      },
      {
        name: 'AMANDA GONÇALVES BEZERRA',
        cpf: '06122564133',
        phone: '12996557609',
        city: 'Cáceres',
        state: 'MT',
      },
      {
        name: 'LELIANE BARROS DA SILVA',
        cpf: '01119255171',
        phone: '65999862191',
        city: 'Cáceres',
        state: 'MT',
      },
        {
        name: 'Emanuel Boaventura',
        cpf: '07668388117',
        phone: '65992253073',
        city: 'Cuiabá',
        state: 'MT',
      },
      {
        name: 'Anderson dos Santos Caparróz',
        cpf: '97570362187',
        phone: '65996318182',
        city: 'Cuiabá',
        state: 'MT',
      }
    ])
    await UserRoles.createMany([
      {
        "roleId": 2,
        "userId": 1,
      },
      {
        "roleId": 1,
        "userId": 2,
      },
      {
        "roleId": 2,
        "userId": 3,
      },
      {
        "roleId": 2,
        "userId": 4,
      },
      {
        "roleId": 1,
        "userId": 5,
      },
      {
        "roleId": 1,
        "userId": 6,
      },

    ])
  }
}
