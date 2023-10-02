 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import UserRoles from 'App/Models/UserRole'
import { CreateUserService } from 'App/Services/Users/CreateUsersService'
import { UpdateUserService } from 'App/Services/Users/UpdateUserService'
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator'
import UserValidator from 'App/Validators/Users/UserValidator'

export default class UsersController {
  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('UsersPolicy').authorize('view')
    const form = await User.query().whereNotIn('id', [2, 3])
    response.status(200).json(form)
  }

  public async show({ response, request, bouncer }: HttpContextContract) {
    await bouncer.with('UsersPolicy').authorize('view')
    try {
      const id = request.param('id')
      const user = await User.findOrFail(id)
      response.status(200).json(user)
    } catch (error) {
      if (error.status === 404) {
        return response.status(404).send({ error: 'Usuário não encontrado.' })
      }
      if (error.status === 500) {
        return response.status(500).send({ error: 'Erro interno do servidor.' })
      }
      return response.status(400).send({ error: 'Erro na requisição.' })
    }
  }

  public async store({ request, response, auth, bouncer }: HttpContextContract) {
    await bouncer.with('UsersPolicy').authorize('create')
    await User.findOrFail(auth.user?.id)

    const applicantPayload = await request.validate(UserValidator)
    const userData = {
      ...applicantPayload,
    }
    const createUserService = new CreateUserService()
    const result = await createUserService.execute(userData)


    const role = await Role.findByOrFail('name', 'Admin')
    await UserRoles.create({
      userId: result.id,
      roleId: role.id
    })
    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }
     return response.json(result)
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('UsersPolicy').authorize('update')
    const updatePayload = await request.validate(UpdateUserValidator)
    const id = request.param('id')

    const userData = {
      ...updatePayload,
        id
    }

    const updateUserService = new UpdateUserService()
    const update = await updateUserService.execute(userData)

    const oldUser = update

    await Log.create({
      type: "update",
      table: "Users",
      oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
      newJson: JSON.parse(JSON.stringify(update.toJSON()))
    })
    return response.json(update)

  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('UsersPolicy').authorize('delete')
    try {
      const id = request.param('id')
      const classes = await User.findOrFail(id)
      await classes.softDelete()
      const oldUser = classes

      await Log.create({
        type: "delete",
        table: "candidate",
        oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
        newJson: JSON.parse(JSON.stringify(classes.toJSON()))
      })
      return classes
    } catch (error) {

      return response.status(401).json(error)
    }


  }

}
