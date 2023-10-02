import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
import Role from 'App/Models/Role'
import CreateRoleValidator from 'App/Validators/Roles/CreateRoleValidator'


export default class RolesController {
  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('RolesPolicy').authorize('view')
    const role = await Role.all()
    response.status(200).json(role)
  }

  public async show({ response, request, bouncer }: HttpContextContract) {
    await bouncer.with('RolesPolicy').authorize('view')
    try {
      const id = request.param('id')
      const role = await Role.findOrFail(id)
      response.status(200).json(role)
    } catch (error) {
      if (error.status === 404) {
        return response.status(404).send({ error: 'Perfil não encontrado.' })
      }
      if (error.status === 500) {
        return response.status(500).send({ error: 'Erro interno do servidor.' })
      }
      return response.status(400).send({ error: 'Erro na requisição.' })
    }
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolesPolicy').authorize('create')
    const payload = await request.validate(CreateRoleValidator)
    const role = await Role.create({ name: payload.name })
    return response.status(200).json(role)
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolesPolicy').authorize('update')
    const updatePayload = await request.validate(CreateRoleValidator)
    const id = request.param('id')

    const role = await Role.findOrFail(id)
    role.merge(updatePayload)
    await role.save()
    const oldUser = role

    await Log.create({
      type: "update",
      table: "Institution",
      oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
      newJson: JSON.parse(JSON.stringify(role.toJSON()))
    })

    return response.status(200).json(role)
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolesPolicy').authorize('delete')
    try {
      const id = request.param('id')
      const role = await Role.findOrFail(id)
      await role.softDelete()
      const oldUser = role

      await Log.create({
        type: "delete",
        table: "Institution",
        oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
        newJson: JSON.parse(JSON.stringify(role.toJSON()))
      })
      return role
    } catch (error) {

      return response.status(401).json(error)
    }


  }



}
