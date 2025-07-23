import { useQuery } from "@tanstack/react-query";
import { getVoteCount } from "@/apis/place";

export function useVoteCountQuery(enabled: boolean = true) {
  return useQuery({
    queryKey: ["voteCount"],
    queryFn: getVoteCount,
    enabled,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
