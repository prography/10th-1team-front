import React, { useState } from "react";
import Button from '@/components/atoms/Button/Button';

export interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  initialValue?: string;
  className?: string;
}

export default function Tabs({ items, initialValue, className }: TabsProps) {
  const [selected, setSelected] = useState(
    initialValue ?? items[0]?.value ?? ""
  );
  const selectedTab = items.find((tab) => tab.value === selected);

  return (
    <div className={className}>
      <div className="flex gap-[8px] py-[12px] px-[16px]">
        {items.map((tab) => (
          <Button
            key={tab.value}
            className={`px-[12px] h-[32px] rounded-[99px] caption-m-semibold transition
              ${selected === tab.value
                ? "bg-texticon-onnormal-highestemp text-texticon-onnormal-white"
                : "bg-button-neutral-bg_default border border-border-normal-lowemp text-texticon-onnormal-midemp"}
            `}
            onClick={() => setSelected(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div>
        {selectedTab?.content}
      </div>
    </div>
  );
} 