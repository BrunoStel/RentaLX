import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { UserRepository } from "../../infra/typeorm/repositories/UserRepository";
import { IUserRepositorie } from "../../infra/typeorm/interfaces/IUserRepositorie";



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