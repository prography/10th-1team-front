import { publicAPI } from "./customAxios";
import qs from "qs";
import type {
  CategoryType,
  SearchResultResponse,
  SortType,
} from "@/types/search";

export interface SearchBaseParams {
  size?: number;
  dong_code?: string[];
  cursor?: string;
  sort?: SortType;
  category?: CategoryType;
}
export interface FetchSearchDataParams extends SearchBaseParams {
  keyword: string;
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

export async function fetchExploreData({
  size = 10,
  cursor,
  sort,
  category,
  dong_code = [],
}: SearchBaseParams) {
  const params = {
    size,
    dong_code,
    cursor,
    sort,
    category,
  };
  const { data } = await publicAPI.get<SearchResultResponse>("/search/look", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, {
        skipNulls: true,
        arrayFormat: "repeat",
      }),
  });
  return data.data;
}
