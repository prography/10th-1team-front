"use client";

import ExplorePageTemplate from "@/components/templates/ExplorePageTemplate/ExplorePageTemplate";
import { useSearchContext } from "@/contexts/SearchContext";
import { useInfiniteExploreQuery } from "@/hooks/queries";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import useRegionStore from "@/store/useRegionStore";

export default function ExplorePage() {
  const { dong } = useRegionStore();

  const { state } = useSearchContext();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteExploreQuery({
      dong_code: dong.map((d) => d.dong_code),
      enabled: true,
      sort: state.currentSort,
      category: state.filters.foodTypes,
    });

  const searchResults = data?.pages.flatMap((page) => page.content) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  const observerRef = useIntersectionObserver(
    async () => {
      if (hasNextPage && !isFetchingNextPage) {
        await fetchNextPage();
      }
    },
    { rootMargin: "0px 0px 300px 0px" }
  );

  return (
    <ExplorePageTemplate
      total={totalCount}
      items={searchResults}
      onItemClick={() => {}}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      observerRef={observerRef}
    />
  );
}
