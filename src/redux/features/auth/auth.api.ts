import { baseApi } from "@/redux/baseApi";
import type { ILogin, IRegister,  IResponse,  ISendOtp, IVerifyOtp } from "@/types";




const authApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        login: builder.mutation<null, ILogin>({
            query : (loginInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: loginInfo
            })
        }),
          register: builder.mutation<null,IRegister>({
            query : (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
            query : (userInfo) => ({
                url: "/otp/send",
                method: "POST",
                data: userInfo
            })
        }),
        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query : (userInfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: userInfo
            })
        }),
    })
})

export const {useRegisterMutation, useLoginMutation, useSendOtpMutation, useVerifyOtpMutation} = authApi