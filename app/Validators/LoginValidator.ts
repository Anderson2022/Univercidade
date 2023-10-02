import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({}),
    params: schema.object().members({
      phone: schema.string({ escape: true, trim: true }, [
        rules.minLength(4),
        rules.maxLength(11),
        rules.exists({
          table: 'users',
          column: 'phone'
        })
      ])
    })
  })

  public messages = {
    'password.required': 'Senha é obrigatória',
    'password.minLength': 'Senha deve ter no mínimo 6 caracteres',
    'password.maxLength': 'Senha deve ter no máximo 18 caracteres',
    'password.access': 'Senha invalida para esse usuário'
  };
}
