export type SearchMode = "history" | "autocomplete" | "results";

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
    content: SearchResultItem[];
    has_next: boolean;
  };
  time: string;
}
