import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
import PermissionRoles from 'App/Models/PermissionRole'
import CreateRolesPermissionValidator from 'App/Validators/Roles/CreatePermissionRoleValidator'

export default class RolesPermissionsController {

  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('PermissionRolesPolicy').authorize('view')
    const role = await PermissionRoles.all()
    response.status(200).json(role)
  }

  public async show({ response, request, bouncer }: HttpContextContract) {
    await bouncer.with('PermissionRolesPolicy').authorize('view')
    try {
      const id = request.param('id')
      const permissionRole = await PermissionRoles.findOrFail(id)
      response.status(200).json(permissionRole)
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
    await bouncer.with('PermissionRolesPolicy').authorize('create')
    try {
      const rolesPermissionPayload = await request.validate(CreateRolesPermissionValidator)
      const rolesPermission = await PermissionRoles.create({ permissionId: rolesPermissionPayload.permissionId, roleId: rolesPermissionPayload.roleId })
      return response.status(200).json(rolesPermission)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return response.status(400).json({ error: 'A combinação de roleId e permissionId já existe.' })
      }
      return response.status(500).json({ error: 'Erro interno do servidor.' })
    }
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('PermissionRolesPolicy').authorize('view')
    const updatePayload = await request.validate(CreateRolesPermissionValidator)
    const id = request.param('id')

    const permissionRoles = await PermissionRoles.findOrFail(id)
    permissionRoles.merge(updatePayload)
    await permissionRoles.save()
    const oldUser = permissionRoles

    await Log.create({
      type: "update",
      table: "permissionRoles",
      oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
      newJson: JSON.parse(JSON.stringify(permissionRoles.toJSON()))
    })

    return response.status(200).json(permissionRoles)
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('PermissionRolesPolicy').authorize('delete')
    try {
      const id = request.param('id')
      const permissionRoles = await PermissionRoles.findOrFail(id)
      await permissionRoles.softDelete()
      const oldUser = permissionRoles

      await Log.create({
        type: "delete",
        table: "Institution",
        oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
        newJson: JSON.parse(JSON.stringify(permissionRoles.toJSON()))
      })
      return permissionRoles
    } catch (error) {

      return response.status(401).json(error)
    }
  }
}
