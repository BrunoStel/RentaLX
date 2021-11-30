
import {ICreateUserDTO, IUserRepositorie } from "../../repositories/IUserRepositorie";
import { inject, injectable } from "tsyringe"

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepositorie) {}

    async execute({ name, password, email,driver_license,avatar }: ICreateUserDTO): Promise<void> {
        const emailAlreadyExists =
           await this.userRepository.findByEmail(email);

        if (emailAlreadyExists) {
            throw new Error("Email already in use");
        }

        this.userRepository.create({ name, password, email, driver_license, avatar });
    }
}

export { CreateUserUseCase };
