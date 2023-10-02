import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class ClassUpdateValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({

    courseId: schema.number(),
    weekday: schema.string({}),
    time: schema.string({}),
    acronym: schema.string({}),
    period: schema.string({}),
    localite: schema.string({}),
    visible: schema.boolean(),
    startDate: schema.date({ format: 'dd/MM/yyyy' }),
    endDate: schema.date({ format: 'dd/MM/yyyy' }),
    endSubscription: schema.date({ format: 'dd/MM/yyyy HH:mm:ss' }),
    startSubscription: schema.date({ format: 'dd/MM/yyyy HH:mm:ss' }),
    startHours: schema.string({}, [
      rules.minLength(5),
      rules.regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    ]),
    endHours: schema.string({}, [
      rules.minLength(5),
      rules.regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    ]),
    quantity: schema.number(),
  })

  public messages = {
    'courseId.required': 'Por favor, informe o ID do curso.',
    'weekday.required': 'Por favor, informe o dia da semana.',
    'time.required': 'Por favor, informe o horário.',
    'period.required': 'Por favor, informe o período.',
    'localite.required': 'Por favor, informe o local.',
    'startDate.required': 'Por favor, informe a data de início.',
    'endDate.required': 'Por favor, informe a data de término.',
    'quantity.required': 'Por favor, informe a quantidade de vagas.',
    'startDate.regex': "O campo 'startDate' deve estar no formato 'HH:mm'",
  }
}
