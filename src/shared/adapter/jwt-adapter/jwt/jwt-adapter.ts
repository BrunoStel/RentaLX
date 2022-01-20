import jwt, { verify } from 'jsonwebtoken'
import { sign } from "jsonwebtoken";
import { ITokenGenerator } from '../ITokenGenerator'
import { ITokenRefreshGenerator } from '../ITokenRefreshGenerator'
import { IPayLoad, ITokenVerify, IVerifyInput } from '../ITokenVerify';

export interface IGenerateInput {
  secretKey: string
  value: string
  expiresIn?:string
  email?:string
}

export class JwtAdapter implements ITokenGenerator, ITokenRefreshGenerator, ITokenVerify {
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

  async verify({ token, secret_refresh_token }: IVerifyInput): Promise<IPayLoad> {
    const {email, sub} = await verify(token, secret_refresh_token) as IPayLoad

    return {
      email,
      sub
    }
  }
}
