import { useQuery } from "@tanstack/react-query";
import { getUserVotedActivity } from "@/apis/activity";

export const useUserVotedActivityQuery = () => {
  return useQuery({
    queryKey: ["votedActivity"],
    queryFn: getUserVotedActivity,
  });
};
