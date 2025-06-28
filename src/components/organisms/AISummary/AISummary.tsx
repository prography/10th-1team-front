"use client";

import Tabs from "@/components/organisms/Tabs/Tabs";
import Image from "next/image";

const tabItems = [
  {
    label: "음식만족도",
    value: "food",
    content: (
      <div className="flex justify-center items-center w-full">
        <Image src="/images/graph.svg" alt="food" width={328} height={260} />
      </div>
    ),
  },
  {
    label: "가격만족도",
    value: "price",
    content: (
      <div className="flex justify-center items-center w-full">
        <Image src="/images/graph.svg" alt="food" width={328} height={260} />
      </div>
    ),
  },
  {
    label: "서비스",
    value: "service",
    content: (
      <div className="flex justify-center items-center w-full">
        <Image src="/images/graph.svg" alt="food" width={328} height={260} />
      </div>
    ),
  },
  {
    label: "분위기",
    value: "atmosphere",
    content: (
      <div className="flex justify-center items-center w-full">
        <Image src="/images/graph.svg" alt="food" width={328} height={260} />
      </div>
    ),
  },
];

export default function AISummary() {
  return (
    <div className="flex flex-col py-[24px] w-full bg-surface-normal-bg01">
      <p className="body-m-semibold px-[16px]">AI 요약</p>
      <Tabs items={tabItems} />
    </div>
  );
}
