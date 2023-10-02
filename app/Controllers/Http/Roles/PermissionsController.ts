import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
import Permission from 'App/Models/Permission'
import CreatePermissionValidator from 'App/Validators/Roles/CreatePermissionValidator'

export default class PermissionsController {
  public async index({ response }: HttpContextContract) {
    const permission = await Permission.all()
    response.status(200).json(permission)
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const id = request.param('id')
      const permission = await Permission.findOrFail(id)
      response.status(200).json(permission)
    } catch (error) {
      if (error.status === 404) {
        return response.status(404).send({ error: 'Permissão não encontrado.' })
      }
      if (error.status === 500) {
        return response.status(500).send({ error: 'Erro interno do servidor.' })
      }
      return response.status(400).send({ error: 'Erro na requisição.' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const permissionPayload = await request.validate(CreatePermissionValidator)
    const permission = await Permission.create({ name: permissionPayload.name, description: permissionPayload.description})
        return response.status(200).json(permission)
  }

  public async update({ request, response }: HttpContextContract) {
    const updatePayload = await request.validate(CreatePermissionValidator)
    const id = request.param('id')

    const permission = await Permission.findOrFail(id)
    permission.merge(updatePayload)
    await permission.save()
    const oldUser = permission

    await Log.create({
      type: "delete",
      table: "Institution",
      oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
      newJson: JSON.parse(JSON.stringify(permission.toJSON()))
    })

    return response.status(200).json(permission)
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const id = request.param('id')
      const permission = await Permission.findOrFail(id)
      return permission
    } catch (error) {
      if (error.status === 404) {
        return response.status(404).send({ error: 'Permissão não encontrado.' })
      }
      if (error.status === 500) {
        return response.status(500).send({ error: 'Erro interno do servidor.' })
      }
      return response.status(400).send({ error: 'Erro na requisição.' })
    }
    }
}
