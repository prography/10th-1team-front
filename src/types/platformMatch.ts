export interface Reason {
  MANY_REVIEWS: number;
  DETAILED: number;
  HONEST: number;
  ACCURATE: number;
}

export interface PlatformResult {
  KAKAO: PlatformResultItem;
  NAVER: PlatformResultItem;
}

export interface PlatformResultItem {
  count: number;
  reasons: Reason;
}

export interface PlatformMatchResultData {
  total: number;
  voted: boolean;
  record: PlatformMatchRecord;
  results: PlatformResult;
}

export interface PlatformMatchRecord {
  platform: "KAKAO" | "NAVER";
  reason: ("MANY_REVIEWS" | "DETAILED" | "HONEST" | "ACCURATE")[];
  voted_date: string;
}

export type PlatformMatchSummary = {
  total: number;
  voted: boolean;
};

export const REASON_LABELS = {
  MANY_REVIEWS: "리뷰가 많아요",
  DETAILED: "디테일한 설명이 많아요",
  HONEST: "리뷰가 솔직해요",
  ACCURATE: "설명이 정확해요",
} as const;
