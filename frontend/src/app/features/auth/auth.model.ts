export interface AuthUser{
    userId:number;
    companyId:number;
    role:string;
}
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  companyName: string;
  taxNumber: string;
}