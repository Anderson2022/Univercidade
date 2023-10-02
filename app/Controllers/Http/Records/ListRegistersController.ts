import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import StudentPointsService from 'App/Services/Score/ScoreService'
import StudentPointsIdService from 'App/Services/Score/ScoreServiceId'
import ScorepercentageService from 'App/Services/Score/ScorepercentageService'


export default class ListRegistersController {

  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('ClassesPolicy').authorize('view')
    const classes = await Student.query()
      .preload('status')
      .preload('benefits')
      .preload('classes', (query) => {
        query.preload('courses', (query) => {
          query.select('name')
        })
      })
      .orderBy('id', 'asc')
    classes.map((student) => ({ id: student.id, }))

    const studentPointsService = new StudentPointsService();
    const results = await studentPointsService.getStudentsPoints();
    const students = results;
    const scorepercentageService = new ScorepercentageService();
    const scoresByCourse = await scorepercentageService.scorepercentage();

    const courseIdsFromUser = classes[0].classes.map((classItem) => classItem.courses);
    const calculations:any = [];

    for (const courseIdFromUser of courseIdsFromUser) {

      const found = scoresByCourse.find((element) => element.courseId === courseIdFromUser.id);
      if (!found) {
        break;
      }
      const totalCourse = students.gender === 'Feminino' ? found.sumFeminino : found.sumMasculino;

      const studentsWithCalculation = students.map((student) => ({
        ...student,
        totalCourse,
        calculation: (student.totalValue / totalCourse) * 100
      }));

      calculations.push(...studentsWithCalculation, );

    }

    response.status(200).json(classes.map((student) => ({
      id: student.id,
      name: student.name,
      phone: student.phone,
      cpf: student.cpf,
      createdAt: student.createdAt,
      status: student.status.map((status) => status.status),
      benefits: student.benefits.map((benefit) => ({ value: benefit.valueSaque })),
      courses: student.classes.map((dataCourse) => dataCourse.courses.name),
      sigles: student.classes.map((status) => status.acronym),
      score: calculations.find(calc => calc.student_id === student.id),


    })))

  }
  public async show({ response, bouncer, request }: HttpContextContract) {
    await bouncer.with('ClassesPolicy').authorize('view');
    const id = request.param('id');
    const classes = await Student.query()
      .preload('status')
      .where('id', id)
      .preload('benefits')
      .preload('classes', (query) => {
        query.preload('courses');
      })
      .orderBy('id', 'asc');

    const studentPointsIdService = new StudentPointsIdService();
    const results = await studentPointsIdService.getStudentPointsById(id);
    const student = results[0];
    const scorepercentageService = new ScorepercentageService();
    const scoresByCourse = await scorepercentageService.scorepercentage();

    const courseIdsFromUser = classes[0].classes.map((classItem) => classItem.courses);
    const calculations: number[] = [];
    for (const courseIdFromUser of courseIdsFromUser) {
      const found = scoresByCourse.find((element) => element.courseId === courseIdFromUser.id);

      if (!found) break;
      const totalCourse = student.gender === 'Feminino' ? found.sumFeminino : found.sumMasculino;
      const calculation = (student.totalValue / totalCourse) * 100;
      calculations.push(calculation);
    }

    response.status(200).json(
      classes.map((student, index) => ({

        id: student.id,
        name: student.name,
        cpf: student.cpf,
        phone: student.phone,
        createdAt: student.createdAt,
        status: student.status.map((status) => status.status),
        benefits: student.benefits.map((benefit) => ({ value: benefit.valueSaque })),
        courses: student.classes[0].courses.name,
        sigles: student.classes.map((status) => status.acronym),
        result: results.filter((elem) => elem.student_id === student.id),
        score: calculations[index].toFixed(2)

      }))
    );

  }
}
