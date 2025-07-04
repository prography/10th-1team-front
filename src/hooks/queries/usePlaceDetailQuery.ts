import { useQuery } from "@tanstack/react-query";
import {
  getPlaceDetail,
  getPlacePlatformMatchSummary,
  getPlatformMatchResult,
} from "@/apis/place";

export function usePlaceDetailQuery(placeId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["place", placeId],
    queryFn: () => getPlaceDetail(placeId),
  });
  const { data: voteData, refetch } = useQuery({
    queryKey: ["platformMatchResult", placeId],
    queryFn: () => getPlatformMatchResult(decodeURIComponent(placeId)),
  });
  const { data: voteSummary, refetch: refetchVoteSummary } = useQuery({
    queryKey: ["platformMatchSummary", placeId],
    queryFn: () => getPlacePlatformMatchSummary(decodeURIComponent(placeId)),
  });

  return {
    data,
    isLoading,
    voteData,
    refetch,
    voteSummary,
    refetchVoteSummary,
  };
}
