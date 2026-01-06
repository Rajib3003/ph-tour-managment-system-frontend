import { baseApi } from "@/redux/baseApi";
import type { ILogin } from "@/types/auth.type";





export const tourApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        addTourType: builder.mutation<null, ILogin>({
            query : (tourTypeName) => ({
                url: "/auth/login",
                method: "POST",
                data: tourTypeName
            }),            
        }),
        
        getTourtypes: builder.query({
            query : () => ({
                url: "/tour/tour-types",
                method: "GET",                
            }),
            transformResponse: (response) => response.data,
        }),
    })
})

export const {
  useAddTourTypeMutation,
  useGetTourtypesQuery
} = tourApi