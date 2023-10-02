import Database from "@ioc:Adonis/Lucid/Database";



export default class PercentageService {
  async calculatePercentage(courseId, gender, points, scoresByCourse) {
    const course = scoresByCourse.find(item => item.courseId === courseId);
    if (!course) {
      return null; // Curso não encontrado
    }

    let maxPointsColumn;
    if (gender === 'Masculino') {
      maxPointsColumn = 'sumMasculino'; // Coluna do ponto máximo para o gênero masculino
    } else if (gender === 'Feminino') {
      maxPointsColumn = 'sumFeminino'; // Coluna do ponto máximo para o gênero feminino
    } else {
      return null; // Gênero inválido
    }

    const query = Database.from('scoresByCourse')
      .where('courseId', courseId)
      .select(maxPointsColumn)
      .first();

    const { [maxPointsColumn]: maxPoints } = await query;

    if (!maxPoints) {
      return null; // Ponto máximo não encontrado
    }

    const percentage = (points / maxPoints) * 100;
    return percentage.toFixed(2); // Retorne a porcentagem com 2 casas decimais
  }
}
