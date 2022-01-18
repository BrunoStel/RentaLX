import { inject, injectable } from "tsyringe";
import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";
import { IFindByUsernameUserRepositorie } from "../../../../modules/accounts/infra/typeorm/interfaces/IFindByUsernameUserRepositorie";
import { IFindByUsernameProvider } from "../IFindByUsernameProvider";

@injectable()
export class FindByUsernameProvider implements IFindByUsernameProvider {

  constructor
  ( @inject('UserRepository')
    private readonly findByUsernameUserRepositorie: IFindByUsernameUserRepositorie
  ){}

  async userAlreadyExists (username: string): Promise<User> {
    
    const user = await this.findByUsernameUserRepositorie.findByUsername(username)
    if(user){
      return user
    }
    return null
  }

}