import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRoleValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({

    description: schema.string.optional(),
    name: schema.string({})
  })

  public messages: CustomMessages = {
    'name.required': 'O nome é obrigatório',
    'name.unique': 'Este Perfil ja consta em nossa base de dados',
  }
}
