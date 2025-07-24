import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

import MainPage from "./main/MainPage";
import { fetchRecommendList } from "@/apis/fetchRecommendList";
import { getMyInfo } from "@/apis/user";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = new QueryClient();
  const user = await getMyInfo();
  await queryClient.prefetchQuery({
    queryKey: ["recommendList", { size: 3 }],
    queryFn: () => fetchRecommendList({ size: 3 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<></> /* TODO: 로딩 화면 추가 필요 */}>
        <MainPage initialUser={user} />
      </Suspense>
    </HydrationBoundary>
  );
}
