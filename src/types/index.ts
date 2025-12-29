
export type { ISendOtp,IVerifyOtp, ILogin,IRegister } from "./auth.type";

export interface IResponse<T> {
  success: boolean
  message: string
  statuscode: number
  data: T
}