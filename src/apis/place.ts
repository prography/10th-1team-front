import { authProxyAPI, publicAPI } from "./customAxios";
import useUserStore from "@/store/useUserStore";
import { fetchWithAuth } from "./fetchWithAuth";
import { PlatformMatchSummary } from "@/types/platformMatch";

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

// 서버/클라이언트 환경에 따른 인증 처리 로직을 추출한 헬퍼 함수
const getAuthenticatedData = async <T>(endpoint: string): Promise<T> => {
  if (typeof window === "undefined") {
    // 서버 컴포넌트에서 실행되는 경우
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      const { data } = await publicAPI.get(endpoint);
      return data.data;
    } else {
      const data = await fetchWithAuth(endpoint);
      if (!(data as { data: unknown }).data) {
        const { data } = await publicAPI.get(endpoint);
        return data.data;
      }
      return (data as { data: T }).data;
    }
  } else {
    // 클라이언트에서 실행되는 경우
    const { user } = useUserStore.getState();
    const api = user ? authProxyAPI : publicAPI;
    const { data } = await api.get(endpoint);
    return data.data;
  }
};

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
    const response = await authProxyAPI.patch(`/vote/submit/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Platform 투표하기 실패:", error);
    throw error;
  }
};

export const getPlatformMatchResult = async (placeId: string) => {
  try {
    return await getAuthenticatedData(`/vote/${placeId}`);
  } catch (error) {
    console.error("Platform 투표 결과 조회 실패:", error);
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
    return await getAuthenticatedData<PlatformMatchSummary>(
      `/vote/summary/${placeId}`
    );
  } catch (error) {
    console.error("Place 플랫폼 매치 요약 조회 실패:", error);
  }
};

export const getVoteCount = async () => {
  try {
    const response = await authProxyAPI.get("/vote/count");
    return response.data.data;
  } catch (error) {
    console.error("총 투표 수 조회 실패:", error);
    throw error;
  }
};
