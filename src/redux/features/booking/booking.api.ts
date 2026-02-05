import { baseApi } from "@/redux/baseApi"


export const bookingApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        CreateBooking: builder.mutation({
            query : (tourData) => ({
                url: "/booking/create",
                method: "POST",
                data: tourData
            }),  
            invalidatesTags: ["BOOKING"],          
        }),


         })
})

export const {
    useCreateBookingMutation,
} = bookingApi