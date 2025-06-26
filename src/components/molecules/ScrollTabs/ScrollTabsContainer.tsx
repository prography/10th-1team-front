import { cn } from "@/utils/cn";
import {
  useRef,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useState,
  RefObject,
} from "react";

interface ScrollTabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  sectionRefs: RefObject<Record<string, HTMLDivElement>>;
  scrollToSection: (value: string) => void;
  tabOrder: RefObject<string[]>;
}

const ScrollTabsContext = createContext<ScrollTabsContextType | undefined>(
  undefined
);

export const useScrollTabs = () => {
  const context = useContext(ScrollTabsContext);
  if (!context) {
    throw new Error("useScrollTabs must be used within ScrollTabsContainer");
  }
  return context;
};

interface ScrollTabsContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollTabsContainer({
  children,
  className = "",
}: ScrollTabsContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement>>({});
  const tabOrder = useRef<string[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const ticking = useRef(false);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (!containerRef.current || tabOrder.current.length === 0) return;

    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollTop = containerRef.current!.scrollTop;
        const scrollHeight = containerRef.current!.scrollHeight;
        const clientHeight = containerRef.current!.clientHeight;

        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

        let activeValue = tabOrder.current[0];

        if (isNearBottom) {
          // 스크롤이 거의 바닥 근처에 도달했을 경우 마지막 탭으로 처리
          activeValue = tabOrder.current[tabOrder.current.length - 1];
        } else {
          // 각 섹션의 top 위치와 현재 스크롤 위치의 거리 차를 기준으로 가장 가까운 섹션 탐색
          const offsets = tabOrder.current.map((value) => {
            const section = sectionRefs.current[value];
            if (!section) return Infinity;

            const rect = section.getBoundingClientRect();
            const containerRect = containerRef.current!.getBoundingClientRect();

            return Math.abs(rect.top - containerRect.top);
          });

          const minIndex = offsets.indexOf(Math.min(...offsets));
          activeValue = tabOrder.current[minIndex];
        }

        setActiveTab(activeValue);
        ticking.current = false;
      });

      ticking.current = true;
    }
  };

  const scrollToSection = (value: string) => {
    const section = sectionRefs.current[value];
    const container = containerRef.current;

    if (section && container) {
      const containerTop = container.getBoundingClientRect().top;
      const sectionTop = section.getBoundingClientRect().top;

      // 섹션 요소의 화면 위치와 컨테이너 위치 차이를 계산해서 해당 위치로 스크롤
      const offset = sectionTop - containerTop + container.scrollTop;

      container.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!activeTab && tabOrder.current.length > 0) {
      // 초깃값 세팅
      setActiveTab(tabOrder.current[0]);
    }
  }, [activeTab]);

  return (
    <ScrollTabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        containerRef,
        sectionRefs,
        scrollToSection,
        tabOrder,
      }}
    >
      <div className={cn("flex flex-col h-full overflow-y-auto", className)}>
        {children}
      </div>
    </ScrollTabsContext.Provider>
  );
}
