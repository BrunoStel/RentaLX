
import {ICreateUserDTO, IUserRepositorie } from "../../repositories/IUserRepositorie";
import { inject, injectable } from "tsyringe"
import { hash } from "bcrypt";

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
            throw new Error("Username already in use");
        }

        await this.userRepository.create({ name, password:passwordHash, username, email, driver_license });
    }
}

export { CreateUserUseCase };
