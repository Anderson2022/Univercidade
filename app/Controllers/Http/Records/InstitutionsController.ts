 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Institution from 'App/Models/Institution';
import Log from 'App/Models/Log';
import CreateInstitutionValidator from 'App/Validators/Institutions/CreateInstitutionValidator';
import UpdateInstitutionValidator from 'App/Validators/Institutions/UpdateInstitutionValidator';



export default class InstitutionsController {


  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('InstitutionPolicy').authorize('view')
    const classes = await Institution.all()
    response.status(200).json(classes)
  }

  public async show({ response, request, bouncer }: HttpContextContract) {
    await bouncer.with('InstitutionPolicy').authorize('view')
    try {
      const id = request.param('id')
      const user = await Institution.findOrFail(id)
      response.status(200).json(user)
    } catch (error) {
      if (error.status === 404) {
        return response.status(404).send({ error: 'Turma não encontrada.' })
      }
      if (error.status === 500) {
        return response.status(500).send({ error: 'Erro interno do servidor.' })
      }
      return response.status(400).send({ error: 'Erro na requisição.' })
    }
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('InstitutionPolicy').authorize('create')
        const payload = await request.validate(CreateInstitutionValidator)
    const institution = await Institution.create({ name: payload.name })
    return response.status(200).json(institution)
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('InstitutionPolicy').authorize('update')
   const updatePayload = await request.validate(UpdateInstitutionValidator)

   const id = request.param('id')

    const institution = await Institution.findOrFail(id)
   institution.merge(updatePayload)
   await institution.save()
   const oldUser = institution
   await Log.create({
     type: "delete",
     table: "institution",
     oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
     newJson: JSON.parse(JSON.stringify(institution.toJSON()))
   })

   return response.status(200).json(institution)

  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('InstitutionPolicy').authorize('delete')
    try {
      const id = request.param('id')
      const classes = await Institution.findOrFail(id)
      await classes.softDelete()
      const oldUser = classes

      await Log.create({
        type: "delete",
        table: "institution",
        oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
        newJson: JSON.parse(JSON.stringify(classes.toJSON()))
      })
      return classes
    } catch (error) {

      return response.status(401).json(error)
    }


  }


}
