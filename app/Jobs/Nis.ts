import Bull, { JobContract } from '@ioc:Rocketseat/Bull';
import Student from 'App/Models/Student';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import Benefits from 'App/Jobs/Benefits'

export default class Nis implements JobContract {
  public key = 'Nis';

  public async handle(NisStudent) {
    const { data } = NisStudent;
    const { id } = data as Student;

    const students = await Student.query().where('id', id).whereNull('nis');

    if (!students || students.length === 0) {
      return;
    }

    for (const student of students) {
      try {
        let IsNisFound = false
        const baseURL = Env.get('API_NIS');
        const baseToken = Env.get('API_NIS_TOKEN');
        const numberOfAttempts = 5

        for (let attempt = 0; attempt < numberOfAttempts; attempt++) {
          const { data } = await axios.get(baseURL, {
            params: {
              token: baseToken,
              timeout: 600,
              nome: student.name,
              cpf: student.cpf,
              data_nascimento: student.dateOfBirth.toFormat('yyyy-MM-dd'),
            },
          });

          IsNisFound = await parseResponse(data, student);
          if (IsNisFound) {
            break;
          }
          await delay(10000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
async function parseResponse(response, student) {
  if (response.code == 200) {
    const nit = response.data[0].nit;
    console.log(nit);
    student.nis = nit;
    await student.save();

    Bull.add(new Benefits().key, student);

    console.log(`Retorno com sucesso: \${response.data}`);
    return true
  } else
    if (response.code >= 600 && response.code <= 799) {
      let mensagem = 'Resultado sem sucesso. Leia para saber mais:\n';
      mensagem += `Código: \${response['code']} (\${response['code_message']})\n`;
      if (response.errors) mensagem += response.errors.join('; ');
      console.log(mensagem);

    }
  return false
}


async function delay(delayInms) {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}

