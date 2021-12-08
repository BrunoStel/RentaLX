import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { UserRepository } from "../../repositories/implementations/UserRepository";





interface IRequestAvatar{
    user_id:string,
    avatar_file:string
}

@injectable()
class UpdateUserAvatarUseCase{

    constructor(
        @inject("UserRepository")
        private userRepository: UserRepository
    ){}

    async execute({user_id, avatar_file}:IRequestAvatar): Promise<void>{
        const user = await this.userRepository.findByID(user_id)

        if (user.avatar){
        await deleteFile(`./tmp/avatar/${user.avatar}`)
        }

        user.avatar = avatar_file

        await this.userRepository.create(user)
    }

}

export { UpdateUserAvatarUseCase }