import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bull from '@ioc:Rocketseat/Bull'
import ListStatusAll from 'App/Jobs/ListStatusAll'
import StudentscoreAll from 'App/Jobs/StudentscoreAll'
import Class from 'App/Models/Class'
import Course from 'App/Models/Course'
import Point from 'App/Models/Point'
import Requirement from 'App/Models/Requirement'
import Student from 'App/Models/Student'
import { UpdateClassPointsService } from 'App/Services/Records/CousesClassPoints.Services'
import CreateRequirementValidator from 'App/Validators/Requirements/CreateRequirementValidator'
import UpdateRequirementValidator from 'App/Validators/Requirements/UpdateRequirementValidator'
import { parseISO } from 'date-fns'
import { DateTime } from 'luxon'




export default class RequirementsController {
  public async indexALL({ response, bouncer }: HttpContextContract) {
    await bouncer.with('CoursesPolicy').authorize('view')
    const point = await Requirement.all()

    response.status(200).json(point)
  }


  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('CoursesPolicy').authorize('view')
    const point = await Point.query().preload(('requirements'))

    response.status(200).json(point )
  }

  public async show({ params, response, bouncer }: HttpContextContract) {
  await bouncer.with('ClassesPolicy').authorize('view')

    const { id } = params
    const classe = await Class.query()
      .where('id', id)
      .preload('courses', (query) => {
        query.preload('institution'),
          query.preload('points', (query) => {
            query.preload('requirements', (query) => {
              query.select('name')
            })
          })
      })
      .first()
    if (!classe) {
      return response.status(404).json({ message: 'Class not found' })
    }
    return response.status(200).json(classe)
  }

  public async RequirementsCoursesShow({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('ClassesPolicy').authorize('view')

    const { id } = params
    const classe = await Course.query()
      .where('id', id)
      .preload('points', (query) => {
        query.preload('requirements', (query) => {
          query.select('name')
        })
      })
    
      .first()
    if (!classe) {
      return response.status(404).json({ message: 'Class not found' })
    }
    return response.status(200).json(classe)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
  await bouncer.with('CoursesPolicy').authorize('create')
      const payload = await request.validate(CreateRequirementValidator)

      const points = payload.requirementId.map((requirementId, index) => ({
        courseId: payload.courseId,
        requirementId: requirementId,
        value: payload.value[index]
      }))
      const pointsSaved = await Point.createMany(points)
      return response.status(200).json(pointsSaved)
  }


  public async update({ request, bouncer}: HttpContextContract) {
  await bouncer.with('CoursesPolicy').authorize('update')
    const { id, courseId, requirementId, value , ...payload} = await request.validate(UpdateRequirementValidator);


    const userData = {
      id,
      ...payload,
      courseId: courseId
    }

    const updateClassPointsService = new UpdateClassPointsService()
    const update = await updateClassPointsService.execute(userData)
    const points = requirementId.map((requirementId, index) => ({
      courseId: courseId,
      requirementId: requirementId,
      value: value[index],
    }));    

    const updatedPoints =  await Point.updateOrCreateMany(
      ['courseId', 'requirementId'],
      points
    )

    const endDate = userData.endSubscription.toJSDate()
  
    const luxonDate = DateTime.fromJSDate(endDate);

    const currentTime = DateTime.local();
    const differenceInMilliseconds = luxonDate.diff(currentTime).as('milliseconds');

    const student = await Student.all()

    Bull.add(new StudentscoreAll().key, student);

    Bull.schedule(new ListStatusAll().key, userData, differenceInMilliseconds);
    return {
      static: parseISO('2023-05-25T20:30:30'),
      differenceInMilliseconds, updatedPoints, update
    }


  }
}
