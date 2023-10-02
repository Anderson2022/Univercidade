import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentsPoint from 'App/Models/StudentsPoint'
import StudentPointsService from 'App/Services/Score/ScoreService'
import StudentPointsIdService from 'App/Services/Score/ScoreServiceId'




export default class ScoreController {

  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('RolesPolicy').authorize('view')
    const role = await StudentsPoint.all()
    response.status(200).json(role)
  }

  public async indexPoints({ response, bouncer }: HttpContextContract) {
   await bouncer.with('RolesPolicy').authorize('view')
    const studentPointsService = new StudentPointsService()
    const result = await studentPointsService.getStudentsPoints()


    result.sort((a, b) => a.totalValue - b.totalValue);
    response.status(200).json(result.sort((a, b) => b.totalValue - a.totalValue))
  }

  public async show({ response, bouncer, params }: HttpContextContract) {
   await bouncer.with('RolesPolicy').authorize('view')
    const studentPointsService = new StudentPointsIdService()
    const result = await studentPointsService.getStudentPointsById(params.id)


    response.status(200).json(result)

  }
}

