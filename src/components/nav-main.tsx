"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}

export const NavMain = ({ items }: NavMainProps) => {
  const pathname = usePathname();

  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              tooltip={item.title}
              size="lg"
              isActive={
                pathname === item.url ||
                (item.url !== "/" && pathname.startsWith(item.url + "/"))
              }
              asChild
            >
              <Link href={item.url} onClick={() => setOpenMobile(false)}>
                <div className="flex items-center gap-2">
                  <div className="flex w-8 h-8 items-center justify-center rounded-lg">
                    {item.icon && <item.icon />}
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <h2 className="font-semibold">{item.title}</h2>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
