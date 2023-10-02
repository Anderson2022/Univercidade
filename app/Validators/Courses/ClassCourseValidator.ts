import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClassCourseValidator {
  constructor(protected ctx: HttpContextContract) {}
   public schema = schema.create({

     classId: schema.number.optional(),
    courseId: schema.number.optional()
  })

  public messages: CustomMessages = {
    'classId.number': 'O campo classId deve ser um número.',
   'courseId.number': 'O campo coursesId deve ser um número.'
  }
}
