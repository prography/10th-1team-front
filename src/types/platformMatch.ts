export interface Reason {
  reason: "MANY_REVIEWS" | "DETAILED" | "HONEST" | "ACCURATE";
  is_user_voted: boolean;
  count: number;
}

export interface PlatformResult {
  platform: "KAKAO" | "NAVER";
  is_user_voted: boolean;
  count: number;
  reasons: Reason[];
}

export interface PlatformMatchResultData {
  voted: boolean;
  results: PlatformResult[];
}
export interface PlatformMatchSummary {
  total: number;
  is_user_voted: boolean;
}

export const REASON_LABELS = {
  MANY_REVIEWS: "리뷰가 많아요",
  DETAILED: "디테일한 설명이 많아요",
  HONEST: "리뷰가 솔직해요",
  ACCURATE: "설명이 정확해요",
} as const;
