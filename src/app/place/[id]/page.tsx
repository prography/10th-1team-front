import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import PlaceDetail from "./PlaceDetail";
import { getPlaceDetail } from '@/apis/place';

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

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PlaceDetail placeId={id} />
    </HydrationBoundary>
  );
}
