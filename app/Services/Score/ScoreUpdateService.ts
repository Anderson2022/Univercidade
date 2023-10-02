
import ClassStudent from 'App/Models/ClassStudent'

type Classrequest = {
  id: number
  classId: number,
  studentId: number,
  status: string
}
export class StatusUpdateService {
  async execute(classPayload: Classrequest): Promise<ClassStudent> {

    const searchCriteria = {
      id: classPayload.id,
    }
    const savePayload = classPayload
    const classe = await ClassStudent.updateOrCreate(searchCriteria, savePayload)
    return classe

  }
}
