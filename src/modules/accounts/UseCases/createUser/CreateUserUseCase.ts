
import {ICreateUserDTO, IUserRepositorie } from "../../infra/typeorm/interfaces/IUserRepositorie";
import { inject, injectable } from "tsyringe"
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepositorie) {}

    async execute({ name, password, username, email,driver_license }: ICreateUserDTO): Promise<void> {

        const passwordHash = await hash(password, 8)
        
        
        const emailAlreadyExists =
           await this.userRepository.findByUsername(username);

        if (emailAlreadyExists) {
            throw new AppError("Username already in use");
        }

        await this.userRepository.create({ name, password:passwordHash, username, email, driver_license });
    }
}

export { CreateUserUseCase };
