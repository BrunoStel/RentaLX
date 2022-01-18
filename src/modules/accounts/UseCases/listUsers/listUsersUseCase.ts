import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepositorie } from "../../infra/typeorm/interfaces/UserRepositorie/IUserRepositorie";
import { UserRepository } from "../../infra/typeorm/repositories/UserRepository";



@injectable()
class ListUsersUseCase{

constructor(
    @inject(UserRepository)
    private listUserUseCase : IUserRepositorie){}

async execute(): Promise<User[]>{
    const users = await this.listUserUseCase.list();
    return users
}

}

export{ListUsersUseCase}