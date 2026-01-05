import { ROLES } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidbarItems";
import { userSidebarItems } from "@/routes/userSidbarItems";
import type { ITour } from "@/types";

export const getSidebarItems = (userrole:ITour) => {
 
    switch(userrole){
        case ROLES.ADMIN:
            return [...adminSidebarItems];
        case ROLES.SUPER_ADMIN:
            return [...adminSidebarItems];
        case ROLES.USER:
            return [...userSidebarItems];             
        default:
            return [];
    }
}