import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Class from 'App/Models/Class'
import { DateTime } from 'luxon'



export default class extends BaseSeeder {
  public async run() {
    const endSubscription = DateTime.utc(2023, 12, 18, 0, 0, 0, 0);
    const startSubscription = DateTime.utc(2023, 5, 18, 0, 0, 0, 0);


    await Class.createMany([
      {
        "courseId": 1,
        "weekday": "Segunda, Quarta e Sexta-feira",
        "time": "20h",
        "acronym": "IDig",
        "period": "Vespertino, 2023",
        "localite": "Senai",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "startHours": "13:00",
        "endHours": "15:00",
        "endSubscription": endSubscription,
        "startSubscription": startSubscription,
        "quantity": 40,
        "visible": true

      },
      {
        "courseId": 2,
        "weekday": "Terça e Quinta-feira",
        "time": "160h",
        "acronym": "SalgArt",
        "period": "Vespertino",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "localite": "Remanso Fraterno ou Senai",
        "startHours": "13:00",
        "endHours": "17:00",
         "endSubscription": endSubscription,
          "startSubscription": startSubscription,
        "quantity": 40,
        "visible": true
      },
      {
        "courseId": 3,
        "weekday": "Segunda, Quarta e Sexta-feira",
        "time": "180h",
        "acronym": "CostInd",
        "period": "Matutino",
        "localite": "Remanso Fraterno ou Senai",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "startHours": "07:00",
        "endHours": "11:00",
         "endSubscription": endSubscription,
                 "startSubscription": startSubscription,
        "quantity": 0,
        "visible": true
      },
      {
        "courseId": 3,
        "weekday": "Quarta e Sexta-feira",
        "time": "180h",
        "acronym": "CostInd",
        "period": "Matutino",
        "localite": "CADEIA MASCULINA",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "startHours": "07:00",
        "endHours": "11:00",
         "endSubscription": endSubscription,
                 "startSubscription": startSubscription,
        "quantity": 0,
        "visible": false
      },
      {
        "courseId": 3,
        "weekday": "Quarta e Sexta-feira",
        "time": "180h",
        "acronym": "CostInd",
        "period": "Matutino",
        "localite": "Cadeia Feminina",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "startHours": "07:00",
        "endHours": "11:00",
         "endSubscription": endSubscription,
                 "startSubscription": startSubscription,
        "quantity": 0,
        "visible": false
      },
      {
        "courseId": 4,
        "weekday": "Segunda, Quarta e Sexta-feira",
        "time": "520h",
        "acronym": "AGAI",
        "period": "Matutino",
        "localite": "Senai",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "startHours": "07:00",
        "endHours": "11:00",
         "endSubscription": endSubscription,
                 "startSubscription": startSubscription,
        "quantity": 40,
        "visible": true
      },
      {
        "courseId": 5,
        "weekday": "Segunda, Quarta e Sexta-feira",
        "time": "16h",
        "acronym": "HamBurg",
        "period": "Matutino",
        "localite": "REMANSO FRATERNO",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "startHours": "07:00",
        "endHours": "11:00",
         "endSubscription": endSubscription,
            "startSubscription": startSubscription,
        "quantity": 40,
        "visible": true
      },
      {
        "courseId": 6,
        "weekday": "Quarta e Sexta-feira",
        "time": "172h",
        "acronym": "BarbMasc",
        "period": "Matutino",
        "localite": "IGREJA NOSSA SENHORA APARECIDA",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "startHours": "07:00",
        "endHours": "11:00",
         "endSubscription": endSubscription,
                 "startSubscription": startSubscription,
        "quantity": 20,
        "visible": true
      },
      {
        "courseId": 7,
        "weekday": "Segunda, Quarta e Sexta-feira",
        "time": "160h",
        "acronym": "ManiPed",
        "period": "Vespertino",
        "localite": "IGREJA NOSSA SENHORA DO CARMO",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "startHours": "13:00",
        "endHours": "17:00",
         "endSubscription": endSubscription,
                 "startSubscription": startSubscription,
        "quantity": 20,
        "visible": true
      },
      {
        "courseId": 8,
        "weekday": "Segunda, Quarta Quinta e Sexta-feira",
        "time": "400h",
        "acronym": "CabelFem",
        "period": "Vespertino",
        "localite": "IGREJA NOSSA SENHORA DO CARMO",
        "startDate": DateTime.now(),
        "endDate": DateTime.now(),
        "startHours": "13:00",
        "endHours": "17:00",
         "endSubscription": endSubscription,
                 "startSubscription": startSubscription,
        "quantity": 20,
        "visible": true
      },
    ])
  }
}
