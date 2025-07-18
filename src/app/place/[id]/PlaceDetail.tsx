"use client";

import { useMemo } from "react";
import AISummary from "@/components/organisms/AISummary/AISummary";
import ReviewMatch from "@/components/organisms/ReviewMatch/ReviewMatch";
import PlatformMatch from "@/components/organisms/PlatformMatch/PlatformMatch";
import PlaceDetailTemplate from "@/components/templates/PlaceDetailTemplate/PlaceDetailTemplate";
import PlaceLocation from "@/components/organisms/PlaceLocation/PlaceLocation";
import { usePlaceDetailPage } from "@/hooks/usePlaceDetailPage";
import {
  PlatformMatchSummary,
  PlatformMatchResultData,
} from "@/types/platformMatch";

export default function PlaceDetail({ placeId }: { placeId: string }) {
  const {
    data,
    isLoading,
    voteData,
    voteSummary,
    hasZeroReviews,
    router,
    platformVoteTab,
    handlePlatformVoteTabChange,
    reviewDetailClick,
    onVoteSubmit,
    onShare,
    onVote,
    onSave,
    isPlaceSaved,
  } = usePlaceDetailPage(placeId);

  const tabItems = useMemo(
    () => [
      {
        id: "intro",
        label: "AI 요약",
        content: (
          <AISummary
            summaryAi={data.summary_ai}
            strengths={data.strength_scores_dto.strengths}
          />
        ),
      },
      {
        id: "review",
        label: "리뷰매치",
        content: (
          <ReviewMatch
            kakaoScore={data.kakao_review_avg_score}
            naverScore={data.naver_review_avg_score}
            kakaoPlaceUri={data.kakao_place_uri}
            naverPlaceUri={data.naver_place_uri}
            kakaoReviews={data.kakao_reviews}
            naverReviews={data.naver_reviews}
            reviewDetailClick={reviewDetailClick}
          />
        ),
      },
      {
        id: "platform",
        label: "플랫폼매치",
        content: (
          <PlatformMatch
            onSubmit={onVoteSubmit}
            onVote={onVote}
            resultData={voteData as PlatformMatchResultData}
            voteSummary={voteSummary as PlatformMatchSummary}
            hasZeroReviews={hasZeroReviews}
            handlePlatformVoteTabChange={handlePlatformVoteTabChange}
            platformVoteTab={platformVoteTab}
          />
        ),
      },
      {
        id: "location",
        label: "위치",
        content: (
          <PlaceLocation
            address={data.road_address_name}
            latitude={data.y}
            longitude={data.x}
          />
        ),
      },
    ],
    [
      data,
      onVoteSubmit,
      voteData,
      reviewDetailClick,
      voteSummary,
      hasZeroReviews,
      onVote,
      handlePlatformVoteTabChange,
      platformVoteTab,
    ]
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
        category: data.category,
        naverScore: data.naver_review_avg_score,
        kakaoScore: data.kakao_review_avg_score,
        naverReviewCount: data.naver_review_count,
        kakaoReviewCount: data.kakao_review_count,
        address: data.road_address_name,
        location: data.dong_name,
        onShare: onShare,
        onSave: onSave,
        isPlaceSaved: isPlaceSaved || false,
      }}
      tabItems={tabItems}
      navHeight={108}
    />
  );
}
