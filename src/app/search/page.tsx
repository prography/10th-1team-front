"use client";

import { useRouter } from "next/navigation";
import SearchPageTemplate from "@/components/templates/SearchPageTemplate/SearchPageTemplate";
import { useSearchContext } from "@/contexts/SearchContext";
import { useAutoCompleteQuery, useInfiniteSearchQuery } from "@/hooks/queries";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useSearchState } from "@/hooks/useSearchState";
import useRegionStore from "@/store/useRegionStore";

import type {
  AutoCompleteItem,
  SearchRecentItem,
  SearchResultItem,
} from "@/types/search";

export default function Search() {
  const router = useRouter();
  const { dong } = useRegionStore();

  const {
    query,
    setQuery,
    searchQuery,
    isSearching,
    isEditing,
    handleSearch,
    handleBack,
    mode,
  } = useSearchState();

  const { state } = useSearchContext();

  // 데이터 패칭 영역 (히스토리, 자동완성, 검색결과)
  const { searchHistory, addToHistory, removeFromHistory, clearHistory } =
    useSearchHistory();

  const { data: autoCompleteResults = [] } = useAutoCompleteQuery({
    keyword: query,
    enabled: isEditing,
    category: state.filters.foodTypes,
    dong_code: dong.map((d) => d.dong_code),
    debounceMs: 300,
  });

  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteSearchQuery({
    keyword: searchQuery,
    sort: state.currentSort,
    category: state.filters.foodTypes,
    dong_code: dong.map((d) => d.dong_code),
    enabled: isSearching && !!searchQuery,
  });

  const searchResults = searchData?.pages.flatMap((page) => page.content) ?? [];
  const totalCount = searchData?.pages[0]?.total ?? 0;

  const observerRef = useIntersectionObserver(
    async () => {
      if (hasNextPage && !isFetchingNextPage) {
        await fetchNextPage();
      }
    },
    { rootMargin: "0px 0px 300px 0px" }
  );

  const goToPlaceDetail = (item: AutoCompleteItem | SearchResultItem) => {
    addToHistory(item.name);
    router.push(`/place/${item.id}`);
  };

  const baseProps = {
    query,
    setQuery,
    onSearch: handleSearch,
    onDeleteHistory: removeFromHistory,
    onClearHistory: clearHistory,
    onBack: handleBack,
    observerRef: observerRef,
    isLoading,
    isFetchingNextPage,
  };

  switch (mode) {
    case "history":
      return (
        <SearchPageTemplate
          {...baseProps}
          mode="history"
          items={searchHistory}
          onItemClick={(item: SearchRecentItem) => handleSearch(item.query)}
        />
      );
    case "autocomplete":
      return (
        <SearchPageTemplate
          {...baseProps}
          mode="autocomplete"
          items={autoCompleteResults}
          onItemClick={(item: AutoCompleteItem) => goToPlaceDetail(item)}
        />
      );
    default:
      return (
        <SearchPageTemplate
          {...baseProps}
          mode="results"
          items={searchResults}
          total={totalCount}
          onItemClick={(item: SearchResultItem) => goToPlaceDetail(item)}
        />
      );
  }
}
