import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateRequirementValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    id: schema.number(),
    courseId: schema.number(),
    weekday: schema.string({}),
    time: schema.string({}),
    acronym: schema.string({}),
    period: schema.string({}),
    localite: schema.string({}),
    visible: schema.boolean(),
    startDate: schema.date({ format: 'dd/MM/yyyy' }),
    endDate: schema.date({ format: 'dd/MM/yyyy' }),
    startHours: schema.string({}, [
      rules.minLength(5),
      rules.regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    ]),
    endHours: schema.string({}, [
      rules.minLength(5),
      rules.regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    ]),
    endSubscription: schema.date({ format: 'dd/MM/yyyy HH:mm:ss' }),
    startSubscription: schema.date({ format: 'dd/MM/yyyy HH:mm:ss' }),
    quantity: schema.number(),
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
