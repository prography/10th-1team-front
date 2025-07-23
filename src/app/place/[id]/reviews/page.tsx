"use client";

import { getPlaceReview } from "@/apis/place";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "@/components/molecules/ReviewCard/ReviewCard";
import PlaceReviewsTemplate from "@/components/templates/PlaceReviewsTemplate/PlaceReviewsTemplate";
import { useRouter } from "next/navigation";
import { use } from "react";

interface Review {
  id: string;
  author: string;
  review_platform: "NAVER" | "KAKAO";
  author_image_url: string | null;
  registered_at: string;
  contents: string;
  star_rating: number | null;
}

interface ReviewsPageProps {
  params: Promise<{ id: string }>;
}

export default function ReviewsPage({ params }: ReviewsPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getPlaceReview(id),
  });
  const router = useRouter();
  if (isLoading)
    return (
      <PlaceReviewsTemplate
        placeName="리뷰 상세 보기"
        onBack={() => router.back()}
        onHome={() => router.push("/")}
        isLoading={true}
      />
    );
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!data || !data.reviews || data.reviews.length === 0)
    return <div>리뷰가 없습니다.</div>;

  const tabItems = [
    {
      value: "review",
      label: "전체",
      content: (
        <div className="flex p-[16px] flex-col justify-center items-center gap-[12px] w-full">
          {data.reviews.map((review: Review) => (
            <ReviewCard
              key={review.id}
              author={review.author}
              registered_at={review.registered_at}
              contents={review.contents}
              starRating={review.star_rating ?? 0}
              expandable={true}
              fullWidth={true}
              platformColor={review.review_platform}
              showPlatformIcon={true}
              minHeight="auto"
            />
          ))}
        </div>
      ),
    },
    {
      value: "kakao",
      label: "카카오맵",
      content: (
        <div className="flex p-[16px] flex-col justify-center items-center gap-[12px] w-full">
          {data.reviews
            .filter((review: Review) => review.review_platform === "KAKAO")
            .map((review: Review) => (
              <ReviewCard
                key={review.id}
                author={review.author}
                registered_at={review.registered_at}
                contents={review.contents}
                expandable={true}
                fullWidth={true}
                starRating={review.star_rating || 0}
                minHeight="auto"
              />
            ))}
        </div>
      ),
    },
    {
      value: "naver",
      label: "네이버지도",
      content: (
        <div className="flex p-[16px] flex-col justify-center items-center gap-[12px] w-full">
          {data.reviews
            .filter((review: Review) => review.review_platform === "NAVER")
            .map((review: Review) => (
              <ReviewCard
                key={review.id}
                author={review.author}
                registered_at={review.registered_at}
                contents={review.contents}
                starRating={review.star_rating ?? 0}
                expandable={true}
                fullWidth={true}
                minHeight="auto"
              />
            ))}
        </div>
      ),
    },
  ];
  return (
    <PlaceReviewsTemplate
      placeName="리뷰 상세 보기"
      onBack={() => router.back()}
      onHome={() => router.push("/")}
      isLoading={false}
      placeReviewSummaryProps={{
        name: data.name,
        roadAddress: data.road_address_name,
        totalCount: data.total_count,
        kakaoCount: data.kakao_review_count,
        naverCount: data.naver_review_count,
        date: "2025.05.04",
      }}
      tabItems={tabItems}
      reviewPlatformLinksProps={{
        kakaoPlaceId: data.kakao_place_uri,
        naverPlaceId: data.naver_place_uri,
      }}
    />
  );
}
