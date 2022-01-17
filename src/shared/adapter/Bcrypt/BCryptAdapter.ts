import { hash } from "bcryptjs";
import { IEncrypterAdapter } from "../IEncrypterAdapter";


export class BCrypterAdapter implements IEncrypterAdapter {

  constructor (private readonly salt : number){}

  async hash(password: string): Promise<string> {
    const passwordHashed = await hash(password, this.salt)
    return passwordHashed
  }
  
}