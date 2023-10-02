import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateInstitutionValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    name: schema.string({}, [rules.unique({ table: 'institutions', column: 'name' })]),
  })
  public messages: CustomMessages = {
    'name.required': 'O nome é obrigatório',
    'name.unique': 'Esta instituição ja consta em nossa base de dados',
  }
}
