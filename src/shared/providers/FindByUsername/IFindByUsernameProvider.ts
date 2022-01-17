
export interface IFindByUsernameProvider {
  userAlreadyExists: (username: string) => Promise<Boolean>
}