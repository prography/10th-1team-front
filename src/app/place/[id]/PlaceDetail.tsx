"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaceDetail } from "@/apis/place";
import { useRouter } from "next/navigation";
import AISummary from "@/components/organisms/AISummary/AISummary";
import ReviewMatch from "@/components/organisms/ReviewMatch/ReviewMatch";
import PlatformMatch from "@/components/organisms/PlatformMatch/PlatformMatch";
import PlaceDetailTemplate from "@/components/templates/PlaceDetailTemplate/PlaceDetailTemplate";
import PlaceLocation from "@/components/organisms/PlaceLocation/PlaceLocation";

export default function PlaceDetail({ placeId }: { placeId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["place", placeId],
    queryFn: () => getPlaceDetail(placeId),
  });
  const router = useRouter();
  const tabItems = useMemo(
    () => [
      {
        id: "intro",
        label: "AI 요약",
        content: <AISummary />,
      },
      {
        id: "review",
        label: "리뷰매치",
        content: (
          <ReviewMatch
            kakaoScore={data?.kakao_review_avg_score}
            naverScore={data?.naver_review_avg_score}
            kakaoPlaceUri={data?.kakao_place_uri}
            naverPlaceUri={data?.naver_place_uri}
            kakaoReviews={data?.kakao_reviews}
            naverReviews={data?.naver_reviews}
          />
        ),
      },
      {
        id: "platform",
        label: "플랫폼매치",
        content: <PlatformMatch />,
      },
      {
        id: "location",
        label: "위치",
        content: (
          <PlaceLocation
            address={data?.road_address_name}
            latitude={data?.y}
            longitude={data?.x}
          />
        ),
      },
    ],
    [data]
  );
  if (isLoading) return <div>로딩중...</div>;
  if (!data) return <div>데이터 없음</div>;

  return (
    <PlaceDetailTemplate
      placeName={data.name}
      onBack={() => router.back()}
      onHome={() => router.push("/")}
      placeCardProps={{
        images: data.photos.map((photo: { url: string }) => ({
          url: photo.url,
        })),
        name: data.name,
        category: "베트남 음식",
        naverScore: data.naver_review_avg_score,
        kakaoScore: data.kakao_review_avg_score,
        naverReviewCount: data.naver_review_count,
        kakaoReviewCount: data.kakao_review_count,
        address: data.road_address_name,
        location: "역삼동",
        onShare: () => alert("공유!"),
        onSave: () => alert("저장!"),
      }}
      tabItems={tabItems}
      navHeight={100}
    />
  );
}
