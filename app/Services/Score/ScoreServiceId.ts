import Database from '@ioc:Adonis/Lucid/Database'


export default class StudentPointsIdService {
  public async getStudentPointsById(id: number) {

    const studentsPoints = await Database.query()
      .select('students_points.student_id', 'points.requirement_id',
      Database.raw('sum(students_points.value) as points'))
      .from('students_points')
      .where('student_id', id)
      .leftJoin('points', 'points.id', 'students_points.point_id')
      .groupBy('students_points.student_id', 'points.requirement_id')
      .leftJoin('students', 'students.id', 'students_points.student_id')
      .select('students.name', 'students.gender')

    const result = studentsPoints.reduce((access, select) => {
      const { student_id, requirement_id, points, name, gender } = select
      const studentIndex = access.findIndex(s => s.student_id === student_id)

      if (studentIndex === -1) {
        access.push({
          student_id,
          name,
          gender,
          requirements: [{ requirement_id, points }]
        })
      } else {
        access[studentIndex].requirements.push({ requirement_id, points })
      }
      return access
    }, [])
    const result2 = result.map(elem => {
      const reduce = elem.requirements.reduce((access, select) => {
        access = parseInt(select.points) + access
        return access
      }, 0)
      elem.totalValue = reduce
      return elem
    })
return result2
  }

}
