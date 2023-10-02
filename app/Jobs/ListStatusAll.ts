import Database from '@ioc:Adonis/Lucid/Database';
import { JobContract } from '@ioc:Rocketseat/Bull';
import ClassStudent from 'App/Models/ClassStudent';
import Student from 'App/Models/Student';
import WhatsAppConfirmedService from 'App/Services/WhatsAppConfirmedService';

import { DateTime } from 'luxon';

export default class ListStatusAll implements JobContract {
  public key = 'ListStatusAll';

  public async handle() {
    const currentDate = DateTime.now().toFormat('yyyy/MM/dd HH:mm:ss');
    const classes = await Database.from('classes').where('end_subscription', '>=', currentDate)
    const filteredClassIds = classes.map((infos) => infos.id);


    for (const classId of filteredClassIds) {
      const classStudents = await ClassStudent.query().whereIn('class_id', [classId]);
      const correctId = classStudents.map((ind) => ind.studentId)
      const correctStatus = classStudents.map((ind) => ind.status)

      if (correctStatus.includes('pending'))
        await ClassStudent.query().whereIn('student_id', correctId).update({ status: 'confirmed' });

      const corrId = classStudents.map((ind) => ind.id)


      const studenAll = await Student.query().whereIn('id', corrId)  

      studenAll.forEach(async (element) => {
       
      
        await WhatsAppConfirmedService.sendVerificationMessage(element);
      });
      
    }
  }
}
