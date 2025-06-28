export type SearchMode = "history" | "autocomplete" | "results";

export type SortType =
  | "RELATED"
  | "AVERAGE_RATING_HIGH"
  | "AVERAGE_RATING_LOW"
  | "REVIEW_COUNT_HIGH"
  | "REVIEW_COUNT_LOW";

export type CategoryType =
  | "UNDEFINED"
  | "FD01"
  | "FD02"
  | "FD03"
  | "FD04"
  | "FD05"
  | "FD06"
  | "FD07"
  | "FD08"
  | "FD09"
  | "FD10"
  | "FD11"
  | "FD12";

export interface FilterOption<T> {
  value: T;
  label: string;
}

export type Region = {
  dong_name: string;
  dong_code: string;
};

export type ReviewScore = {
  count: number;
  score: number;
  processed: boolean;
};

export type BasePlace = {
  id: string;
  region: Region;
  road_addresses: string;
  category: string;
  name: string;
};

export type SearchRecentItem = {
  id: string;
  query: string;
};

export type AutoCompleteItem = BasePlace;

export type SearchResultItem = BasePlace & {
  addresses: string;
  image_url: string;
  kakao: ReviewScore;
  naver: ReviewScore;
};

export interface AutoCompleteResponse {
  data: AutoCompleteItem[];
  time: string;
}

export interface SearchResultResponse {
  data: {
    total: number;
    content: SearchResultItem[];
    has_next: boolean;
    cursor: string;
  };
  time: string;
}

export interface SearchRecommendResponse {
  data: SearchResultItem[];
  time: string;
}
