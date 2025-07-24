import SavedGroupDetailTemplate from "@/components/templates/SavedGroupDetailTemplate/SavedGroupDetailTemplate";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getBookmarkedGroups, getBookmarkedPlaces } from "@/apis/activity";
import { requireLogin } from "../../requireLogin";

export default async function SavedGroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireLogin(`/saved`);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["bookmarkedGroups"],
    queryFn: getBookmarkedGroups,
  });
  await queryClient.prefetchQuery({
    queryKey: ["bookmarkedPlaces", id],
    queryFn: () => getBookmarkedPlaces(id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SavedGroupDetailTemplate id={id} />
    </HydrationBoundary>
  );
}
