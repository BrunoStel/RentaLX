
export interface IVerifyInput {
  token: string
  secret_refresh_token: string
}

export interface IPayLoad{
  sub:string,
  email:string
}

export interface ITokenVerify {
  verify: ({token, secret_refresh_token}: IVerifyInput) => Promise<IPayLoad>
}