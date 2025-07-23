import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import ReviewCard from "@/components/molecules/ReviewCard/ReviewCard";
import Icon from "@/components/atoms/Icon/Icon";

interface Review {
  id: string;
  author: string;
  author_image_url: string;
  registered_at: string;
  contents: string;
  star_rating: number;
}

interface ReviewSwiperProps {
  reviews: Review[];
  showMoreReviews?: boolean; // 리뷰 더보기 버튼 표시 여부
  reviewMoreClick?: () => void;
}

export default function ReviewSwiper({
  reviews,
  showMoreReviews = false,
  reviewMoreClick,
}: ReviewSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Swiper 초기화 및 업데이트
  useEffect(() => {
    if (swiperRef.current && reviews.length > 0) {
      // 초기화 완료 표시
      setIsInitialized(true);

      // 약간의 지연 후 업데이트 실행
      const timer = setTimeout(() => {
        if (swiperRef.current) {
          swiperRef.current.update();
          swiperRef.current.updateSlides();
          swiperRef.current.updateProgress();
          swiperRef.current.updateSlidesClasses();
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [reviews]);

  // ResizeObserver로 컨테이너 크기 변경 감지
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 리뷰가 없고 마지막 슬라이드 컨텐츠도 없는 경우
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 bg-surface-normal-bg10 rounded-lg mx-[16px] h-[148px] flex items-center justify-center">
        <p className="text-texticon-onnormal-lowestemp body-s-semibold">
          플랫폼에 작성된 리뷰가 없어요
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        opacity: isInitialized ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView="auto"
        spaceBetween={8}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        observer={true}
        observeParents={true}
        resizeObserver={true}
        watchSlidesProgress={true}
        preventInteractionOnTransition={true}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} style={{ width: "300px" }}>
            <ReviewCard
              author={review.author}
              registered_at={review.registered_at}
              contents={review.contents}
              starRating={review.star_rating}
            />
          </SwiperSlide>
        ))}

        {/* 마지막 슬라이드에 특정 카드 추가 */}
        {showMoreReviews && reviews.length > 0 && (
          <SwiperSlide style={{ width: "300px" }}>
            <div
              className="cursor-pointer body-s-semibold text-texticon-onnormal-lowemp min-h-[148px] flex  justify-center items-center bg-surface-normal-bg10 p-[16px] rounded-lg gap-[10px] relative"
              onClick={reviewMoreClick}
            >
              리뷰더보기
              <Icon icon="PageMove" size={20} />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
