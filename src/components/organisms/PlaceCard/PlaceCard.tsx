import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import ImageCarousel from "@/components/molecules/ImageCarousel/ImageCarousel";
import PlatformScoreLabel from "@/components/molecules/PlatformScoreLabel/PlatformScoreLabel";
import { colors } from "@/styles/colors";

interface PlaceCardProps {
  name: string;
  category: string;
  naverScore: number | null;
  naverReviewCount: number | null;
  kakaoScore: number | null;
  kakaoReviewCount: number | null;
  address: string;
  location: string;
  images: { url: string }[]; // url 속성을 가진 객체 배열로 변경
  onShare?: () => void;
  onSave?: () => void;
  isPlaceSaved: boolean;
}

export default function PlaceCard({
  name,
  category,
  naverScore,
  naverReviewCount,
  kakaoScore,
  kakaoReviewCount,
  address,
  location,
  onShare,
  onSave,
  images,
  isPlaceSaved,
}: PlaceCardProps) {
  return (
    <div className="bg-surface-normal-bg01 w-full shadow flex flex-col">
      {/* 이미지 캐러셀 */}
      <ImageCarousel images={images} alt={name} />
      <div className="px-[16px] pt-[12px] pb-[24px]">
        {/* 가게이름, 카테고리 */}
        <div className="flex items-center gap-[16px] mb-[8px]">
          <span className="body-l-semibold">{name}</span>
          <span className="caption-m-semibold text-texticon-onnormal-lowemp">
            {category}
          </span>
        </div>
        {/* 카카오, 네이버 리뷰 평점 */}
        <div className="flex items-center gap-[8px] mb-[14px]">
          <PlatformScoreLabel
            platform="카카오"
            score={kakaoScore ?? 0}
            count={kakaoReviewCount ?? 0}
          />
          <PlatformScoreLabel
            platform="네이버"
            score={naverScore ?? 0}
            count={naverReviewCount ?? 0}
          />
        </div>
        {/* 주소 */}
        <div className="flex items-center body-s-regular gap-[4px]">
          <span>
            {address} · {location}
          </span>
        </div>
        {/* 룰렛, 저장, 공유 */}
        <div className="flex justify-between gap-2 mt-[16px] pt-[12px] border-t border-border-normal-lowemp">
          {/* <div
            className="flex items-center flex-1 flex-col justify-center cursor-pointer gap-[4px]"
            onClick={onSave}
          >
            <Icon size={24} icon="Rulet" />
            <span className="button-s-medium h-[18px]">룰렛</span>
          </div> */}
          <div
            className="flex items-center flex-1 flex-col justify-center cursor-pointer gap-[4px] "
            onClick={onSave}
          >
            <Icon
              size={24}
              icon="Save"
              fill={
                isPlaceSaved
                  ? colors.Brand.Primary.Light
                  : colors.TextIcon.OnNormal.White
              }
              stroke={
                isPlaceSaved
                  ? colors.TextIcon.OnNormal["Main 500"]
                  : colors.TextIcon.OnNormal.Black
              }
            />
            <span className="button-s-medium h-[18px]">저장</span>
          </div>
          <div
            className="flex items-center flex-1 flex-col justify-center cursor-pointer gap-[4px] border-l border-border-normal-lowemp"
            onClick={onShare}
          >
            <Icon size={24} icon="Share" />
            <span className="button-s-medium h-[18px]">공유</span>
          </div>
        </div>
      </div>
    </div>
  );
}
