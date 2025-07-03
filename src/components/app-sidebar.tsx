"use client";

import { Package, Warehouse } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import CustomDialog from "./custom-dialog";
import { ComponentProps, useState } from "react";
import LogoutComponent from "./logout-component";

const data = {
  main: [
    {
      title: "Product",
      url: "/product",
      icon: Package,
    },
    {
      title: "Rack",
      url: "/rack",
      icon: Warehouse,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return (
    <Sidebar {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={data.main} />
      </SidebarContent>
      <SidebarFooter>
        <Button variant="destructive" onClick={() => setShowLogoutDialog(true)}>
          Logout
        </Button>
        <CustomDialog
          open={showLogoutDialog}
          onOpenChange={() => setShowLogoutDialog(true)}
        >
          <LogoutComponent setShowLogoutDialog={setShowLogoutDialog} />
        </CustomDialog>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
