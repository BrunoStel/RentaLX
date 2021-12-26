
import {ICreateUserDTO, IUserRepositorie } from "../../infra/typeorm/interfaces/IUserRepositorie";
import { inject, injectable } from "tsyringe"
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/typeorm/entities/User";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepositorie) {}

    async execute({ name, password, username, email,driver_license }: ICreateUserDTO): Promise<User> {

        const passwordHash = await hash(password, 8)
        
        
        const emailAlreadyExists =
           await this.userRepository.findByUsername(username);

        if (emailAlreadyExists) {
            throw new AppError("Username already in use");
        }

        const user = await this.userRepository.create({ name, password:passwordHash, username, email, driver_license });

        return user
    }
}

export { CreateUserUseCase };
