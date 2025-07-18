import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import PlaceDetail from "./PlaceDetail";
import {
  getPlaceDetail,
  getPlacePlatformMatchSummary,
  getPlatformMatchResult,
} from "@/apis/place";
import { checkPlaceSaved } from "@/apis/group";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PlacePage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["place", id],
    queryFn: () => getPlaceDetail(id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["platformMatchSummary", id],
    queryFn: () => getPlacePlatformMatchSummary(id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["platformMatchResult", id],
    queryFn: () => getPlatformMatchResult(id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["isPlaceSaved", id],
    queryFn: () => checkPlaceSaved(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PlaceDetail placeId={id} />
    </HydrationBoundary>
  );
}
