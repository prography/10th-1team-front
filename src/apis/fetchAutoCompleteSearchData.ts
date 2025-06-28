import { publicAPI } from "./customAxios";
import qs from "qs";
import type { AutoCompleteResponse, CategoryType } from "@/types/search";

export interface FetchAutoCompleteSearchDataParams {
  keyword: string;
  size?: number;
  dong_code?: string[];
  category?: CategoryType;
}

export async function fetchAutoCompleteSearchData({
  keyword,
  size = 10,
  dong_code = [],
  category,
}: FetchAutoCompleteSearchDataParams) {
  const params = {
    keyword,
    size,
    dong_code,
    category,
  };
  const { data } = await publicAPI.get<AutoCompleteResponse>("/search/auto", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, {
        skipNulls: true,
        arrayFormat: "repeat",
      }),
  });
  return data.data;
}
