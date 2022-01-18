
export interface ICompareEncrypter {
  value:string
  hash:string
}
export interface IEncrypterAdapterCompare {
  compare: ({}:ICompareEncrypter) => Promise<boolean>
}