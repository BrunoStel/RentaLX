import { inject, injectable } from "tsyringe";
import { IFindByUsernameUserRepositorie } from "../../../../modules/accounts/infra/typeorm/interfaces/IFindByUsernameUserRepositorie";
import { IFindByUsernameProvider } from "../IFindByUsernameProvider";

@injectable()
export class FindByUsernameProvider implements IFindByUsernameProvider {

  constructor
  ( @inject('UserRepository')
    private readonly findByUsernameUserRepositorie: IFindByUsernameUserRepositorie
  ){}

  async userAlreadyExists (username: string): Promise<Boolean> {
    
    const user = await this.findByUsernameUserRepositorie.findByUsername(username)
    if(user){
      return true
    }
    return false
  }

}