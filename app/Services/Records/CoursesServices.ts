import Course from "App/Models/Course"

export class CreateCourseService {
  async execute(name, institutionId, cover) {
    const curses = await Course.create({ name, institutionId, cover })
    await curses.save()
    return curses
  }
}
