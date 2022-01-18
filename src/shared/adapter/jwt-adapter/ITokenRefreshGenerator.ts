import { IGenerateInput } from "./jwt/jwt-adapter";

export interface ITokenRefreshGenerator {
  generateRefreshToken: ({email, secretKey ,value, expiresIn}: IGenerateInput) => Promise<string>
}
