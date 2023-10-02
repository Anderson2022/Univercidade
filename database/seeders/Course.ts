import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Course from 'App/Models/Course'

export default class extends BaseSeeder {
  public async run() {
    await Course.createMany([
      {
        "name": "Inclusão Digital",
        "institutionId": 1,
        "cover": "/uploads/inclusao-digital.jpeg"
      },
      {
        "name": "Salgadeira",
        "institutionId": 1,
        "cover": "/uploads/salgadeira.jpeg"
      },
      {
        "name": "Costureira Industrial",
        "institutionId": 1,
        "cover": "/uploads/costureira-industrial.jpeg"
      },
      {
        "name": "Assistente de Gestão Administrativa com Informática",
        "institutionId": 1,
        "cover": "/uploads/administrativo.jpg"
      },
      {
        "name": "Hamburgueria",
        "institutionId": 2,
        "cover": "/uploads/hamburgueira.jpeg"
      },
      {
        "name": "Barbeiro",
        "institutionId": 2,
        "cover": "/uploads/barbeiro.jpeg"
      },
      {
        "name": "Manicure e pedicure",
        "institutionId": 2,
        "cover": "/uploads/manicure.jpg"
      },
      {
        "name": "Cabeleireiro",
        "institutionId": 2,
        "cover": "/uploads/cabeleireira.jpg"
      },
    ])
  }
}
