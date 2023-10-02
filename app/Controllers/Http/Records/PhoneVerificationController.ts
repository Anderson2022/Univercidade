import axios from 'axios'
import crypto from 'crypto'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PhoneCode from 'App/Models/PhoneCode'
import Env from '@ioc:Adonis/Core/Env'



export default class PhoneVerificationController {
  public async send({ request, response }: HttpContextContract) {
    const phone = request.param('phones')
    const phoneRegex = /^[0-9]{11,12}$/
    if (!phoneRegex.test(phone)) {
      return response.status(422).json({
        errors: [
          {
            code: 'BAD_REQUEST',
            message: 'Por favor, informe um número de telefone válido com 10 ou 11 dígitos',
          },
        ],
      })
    }


    const verificationCode = crypto.randomInt(1000, 9999).toString();
    const phoneCode = await PhoneCode.create({ phone, phoneCodes: verificationCode })

    if (!phoneCode.$isPersisted) {
      return response.status(500).json({
        errors: [
          {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Não foi possível criar o registro do número de telefone',
          },
        ],
      })
    }

    // Envia o código de verificação por mensagem no WhatsApp
    const headers = {
      'Content-Type': 'application/json',
      'X-API-TOKEN': Env.get('API_TOKEN'),
    }

    const message = `Seu token de verificação é: ${verificationCode}`
    const payload = {
      from: Env.get('SENDER_PHONE_NUMBER'),
      to: `whatsapp:+55${phone}`,
      contents: [
        {
          type: "template",
          templateId: "97f452f2-2b1f-4947-8a89-c2a3163bb074",
          fields: {
            codigo: `${message}`,
          },
        }
      ]
    }
    try {
      const response = await axios.post(Env.get('API_URL'), payload, { headers })
      return response
    } catch (error) {
    return error
    }
  }

  public async verify({ request, response }: HttpContextContract) {
    const phone = request.param('phones')
    const code = request.input('code')

    const phoneCode = await PhoneCode.query()
      .where('phone', phone)
      .where('phone_codes', code)
      .first()

    if (!phoneCode) {
      return response.status(422).json({
        errors: [
          {
            code: 'BAD_REQUEST',
            message: 'Código de verificação inválido',
          },
        ],
      })
    }

    phoneCode.verified = true
    await phoneCode.save()
    await phoneCode.delete()
    return { message: 'Código de verificação válido. O telefone foi verificado com sucesso.' }
  }
}
