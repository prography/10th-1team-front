import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface MenuProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  className?: string;
  side?: "bottom" | "top";
  align?: "left" | "right" | "center";
  offset?: { x?: number; y?: number };
  children: ReactNode;
}

export default function Menu({
  open,
  anchorEl,
  onClose,
  className,
  side = "bottom",
  align = "left",
  offset = {},
  children,
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const updatePosition = useCallback(() => {
    if (!anchorEl || !menuRef.current) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const parentRect = anchorEl.offsetParent?.getBoundingClientRect() ?? {
      top: 0,
      left: 0,
    };
    const menu = menuRef.current;
    const menuHeight = menu.offsetHeight;
    const menuWidth = menu.offsetWidth;

    let top = 0;
    let left = 0;

    switch (side) {
      case "top":
        top = anchorRect.top - parentRect.top - menuHeight;
        break;
      case "bottom":
      default:
        top = anchorRect.bottom - parentRect.top;
        break;
    }

    switch (align) {
      case "right":
        left = anchorRect.right - parentRect.left - menuWidth;
        break;
      case "center":
        left =
          anchorRect.left -
          parentRect.left +
          (anchorRect.width - menuWidth) / 2;
        break;
      case "left":
      default:
        left = anchorRect.left - parentRect.left;
        break;
    }

    top += offset.y ?? 0;
    left += offset.x ?? 0;

    setPosition({ top, left });
  }, [anchorEl, side, align, offset]);

  useEffect(() => {
    if (open) requestAnimationFrame(updatePosition);
  }, [open, anchorEl, side, align, offset]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;

      if (!(target instanceof Node)) return;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        anchorEl &&
        !anchorEl.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [open, anchorEl, onClose]);

  if (!open || !anchorEl) return null;

  return (
    <div
      ref={menuRef}
      role="메뉴 선택"
      aria-hidden={!open}
      className={cn(
        "absolute z-2 w-full bg-surface-normal-container0 rounded shadow-[0px_2px_8px_0px_rgba(0,0,0,0.20)]",
        className
      )}
      style={{
        top: position?.top ?? -9999,
        left: position?.left ?? -9999,
      }}
    >
      {children}
    </div>
  );
}
