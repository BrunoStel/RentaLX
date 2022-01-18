import { hash, compare } from "bcryptjs";
import bcryptjs from 'bcryptjs'
import { IEncrypterAdapter } from "../IEncrypterAdapter";
import { ICompareEncrypter, IEncrypterAdapterCompare } from "../IEncrypterAdapterCompare";


export class BCrypterAdapter implements IEncrypterAdapter, IEncrypterAdapterCompare {

  constructor (private readonly salt : number){}

  async hash(password: string): Promise<string> {

    const passwordHashed = await hash(password, this.salt)
    return passwordHashed
  }

  async compare ({value, hash}: ICompareEncrypter): Promise<boolean> {
    const isValid =  await bcryptjs.compare(value, hash)
    return isValid
  }
  
}