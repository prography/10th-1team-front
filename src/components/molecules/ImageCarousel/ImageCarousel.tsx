import React, { useRef, useState } from "react";
import Icon from "@/components/atoms/Icon/Icon";
import Image from "next/image";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

interface ImageCarouselProps {
  images: { url: string }[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full h-[200px] select-none overflow-hidden">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
        slidesPerView={1}
        style={{ width: "100%", height: 200 }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img.url}
              alt={alt}
              width={600}
              height={200}
              className="w-full h-[200px] object-cover"
              priority={i === 0}
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {images.length > 1 && (
        <>
          {/* 왼쪽 버튼 - 첫 번째 이미지가 아닐 때만 표시 */}
          {current > 0 && (
            <IconButton
              className="absolute left-4 top-1/2 -translate-y-1/2 z-1 rotate-180"
              startIcon={<Icon icon="ImageNext" size={24} />}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="이전 이미지"
              type="button"
            />
          )}

          {/* 오른쪽 버튼 - 마지막 이미지가 아닐 때만 표시 */}
          {current < images.length - 1 && (
            <IconButton
              className="absolute right-4 top-1/2 -translate-y-1/2 z-1"
              startIcon={<Icon icon="ImageNext" size={24} />}
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="다음 이미지"
              type="button"
            />
          )}
          {/* 인덱스 */}
          <div className="w-[48px] h-[20px] absolute right-[16px] bottom-[17px] text-texticon-onnormal-white bg-surface-normal-bg06 rounded-[99px] inline-flex justify-center items-center z-10 caption-m-regular">
            {current + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}
