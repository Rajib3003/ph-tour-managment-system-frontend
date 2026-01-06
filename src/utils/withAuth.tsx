import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";




export const withAuth = (Component : ComponentType, roleRequired?: TRole) => {
    return function AuthWrapper () {
        const {data,isLoading} = useUserInfoQuery(undefined);
        if(!data?.data.email && !isLoading){
            return <Navigate to="/login" />;
        }
        if(roleRequired && !isLoading && roleRequired !== data?.data.role){
            return <Navigate to="/unAuthorized" />;
        }
        return <Component />;
    }    
}