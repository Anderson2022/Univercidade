import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateStudentValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({

    name: schema.string({}),
    cpf: schema.string.optional({}, [rules.minLength(11), rules.unique({ table: 'students', column: 'cpf' })]),
    dateOfBirth: schema.date({format:'dd/MM/yyyy'}),
    phone: schema.string.optional({}, [
      rules.minLength(11),
      rules.unique({ table: 'students', column: 'phone' }),
    ]),
    gradeLevel: schema.string({}, []),
    jobSituation: schema.string({}, []),
    familyIncome: schema.string({}),
    familyHouseHoldSize: schema.string({}),
    street: schema.string({}),
    number: schema.number(),
    neighborhood: schema.string({}),
    city: schema.string({}),
    state: schema.string({}),
    gender: schema.string({}),
    zipCode: schema.string({})

  })
  public messages = {
    'name.required': 'Por favor, informe o nome completo do inscrito.',
    'cpf.required': 'Por favor, informe o número do CPF do inscrito.',
    'cpf.minLength': 'O número do CPF deve ter no mínimo {{options.minLength}} caracteres.',
    'cpf.unique': 'Este CPF já está cadastrado em nossa base de dados.',
    'dateOfBirth.required': 'Por favor, informe a data de nascimento do inscrito.',
    'dateOfBirth.error': 'Por favor, informe a data de nascimento do inscrito.',
    'dateOfBirth.format': 'A data de nascimento deve estar no formato DD/MM/YYYY.',
    'phone.required': 'Por favor, informe um número de telefone para contato.',
    'phone.minLength': 'O número de telefone deve ter no mínimo {{options.minLength}} caracteres.',
    'phone.unique': 'Este numero já está cadastrado em nossa base de dados.',
    'email.required': 'Por favor, informe um endereço de e-mail para contato.',
    'email.email': 'Por favor, informe um endereço de e-mail válido.',
    'responsibleName.required': 'Por favor, informe o nome completo do responsável pelo inscrito.',
    'responsiblePhone.required': 'Por favor, informe um número de telefone para contato do responsável.',
    'responsiblePhone.minLength': 'O número de telefone do responsável deve ter no mínimo {{options.minLength}} caracteres.',
    'gradeLevel.required': 'Por favor, informe  o grau de escolaridade do inscrito.',
    'jobSituation.required': 'Por favor, informe a situação profissional do inscrito.',
    'familyIncome.required': 'Por favor, informe a renda familiar mensal.',
    'familyHouseHoldSize.required': 'Por favor, informe a quantidade de pessoas que reside em sua residência.',
    'street.required': 'Por favor, informe o nome da rua.',
    'number.required': 'Por favor, informe o número do endereço.',
    'complement.string': 'Por favor, informe um complemento para o endereço.',
    'neighborhood.required': 'Por favor, informe o bairro.',
    'city.required': 'Por favor, informe o nome da cidade.',
    'state.required': 'Por favor, informe o estado.',
    'zipCode.required': 'Por favor, informe o CEP do endereço.',
  }
}

