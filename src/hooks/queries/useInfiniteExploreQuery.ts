import { fetchExploreData, SearchBaseParams } from "@/apis/fetchSearchData";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { SearchResultResponse } from "@/types/search";

export function useInfiniteExploreQuery(
  params: SearchBaseParams & { enabled?: boolean }
) {
  const { enabled = true, dong_code = [], ...rest } = params;
  const normalizedDongCode = [...dong_code].sort();

  return useInfiniteQuery<SearchResultResponse["data"], Error>({
    queryKey: ["search", { ...rest, dong_code: normalizedDongCode }],
    queryFn: ({ pageParam }) =>
      fetchExploreData({
        ...rest,
        dong_code: normalizedDongCode,
        cursor: typeof pageParam === "string" ? pageParam : undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.has_next ? lastPage.cursor : undefined,
    enabled: enabled,
    staleTime: 10 * 1000,
    gcTime: 60 * 1000,
  });
}
