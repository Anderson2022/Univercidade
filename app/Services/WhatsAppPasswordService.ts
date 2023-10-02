import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import User from 'App/Models/User';


export default class WhatsAppPasswordService {
  public static async sendVerificationMessage(user: User) {
    try {

      const headers = {
        'Content-Type': 'application/json',
        'X-API-TOKEN': Env.get('API_TOKEN'),
      };

      const users = await User.query()
        .where('name', user.name)
        .select('name', 'passwordHash', 'phone')
        .firstOrFail();


      const message = `Olá, ${users.name}! Seu token de acesso ao sistema é: ${users.passwordHash}.`;
      const payload = {
        from: Env.get('SENDER_PHONE_NUMBER'),
        to: users.phone,
        contents: [
          {
            type: "template",
            templateId: "97f452f2-2b1f-4947-8a89-c2a3163bb074",
            fields: {
              codigo: `${message}`,
            },
          }
        ],

      };

      const response = await axios.post(Env.get('API_URL'), payload, { headers });

      return response.data;

    } catch (error) {
      return error
    }
  }
}
