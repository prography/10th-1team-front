import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getBookmarkedPlaces } from "@/apis/activity";
import type { PlaceInfo } from "@/types/activity";

export function useBookmarkedPlacesQuery(
  id: string,
  options?: UseQueryOptions<{
    group_id: string;
    group_name: string;
    icon: string;
    total: number;
    places: PlaceInfo[];
  }>
) {
  return useQuery<{
    group_id: string;
    group_name: string;
    icon: string;
    total: number;
    places: PlaceInfo[];
  }>({
    queryKey: ["bookmarkedPlaces", id],
    queryFn: () => getBookmarkedPlaces(id),
    ...options,
  });
}
