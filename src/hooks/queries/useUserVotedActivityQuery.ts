import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivityCalendar } from "@/apis/activity";
import { useEffect } from "react";

export const useUserVotedActivityQuery = (year: number, month: number) => {
  const queryClient = useQueryClient();

  // 현재 달 데이터
  const query = useQuery({
    queryKey: ["votedActivity", year, month],
    queryFn: () => getActivityCalendar(year, month),
    staleTime: 1000 * 60 * 60 * 24,
  });

  // 이전달 / 다음달 prefetch
  useEffect(() => {
    const prev =
      month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
    const next =
      month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };

    queryClient.prefetchQuery({
      queryKey: ["votedActivity", prev.year, prev.month],
      queryFn: () => getActivityCalendar(prev.year, prev.month),
      staleTime: 1000 * 60 * 60 * 24,
    });

    queryClient.prefetchQuery({
      queryKey: ["votedActivity", next.year, next.month],
      queryFn: () => getActivityCalendar(next.year, next.month),
      staleTime: 1000 * 60 * 60 * 24,
    });
  }, [year, month, queryClient]);

  return query;
};
