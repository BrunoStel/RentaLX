import { IGenerateInput } from "./jwt/jwt-adapter";

export interface ITokenGenerator {
  generateToken: ({secretKey ,value, expiresIn}: IGenerateInput) => Promise<string>
}
