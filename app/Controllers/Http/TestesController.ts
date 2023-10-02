import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import ClassStudent from 'App/Models/ClassStudent';
import Student from 'App/Models/Student';
import { DateTime } from 'luxon';

export default class TestesController {


    public async show({ response, bouncer }: HttpContextContract) {  
    const currentDate = DateTime.now().toFormat('yyyy/MM/dd HH:mm:ss');
    const classes = await Database.from('classes').where('end_subscription', '>=', currentDate)
    const filteredClassIds = classes.map((infos) => infos.id);
    const classQuantity = classes.map((infos) => infos.quantity);
      for (const classId of filteredClassIds) {
        const values = await Database.from('class_students').where('class_id', classId).count('* as total');
        const count = values[0].total;
        console.log(`class_id ${classId}: ${count}`);
      }

      
      if (classQuantity )

    for (const classId of filteredClassIds) {
      const classStudents = await ClassStudent.query().whereIn('class_id', [classId]);
      const correctId = classStudents.map((ind) => ind.studentId)
    const counts = correctId.length
    const correctStatus = classStudents.map((ind) => ind.status)

      
      

      if (correctStatus.includes('pending'))
        await ClassStudent.query().whereIn('student_id', correctId).update({ status: 'confirmed' });

      const corrId = classStudents.map((ind) => ind.id)


      const studenAll = await Student.query().whereIn('id', corrId)  

      studenAll.forEach(async (element) => {
       
      return studenAll
       // await WhatsAppConfirmedService.sendVerificationMessage(element);
      });
      
    }
  }
}
