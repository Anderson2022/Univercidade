import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateStatusValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    studentId: schema.number([
      rules.exists({ table: 'students', column: 'id' })
    ]),
    classId: schema.number(),
    status: schema.enum(['pending', 'canceled', 'confirmed'])

  })

  public messages: CustomMessages = {
    'studentId.required': 'Por favor, informe o ID do estudante corretamente.',
  }
}
