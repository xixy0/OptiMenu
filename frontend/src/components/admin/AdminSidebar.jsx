import {
  Activity,
  AudioWaveform,
  BarChart3,
  CalendarCheck,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  ListOrdered,
  Package,
  Users,
  Utensils,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import NavLinks from "@/components/admin/NavLinks";
import NavUser from "@/components/admin/NavUser";
import NavRestaurantSwitcher from "@/components/admin/NavRestaurantSwitcher";

const data = {
  user: {
    name: "RestOwner",
    email: "owner@restaurant.com",
  },
  restaurants: [
    {
      name: "Restaurant 1",
      logo: GalleryVerticalEnd,
      // plan: "Enterprise",
    },
    {
      name: "Restaurant 2",
      logo: AudioWaveform,
      // plan: "Startup",
    },
    {
      name: "Restaurant 3",
      logo: Command,
      // plan: "Free",
    },
  ],
  navLinks: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ListOrdered,
    },
    {
      title: "Items",
      url: "/items",
      icon: Utensils,
    },

    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Staff Performance",
      url: "/staff-performance",
      icon: Activity,
    },
    {
      title: "Procurement",
      url: "/procurement",
      icon: Package,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: CalendarCheck,
    },
  ],
};

const AdminSidebar = ({ ...props }) => {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <NavRestaurantSwitcher restaurants={data.restaurants} />
      </SidebarHeader>
      <SidebarContent>
        <NavLinks items={data.navLinks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
