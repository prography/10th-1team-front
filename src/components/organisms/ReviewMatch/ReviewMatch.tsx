import React from "react";
import PlatformMoveButton from "@/components/molecules/PlatformMoveButton/PlatformMoveButton";
import PlatformInfo from "@/components/molecules/PlatformInfo/PlatformInfo";
import ReviewSwiper from "@/components/organisms/ReviewSwiper/ReviewSwiper";

interface Review {
  id: string;
  author: string;
  author_image_url: string;
  registered_at: string;
  contents: string;
  star_rating: number;
}

interface ReviewMatchProps {
  kakaoScore: number;
  naverScore: number;
  kakaoPlaceUri: string;
  naverPlaceUri: string;
  kakaoReviews: Review[];
  naverReviews: Review[];
  reviewDetailClick?: () => void;
}

export default function ReviewMatch({
  kakaoReviews,
  naverReviews,
  kakaoScore,
  naverScore,
  kakaoPlaceUri,
  naverPlaceUri,
  reviewDetailClick,
}: ReviewMatchProps) {
  return (
    <div className="bg-surface-normal-bg01 py-[24px] w-full max-w-full overflow-hidden">
      <h2 className="body-m-semibold px-[16px]">리뷰 매치</h2>

      <div className="py-[12px] px-[20px] mt-[12px] mb-[12px] mx-[16px] bg-surface-normal-container-b50 rounded-lg">
        <p className="body-m-semibold mb-2">별점이 안보인다면?</p>
        <p className="caption-m-regular text-texticon-onnormal-lowemp">
          2021년 이후 네이버 지도에선 새 별점을 남길 수 없어서 <br />
          이전 기록만 참고하실 수 있어요
        </p>
      </div>

      {/* 카카오 리뷰 Section */}
      <div className="mt-[24px]">
        <div className="flex justify-between items-center py-[12px] px-[16px]">
          <PlatformInfo platform="kakao" score={kakaoScore} />
          <PlatformMoveButton platform="kakao" placeId={kakaoPlaceUri} />
        </div>
        <div className="py-[12px]">
          <ReviewSwiper
            reviews={kakaoReviews}
            showMoreReviews={true}
            reviewMoreClick={reviewDetailClick}
          />
        </div>
      </div>

      {/* 네이버 리뷰 Section */}
      <div className="mt-[24px]">
        <div className="flex justify-between items-center py-[12px] px-[16px]">
          <PlatformInfo platform="naver" score={naverScore} />
          <PlatformMoveButton platform="naver" placeId={naverPlaceUri} />
        </div>
        <div className="py-[12px]">
          <ReviewSwiper
            reviews={naverReviews}
            showMoreReviews={true}
            reviewMoreClick={reviewDetailClick}
          />
        </div>
      </div>

      <div className="px-[16px] py-[14px] ">
        <button
          className="w-full h-[56px] border border-button-neutral-border rounded-lg bg-surface-normal-bg01 button-l-semibold cursor-pointer"
          onClick={reviewDetailClick}
        >
          리뷰 상세 보기
        </button>
      </div>
    </div>
  );
}
