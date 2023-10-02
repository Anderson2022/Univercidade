import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRequirementValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({

    courseId: schema.number(),
    requirementId: schema.array().members(schema.number()),
    value: schema.array().members(schema.number())
  })

  public messages: CustomMessages = {
    'courseId.number': 'A propriedade courseId deve ser um número',
    'requirementId.array': 'A propriedade requirementId deve ser um array',
    'requirementId.*.number': 'Os valores de requirementId devem ser números',
    'value.array': 'A propriedade value deve ser um array',
    'value.*.number': 'Os valores de value devem ser números',
  }
}
