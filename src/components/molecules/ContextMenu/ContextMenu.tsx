import { JSX, ReactNode, useRef, useState } from "react";
import MenuItem, { MenuItemProps } from "./MenuItem";
import Menu from "./Menu";
import Divider from "@/components/atoms/Divider/Divider";
import React from "react";
import { cn } from "@/utils/cn";

interface ContextMenuProps {
  trigger: (props: JSX.IntrinsicElements["button"]) => ReactNode;
  items: MenuItemProps[];
  align?: "left" | "right" | "center";
  side?: "top" | "bottom";
  offset?: { x?: number; y?: number };
  icon?: ReactNode;
  className?: string;
}

export default function ContextMenu({
  trigger,
  items,
  align = "left",
  side = "bottom",
  offset = { x: 0, y: 0 },
  icon,
  className,
}: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleClose = () => setOpen(false);

  return (
    <div
      className={cn(
        "relative w-[160px] flex",
        className,
        align === "left" && "justify-start",
        align === "right" && "justify-end"
      )}
    >
      {trigger({
        ref: triggerRef,
        onClick: handleToggle,
      })}
      {open && (
        <Menu
          open={open}
          anchorEl={triggerRef.current}
          onClose={handleClose}
          align={align}
          side={side}
          offset={offset}
        >
          {items.map((item, i) => (
            <React.Fragment key={item.label}>
              <MenuItem
                label={item.label}
                onClick={(e) => {
                  item.onClick(e);
                  handleClose();
                }}
                selected={item.selected}
                icon={icon}
              />
              {i !== items.length - 1 && (
                <Divider thickness={0.5} variant="border" />
              )}
            </React.Fragment>
          ))}
        </Menu>
      )}
    </div>
  );
}
