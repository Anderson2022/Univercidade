import { JobContract } from '@ioc:Rocketseat/Bull';
import Student from 'App/Models/Student';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { DateTime } from 'luxon';
import BenefitStudent from 'App/Models/BenefitStudent';
import Benefit from 'App/Models/Benefit';


const baseURL = Env.get('API_AUXILIO')
const baseToken = Env.get('API_AUXILIO_TOKEN')


export default class Benefits implements JobContract {
  public key = 'Benefits';

  public async handle(BenefitData) {

    const { data } = BenefitData;
    const { id } = data as Student;

    const students = await Student.query().where('id', id).andWhereNotNull('nis');
     if (!students || students.length === 0) {
      return;
    }
    for (const student of students) {
          try {
        const anoAtual = DateTime.local().year;
        const anoAnterior = anoAtual - 1;
        for (let i = 0; i < 12; i++) {
          const hoje = DateTime.local();
          const dataFormatada = hoje.minus({ months: i }).toFormat('yyyyMM');
          const anoDataFormatada = parseInt(dataFormatada.slice(0, 4), 10);
          if (anoDataFormatada === anoAnterior) {
            break;
          }
          const { data } = await axios.get(`${baseURL}?anoMesCompetencia=${dataFormatada}&nis=${student.nis}&pagina=1`, { headers: { 'chave-api-dados': `${baseToken}` } });

          if (data[0]?.dataSaque) {
          }
          let shouldSave = true;

          for (let i = 0; i < data.length; i++) {
            if (shouldSave) {
              const benefit = await Benefit.firstOrCreate({
                name: 'Auxílio Brasil',
              }, {
                saqueDate: data[i]?.dataSaque,
                valueSaque: data[i]?.valorSaque,
                dateMonthCompetence: data[i]?.dataMesCompetencia,
              });
              shouldSave = false;

              const pivotValues = {
                studentId: student.id,
                benefitId: benefit.id,
              };

              await BenefitStudent.firstOrCreate(pivotValues);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
