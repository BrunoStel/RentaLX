import { IFindByUsernameUserRepositorie } from "../../../../modules/accounts/infra/typeorm/interfaces/IFindByUsernameUserRepositorie";
import { IFindByUsernameProvider } from "../IFindByUsernameProvider";

export class FindByUsernameProvider implements IFindByUsernameProvider {

  constructor(private readonly findByUsernameUserRepositorie: IFindByUsernameUserRepositorie){}

  async userAlreadyExists (username: string): Promise<Boolean> {
    const user = await this.findByUsernameUserRepositorie.findByUsername(username)
    if(user){
      return true
    }
    return false
  }

}