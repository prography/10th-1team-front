import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

import MainPage from "./main/MainPage";
import { fetchRecommendList } from "@/apis/fetchRecommendList";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["recommendList", { size: 3 }],
    queryFn: () => fetchRecommendList({ size: 3 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPage />
    </HydrationBoundary>
  );
}
