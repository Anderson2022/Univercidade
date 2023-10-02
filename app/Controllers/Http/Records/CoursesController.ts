import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'

import UpdateCourseValidator from 'App/Validators/Courses/UpdateCourseValidator'
import { UpdateCourseService } from 'App/Services/Records/UpdateCourseService'
import Log from 'App/Models/Log'
import CreateCourseValidator from 'App/Validators/Courses/CreateCourseValidator'
import Application from '@ioc:Adonis/Core/Application'
import { CreateCourseService } from 'App/Services/Records/CoursesServices'
import Institution from 'App/Models/Institution'




export default class CoursesController {
  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.with('CoursesPolicy').authorize('view')
    const course = await Course.all()
    response.status(200).json(course)
  }

  public async show({ response, request, bouncer }: HttpContextContract) {
    await bouncer.with('CoursesPolicy').authorize('view')
    const id = request.param('id')
    const course = await Course.findOrFail(id)
    response.status(200).json(course)

  }

  public async indexCursesNotOff({ response }: HttpContextContract) {
    const courses = await Course.query().preload('class', (query) => {
      query.where('visible', true)
    })

    response.status(200).json(courses)
  }



  public async indexInstitution({ response, bouncer }: HttpContextContract) {
    await bouncer.with('CoursesPolicy').authorize('view')
    const classes = await Institution.query()
      .preload('courses', (query) => {
        query.preload('class')
      })
      .orderBy('id', 'asc')
    response.status(200).json(classes)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('CoursesPolicy').authorize('create')
    const coursePayload = await request.validate(CreateCourseValidator)
    const coverImage = request.file('cover')
    if (coverImage) {
      await coverImage.move(Application.tmpPath('uploads'))
    }
    // await Drive.getUrl('avatar.jpg')

    const createCursesService = new CreateCourseService()
    const result = await createCursesService.execute(coursePayload.name, coursePayload.institutionId, `/uploads/${coverImage?.fileName}`)
    return response.status(200).json(result)
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('CoursesPolicy').authorize('update')
    const updatePayload = await request.validate(UpdateCourseValidator)

    const id = request.param('id')

    const coverImage = request.file('cover')
    if (coverImage) {
      await coverImage.move(Application.tmpPath('uploads'))
    }
    const CourseData = {
      ...updatePayload,
      id,

    }
  
    const updateCouseService = new UpdateCourseService()

    const update = await updateCouseService.execute({
      id: CourseData.id,
      name: CourseData.name,
      institutionId: CourseData.institutionId,
      cover: coverImage ? `/uploads/${coverImage?.fileName}` : undefined
    })

    const oldUser = update
    await Log.create({
      type: "Update",
      table: "Curses",
      oldJson: JSON.parse(JSON.stringify(oldUser.toJSON())),
      newJson: JSON.parse(JSON.stringify(update.toJSON()))
    })

    return response.json(update)

  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('CoursesPolicy').authorize('delete')
    try {
      const id = request.param('id')
      const classes = await Course.findOrFail(id)
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

