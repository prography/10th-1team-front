"use client";
import Button from "@/components/atoms/Button/Button";
import Divider from "@/components/atoms/Divider/Divider";
import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabScrollProps {
  items: TabItem[];
  scrollTargetRef?: React.RefObject<HTMLElement | Window>;
  navHeight?: number;
}

export default function TabScroll({
  items,
  scrollTargetRef,
  navHeight = 0,
}: TabScrollProps) {
  const [activeTab, setActiveTab] = useState("");

  // items 배열을 메모이제이션하여 불필요한 재렌더링 방지
  const memoizedItems = useMemo(() => items, [items]);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const elementPosition = el.getBoundingClientRect().top;
      let offsetPosition;
      if (
        scrollTargetRef &&
        scrollTargetRef.current &&
        scrollTargetRef.current !== window
      ) {
        // 컨테이너 스크롤
        const container = scrollTargetRef.current as HTMLElement;
        offsetPosition = el.offsetTop - navHeight;
        container.scrollTo({ top: offsetPosition, behavior: "auto" });
      } else {
        // window 스크롤
        offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({ top: offsetPosition, behavior: "auto" });
      }
      setActiveTab(id);
    },
    [scrollTargetRef, navHeight]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    memoizedItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [memoizedItems]);

  return (
    <div className="bg-surface-normal-bg01 w-full">
      {/* 탭 버튼 */}
      <nav className="sticky top-[56px] z-20 flex border-b-[0.5px] bg-white border-texticon-onnormal-lowestemp px-[16px]">
        {memoizedItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => scrollToId(item.id)}
            className={`flex-1 py-[14px] button-m-medium ${
              activeTab === item.id
                ? "self-stretch border-b-2 text-texticon-onnormal-highestemp border-texticon-onnormal-highestemp inline-flex justify-center items-center gap-2.5"
                : "text-texticon-onnormal-lowestemp"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </nav>

      {/* 섹션 콘텐츠 */}
      <div>
        {memoizedItems.map((item) => (
          <section key={item.id} id={item.id} className="scroll-mt-[48px]">
            {item.content}
            <Divider />
          </section>
        ))}
      </div>
    </div>
  );
}
