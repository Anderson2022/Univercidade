import Course from "App/Models/Course";


interface updateCourse {
  id: number

  institutionId: number

  name?: string
  
  cover?: string
}

export class UpdateCourseService {
  async execute({id, name, institutionId, cover}: updateCourse) {
    const course = await Course.findOrFail(id); // ou qualquer lógica para recuperar o curso existente

    course.merge({ name, cover, institutionId });

    await course.save();

    return course;
  }
}
