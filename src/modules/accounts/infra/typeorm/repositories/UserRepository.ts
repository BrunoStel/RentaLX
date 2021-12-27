import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { ICreateUserDTO, IUserRepositorie } from "../interfaces/IUserRepositorie";



class UserRepository implements IUserRepositorie {
    private repository: Repository<User>;
    
    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, password,username, email, driver_license, avatar,id }: ICreateUserDTO): Promise<User> {
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
       const users = await this.repository.find();
       return users;
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.repository.findOne({username})
        return user;
    }

    async findByID(id: string): Promise<User> {
        const user = await this.repository.findOne(id)
        return user;    
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email})
        return user;  
    }
}

export {UserRepository}