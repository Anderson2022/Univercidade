import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Logger from '@ioc:Adonis/Core/Logger';
import Log from 'App/Models/Log';

export default class LoggerMiddleware {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const logger = Logger.child({
      requestId: request.id(),
    });


    await next();

    const { url, ip, body } = request;
    const statusCode = response.status(200);
    const msg = ` ${url} ${statusCode} ${ip} ${body}`;




    logger.info( msg );

    // Transforma o registro em uma instância de Log do Lucid ORM
    const log = new Log();
    log.level = 'info';
    log.msg = JSON.stringify(msg);


   

    //  log.oldJson = new Date();

    // Salva o registro no banco de dados
    await log.save();
  }
}
