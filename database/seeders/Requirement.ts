import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Requirement from 'App/Models/Requirement'

export default class extends BaseSeeder {
  public async run () {
    await Requirement.createMany([
      {
        "name": "Mulheres com idade entre 18 e 30 anos"
      },
      {
        "name": "Mulheres com idade entre 31 e 45 anos"
      },
      {
        "name": "Mulheres com idade entre 46 e 55 anos"
      },
      {
        "name": "Mulheres com idade acima de 55 anos"
      },
      {
        "name": "Mulheres sem alfabetização"
      },
      {
        "name": "Mulheres com ensino fundamental e médio"
      },
      {
        "name": "Mulheres com graduação"
      },
      {
        "name": "Cadastro com 10 pessoas"
      },
      {
        "name": "Cadastro com 4 pessoas"
      },
      {
        "name": "Cadastro com 8 pessoas"
      },
      {
        "name": "Famílias com renda abaixo de 2 salários"
      },
      {
        "name": "Famílias com renda acima de 2 salários"
      },
      {
        "name": "Bairros periféricos"
      },
      {
        "name": "Bairros não periféricos"
      },
      {
        "name": "Homens com idade entre 18 e 30 anos"
      },
      {
        "name": "Homens com idade entre 31 e 45 anos"
      },
      {
        "name": "Homens com idade entre 46 e 55 anos"
      },
      {
        "name": "Homens com idade acima de 55 anos"
      },
      {
        "name": "Homens sem alfabetização"
      },
      {
        "name": "Homens com ensino fundamental e médio"
      },
      {
        "name": "Homens com graduação"
      },
      {
        "name": "Outro com idade entre 18 e 30 anos"
      },
      {
        "name": "Outro com idade entre 31 e 45 anos"
      },
      {
        "name": "Outro com idade entre 46 e 55 anos"
      },
      {
        "name": "Outro com idade acima de 55 anos"
      },
      {
        "name": "Outro sem alfabetização"
      },
      {
        "name": "Outro com ensino fundamental e médio"
      },
      {
        "name": "Outro com graduação"
      },
   {
        "name": "Recebe auxílio"
      },
   {
        "name": "Não recebe auxílio"
      },

    ])
  }
}




