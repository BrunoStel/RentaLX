export interface ICreateUserDTO {
  name: string;
  password: string;
  username:string;
  email: string;
  driver_license: string;
  avatar?:string;
  id?:string
}
