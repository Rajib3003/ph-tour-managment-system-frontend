import App from "@/App";

import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidbarItems";
import { userSidebarItems } from "./userSidbarItems";
import UnAuthorized from "@/pages/UnAuthorized";
import { withAuth } from "@/utils/withAuth";
import { ROLES } from "@/constants/role";
import type { TRole } from "@/types";
import Homepage from "@/pages/Homepage";
import Tours from "@/pages/Tours";
import Booking from "@/pages/Booking";
import TourDetails from "@/pages/TourDetails";
import ProfileUpdate from "@/pages/User/ProfileUpdate";
import Success from "@/pages/Payment/Success";
import Fail from "@/pages/Payment/Fail";
import Cancel from "@/pages/Payment/Cancel";




export const router = createBrowserRouter([
   { 
    // element : <App/>,
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
      {
        Component: withAuth(Booking),
        path: "booking/:id",
      },
      { 
        Component: Success, 
        path: "api/v1/payment/success" 
      },
      { 
        Component: Fail, 
        path: "api/v1/payment/fail" 
      },
      { 
        Component: Cancel, 
        path: "api/v1/payment/cancel" 
      },

    ]
    },
    {
        Component: withAuth(DashboardLayout, ROLES.ADMIN as TRole && ROLES.SUPER_ADMIN as TRole),
        path: "/admin",
        children : [{index : true, element: <Navigate to="/admin/analytics" />},
            ...generateRoutes(adminSidebarItems)]
    },
    {
        Component: withAuth(DashboardLayout, ROLES.USER as TRole),
        path: "/user",
        children : [
            {index : true, element: <Navigate to="/user/bookings" />},
            ...generateRoutes(userSidebarItems)]
    },
    {
        Component: Login,
        path: "/login"       
    },
    {
        Component: Register,
        path: "/register"       
    },
    {
        Component: Verify,
        path: "/verify"       
    },
    {
        Component: UnAuthorized,
        path: "/unAuthorized"
    },
    {
        Component: ProfileUpdate,
        path: "/profileUpdate"
    },
    
])