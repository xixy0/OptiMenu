import { Outlet } from "react-router";
import { Link, useParams } from "react-router-dom";
import { CircleUser, Menu, Hotel } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const adminRoutes = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Orders",
    link: "/orders",
  },
  {
    name: "Items",
    link: "/items",
  },
  {
    name: "Analytics",
    link: "/analytics",
  },
  {
    name: "Users",
    link: "/users",
  },
  {
    name: "Stats",
    link: "/staff-performance",
  },
  {
    name: "Procurement",
    link: "/procurement",
  },
  {
    name: "Schedule",
    link: "/schedule",
  },
];

export default function AdminLayout() {
  // const { id } = useParams();

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Hotel className="h-6 w-6" />
            <span className="sr-only">Optimenu</span>
          </Link>

          {adminRoutes.map((route) => (
            <Link
              key={route.name}
              to={route.link}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {route.name}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Hotel className="h-6 w-6" />
                <span className="sr-only">OptiMenu</span>
              </Link>
              {adminRoutes.map((route) => (
                <SheetClose asChild>
                  <Link
                    key={route.name}
                    to={route.link}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {route.name}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial"></form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white text-black hover:bg-white hover:text-black"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <Button variant="ghost">My Account</Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/settings">
                  <Button variant="ghost">Settings</Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/support">
                  <Button variant="ghost">Support</Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="ghost">Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
