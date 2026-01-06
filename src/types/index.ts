import type { ComponentType } from "react";

export type { ISendOtp,IVerifyOtp, ILogin,IRegister } from "./auth.type";

export interface IResponse<T> {
  success: boolean
  message: string
  statuscode: number
  data: T
}

export interface ISidebarItem {
  title: string 
  items: {
    title: string
    url: string
    component: ComponentType
  }[]
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";