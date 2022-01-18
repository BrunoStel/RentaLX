
export interface IRequest{
  username:string,
  password:string
}

export interface IResponse{
  user:{
      name:string,
      username:string,
      email:string
  },
  token:string,
  refresh_token:string
}

export interface IAuthenticateUserUseCase{
  execute: ({username,password} : IRequest) => Promise<IResponse>
} 