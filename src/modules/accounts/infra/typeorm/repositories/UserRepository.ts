import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { ICreateUserRepositorie } from "../interfaces/ICreateUserRepositorie copy";
import { IFindByEmailUserRepositorie } from "../interfaces/IfindByEmailUserRepositorie";
import { IFindByIDUserRepositorie } from "../interfaces/IFindByIDRepositorie";
import { IFindByUsernameUserRepositorie } from "../interfaces/IFindByUsernameUserRepositorie";
import { IListUserRepositorie } from "../interfaces/IListUserRepositorie";
import { ICreateUserDTO } from "../interfaces/IUserRepositorie";



class UserRepository implements ICreateUserRepositorie, IFindByEmailUserRepositorie, IFindByIDUserRepositorie, IFindByUsernameUserRepositorie, IListUserRepositorie {
     private repository: Repository<User>;
    
    async create({ name, password,username, email, driver_license, avatar,id }: ICreateUserDTO): Promise<User> {
        this.repository =  getRepository(User)

        const user = this.repository.create({
            name,
            password,
            username,
            email,
            driver_license,
            avatar,
            id
        })

        await this.repository.save(user)

        return user
    }

    async list(): Promise<User[]> {
        this.repository =  getRepository(User)

       const users = await this.repository.find();
       return users;
    }

    async findByUsername(username: string): Promise<User> {
        this.repository =  getRepository(User)

        const user = await this.repository.findOne({username})
        return user;
    }

    async findByID(id: string): Promise<User> {
        this.repository =  getRepository(User)

        const user = await this.repository.findOne(id)
        return user;    
    }

    async findByEmail(email: string): Promise<User> {
        this.repository =  getRepository(User)

        const user = await this.repository.findOne({email})
        return user;  
    }
}



export {UserRepository}