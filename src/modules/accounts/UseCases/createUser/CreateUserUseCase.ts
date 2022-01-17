
import {ICreateUserDTO, IUserRepositorie } from "../../infra/typeorm/interfaces/IUserRepositorie";
import { inject, injectable } from "tsyringe"
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/typeorm/entities/User";
import { IFindByUsernameUserRepositorie } from "../../infra/typeorm/interfaces/IFindByUsernameUserRepositorie";
import { ICreateUserRepositorie } from "../../infra/typeorm/interfaces/ICreateUserRepositorie copy";

//@injectable()
class CreateUserUseCase {
    constructor(
        //@inject("UserRepository")
        private readonly findByUsernameUserRepositorie: IFindByUsernameUserRepositorie,
        private readonly createUserRepositorie: ICreateUserRepositorie) {}

    async execute({ name, password, username, email,driver_license }: ICreateUserDTO): Promise<User> {

        const passwordHash = await hash(password, 8)
        
        
        const emailAlreadyExists =
           await this.findByUsernameUserRepositorie.findByUsername(username);

        if (emailAlreadyExists) {
            throw new AppError("Username already in use");
        }

        const user = await this.createUserRepositorie.create({ name, password:passwordHash, username, email, driver_license });

        return user
    }
}

export { CreateUserUseCase };
