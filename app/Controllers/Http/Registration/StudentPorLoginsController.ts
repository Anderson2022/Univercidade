import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bull from '@ioc:Rocketseat/Bull';
import Nis from 'App/Jobs/Nis';
import ClassStudent from 'App/Models/ClassStudent';
import Student from 'App/Models/Student';
import WhatsAppService from 'App/Services/WhatsAppService';
import CreateStudentLoginValidator from 'App/Validators/Student/CreateStudentLoginValidator';
import UpdateStudentLoginValidator from 'App/Validators/Student/UpdateStudentLoginValidator';
import { cpf } from 'cpf-cnpj-validator';
import { DateTime } from 'luxon';

export default class StudentPorLoginsController {

    public async store({ request, response }: HttpContextContract) {
        const result = await request.validate(CreateStudentLoginValidator)
        const dateOfBirth = request.input('dateOfBirth', '') as string;
        const dateFormat = 'dd/MM/yyyy';
    
        const resultDate = DateTime.fromFormat(dateOfBirth, dateFormat);
        const dataAtual = DateTime.now()
        const diff = dataAtual.diff(resultDate, 'years')
        const resultAge = diff.years
        const formattedNumber = resultAge
    
        if (!resultDate.isValid) {
          const validatorCPF = cpf.isValid(result.cpf!)
          if (!validatorCPF) {
            return response.status(422).json({
              errors: [{
                code: 'BAD_REQUEST',
                message: 'Por favor, informe o número do CPF valido',
              }]
            })
          }
        }
    
        const date = {
          ...result,
          age: formattedNumber
        } 

        const student = await Student.create(date)
          
        if (result.phone != null){
          await WhatsAppService.sendVerificationMessage(student);
        }
        
        Bull.add(new Nis().key, student);
        return { id: student.id, ...date };
      }
    
    
    
      public async update({ request, response, bouncer }: HttpContextContract) {
        await bouncer.with('UsersPolicy').authorize('update')
        const { classId, status, ...updatePayload } = await request.validate(UpdateStudentLoginValidator)
        const id = request.param('id')
        const dateOfBirth = request.input('dateOfBirth', '') as string;
        const dateFormat = 'dd/MM/yyyy';
    
        const resultDate = DateTime.fromFormat(dateOfBirth, dateFormat);
        const dataAtual = DateTime.now()
        const diff = dataAtual.diff(resultDate, 'years')
        const resultAge = diff.years
        const formattedNumber = resultAge
    
    
    
        if (!resultDate.isValid) {
          const validatorCPF = cpf.isValid(updatePayload.cpf!)
          if (!validatorCPF) {
            return response.status(422).json({
              errors: [{
                code: 'BAD_REQUEST',
                message: 'Por favor, informe o número do CPF valido',
              }]
            })
          }
        }
    
        const student = await Student.findOrFail(id)
        student.merge({
          ...updatePayload,
          age: formattedNumber,
        })
        await student.save()
        let responses;
    
        if (classId && status) {
          const classStudent = await ClassStudent.findBy('student_id', id)
          if (classStudent) {
            classStudent.merge({ classId, status })
            await classStudent.save()
            responses = classStudent.status;
          } else {
            await ClassStudent.create({ classId, status, studentId: id })
            responses = classStudent
              ;
          }
        }
        const studentJSON = student.toJSON();
        return { responses, student: studentJSON };
      }
    
}
