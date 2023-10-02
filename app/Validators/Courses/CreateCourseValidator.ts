import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCourseValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    institutionId: schema.number(),
    name: schema.string(),
    cover: schema.file({

      extnames: ['jpg', 'gif', 'png'],
    }),

  })

  public messages: CustomMessages = {
    'name.required': 'Por favor, informe o nome do curso a ser cadastrado.',
    'institutionId.required': 'Por favor, informe a Instituição de ensino.',

  }
}

