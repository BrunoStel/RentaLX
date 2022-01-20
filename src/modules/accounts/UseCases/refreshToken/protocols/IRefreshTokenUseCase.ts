import { ITokenResponse } from "../RefreshTokenUseCase";



export interface IRefreshTokenUseCase {
   execute: (token:string) => Promise<ITokenResponse>
  }