
import Student from "App/Models/Student";
import Point from "App/Models/Point";
import Course from "App/Models/Course";




export default class ScorepercentageService {

  //  const class = await Class.findByOrFail('id', id)
  public async scorepercentage() {
    await Student.all();
    const coursesIds = (await Course.all()).map(course => course.id);

    const requerimentosMasculineIds = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const requerimentosFemineIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const scoresByCourse: { courseId: number; scoresM: number[]; sumMasculino: number; scoresF: number[]; sumFeminino: number }[] = [];

    for (const courseId of coursesIds) {
      const requerimentosM = await Point.query()
        .where('course_id', courseId)
        .whereIn('requirementId', requerimentosMasculineIds)
        .orderBy('requirementId', 'asc')

      const requerimentosF = await Point.query()
        .where('course_id', courseId)
        .whereIn('requirementId', requerimentosFemineIds)
        .orderBy('requirementId', 'asc')

      const scoresMascArray = requerimentosM.map(item => item.value);
      const sumMasculino = scoresMascArray.reduce((acc, value) => acc + value, 0);

      const scoresFemArray = requerimentosF.map(item => item.value);
      const sumFeminino = scoresFemArray.reduce((acc, value) => acc + value, 0);

      scoresByCourse.push({
        courseId,
        sumMasculino,
        scoresM: [],
        sumFeminino,
        scoresF: [],
      });
    }
    return scoresByCourse;
  }
}
