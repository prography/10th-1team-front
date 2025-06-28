import {
  fetchAutoCompleteSearchData,
  FetchAutoCompleteSearchDataParams,
} from "@/apis/fetchAutoCompleteSearchData";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";

interface UseAutoCompleteQueryParams extends FetchAutoCompleteSearchDataParams {
  enabled?: boolean;
  debounceMs?: number;
  minLength?: number;
}

export function useAutoCompleteQuery(params: UseAutoCompleteQueryParams) {
  const {
    keyword,
    enabled = true,
    debounceMs = 300,
    minLength = 1,
    dong_code = [],
    ...rest
  } = params;

  const debouncedKeyword = useDebounce(keyword, debounceMs);
  const canFetch = debouncedKeyword?.trim().length >= minLength && enabled;

  const normalizedDongCode = [...dong_code].sort();

  return useQuery({
    queryKey: [
      "autocomplete",
      { keyword: debouncedKeyword, dong_code: normalizedDongCode, ...rest },
    ],
    queryFn: () =>
      fetchAutoCompleteSearchData({
        ...rest,
        keyword: debouncedKeyword,
        dong_code: normalizedDongCode,
      }),
    enabled: canFetch,
    placeholderData: (prev) => (canFetch ? prev : undefined),
    staleTime: 3000,
    gcTime: 30 * 1000,
  });
}
