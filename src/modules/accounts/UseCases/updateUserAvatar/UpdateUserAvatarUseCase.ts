import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/providers/StorageProvider/IStorageProvider";
import { deleteFile } from "../../../../utils/file";
import { UserRepository } from "../../infra/typeorm/repositories/UserRepository";





interface IRequestAvatar{
    user_id:string,
    avatar_file:string
}

@injectable()
class UpdateUserAvatarUseCase{

    constructor(
        @inject("UserRepository")
        private userRepository: UserRepository,
        @inject("LocalStorageProvider")
        private storageProvider: IStorageProvider
    ){}

    async execute({user_id, avatar_file}:IRequestAvatar): Promise<void>{
        const user = await this.userRepository.findByID(user_id)


        if (user.avatar){
            await this.storageProvider.delete(user.avatar, "avatar")
        }

        await this.storageProvider.save(avatar_file, "avatar")

         
        user.avatar = avatar_file

        await this.userRepository.create(user)
    }

}

export { UpdateUserAvatarUseCase }