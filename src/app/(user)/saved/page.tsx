import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import SavedPageTemplate from "@/components/templates/SavedPageTemplate/SavedPageTemplate";
import { getBookmarkedGroups } from "@/apis/activity";
import { requireLogin } from "../requireLogin";

export default async function SavedPage() {
  await requireLogin(`/saved`);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["bookmarkedGroups"],
    queryFn: getBookmarkedGroups,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SavedPageTemplate />
    </HydrationBoundary>
  );
}
