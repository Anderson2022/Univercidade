import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatephoneValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
  phone: schema.string({ }, [rules.required(), rules.regex(/^[0-9]{10,11}$/),]),

  })

  public messages: CustomMessages = {
    'phone.required': 'Ops, parece que algo deu errado com o número de telefone fornecido.Verifique se ele atende aos requisitos de formato(10 ou 11 dígitos numéricos) e tente novamente.',
  }
}



