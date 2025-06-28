import { publicAPI } from "./customAxios";
import qs from "qs";
import type { SearchRecommendResponse } from "@/types/search";

export interface FetchRecommendListParams {
  size?: number;
  dong_code?: string[];
}

export async function fetchRecommendList({
  size = 3,
  dong_code = [],
}: FetchRecommendListParams) {
  const params = {
    size,
    dong_code,
  };
  const { data } = await publicAPI.get<SearchRecommendResponse>(
    "/search/recommend",
    {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, {
          skipNulls: true,
          arrayFormat: "repeat",
        }),
    }
  );
  return data.data;
}
