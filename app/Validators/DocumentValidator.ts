import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DocumentValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({

    cpf: schema.string({}),
    data_de_nascimento: schema.date({ format:'dd/MM/yyyy'}),
  })


  public messages: CustomMessages = {
    'cpf.required': 'Desculpe, o CPF fornecido é inválido. Por favor, verifique se ele está correto e tente novamente.',
    'data_de_nascimento.required': 'Ops, parece que algo deu errado com a data de nascimento inserida. Certifique-se de que ela esteja no formato DD/MM/AAAA e tente novamente.'
  }
}
