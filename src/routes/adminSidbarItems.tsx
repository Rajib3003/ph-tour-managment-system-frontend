import AddTour from "@/pages/Admin/AddTour";
import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItem } from "@/types";

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
      ],
    }
  ];