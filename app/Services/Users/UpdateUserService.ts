import User from "App/Models/User"

type UserRequest = {
  id: number
  name: string
  phone: string
  city: string
  state: string
  cpf: string
}
export class UpdateUserService {
  async execute(userPayload: UserRequest): Promise<User> {

    const searchCriteria = {
      id: userPayload.id,
    }
    const savePayload = userPayload
    const user = await User.updateOrCreate(searchCriteria, savePayload)
    return user

  }
}
