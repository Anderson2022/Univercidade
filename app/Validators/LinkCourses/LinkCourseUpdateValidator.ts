import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LinkCourseUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    studentId: schema.number(),
    classId: schema.number()
    
   })


  public messages: CustomMessages = {

  }
}
