import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Outlet, useLocation } from "react-router";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Link } from "react-router-dom";

const formatUrlToSegments = (path) => {
  return path
    .replace(/^\/+|\/+$/g, "") // Remove leading and trailing slashes
    .split("/") // Split by '/'
    .filter((segment) => segment.length > 0); // Filter out any empty segments
};

const routeLinks = {
  dashboard: "/dashboard",
  analytics: "/analytics",
  orders: "/orders",
  items: "/items",
  users: "/users",
  settings: "/settings",
  "staff-Performance": "/staff-performance",
  procurment: "/procurment",
  schedule: "/schedule",
};

const NewSidebarLayout = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  const parts = formatUrlToSegments(currentRoute);

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 " />
            <Separator
              orientation="vertical"
              className="mr-2 h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {parts.map((part, index) =>
                  index == parts.length - 1 ? (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbPage
                        key={index}
                        className="capitalize"
                      >
                        {part}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          key={index}
                          className="capitalize"
                          asChild
                        >
                          <Link
                            to={routeLinks[part] || ""}
                            className="transition-colors hover:text-foreground"
                          >
                            {part}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </BreadcrumbItem>
                    </>
                  )
                )}
                {/* </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default NewSidebarLayout;
