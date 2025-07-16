import {
  fetchRecommendList,
  FetchRecommendListParams,
} from "@/apis/fetchRecommendList";
import { useQuery } from "@tanstack/react-query";

export const useRecommendListQuery = (params: FetchRecommendListParams) => {
  const normalizedDongCode = [...(params.dong_code || [])].sort();
  return useQuery({
    queryKey: ["recommendList", { ...params, dong_code: normalizedDongCode }],
    queryFn: () =>
      fetchRecommendList({
        ...params,
        dong_code: normalizedDongCode,
      }),
    staleTime: 120 * 1000,
  });
};
