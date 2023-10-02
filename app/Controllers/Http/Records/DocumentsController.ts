import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import * as ExcelJS from 'exceljs'


import Student from 'App/Models/Student';
import { cpf } from 'cpf-cnpj-validator';
import { DateTime } from 'luxon';



export default class DocumentsController {

  public async index({ response, bouncer }: HttpContextContract): Promise<any> {
    await bouncer.with('DocumentPolicy').authorize('view')
    const dadosTabela1 = await Student.query().select('*')
      .preload('benefits')
      .preload('classes', (classesQuery) => {
        classesQuery.preload('courses', (courseQuery) => {
          courseQuery.preload('institution')
        })
     })

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Report')
    const cell = worksheet.getCell('A1');
    cell.value = 'Título da Planilha';
    cell.style =  {
      font: { bold: true, size: 14, },
      alignment: { vertical: 'middle', horizontal: 'center' }
    };
    worksheet.mergeCells('A1:W1'); // mesclar as células do título
    worksheet.mergeCells('A2:W2');
    worksheet.columns = [
      {
        header: 'Relatório de Alunos',
        width: 20,

      },
      {
        key: 'nome',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'document',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'dateOfBirth',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'email',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'phone',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'responsiblePhone',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'responsibleNameresponsibleName',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'maritalStatus',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'zipCode',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'street',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'complement',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'neighborhood',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'city',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'state',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'gradeLevel',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'jobSituation',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'familyIncome',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'familyHouseHoldSize',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'classe.weekday',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'classe.courses.name',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'student.benefits.name',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'student.benefits.saqueDate',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'student.benefits.dateMonthCompetence',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
      {

        key: 'student.benefits.valueSaque',
        width: 20,
        style: {
          font: { bold: false },
          alignment: { vertical: 'middle', horizontal: 'center' }
        }
      },
    ]
    worksheet.addRow([
      'Número do Registro',
      'Nome completo',
      'CPF',
      'Data de nascimento',
      'Telefone/WhatsApp',
      'CEP',
      'Logradouro',
      'Número',
      'Bairro',
      'Cidade',
      'Estado',
      'Grau de Escolaridade',
      'Situação Profissional',
      'Renda Familiar',
      'Quantidade de pessoas na mesma residencia',
      'Período',
      'Horário',
      'Curso',
      'Instituição',
      'Auxilio',
      'Data do saque',
      'Data da Competência',
      'Valor do saque'

    ])
    dadosTabela1.forEach(matriculation => {
      worksheet.addRow([
        matriculation.id,
        matriculation.name,
        cpf.format(matriculation.cpf),
        matriculation.dateOfBirth.toJSDate(),
        matriculation.phone,
        matriculation.zipCode,
        matriculation.street,
        matriculation.number,
        matriculation.neighborhood,
        matriculation.city,
        matriculation.state,
        matriculation.gradeLevel,
        matriculation.jobSituation,
        matriculation.familyIncome,
        matriculation.familyHouseHoldSize,
        matriculation.classes.map(classe => classe.weekday).join(', '),
        `${matriculation.classes.map(classe => classe.startDate).join(', ')} - ${matriculation.classes.map(classe => classe.endDate).join(', ')}`,
        matriculation.classes.map(classe => classe.courses.name).join(', '),
        matriculation.classes.map(classe => classe.courses.institution.name).join(', '),
        matriculation.benefits.map(benefit => benefit.name).join(', '),
        matriculation.benefits.map(benefit => DateTime.fromJSDate(new Date(benefit.saqueDate)).toFormat('dd/MM/yyyy')).join(', '),
        matriculation.benefits.map(benefit => DateTime.fromJSDate(new Date(benefit.dateMonthCompetence)).toFormat('dd/MM/yyyy')).join(', '),
        matriculation.benefits.map(benefit => benefit.valueSaque).join(', '),
      ])
    })
    // dadosTabela1.forEach(matriculation => {
    //   worksheet.addRow([matriculation.name, matriculation.])
    // }),

    const buffer = await workbook.xlsx.writeBuffer()

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=report.xlsx')
    return response.send(buffer)
  }
}



