import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { DongInfo, Region } from "@/types/region";
import GANGNAM_REGIONS from "@/constants/gangnamRegions";

const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// 구별로 동 데이터 매핑
const REGION_MAP: Record<string, Record<string, Region[]>> = {
  서울특별시: {
    강남구: GANGNAM_REGIONS,
    // 서초구: SEOCHO_REGIONS,
    // ...추가 가능
  },
};

// 두 터치 포인트 간의 거리 계산
const getTouchDistance = (touches: TouchList) => {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

export function useDongMapPanel(
  selectedProvince: string,
  selectedCity: string,
  selectedDong: DongInfo[],
  onChangeSelectedDong: (dong: DongInfo[]) => void,
  onSelect: (dong: DongInfo[]) => void
) {
  const [zoomIndex, setZoomIndex] = useState(2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const tagContainerRef = useRef<HTMLDivElement>(null);

  const currentScale = ZOOM_LEVELS[zoomIndex];
  const currentRegions = REGION_MAP[selectedProvince][selectedCity];

  const handleRegionClick = (dong: DongInfo) => {
    if (!isDragging) {
      const isSelected = selectedDong.some(
        (d) => d.dong_code === dong.dong_code
      );
      if (isSelected) {
        onChangeSelectedDong(
          selectedDong.filter((d) => d.dong_code !== dong.dong_code)
        );
      } else {
        onChangeSelectedDong([...selectedDong, dong]);
      }
    }
  };

  const onToggleSelectAll = () => {
    if (selectedDong.length === GANGNAM_REGIONS.length) {
      onChangeSelectedDong([]);
    } else {
      onChangeSelectedDong(
        GANGNAM_REGIONS.map((region: Region) => ({
          name: region.name,
          dong_code: region.name,
        }))
      );
    }
  };

  const handleRemoveRegion = (dong: DongInfo) => {
    onChangeSelectedDong(
      selectedDong.filter((d) => d.dong_code !== dong.dong_code)
    );
  };

  const handleConfirm = () => {
    if (selectedDong.length == 0) return;
    onSelect(selectedDong);
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    if (delta > 0) {
      setZoomIndex((prev) => Math.max(0, prev - 1));
    } else {
      setZoomIndex((prev) => Math.min(ZOOM_LEVELS.length - 1, prev + 1));
    }
  }, []);

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 기존 핸들러 함수 분리
  const handleTouchStartEvent = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true);
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        });
      } else if (e.touches.length === 2) {
        const distance = getTouchDistance(e.touches);
        setLastTouchDistance(distance);
        e.preventDefault();
      }
    },
    [position.x, position.y]
  );

  const handleTouchMoveEvent = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && isDragging) {
        setPosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y,
        });
      } else if (e.touches.length === 2 && lastTouchDistance !== null) {
        const newDistance = getTouchDistance(e.touches);
        const difference = newDistance - lastTouchDistance;
        if (Math.abs(difference) > 10) {
          if (difference > 0) {
            setZoomIndex((prev) => Math.min(ZOOM_LEVELS.length - 1, prev + 1));
          } else {
            setZoomIndex((prev) => Math.max(0, prev - 1));
          }
          setLastTouchDistance(newDistance);
        }
      }
    },
    [isDragging, dragStart.x, dragStart.y, lastTouchDistance]
  );

  const handleZoomIn = () => {
    setZoomIndex((prev) => Math.min(ZOOM_LEVELS.length - 1, prev + 1));
  };

  const handleZoomOut = () => {
    setZoomIndex((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setZoomIndex(2);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchstart", handleTouchStartEvent, {
      passive: false,
    });
    el.addEventListener("touchmove", handleTouchMoveEvent, { passive: false });
    return () => {
      el.removeEventListener("touchstart", handleTouchStartEvent);
      el.removeEventListener("touchmove", handleTouchMoveEvent);
    };
  }, [handleTouchStartEvent, handleTouchMoveEvent]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useLayoutEffect(() => {
    const el = tagContainerRef.current;
    if (el) {
      setIsOverflow(el.scrollWidth > el.clientWidth);
    }
  }, [selectedDong]);

  return {
    zoomIndex,
    position,
    isDragging,
    containerRef,
    isOverflow,
    setIsOverflow,
    tagContainerRef,
    currentScale,
    currentRegions,
    handleRegionClick,
    onToggleSelectAll,
    handleRemoveRegion,
    handleConfirm,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleZoomIn,
    handleZoomOut,
    handleReset,
  };
}
