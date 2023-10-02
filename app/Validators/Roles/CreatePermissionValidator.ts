import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePermissionValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({

    name: schema.string({}),
    description: schema.string.optional()
  })


  public messages: CustomMessages = {
    'name.required': 'O nome é obrigatório',
    'name.unique': 'Esta Permissão ja consta em nossa base de dados',
  }
}
