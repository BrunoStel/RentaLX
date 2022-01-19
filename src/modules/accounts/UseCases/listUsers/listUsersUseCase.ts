import { User } from "../../infra/typeorm/entities/User";
import { IListUserRepositorie } from "../../infra/typeorm/interfaces/UserRepositorie/IListUserRepositorie";



class ListUsersUseCase{

constructor(
    private listUserRepositorie : IListUserRepositorie){}

async execute(): Promise<User[]>{
    const users = await this.listUserRepositorie.list();
    return users
}

}

export{ListUsersUseCase}