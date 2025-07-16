import React, { useState, useRef, useEffect } from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { colors } from "@/styles/colors";
import { cn } from "@/utils/cn";

interface ReviewCardProps {
  author: string; // 리뷰 작성자
  registered_at: string; // 리뷰 작성일
  contents: string; // 리뷰 내용
  starRating: number; // 별점
  expandable?: boolean; // 더보기/접기 기능 활성화 여부
  color?: string; // 카드 배경색 클래스명(직접 지정)
  width?: string | number; // 카드 가로 길이 (px, %, rem 등)
  fullWidth?: boolean; // true면 width 100%
  platformColor?: "NAVER" | "KAKAO"; // 네이버/카카오 스타일 지정
  showPlatformIcon?: boolean; // 플랫폼 아이콘 표시 여부
  minHeight?: string; // 최소 높이 지정
}

export default function ReviewCard({
  author,
  registered_at,
  contents,
  starRating,
  expandable = false,
  color,
  width = 300,
  fullWidth = false,
  platformColor,
  showPlatformIcon = false,
  minHeight = "148",
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  // 3줄 이상이면 토글 버튼 노출
  useEffect(() => {
    if (!expandable) return;
    const el = contentRef.current;
    if (el) {
      setShowToggle(el.scrollHeight > el.clientHeight + 2); // 약간의 오차 허용
    }
  }, [contents, expandable]);

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // 이름 마스킹 처리 (앞글자 한 글자 제외하고 별표로)
  const maskAuthorName = (name: string) => {
    if (name.length <= 1) return name;
    return name.charAt(0) + "*".repeat(name.length - 1);
  };

  const renderStars = () => {
    if (starRating === null) return null;
    return (
      <div className="flex mr-[-2px]">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Icon
            key={idx}
            icon="Star"
            size={16}
            fill={
              idx < starRating
                ? colors.Etc.Icon["Star-filled"]
                : colors.Etc.Icon["Star-empty"]
            }
          />
        ))}
      </div>
    );
  };

  const renderPlatformIcon = () => {
    if (!showPlatformIcon) return null;
    return (
      <Icon
        className="flex items-end"
        icon={platformColor === "NAVER" ? "Navermap" : "Kakaomap"}
        size={24}
      />
    );
  };

  // width 스타일 처리
  let cardWidth: string | undefined = undefined;
  if (fullWidth) {
    cardWidth = "100%";
  } else if (width) {
    cardWidth = typeof width === "number" ? `${width}px` : width;
  }

  // 배경 및 보더 스타일 처리
  let cardBgClass = "bg-surface-normal-bg10";
  let borderStyle = undefined;
  let buttonTextColor: string | undefined = undefined;
  if (platformColor === "NAVER") {
    cardBgClass = "";
    borderStyle = {
      border: `1px solid ${colors.Brand.Naver.Main}`,
      borderRadius: "8px",
    };
    buttonTextColor = colors.Brand.Naver.Deep;
  } else if (platformColor === "KAKAO") {
    cardBgClass = "";
    borderStyle = {
      border: `1px solid ${colors.Brand.KaKao.Blue}`,
      borderRadius: "8px",
    };
    buttonTextColor = colors.Brand.KaKao.Blue;
  } else if (color) {
    cardBgClass = color;
  }

  // 최소 높이 클래스 처리
  const minHeightClass =
    minHeight === "auto"
      ? ""
      : minHeight
        ? `min-h-[${minHeight}px]`
        : "min-h-[148px]";

  return (
    <div
      className={cn(
        "p-[16px] rounded-lg flex flex-col gap-[12px] relative",
        minHeightClass,
        cardBgClass
      )}
      style={{
        width: cardWidth,
        ...(borderStyle || {}),
      }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-[8px]">
          <span className="body-s-semibold">{maskAuthorName(author)}</span>
          <div className="flex items-end gap-[12px]">
            {renderStars()}
            <span className="caption-s-regular text-texticon-onnormal-midemp">
              {formatDate(registered_at)}
            </span>
          </div>
        </div>
        {renderPlatformIcon()}
      </div>
      <p
        ref={contentRef}
        className={cn(
          "body-s-regular text-texticon-onnormal-highemp",
          !expanded && "line-clamp-3"
        )}
        style={{ wordBreak: "break-all" }}
      >
        {contents}
      </p>
      {expandable && showToggle && (
        <div
          className={
            "flex justify-end caption-m-semibold cursor-pointer select-none"
          }
          style={buttonTextColor ? { color: buttonTextColor } : undefined}
          role="button"
          tabIndex={0}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "접기" : "더보기"}
        </div>
      )}
    </div>
  );
}
