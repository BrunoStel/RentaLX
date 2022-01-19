import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/typeorm/entities/User";
import { IFindByUsernameProvider } from "../../../../shared/providers/FindByUsername/IFindByUsernameProvider";
import { IEncrypterAdapter } from "../../../../shared/adapter/hasher/IEncrypterAdapter";
import { ICreateUserDTO, ICreateUserUseCase } from "./protocols/ICreateUser";
import { ICreateUserRepositorie } from "../../infra/typeorm/interfaces/UserRepositorie/ICreateUserRepositorie";

class CreateUserUseCase implements ICreateUserUseCase{
    constructor(
        private readonly findByUsernameProvider: IFindByUsernameProvider,
        private readonly createUserRepositorie: ICreateUserRepositorie,
        private readonly encrypter: IEncrypterAdapter) {}

    async execute({ name, password, username, email,driver_license }: ICreateUserDTO): Promise<User> {
        const passwordHash = await this.encrypter.hash(password)
        
        
        const userAlreadyExists = await this.findByUsernameProvider.userAlreadyExists(username)

        if (userAlreadyExists) {
            throw new AppError("Username already in use");
        }

        const user = await this.createUserRepositorie.create({ name, password:passwordHash, username, email, driver_license });

        return user
    }
}

export { CreateUserUseCase };
