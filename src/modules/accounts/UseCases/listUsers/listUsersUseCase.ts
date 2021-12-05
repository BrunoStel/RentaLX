import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/implementations/UserRepository";
import { IUserRepositorie } from "../../repositories/IUserRepositorie";



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