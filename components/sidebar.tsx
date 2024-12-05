"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { TDarkMode } from "@/types/darkmode.type";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BuildingLibraryIcon,
  ComputerDesktopIcon,
  HomeIcon,
  MoonIcon,
  RectangleStackIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import DARK_MODE from "@/constants/darkmode";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import User from "@/assets/images/user.png";
import ToolBox from "@/assets/images/tool-box.png";
import { usePathname } from "next/navigation";
const navItems = [
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: BuildingLibraryIcon, label: "Library", href: "/settings" },
  { icon: RectangleStackIcon, label: "History", href: "/profile" },
];

export function CustomAside() {
  const pathname = usePathname();
  return (
    <SidebarProvider className="w-auto">
      <Sidebar
        collapsible="icon"
        className="border-r py-5 px-[1.125rem] group-[[data-collapsible=icon]]:p-0 "
      >
        <SidebarHeader className="flex items-center justify-between  flex-row group-[[data-collapsible=icon]]:justify-center">
          <Image
            src={Logo.src}
            width={74}
            height={64}
            alt="logo"
            className="group-[[data-collapsible=icon]]:hidden"
          />
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent className="py-[70px] px-[14px] group-[[data-collapsible=icon]]:px-0 group-[[data-collapsible=icon]]:py-6">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem
                key={item.href}
                className="group-[[data-collapsible=icon]]:flex group-[[data-collapsible=icon]]:justify-center"
              >
                <SidebarMenuButton asChild className="rounded-lg">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3  min-h-[50px] text-black  group-[[data-collapsible=icon]]:p-0  group-[[data-collapsible=icon]]:justify-center",
                      {
                        "border border-[#E4E4E4]": pathname === item.href,
                      }
                    )}
                  >
                    <item.icon />
                    <span className="transition-opacity group-[[data-collapsible=icon]]:hidden text-base ">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center justify-between gap-2 flex-col-reverse">
            <DarkModeSwitcherPart />
            <UserMenu />
            <Storage />
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}

interface IStyledButtonProps {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  status: TDarkMode;
}
const StyledButton = ({ text, icon: Icon, status }: IStyledButtonProps) => {
  const { setTheme, theme } = useTheme();

  const handleClick = (mode: TDarkMode) => {
    const themes = [DARK_MODE.DARK, DARK_MODE.LIGHT, DARK_MODE.SYSTEM];
    const currentIndex = themes.indexOf(mode);
    setTheme(themes[currentIndex]);
  };

  if (!theme) return null;
  return (
    <button
      type="button"
      aria-label={`${text} Mode`}
      className={cn(
        "p-1.5",
        "rounded-full",
        "text-zinc-500 dark:hover:text-zinc-100",
        "flex flex-auto items-center gap-1 justify-center",
        "truncate",
        {
          "bg-white shadow-lg dark:bg-zinc-800 dark:text-white":
            theme === status,
          "hover:text-zinc-950": theme !== status,
        }
      )}
      onClick={() => handleClick(text.toLowerCase() as TDarkMode)}
    >
      <Icon className="text-xl h-4 w-4" />
      <span className="overflow-hidden truncate whitespace-nowrap">{text}</span>
    </button>
  );
};

const DarkModeSwitcherPart = () => {
  return (
    <div className="flex w-full overflow-hidden rounded-full bg-zinc-100 p-2 text-sm dark:bg-zinc-950 group-[[data-collapsible=icon]]:hidden">
      <StyledButton icon={MoonIcon} status={DARK_MODE.DARK} text="Dark" />
      <StyledButton icon={SunIcon} status={DARK_MODE.LIGHT} text="Light" />
      <StyledButton
        icon={ComputerDesktopIcon}
        status={DARK_MODE.SYSTEM}
        text="System"
      />
    </div>
  );
};

function UserMenu() {
  return (
    <div className="flex bg-[#f4f4f5] justify-start items-center rounded-lg w-full py-[10px] px-4 gap-[14px] relative">
      <div>
        <Image
          className="rounded"
          src={User}
          alt="user"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col text-[#717179]  group-[[data-collapsible=icon]]:hidden">
        <span className="font-bold">Scott</span>
        <span className="text-xs">Web Developer</span>
      </div>
      <span className="ml-auto  group-[[data-collapsible=icon]]:hidden inline-flex items-center justify-center px-2 border-2 rounded-lg text-white bg-amber-500 border-transparent text-xs font-bold">
        PRO
      </span>
      <span className="absolute end-0 top-0 -me-1 -mt-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
      </span>
    </div>
  );
}

function Storage() {
  return (
    <div className="flex bg-[#f4f4f5] justify-start items-center rounded-lg w-full py-[10px] px-4 gap-[14px] relative">
      <div>
        <Image
          className="rounded bg-white"
          src={ToolBox}
          alt="toolbox"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col text-[#717179] text-xs gap-[10px] group-[[data-collapsible=icon]]:hidden">
        <span>Total storage used: 100MB</span>
        <span>Storage remaining: 900MB</span>
      </div>
    </div>
  );
}
