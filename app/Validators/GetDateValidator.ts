import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetDateValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    date: schema.string({}, [
      rules.regex(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0]?[1-9]|[1][0-2])[-]([0-9]{4}|[0-9]{2})$/)
    ])
  })

  public messages: CustomMessages = {
    'cpf.required': 'Desculpe, o CPF fornecido é inválido. Por favor, verifique se ele está correto e tente novamente.',
  }
}
