import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getBookmarkedGroups } from "@/apis/activity";
import type { GroupInfo } from "@/types/activity";

export function useBookmarkedGroupsQuery(
  options?: UseQueryOptions<{ total: number; groups: GroupInfo[] }>
) {
  return useQuery<{ total: number; groups: GroupInfo[] }>({
    queryKey: ["bookmarkedGroups"],
    queryFn: getBookmarkedGroups,
    staleTime: 60 * 1000,
    ...options,
  });
}
