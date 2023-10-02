import { JobContract } from '@ioc:Rocketseat/Bull'
import Benefit from 'App/Models/Benefit'
import Point from 'App/Models/Point'
import Student from 'App/Models/Student'
import StudentsPoint from 'App/Models/StudentsPoint'
import { ListNeighborhoods } from 'App/Services/Users/ListNeighborhoods'

type IstudentScore = {
  name: string;
  cpf: string;
  date_of_birth: string;
  phone: string;
  grade_level: string;
  job_situation: string;
  family_income: string;
  family_house_hold_size: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  zip_code?: string;
  age: number;
  created_at: string;
  updated_at: string;
  id: number;
}

type SavePointValue = {
  points: Point[],
  requirementIds: number[],
  student: Student
}

export default class StudentscoreAll implements JobContract {
  static all() {
    throw new Error('Method not implemented.')
  }
  public key = 'StudentscoreAll'

  public async handle(job) {



    const { data } = job
    const  scores = data as IstudentScore[];
    
    let result;
    for (const element of scores) {
      result = element;
        const student = await Student.findByOrFail('id', result.id);  
   
    const classStudent = await student.related('classes').query().firstOrFail()
    const courseId = classStudent.courseId

    const beneficts = await Benefit.findByOrFail('student_id', student.id)
    const resultBenificts = beneficts != null
    const points = await Point.query().where('courseId', courseId)

    let requirementIds: number[] = [];

    if (student.gender === "Feminino") {
      if (student.age >= 18 && student.age <= 30) {
        requirementIds.push(1);//
      }
      if (student.age >= 31 && student.age <= 45) {
        requirementIds.push(2);//
      }
      if (student.age >= 46 && student.age <= 55) {
        requirementIds.push(3);//
      }
      if (student.age >= 55 ) {
        requirementIds.push(4);//
      }
      if (student.gradeLevel === "Não alfabetizado") {
        requirementIds.push(5);

      }
      if (student.gradeLevel === "Ensino fundamental" || student.gradeLevel === "Ensino médio") {
        requirementIds.push(6);

      }
      if (student.gradeLevel === "Graduação") {
        requirementIds.push(7);

      }
      if (student.familyHouseHoldSize === "Mais de 8 pessoas") {
        requirementIds.push(10);

      }
      if (student.familyHouseHoldSize === "Até 4 pessoas") {
        requirementIds.push(9);

      }
      if (student.familyHouseHoldSize === "Entre 5 e 8 pessoas") {
        requirementIds.push(10);

      }
      if (student.familyIncome === "Até 1 salário mínimo") {
        requirementIds.push(11);

      }
      if (student.familyIncome === "De 1 a 2 salários mínimos") {
        requirementIds.push(12);

      }
      if (student.familyIncome === "Acima de 2 salários mínimos") {
        requirementIds.push(12);

      }

      if (resultBenificts === true) {

        requirementIds.push(29);

      }
      if (resultBenificts === false) {
        requirementIds.push(30);

      }
      if (ListNeighborhoods.includes(student.neighborhood)) {
        requirementIds.push(13);

      } else {
        requirementIds.push(14);
      }
    }

    if (student.gender === "Masculino") {
      if (student.age >= 18 && student.age <= 30) {
        requirementIds.push(15);//
      }
      if (student.age >= 31 && student.age <= 45) {
        requirementIds.push(16);//
      }
      if (student.age >= 46 && student.age <= 55) {
        requirementIds.push(17);//
      }
      if (student.age >= 55) {
        requirementIds.push(18);//
      }
      if (student.gradeLevel === "Não alfabetizado") {
        requirementIds.push(19);
      }
      if (student.gradeLevel === "Ensino fundamental" || student.gradeLevel === "Ensino médio") {
        requirementIds.push(20);

      }
      if (student.gradeLevel === "Graduação") {
        requirementIds.push(21);

      }
      if (student.familyHouseHoldSize === "Mais de 8 pessoas") {
        requirementIds.push(10);

      }
      if (student.familyHouseHoldSize === "Até 4 pessoas") {
        requirementIds.push(9);

      }
      if (student.familyHouseHoldSize === "Entre 5 e 8 pessoas") {
        requirementIds.push(8);

      }
      if (student.familyIncome === "Até 1 salário mínimo") {
        requirementIds.push(11);

      }
      if (student.familyIncome === "De 1 a 2 salários mínimos") {
        requirementIds.push(12);

      }
      if (student.familyIncome === "Acima de 2 salários mínimos") {
        requirementIds.push(12);

      }

      if (resultBenificts === true) {

        requirementIds.push(29);

      }
      if (resultBenificts === false) {
        requirementIds.push(30);

      }
      if (ListNeighborhoods.includes(student.neighborhood)) {
        requirementIds.push(13);

      } else {
        requirementIds.push(1);

      }
    }
       if (student.gender === "Outro") {
      if (student.age >= 18 && student.age <= 30) {
        requirementIds.push(22);//
      }
      if (student.age >= 31 && student.age <= 45) {
        requirementIds.push(23);//
      }
      if (student.age >= 46 && student.age <= 55) {
        requirementIds.push(24);//
      }
      if (student.age >= 55) {
        requirementIds.push(25);//
      }
      if (student.gradeLevel === "Não alfabetizado") {
        requirementIds.push(26);
      }
      if (student.gradeLevel === "Ensino fundamental" || student.gradeLevel === "Ensino médio") {
        requirementIds.push(27);

      }
      if (student.gradeLevel === "Graduação") {
        requirementIds.push(28);

      }
      if (student.familyHouseHoldSize === "Mais de 8 pessoas") {
        requirementIds.push(10);

      }
      if (student.familyHouseHoldSize === "Até 4 pessoas") {
        requirementIds.push(9);

      }
      if (student.familyHouseHoldSize === "Entre 5 e 8 pessoas") {
        requirementIds.push(8);

      }
      if (student.familyIncome === "Até 1 salário mínimo") {
        requirementIds.push(11);

      }
      if (student.familyIncome === "De 1 a 2 salários mínimos") {
        requirementIds.push(12);

      }
      if (student.familyIncome === "Acima de 2 salários mínimos") {
        requirementIds.push(12);

      }

         if (resultBenificts === true) {

           requirementIds.push(29);

         }
         if (resultBenificts === false) {
           requirementIds.push(30);

         }
      if (ListNeighborhoods.includes(student.neighborhood)) {
        requirementIds.push(13);

      } else {
        requirementIds.push(1);

      }
    }
    this.findAndSavePointValue({ student, requirementIds, points })
  }
}
  private async findAndSavePointValue({ points, requirementIds, student }: SavePointValue) {
    const filteredPoints = points.filter(point => requirementIds.includes(point.requirementId));

    if (filteredPoints.length === 0) {
      throw new Error('Nenhum ponto encontrado para os IDs de requisito fornecidos');
    }

    // busca tudo oq tiver do student e deleta se caso for um update
    const isStudentHasPoints = await StudentsPoint.query().where('studentId', student.id)
    if (isStudentHasPoints) {
      for (const studentPoint of isStudentHasPoints) {
        await studentPoint.delete()
      }
    }

    const results = filteredPoints.map(point => ({
      studentId: student.id,
      pointId: point.id,
      value: point.value
    }));

    await StudentsPoint.createMany(results)


    return;

  }
}
