import jwt from 'jsonwebtoken'
import { sign } from "jsonwebtoken";
import { ITokenGenerator } from '../ITokenGenerator'
import { ITokenRefreshGenerator } from '../ITokenRefreshGenerator'

export interface IGenerateInput {
  secretKey: string
  value: string
  expiresIn?:string
  email?:string
}

export class JwtAdapter implements ITokenGenerator, ITokenRefreshGenerator {
  async generateToken ({secretKey, value, expiresIn}: IGenerateInput): Promise<string> {
    const acessToken = jwt.sign({ id: value }, secretKey, {
      expiresIn:expiresIn
    })
    return acessToken
  }

  async generateRefreshToken ({email, secretKey, value, expiresIn}: IGenerateInput): Promise<string> {
    const acessToken = sign({email},secretKey,{
      subject:value,
      expiresIn:expiresIn
  })
    return acessToken
  }

}
