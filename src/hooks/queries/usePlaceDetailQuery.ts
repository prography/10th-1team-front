import { useQuery } from "@tanstack/react-query";
import {
  getPlaceDetail,
  getPlacePlatformMatchSummary,
  getPlatformMatchResult,
} from "@/apis/place";
import { checkPlaceSaved } from "@/apis/group";

export function usePlaceDetailQuery(placeId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["place", placeId],
    queryFn: () => getPlaceDetail(placeId),
  });
  const { data: voteData } = useQuery({
    queryKey: ["platformMatchResult", placeId],
    queryFn: () => getPlatformMatchResult(decodeURIComponent(placeId)),
  });
  const { data: voteSummary } = useQuery({
    queryKey: ["platformMatchSummary", placeId],
    queryFn: async () => {
      const result = await getPlacePlatformMatchSummary(
        decodeURIComponent(placeId)
      );
      return result && "data" in result ? result.data : result;
    },
  });
  const { data: isPlaceSaved } = useQuery({
    queryKey: ["isPlaceSaved", placeId],
    queryFn: () => checkPlaceSaved(decodeURIComponent(placeId)),
  });

  return {
    data,
    isLoading,
    voteData,
    voteSummary,
    isPlaceSaved,
  };
}
