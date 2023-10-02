import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import WhatsAppPasswordService from 'App/Services/WhatsAppPasswordService'
import LoginValidator from 'App/Validators/LoginValidator';
import Hash from '@ioc:Adonis/Core/Hash'


export default class SessionUserController {

  public async login({ request, response }: HttpContextContract) {
    const cpf = request.input('cpf');

    try {
      const user = await User.findByOrFail('cpf', cpf);
      const phone = user.phone;
      const name = user.name
      await user.save();

      return response.status(200).json({ phone, name });
    } catch (error) {
      return response.status(400).send({ message: 'CPF não encontrado.' });
    }
  }


  public async loginPhone({ request, response }: HttpContextContract) {
    const phone = request.input('phone')
    try {
      const user = await User.findByOrFail('phone', phone)

      const password = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      const hashedPassword = await Hash.make(password)
      user.password = hashedPassword

      user.passwordHash = password

      await user.save()

      await WhatsAppPasswordService.sendVerificationMessage(user);


      return response.status(200).send({ message: 'Senha enviada com sucesso.' })
    } catch (error) {
      return response.status(400).send({ message: 'CPF não encontrado.' })
    }
  }

  public async store({ request, auth }: HttpContextContract) {
    const { password } = await request.validate(LoginValidator)
    const phone  = request.param('phone')

    const user = await User.findByOrFail('phone', phone)

    const token = await auth.use('api').attempt(phone, password, { expiresIn: '7d' })
    return {
      access_token: token ,
      user: {
        id: user.id,
        name: user.name,
      },
    }
  }

  public async recoverToken({ response, auth }: HttpContextContract) {
    const tokenValue = await auth.check()
    if (!tokenValue) {
      response.status(400);
      return { message: 'Usuário não esta logado' }
    }
    return {
      user: {
        id: auth.user!.id,
        name: auth.user!.name,
        phone: auth.user!.phone,
      }
    }
  }


  public async destroy({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.ok({})
  }
}


