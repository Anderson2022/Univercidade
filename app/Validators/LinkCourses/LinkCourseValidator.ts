import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LinkCourseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    studentId: schema.number([rules.unique({ table: 'class_students', column: 'student_id' })]),
    classId: schema.number(
      [
        rules.unique({
          table: 'class_students',
          //as informações do  banco tem que ser iguais ao do validator
          column: 'class_id',
          where: { student_id: this.ctx.request.input('studentId')}
        })
      ]
    ),
   })


  public messages: CustomMessages = {
    
  }
}
