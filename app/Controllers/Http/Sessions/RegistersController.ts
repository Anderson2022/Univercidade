import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import { cpf } from 'cpf-cnpj-validator'
import { DateTime } from 'luxon'
import axios from 'axios'
import DocumentValidator from 'App/Validators/DocumentValidator'
import Env from '@ioc:Adonis/Core/Env'
import WhatsAppService from 'App/Services/WhatsAppService'
import ClassStudent from 'App/Models/ClassStudent'
import { Status } from 'App/Models/enums'
import UpdateStudentValidator from 'App/Validators/Student/UpdateStudentValidator'
import CreateStudentValidator from 'App/Validators/Student/CreateStudentValidator'
import Log from 'App/Models/Log'
import Nis from 'App/Jobs/Nis'
import Bull from '@ioc:Rocketseat/Bull'



export default class RegistersController {

  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('UsersPolicy').authorize('view')
    const students = await Student.query()
      .preload('status')
      .preload('benefits')
      .preload('classes', (query) => {
        query.preload('courses', (query) => {
          query.preload('institution')
        })
      })
      .orderBy('id', 'asc')
    response.status(200).json(students)
  }

  public async show({ response, request }: HttpContextContract) {
    const id = request.param('id')
    const students = await Student.query(id)
      .where('id', id)
      .preload('status')
      .preload('benefits')
      .preload('classes', (query) => {
        query.preload('courses', (query) => {
          query.preload('institution')
        })
      })
      .orderBy('id', 'asc')
    response.status(200).json(students)
  }

  public async document({ response, request }: HttpContextContract) {
    try {
      const result = await request.validate(DocumentValidator)
      const requestData = {
        cpf: result.cpf,
        data_de_nascimento: result.data_de_nascimento.toFormat('yyyy-MM-dd')
      }

      const existsInDb = await Student.query()
        .select('*')
        .where('cpf', result.cpf)
        .first()

      if (existsInDb) {

        return response.status(400).send('Este CPF já está registrado em nosso sistema.')
      } else {

        const baseURL = Env.get('API_CPF_URL')
        const baseToken = Env.get('API_KEY')
        const { data } = await axios.get(`${baseURL}?token=${baseToken}&timeout=600&cpf=${requestData.cpf}&birthdate=${requestData.data_de_nascimento}`);

        const cpfInfo = data.data[0];
        const dataRetornada = cpfInfo.data_nascimento;
        const cpfRetornado = cpfInfo.cpf;
        const nameRetornado = cpfInfo.nome;

        const dataNascimento = DateTime.fromFormat(dataRetornada, 'dd/MM/yyyy')
        const hoje = DateTime.now()
        let idade = hoje.year - dataNascimento.year;
        const mes = (hoje.month) - (dataNascimento.month);
        if (mes < 0 || (mes === 0 && hoje.day < dataNascimento.day)) {
          idade--;
        }
        if (idade < 18) {
          return response.status(400).send('Desculpe, este serviço é apenas para maiores de idade.');
        }

        return response.status(200).json({ cpf: cpfRetornado, data_nascimento: dataRetornada, nome: nameRetornado });
      }
    } catch (error) {
      console.log(error);

      return response.status(409).json({
        error: {
          message: 'Por favor, verifique se o CPF ou a data de nascimento  estão corretos'
        }
      })

    }

  }

  public async cep({ params, response }: HttpContextContract) {
    const cep = params.ceps;
    try {
      const baseURL = Env.get('API_CEP_URL')
      const baseToken = Env.get('API_KEY')
      const { data } = await axios.get(`${baseURL}?token=${baseToken}&timeout=600&&cep=${cep}`);


      if (data.status === "error") {
        return response.status(404).json({ message: "Parece que o CEP que você digitou não foi encontrado.Que tal verificar se digitou corretamente?" });
      }
      if (data.data[0].cidade === 'Cáceres') {
        const cepRetornado = data.data[0].cep
        const logradouroRetornada = data.data[0].logradouro
        const bairroRetornada = data.data[0].bairro
        const localidadeRetornada = data.data[0].cidade
        const ufRetornada = data.data[0].uf

        return response.status(200).json({ cep: cepRetornado, logradouro: logradouroRetornada, bairro: bairroRetornada, localidade: localidadeRetornada, uf: ufRetornada });
      } else {
        return response.status(500).send("Desculpe, mas o CEP informado não corresponde à cidade de Cáceres.");
      }



    } catch (error) {
      return response.status(500).send("Eita! Ocorreu um erro na busca pelo CEP.");
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const result = await request.validate(CreateStudentValidator)
    const dateOfBirth = request.input('dateOfBirth', '') as string;
    const dateFormat = 'dd/MM/yyyy';

    const resultDate = DateTime.fromFormat(dateOfBirth, dateFormat);
    const dataAtual = DateTime.now()
    const diff = dataAtual.diff(resultDate, 'years')
    const resultAge = diff.years
    const formattedNumber = resultAge

    if (!resultDate.isValid) {
      const validatorCPF = cpf.isValid(result.cpf)
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
    await WhatsAppService.sendVerificationMessage(student);
    Bull.add(new Nis().key, student);
    return { id: student.id, ...date };
  }



  public async update({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('UsersPolicy').authorize('update')
    const { classId, status, ...updatePayload } = await request.validate(UpdateStudentValidator)
    const id = request.param('id')
    const dateOfBirth = request.input('dateOfBirth', '') as string;
    const dateFormat = 'dd/MM/yyyy';

    const resultDate = DateTime.fromFormat(dateOfBirth, dateFormat);
    const dataAtual = DateTime.now()
    const diff = dataAtual.diff(resultDate, 'years')
    const resultAge = diff.years
    const formattedNumber = resultAge



    if (!resultDate.isValid) {
      const validatorCPF = cpf.isValid(updatePayload.cpf)
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

    Bull.add(new Nis().key, student);
    return { responses, student: studentJSON };
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('UsersPolicy').authorize('delete')
    try {
      const id = request.param('id')
      const classes = await Student.findOrFail(id)
      await classes.softDelete()
      const oldUser = classes

      const classStudent = await ClassStudent.findOrFail(id);
      classStudent.merge({
        status: Status.CANCELED,
      });
      await classStudent.save();

      await Log.create({
        type: "delete",
        table: "Student",
        oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
        newJson: JSON.parse(JSON.stringify(classes.toJSON()))
      })
      return classes
    } catch (error) {

      return response.status(401).json(error)
    }


  }

}







