// import AddTour from "@/pages/Admin/AddTour";
// import Analytics from "@/pages/Admin/Analytics";
import AddTourTypes from "@/pages/Admin/AddTourTypes";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import('@/pages/Admin/Analytics'));
const AddTour = lazy(() => import('@/pages/Admin/AddTour'));

export const adminSidebarItems : ISidebarItem[] = [
    {
      title: "Dashboard",      
      items: [
        {
          title: "Analysis",
          url: "/admin/analytics",
          component: Analytics
        },
        {
          title: "Add Tour",
          url: "/admin/add-tour",
          component: AddTour
        },
        {
          title: "Add Tour Types",
          url: "/admin/add-tour-types",
          component: AddTourTypes
        },
      ],
    }
  ];