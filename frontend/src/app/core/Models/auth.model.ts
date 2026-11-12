export interface LoginDto {
  email:string,
  password:string
}
export interface RegisterDto{
  email:string,
  password:string,
  name:string,
  companyId:number
}
export enum Role{
  SUPER_ADMIN,
  COMPANY_ADMIN,
  EMPLOYEE

}