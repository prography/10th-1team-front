import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

import MainPage from "./main/MainPage";
import { fetchRecommendList } from "@/apis/fetchRecommendList";
import { getMyInfo } from "@/apis/user";

export default async function Home() {
  const queryClient = new QueryClient();
  const user = await getMyInfo();
  await queryClient.prefetchQuery({
    queryKey: ["recommendList", { size: 3 }],
    queryFn: () => fetchRecommendList({ size: 3 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPage initialUser={user} />
    </HydrationBoundary>
  );
}
