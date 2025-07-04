import React, { useState } from "react";
import Button from "@/components/atoms/Button/Button";

export interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  initialValue?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function Tabs({
  items,
  initialValue,
  className,
  value,
  onChange,
}: TabsProps) {
  const isControlled = value !== undefined && onChange !== undefined;
  const [internalSelected, setInternalSelected] = useState(
    initialValue ?? items[0]?.value ?? ""
  );
  const selected = isControlled ? value : internalSelected;
  const selectedTab = items.find((tab) => tab.value === selected);

  const handleTabClick = (tabValue: string) => {
    if (isControlled) {
      onChange(tabValue);
    } else {
      setInternalSelected(tabValue);
    }
  };

  return (
    <div className={className}>
      <div className="flex gap-[8px] py-[12px] px-[16px]">
        {items.map((tab) => (
          <Button
            key={tab.value}
            className={`px-[12px] h-[32px] rounded-[99px] caption-m-semibold transition
              ${
                selected === tab.value
                  ? "bg-texticon-onnormal-highestemp text-texticon-onnormal-white"
                  : "bg-button-neutral-bg_default border border-border-normal-lowemp text-texticon-onnormal-midemp"
              }
            `}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div>{selectedTab?.content}</div>
    </div>
  );
}
