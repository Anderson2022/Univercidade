import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRolesPermissionValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    permissionId: schema.number(),
    roleId: schema.number()
  })


  public messages: CustomMessages = {}
}
