
// import Bookings from "@/pages/User/Bookings";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Bookings = lazy(() => import('@/pages/User/Bookings'));

export const userSidebarItems : ISidebarItem[] = [
    {
      title: "History",      
      items: [
        {
          title: "Tour Bookings",
          url: "/user/bookings",
          component: Bookings
        }
      ],
    }
  ];