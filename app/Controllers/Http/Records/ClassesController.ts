
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bull from '@ioc:Rocketseat/Bull'
import ListStatusAll from 'App/Jobs/ListStatusAll'
import Class from 'App/Models/Class'
import Log from 'App/Models/Log'
import { UpdateClassService } from 'App/Services/ClassUpdateService'
import ClassUpdateValidator from 'App/Validators/ClassUpdateValidator'
import ClassesValidator from 'App/Validators/ClassesValidator'
import GetDateValidator from 'App/Validators/GetDateValidator'
import { DateTime } from 'luxon'
import { parseISO } from 'date-fns'


export default class ClassesController {
  public async index({ bouncer }: HttpContextContract) {
    await bouncer.with('ClassesPolicy').authorize('view')
    const classes = (await Class.query()
      .preload('courses', (query) => {
        query.preload('institution')
      })
      .orderBy('id', 'asc'))


    return classes.map((data) => {
      const startDate = data.startDate.toLocaleString()
      const endDate = data.endDate.toLocaleString()
      return {
        ...data.toJSON(),
        start_date: startDate,
        end_date: endDate
      }
    })
  }

  public async show({ response, bouncer, request }: HttpContextContract) {
    await bouncer.with('ClassesPolicy').authorize('view')
    const { classId, courseId } = request.qs()

    try {
      const classes = await Class.query()
        .if(classId, query => query.where('id', classId))
        .whereHas('courses', courseQuery => {
          courseQuery
            .if(courseId, query => query.where('id', courseId))
        })
        .preload('courses', (query) => {
            query.preload('institution')
        })
        .orderBy('id', 'asc')

      return classes.map((data) => {
        const startDate = data.startDate.toLocaleString()
        const endDate = data.endDate.toLocaleString()
        return {
          ...data.toJSON(),
          start_date: startDate,
          end_date: endDate
        }
      })
    } catch (error) {
      if (error.status === 404) {
        return response.status(404).send({ error: 'Turma não encontrada.' })
      }
      if (error.status === 500) {
        return response.status(500).send({ error: 'Erro interno do servidor.' })
      }
      return response.status(400).send({ error: 'Erro na requisição.' })
    }
  }

  public async searchByDate({ response, bouncer, request }: HttpContextContract) {
    await bouncer.with('ClassesPolicy').authorize('view')
    const { date } = await request.validate(GetDateValidator)
    const dateNormal = DateTime.fromFormat(date, 'dd-MM-yyyy')
    const formattedDate = dateNormal.toFormat('yyyy-MM-dd').toString()
    try {

      const classes = await Class.query().whereRaw(`DATE(created_at) = ?`, [formattedDate])
      response.status(200).json(classes)
    } catch (error) {
      if (error.status === 500) {
        return response.status(500).send({ error: 'Erro interno do servidor.' })
      }
      return response.status(400).send({ error: 'Erro na requisição.' })
    }
  }

  public async storeClasses({ request, response, bouncer }: HttpContextContract) {
    try{
      await bouncer.with('ClassesPolicy').authorize('create');
      const createClasses = await request.validate(ClassesValidator);
      const register = await Class.create(createClasses);
      if (!register) {
        return response.status(500).json({ message: 'Erro ao criar classe.' });
      }
  
      const endDate = register.endSubscription.toJSDate()
  
      const luxonDate = DateTime.fromJSDate(endDate);
  
      const currentTime = DateTime.local();
      const differenceInMilliseconds = luxonDate.diff(currentTime).as('milliseconds');
  
      Bull.schedule(new ListStatusAll().key, register, differenceInMilliseconds);
      return {
        static: parseISO('2023-05-25T20:30:30'),
        differenceInMilliseconds
      }

    }catch(error){          
      if (error.status === 500) {
        return response.status(500).send({ error: 'Horario fora do perio de validade.' })
      }
      return response.status(400).send({ error: 'Horario fora do perio de validade.' })
    }
    
  }

  public async update({ request, bouncer , response}: HttpContextContract) {
    try {
      await bouncer.with('ClassesPolicy').authorize('update')
    const updatePayload = await request.validate(ClassUpdateValidator)
    const id = request.param('id')

    const userData = {
      ...updatePayload,
      id,
     };

    const updateClassService = new UpdateClassService()
    const update = await updateClassService.execute(userData)
    const endDate = update.endSubscription.toJSDate()

    const luxonDate = DateTime.fromJSDate(endDate);

    const currentTime = DateTime.local();
    const differenceInMilliseconds = luxonDate.diff(currentTime).as('milliseconds');

    Bull.schedule(new ListStatusAll().key, userData, differenceInMilliseconds);
    console.log( parseISO('2023-05-25T20:30:30'),
differenceInMilliseconds);

    return {
      static: parseISO('2023-05-25T20:30:30'),
      differenceInMilliseconds
    }

    } catch (error) {       
      if (error.status === 500) {
        return response.status(500).send({ error: 'Horario fora do perio de validade.' })
      }
      return response.status(400).send({ error: 'Erro na requisição.' })
    }
    
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ClassesPolicy').authorize('view')
       try {
      const id = request.param('id')
      const classes = await Class.findOrFail(id)
      await classes.softDelete()
      const oldUser = classes

      await Log.create({
        type: "delete",
        table: "candidate",
        oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
        newJson: JSON.parse(JSON.stringify(classes.toJSON()))
      })
      return classes
    } catch (error) {

      return response.status(401).json(error)
    }
  }
}
