"use client";

import ExplorePageTemplate from "@/components/templates/ExplorePageTemplate/ExplorePageTemplate";
import { useSearchContext } from "@/contexts/SearchContext";
import { useInfiniteExploreQuery } from "@/hooks/queries";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import useRegionStore from "@/store/useRegionStore";
import { AutoCompleteItem, SearchResultItem } from "@/types/search";
import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const router = useRouter();
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

  const goToPlaceDetail = (item: AutoCompleteItem | SearchResultItem) => {
    router.push(`/place/${item.id}`);
  };

  return (
    <ExplorePageTemplate
      total={totalCount}
      items={searchResults}
      onItemClick={(item: SearchResultItem) => goToPlaceDetail(item)}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      observerRef={observerRef}
    />
  );
}
