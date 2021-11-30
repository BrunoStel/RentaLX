import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { ICreateUserDTO, IUserRepositorie } from "../IUserRepositorie";



class UserRepository implements IUserRepositorie {
    private repository: Repository<User>;
    
    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, password, email, driver_license,avatar }: ICreateUserDTO): Promise<void> {
        const category = this.repository.create({
            name,
            password,
            email,
            driver_license,
            avatar
        })

        await this.repository.save(category)
    }

    async list(): Promise<User[]> {
       const users = await this.repository.find();
       return users;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email})
        return user;
    }
}

export {UserRepository}