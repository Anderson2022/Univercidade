import Class from 'App/Models/Class'
import { DateTime } from 'luxon'

type Classrequest = {
  id: number
  courseId: number
  acronym: string
  weekday: string
  time: string
  period: string
  localite: string
  startDate: DateTime
  endDate: DateTime
  startHours: string
  endHours: string
  quantity: number
  endSubscription: DateTime
  startSubscription: DateTime 

}
export class UpdateClassService {
  async execute(classPayload: Classrequest): Promise<Class> {

    const searchCriteria = {
      id: classPayload.id,
    }
    const savePayload = classPayload
    const classe = await Class.updateOrCreate(searchCriteria, savePayload)
    return classe

  }
}
