import { User } from "../../infra/typeorm/entities/User";
import { ICreateUserDTO, IUserRepositorie } from "../../infra/typeorm/interfaces/IUserRepositorie";



class UserRepositoryInMemory implements IUserRepositorie{
    
    users: User[] = []
    
    async create(data: ICreateUserDTO): Promise<void> {
        const user = new User()
        Object.assign(user, {
            name:data.name,
            password:data.password,
            username:data.username,
            email:data.email,
            driver_license:data.driver_license 
        })
        
        this.users.push(user)
    }


    async findByUsername(username: string): Promise<User> {
        const user = this.users.find(user => user.username === username)
        return user
    }

    async list(): Promise<User[]> {
        const listUsers = this.users
        return listUsers
    }

    async findByID(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id)
        return user
    }
    
}

export { UserRepositoryInMemory }