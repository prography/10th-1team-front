import { publicAPI } from "./customAxios";
import qs from "qs";
import type {
  CategoryType,
  SearchResultResponse,
  SortType,
} from "@/types/search";

export interface FetchSearchDataParams {
  keyword: string;
  size?: number;
  dong_code?: string[];
  cursor?: string;
  sort?: SortType;
  category?: CategoryType;
}

export async function fetchSearchData({
  keyword,
  size = 10,
  cursor,
  sort,
  category,
  dong_code = [],
}: FetchSearchDataParams) {
  const params = {
    keyword,
    size,
    dong_code,
    cursor,
    sort,
    category,
  };
  const { data } = await publicAPI.get<SearchResultResponse>("/search", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, {
        skipNulls: true,
        arrayFormat: "repeat",
      }),
  });
  return data.data;
}
