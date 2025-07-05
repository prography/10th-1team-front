import Image from "next/image";
import PlatformScoreLabel from "./PlatformScoreLabel";
import { cn } from "@/utils/cn";
import { useState } from "react";
import type { SearchResultItem } from "@/types/search";

interface StoreInfoCardProps {
  item: SearchResultItem;
  className?: string;
  onClick?: () => void;
}

export default function StoreInfoCard({
  item,
  className,
  onClick,
}: StoreInfoCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(
    item.image_url && item.image_url !== ""
      ? item.image_url
      : "/images/fallback.webp"
  );

  const handleImageError = () => {
    setImageSrc("/images/fallback.webp");
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div
      className={cn(
        "flex-1 px-[16px] py-[12px] bg-surface-normal-bg01 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-[16px] mb-[4px]">
        <span className="body-l-semibold text-texticon-onnormal-highestemp">
          {item.name}
        </span>
        <span className="caption-m-semibold text-texticon-onnormal-lowemp">
          {item.category}
        </span>
      </div>
      <div className="caption-m-regular text-texticon-onnormal-midemp mb-[12px]">
        {item.road_addresses ?? "주소 없음"}
        {item.region?.dong_name ?? "--"}
      </div>
      <div className="flex items-center gap-[8px] mb-[12px]">
        <PlatformScoreLabel
          platform="카카오"
          score={item.kakao.score}
          count={item.kakao.count}
        />
        <PlatformScoreLabel
          platform="네이버"
          score={item.naver.score}
          count={item.naver.count}
        />
      </div>

      <div
        className={cn(
          "relative w-full aspect-[328/160] bg-gray-100 rounded-[4px] overflow-hidden border-[0.5px] border-border-normal-lowemp",
          imageLoading && "animate-pulse"
        )}
      >
        <Image
          src={imageSrc}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
          priority={false}
        />
      </div>
    </div>
  );
}
