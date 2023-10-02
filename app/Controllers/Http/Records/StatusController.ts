import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClassStudent from 'App/Models/ClassStudent'
import { StatusUpdateService } from 'App/Services/Score/ScoreUpdateService'
import UpdateStatusValidator from 'App/Validators/Status/UpdateStatusValidator'

export default class StatusController {
  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('RolesPolicy').authorize('view')
    const classStudent = await ClassStudent.all()
    response.status(200).json(classStudent)
  }

  public async update({ request, bouncer }: HttpContextContract) {
  await bouncer.with('ClassesPolicy').authorize('view')
    const updatePayload = await request.validate(UpdateStatusValidator)
    const id = request.param('id')
    const userData = {
      ...updatePayload,
      id,
    }

    const statusUpdateService = new StatusUpdateService()
    const update = await statusUpdateService.execute(userData)
    return update
  }


}
