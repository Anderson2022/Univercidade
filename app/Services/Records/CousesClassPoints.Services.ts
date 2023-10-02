import Class from 'App/Models/Class'
import { DateTime } from 'luxon'

type Classrequest = {
  id: number
  courseId: number
  weekday: string
  time: string
  acronym: string
  period: string
  localite: string
  startDate: DateTime
  endDate: DateTime
  startHours: string
  endHours: string
  quantity: number
  visible: boolean
}
export class UpdateClassPointsService {
  async execute(classPayload: Classrequest): Promise<Class> {

    const searchCriteria = {
    //  id: classPayload.id,
      courseId: classPayload.courseId,
    }
    const savePayload = classPayload
    const classe = await Class.updateOrCreate(searchCriteria, savePayload)
    return classe

  }
}
