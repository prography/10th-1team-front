import { fetchSearchData, FetchSearchDataParams } from "@/apis/fetchSearchData";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { SearchResultResponse } from "@/types/search";

export function useInfiniteSearchQuery(
  params: FetchSearchDataParams & { enabled?: boolean }
) {
  const { enabled = true, dong_code = [], ...rest } = params;
  const normalizedDongCode = [...dong_code].sort();

  return useInfiniteQuery<SearchResultResponse["data"], Error>({
    queryKey: ["search", { ...rest, dong_code: normalizedDongCode }],
    queryFn: ({ pageParam }) =>
      fetchSearchData({
        ...rest,
        dong_code: normalizedDongCode,
        cursor: typeof pageParam === "string" ? pageParam : undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.has_next ? lastPage.cursor : undefined,
    enabled: enabled && Boolean(rest.keyword),
    staleTime: 10 * 1000,
    gcTime: 60 * 1000,
  });
}
