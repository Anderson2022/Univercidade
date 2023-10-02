import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({

    name: schema.string({}),
    phone: schema.string({}, [rules.minLength(9)]),
    cpf: schema.string({}, [
      rules.minLength(11),
      rules.regex(/^([0-9]){11}$/),
    ]),
    city: schema.string({}),
    state: schema.string({}),
  })

  public messages = {
    'cpf.unique': 'CPF ja consta em nossa base de dados!',
    'cpf.regex': 'Formato do cpf e invalido ',
    'name.required': 'Usuário é obrigatório',
    'name.unique': 'Usuário ja consta em nossa base de dados!',
    'telephone.required': 'Requer um telefone valido',
  }
}
