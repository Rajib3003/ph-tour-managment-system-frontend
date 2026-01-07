import { baseApi } from "@/redux/baseApi";
import type { ILogin } from "@/types/auth.type";





export const tourApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        addTourType: builder.mutation<null, ILogin>({
            query : (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName
            }),  
            invalidatesTags: ["TOUR"],          
        }),
        
        getTourtypes: builder.query({
            query : () => ({
                url: "/tour/tour-types",
                method: "GET",                
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => response.data,
        }),
    })
})

export const {
  useAddTourTypeMutation,
  useGetTourtypesQuery
} = tourApi