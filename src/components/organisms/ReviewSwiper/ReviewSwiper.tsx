import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ReviewCard from '@/components/molecules/ReviewCard/ReviewCard';

interface Review {
  id: string;
  author: string;
  author_image_url: string;
  registered_at: string;
  contents: string;
}

interface ReviewSwiperProps {
  reviews: Review[];
}

export default function ReviewSwiper({ reviews }: ReviewSwiperProps) {
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
    <Swiper
      slidesPerView="auto"
      spaceBetween={8}
      slidesOffsetBefore={16}
      slidesOffsetAfter={16}
    >
      {reviews.map((review) => (
        <SwiperSlide key={review.id} style={{ width: '280px' }}>
          <ReviewCard 
            author={review.author}
            registered_at={review.registered_at}
            contents={review.contents}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
} 