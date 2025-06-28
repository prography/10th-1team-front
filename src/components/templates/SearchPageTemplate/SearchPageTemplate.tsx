import SearchHeader from "@/components/organisms/SearchHeader/SearchHeader";
import SearchListSortTab from "@/components/organisms/SearchListSortTab/SearchListSortTab";
import SearchHistoryHeader from "@/components/organisms/SearchHistoryHeader/SearchHistoryHeader";
import SearchFilterTab from "@/components/organisms/SearchFilterTab/SearchFilterTab";
import Divider from "@/components/atoms/Divider/Divider";
import StoreInfoCardListSkeleton from "@/components/organisms/StoreInfoCard/StoreInfoCardListSkeleton";
import {
  SearchAutoCompleteList,
  SearchHistoryList,
  SearchResultList,
} from "@/components/organisms/SearchListContainer/lists";
import {
  SearchFilterBottomSheet,
  SearchSortBottomSheet,
} from "@/components/organisms/SearchBottomSheet";
import { usePortal } from "@/hooks/usePortal";
import { RefObject, useCallback, useState } from "react";

import type {
  AutoCompleteItem,
  SearchRecentItem,
  SearchResultItem,
} from "@/types/search";

export type ModePropsMap = {
  history: {
    items: SearchRecentItem[];
    onItemClick: (item: SearchRecentItem) => void;
  };
  autocomplete: {
    items: AutoCompleteItem[];
    onItemClick: (item: AutoCompleteItem) => void;
  };
  results: {
    total: number;
    items: SearchResultItem[];
    onItemClick: (item: SearchResultItem) => void;
  };
};

export type Mode = keyof ModePropsMap;

type SharedProps = {
  query: string;
  setQuery: (value: string) => void;
  onSearch: (value: string) => void;
  onDeleteHistory: (id: string) => void;
  onClearHistory: () => void;
  onBack: () => void;
  observerRef: RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  isFetchingNextPage: boolean;
};

type SearchPageTemplateProps = {
  [K in Mode]: SharedProps & { mode: K } & ModePropsMap[K] &
    (K extends "results" ? { total: number } : { total?: never });
}[Mode];

export default function SearchPageTemplate({
  mode,
  items,
  total,
  query,
  setQuery,
  onSearch,
  onDeleteHistory,
  onClearHistory,
  onItemClick,
  onBack,
  observerRef,
  isLoading,
  isFetchingNextPage,
}: SearchPageTemplateProps) {
  const createPortal = usePortal();

  const [currentSheet, setCurrentSheet] = useState<"sort" | "filter" | null>(
    null
  );
  const [initialTab, setInitialTab] = useState<"foodType" | "region">(
    "foodType"
  );

  const openSheet = useCallback(
    (sheetType: "sort" | "filter", initTab?: "foodType" | "region") => {
      setCurrentSheet(sheetType);
      if (initTab) {
        setInitialTab(initTab);
      }
    },
    []
  );

  const closeSheet = useCallback(() => {
    setCurrentSheet(null);
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-surface-normal-container0">
      {/* 헤더 */}
      <div className="sticky top-0 z-10">
        <SearchHeader
          query={query}
          onQueryChange={setQuery}
          onSearch={onSearch}
          onBack={onBack}
        />
        {(mode === "autocomplete" || mode === "history") && <Divider />}
        {mode === "history" && (
          <SearchHistoryHeader onClearHistory={onClearHistory} items={items} />
        )}
        {mode === "results" && (
          <>
            <SearchFilterTab openSheet={openSheet} />
            <Divider />
            <SearchListSortTab
              totalCount={total}
              openSortSheet={() => {
                openSheet("sort");
              }}
            />
          </>
        )}
      </div>

      {/* 리스트 */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {mode === "history" && (
          <SearchHistoryList
            items={items}
            onItemClick={onItemClick}
            onDeleteItem={onDeleteHistory}
          />
        )}
        {mode === "autocomplete" && (
          <SearchAutoCompleteList
            items={items}
            query={query}
            onItemClick={onItemClick}
          />
        )}
        {mode === "results" && (
          <>
            {isLoading ? (
              <StoreInfoCardListSkeleton count={2} />
            ) : (
              <SearchResultList items={items} onItemClick={onItemClick} />
            )}
            {isFetchingNextPage && <StoreInfoCardListSkeleton count={2} />}
            {!isLoading && <div ref={observerRef} className="h-[1px]" />}
          </>
        )}
      </div>

      {/* 바텀시트 모달 */}
      {currentSheet === "sort" &&
        createPortal(<SearchSortBottomSheet onClose={closeSheet} />)}
      {currentSheet === "filter" &&
        createPortal(
          <SearchFilterBottomSheet
            onClose={closeSheet}
            initialTab={initialTab}
          />
        )}
    </div>
  );
}
