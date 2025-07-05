import { publicAPI } from "./customAxios";

interface PlacePlatformMatchSummaryResponse {
  data: {
    total: number;
    is_user_voted: boolean;
  };
}
interface Review {
  id: string;
  author: string;
  review_platform: "NAVER" | "KAKAO";
  author_image_url: string | null;
  registered_at: string;
  contents: string;
  star_rating: number | null;
}
interface PlaceReviewResponse {
  data: {
    name: string;
    road_address_name: string;
    total_count: number;
    kakao_review_count: number;
    naver_review_count: number;
    kakao_place_uri: string;
    naver_place_uri: string;
    reviews: Review[];
  };
}

export const getPlaceDetail = async (id: string) => {
  try {
    const response = await publicAPI.get(`/restaurant/detail/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Place 상세 정보 조회 실패:", error);
    throw error;
  }
};

export const patchPlatformMatchVote = async (
  id: string,
  data: {
    platform: "KAKAO" | "NAVER";
    reasons: string[];
  }
) => {
  try {
    const response = await publicAPI.patch(`/vote/submit/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Platform 투표하기 실패:", error);
    throw error;
  }
};

export const getPlatformMatchResult = async (placeId: string) => {
  try {
    const response = await publicAPI.get(`/vote/${placeId}`);
    return response.data.data;
  } catch (error) {
    console.error("Platform 투표 결과 조회 실패:", error);
    throw error;
  }
};

export const getPlaceReview = async (placeId: string) => {
  try {
    const { data } = await publicAPI.get<PlaceReviewResponse>(
      `/restaurant/reviews/${placeId}`
    );
    return data.data;
  } catch (error) {
    console.error("Place 리뷰 조회 실패:", error);
    throw error;
  }
};

export const getPlacePlatformMatchSummary = async (placeId: string) => {
  try {
    const { data } = await publicAPI.get<PlacePlatformMatchSummaryResponse>(
      `/vote/summary/${placeId}`
    );
    return data.data;
  } catch (error) {
    console.error("Place 플랫폼 매치 요약 조회 실패:", error);
    throw error;
  }
};
