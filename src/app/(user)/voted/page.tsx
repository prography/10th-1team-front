import { getActivityCalendar } from "@/apis/activity";
import VotedPageTemplate from "@/components/templates/VotedPageTemplate/VotedPageTemplate";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { requireLogin } from "../requireLogin";
import { parseKoreanDateInfo } from "@/utils/date";

export default async function VotedPage() {
  await requireLogin(`/voted`);

  const queryClient = new QueryClient();
  const date = parseKoreanDateInfo(new Date().toISOString());

  await queryClient.prefetchQuery({
    queryKey: ["votedActivity"],
    queryFn: () => getActivityCalendar(date.year, date.month),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <VotedPageTemplate />
    </HydrationBoundary>
  );
}
