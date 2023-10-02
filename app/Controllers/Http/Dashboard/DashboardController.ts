import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import StudentPointsService from "App/Services/Score/ScoreService";

export default class DashboardController {
  public async indexStatus({ response, bouncer, auth }: HttpContextContract) {
    console.log(auth.user);
    await bouncer.with("DocumentPolicy").authorize("viewRoot");
    try {
      const form = await Database.query()
        .from("class_students")
        .select("status")
        .count("* as count")
        .groupBy("status");
      response.status(200).json(form);
    } catch (error) {
      console.error(error);
      response.status(500).json({
        error: {
          message:
            "Ocorreu um erro ao processar a requisição. Por favor, tente novamente mais tarde.",
        },
      });
    }
  }
  public async ShowStatus({ response, bouncer, request }: HttpContextContract) {
    await bouncer.with("DocumentPolicy").authorize("viewRoot");
    const id = request.param("id");
    try {
      const data = await Database.query()
        .from("class_students")
        .join("students", "class_students.student_id", "students.id")
        .where("class_students.student_id", id)
        .select("class_students.status", "students.name")
        .first();

      response.status(200).json(data);
    } catch (error) {
      console.error(error);
      response.status(500).json({
        error: {
          message:
            "Ocorreu um erro ao processar a requisição. Por favor, tente novamente mais tarde.",
        },
      });
    }
  }

  public async indexCouses({ response, bouncer }: HttpContextContract) {
    await bouncer.with("DocumentPolicy").authorize("viewRoot");
    try {

      const data = await Database.query()
        .select("courses.name as course_name")
        .select(Database.raw("MAX(classes.id) as id"))
        .count("class_students.student_id as num_students")
        .from("classes")
        .leftJoin("class_students", "classes.id", "class_students.class_id")
        .join("courses", "courses.id", "classes.course_id")
        .groupBy("courses.name");
      response.status(200).json(data);
    } catch (error) {
      response.status(500).json({
        error: {
          message:
            "Ocorreu um erro ao processar a requisição. Por favor, tente novamente mais tarde.",
        },
      });
    }
  }
  public async indexGender({ response, bouncer }: HttpContextContract) {
    await bouncer.with("DocumentPolicy").authorize("viewRoot");
    try {
      const genderCounts = await Database.query()
        .from("students")
        .select("gender", Database.raw("COUNT(*) AS count"))
        .groupBy("gender");
      console.log(genderCounts);

      const genderList = ['Feminino', 'Masculino', 'Outro'];
      const data = genderList.map((gender) => {
        const countObject = genderCounts.find(
          (item) => item.gender.toUpperCase() === gender.toUpperCase()
        );
        const count = countObject ? countObject.count : 0;

        return {
          gender,
          person: Math.round(count),
        };
      });

      response.status(200).json(data);
    } catch (error) {
      response.status(500).json({
        message:
          "Ocorreu um erro ao processar a requisição. Por favor, tente novamente mais tarde.",
      });
    }

  }

  public async indexAge({ response, bouncer }: HttpContextContract) {
    await bouncer.with("DocumentPolicy").authorize("viewRoot");

    try {
      const ageRanges = [
        "18-20",
        "21-25",
        "26-30",
        "31-35",
        "36-40",
        "41-45",
        "46+",
      ];
      const maleData: any = [];
      const femaleData: any = [];
      const otherData: any = [];

      // Consulta para o gênero masculino
      for (let i = 0; i < ageRanges.length; i++) {
        const ageRange = ageRanges[i];
        const [minAge, maxAge] = ageRange.split("-");
        const data = await Database.query()
          .from("students")
          .where("gender", "masculino")
          .andWhere("age", ">=", minAge)
          .andWhere("age", "<=", maxAge)
          .count("age as total");

        maleData.push(data[0].total);
      }

      // Consulta para o gênero feminino
      for (let i = 0; i < ageRanges.length; i++) {
        const ageRange = ageRanges[i];
        const [minAge, maxAge] = ageRange.split("-");
        const data: any = await Database.query()
          .from("students")
          .where("gender", "feminino")
          .andWhere("age", ">=", minAge)
          .andWhere("age", "<=", maxAge)
          .count("age as total");

        femaleData.push(data[0].total);
      }
          // Consulta para o gênero feminino
          for (let i = 0; i < ageRanges.length; i++) {
            const ageRange = ageRanges[i];
            const [minAge, maxAge] = ageRange.split("-");
            const data: any = await Database.query()
              .from("students")
              .where("gender", "Outro")
              .andWhere("age", ">=", minAge)
              .andWhere("age", "<=", maxAge)
              .count("age as total");
    
              otherData.push(data[0].total);
          }
      const formattedData = [
        { name: "Masculino", ageRanges, maleData },
        { name: "Feminino", ageRanges, femaleData },
        { name: "Outro", ageRanges, otherData },
      ];

      return response.status(200).json(formattedData);
    } catch (error) {
      return response.status(500).send({
        error:
          "Ocorreu um erro ao processar a requisição. Por favor, tente novamente mais tarde.",
      });
    }
  }

  public async indexScore({ response, bouncer }: HttpContextContract) {
    await bouncer.with("DocumentPolicy").authorize("viewRoot");
    try {
      const data = await Database.query()
        .from("students_points")
        .select("value", "student_id")
        .count("* as count")
        .groupBy("value")
        .select(Database.raw("AVG(DISTINCT value) as average"))
        .groupBy("student_id");
      const scores = data.map((row) => row.value);
      const average_score = parseFloat(
        (scores.reduce((acc, score) => acc + score, 0) / scores.length).toFixed(
          2
        )
      );

      const result = {
        scores,
        average_score,
      };
      return result;
    } catch (error) {
      return response.status(500).send({
        error:
          "Ocorreu um erro ao processar a requisição. Por favor, tente novamente mais tarde.",
      });
    }
  }

  public async indexScores({ bouncer }: HttpContextContract) {
    await bouncer.with("DocumentPolicy").authorize("viewRoot");

    const studentPointsService = new StudentPointsService();
    const total = await studentPointsService.getStudentsPoints();
    const results = total.map((elen) => elen.totalValue);

    const scoreCounts: number[] = [0, 0, 0, 0, 0, 0];

    results.forEach((score) => {
      if (score >= 10 && score <= 20) {
        scoreCounts[0]++;
      } else if (score >= 21 && score <= 30) {
        scoreCounts[1]++;
      } else if (score >= 31 && score <= 40) {
        scoreCounts[2]++;
      } else if (score >= 41 && score <= 50) {
        scoreCounts[3]++;
      } else if (score >= 51 && score <= 60) {
        scoreCounts[4]++;
      } else {
        scoreCounts[5]++;
      }
    });

    const averageScore =
      results.reduce((sum, score) => sum + score, 0) / results.length;

    const result = {
      scores: results,
      average_score: averageScore,
    };

    return result;
  }
}
