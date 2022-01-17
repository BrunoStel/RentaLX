import { User } from "../../infra/typeorm/entities/User";

export interface ICreateUserDTO {
  name: string;
  password: string;
  username:string;
  email: string;
  driver_license: string;
  avatar?:string;
  id?:string
}


export interface ICreateUser {
  execute: ({ name, password, username, email,driver_license }: ICreateUserDTO) => Promise<User>
}