import { getUserVotedActivity } from "@/apis/activity";
import VotedPageTemplate from "@/components/templates/VotedPageTemplate/VotedPageTemplate";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function VotedPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["votedActivity"],
    queryFn: getUserVotedActivity,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <VotedPageTemplate />
    </HydrationBoundary>
  );
}
