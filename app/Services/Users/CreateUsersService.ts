import User from "App/Models/User"

type UserRequest = {
  name: string
  phone: string
  city: string
  state: string
  cpf: string
}
export class CreateUserService {
  async execute({
    name,
    cpf,
    phone,
    state,
    city,
  }: UserRequest): Promise<User> {

    const user = await User.create({ name, cpf, phone, state, city })

    return user
  }
}
