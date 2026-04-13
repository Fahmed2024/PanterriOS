"use client";

import React, { useState } from "react";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export interface SlideInPanelDrawerProps {
  trigger: React.ReactNode;
  title: string;
  subtitle?: string;
  children:
    | React.ReactNode
    | ((setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode);
  width?: "sm" | "md" | "lg" | "xl";
  contentClassName?: string;
  direction?: "left" | "right";
}

const drawerWidthClasses = {
  sm: "data-[vaul-drawer-direction=right]:sm:!w-[420px] data-[vaul-drawer-direction=right]:sm:!max-w-[420px] data-[vaul-drawer-direction=left]:sm:!w-[420px] data-[vaul-drawer-direction=left]:sm:!max-w-[420px]",
  md: "data-[vaul-drawer-direction=right]:sm:!w-[520px] data-[vaul-drawer-direction=right]:sm:!max-w-[520px] data-[vaul-drawer-direction=left]:sm:!w-[520px] data-[vaul-drawer-direction=left]:sm:!max-w-[520px]",
  lg: "data-[vaul-drawer-direction=right]:sm:!w-[740px] data-[vaul-drawer-direction=right]:sm:!max-w-[740px] data-[vaul-drawer-direction=left]:sm:!w-[740px] data-[vaul-drawer-direction=left]:sm:!max-w-[740px]",
  xl: "data-[vaul-drawer-direction=right]:sm:!w-[92vw] data-[vaul-drawer-direction=right]:sm:!max-w-[1200px] data-[vaul-drawer-direction=left]:sm:!w-[92vw] data-[vaul-drawer-direction=left]:sm:!max-w-[1200px]",
};

export function SlideInPanelDrawer({
  trigger,
  title,
  subtitle,
  children,
  width = "md",
  contentClassName,
  direction = "right",
}: SlideInPanelDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const content = typeof children === "function" ? children(setIsOpen) : children;

  return (
    <Drawer direction={direction} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent
        className={cn(
          "w-full overflow-hidden overflow-y-auto ",
          drawerWidthClasses[width],
          contentClassName,
        )}
      >
        <DrawerHeader className="relative flex justify-between border-b border-[#E5E7EB] ">
          <div className="flex-1 items-center flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DBEAFE]">
              <FileText className="w-5 h-5 text-[#155DFC]" />
            </div>

            <div>
              <DrawerTitle className="text-lg font-semibold text-[#111827]">
                {title}
              </DrawerTitle>
              {subtitle && <p className="text-sm text-[#6B7280]">{subtitle}</p>}
            </div>
          </div>
          <DrawerClose
            asChild
            className="absolute top-[25%] right-5 cursor-pointer bg-gray-100 p-2 "
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 sm:px-1">{content}</div>
      </DrawerContent>
    </Drawer>
  );
}
