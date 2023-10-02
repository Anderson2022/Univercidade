import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import LinkCourseValidator from 'App/Validators/LinkCourses/LinkCourseValidator'
import ClassStudent from 'App/Models/ClassStudent'
import { Status } from 'App/Models/enums'
import Bull from '@ioc:Rocketseat/Bull'
import Job from 'App/Jobs/Studentscore'
import Class from 'App/Models/Class'
import LinkCourseUpdateValidator from 'App/Validators/LinkCourses/LinkCourseUpdateValidator'
import { DateTime } from 'luxon'


export default class RegistrationController {
  public async storeStudent({ request, response }: HttpContextContract) {
    const { studentId, classId } = await request.validate(LinkCourseValidator);
    try {
      // Verifica se há vagas disponíveis
      const classObj = await Class.findOrFail(classId);
      const classDate = classObj.endSubscription.toFormat('yyyy-MM-dd');
      const dataAtual = DateTime.now()
      const resultDate = dataAtual.toFormat('yyyy-MM-dd');
      if (classDate >= resultDate) {
        await ClassStudent.create({
          studentId,
          classId,
          status: Status.PENDING,
        });
        const student = await Student.findByOrFail('id', studentId);
        const classStudent: any = await student.related('classes').query().preload('courses');
        Bull.add(new Job().key, student);
        return (classStudent)

      } else {
        await ClassStudent.create({
          studentId,
          classId,
          status: Status.PENDING,
        });
        const student = await Student.findByOrFail('id', studentId);
        const classStudent: any = await student.related('classes').query().preload('courses');
        Bull.add(new Job().key, student);
        console.log(Bull.add(new Job().key, student));

        return classStudent;
      }

    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }


  public async updateStudent({ request, bouncer }: HttpContextContract) {
    await bouncer.with('ClassesPolicy').authorize('update')
    const { studentId, classId } = await request.validate(LinkCourseUpdateValidator);

    // Verifica se há vagas disponíveis
    const classObj = await Class.findOrFail(classId);


    const classStudentCount = await ClassStudent.query()
      .where('class_id', classId)
      .count('* as total');

    if (classStudentCount[0].$extras.total >= classObj.quantity) {
      throw new Error('Não há vagas disponíveis para este curso');
    }

    const classStudent = await ClassStudent.findByOrFail('studentId', studentId);
    classStudent.merge({ classId: classObj.id, status: Status.PENDING })
    await classStudent.save()
    await classStudent.save()
    const student = await Student.findByOrFail('id', studentId);
    Bull.add(new Job().key, student);

    return { classStudent };
  }


}
