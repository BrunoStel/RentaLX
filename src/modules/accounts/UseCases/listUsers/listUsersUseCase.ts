import { User } from "../../infra/typeorm/entities/User";
import { IListUserRepositorie } from "../../infra/typeorm/interfaces/UserRepositorie/IListUserRepositorie";
import { IListUsersUseCase } from "./protocols/IListUsersUseCase";



class ListUsersUseCase implements IListUsersUseCase{

constructor(
    private listUserRepositorie : IListUserRepositorie){}

async execute(): Promise<User[]>{
    const users = await this.listUserRepositorie.list();
    return users
}

}

export{ListUsersUseCase}