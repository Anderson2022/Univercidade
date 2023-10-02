import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import Student from 'App/Models/Student';


export default class WhatsAppService {
  public static async sendVerificationMessage(student: Student) {
    try {

      const headers = {
        'Content-Type': 'application/json',
        'X-API-TOKEN': Env.get('API_TOKEN'),
      };

      await Student.query()
        .preload('classes', (query) => {
          query.preload('courses')
        }).firstOrFail()

      const message = `Olá, ${student.name}!`;
      const payload = {
        from: Env.get('SENDER_PHONE_NUMBER'),
        to: `whatsapp:${student.phone}`,
        contents: [
          {
            type: "template",
            templateId: "",
            fields: {
              codigo: `${message}`,
            },
          }
        ]
      };

      const response = await axios.post(Env.get('API_URL'), payload, { headers });

      return response.data;

    } catch (error) {
      return error
    }
  }
}
