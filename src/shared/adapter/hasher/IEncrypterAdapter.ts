
export interface IEncrypterAdapter {
  hash: (password:string) => Promise<string>
}