import { ROLES } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidbarItems";
import { userSidebarItems } from "@/routes/userSidbarItems";
import type { TRole } from "@/types";


export const getSidebarItems = (userrole:TRole) => {
 
    switch(userrole){
        case ROLES.ADMIN:
            return [...adminSidebarItems];
        case ROLES.SUPER_ADMIN:
            return [...adminSidebarItems, ...userSidebarItems];
        case ROLES.USER:
            return [...userSidebarItems];             
        default:
            return [];
    }
}