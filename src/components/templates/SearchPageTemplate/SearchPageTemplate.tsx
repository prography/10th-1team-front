import SearchHeader from "@/components/organisms/SearchHeader/SearchHeader";
import SearchListSortTab from "@/components/organisms/SearchListSortTab/SearchListSortTab";
import SearchHistoryHeader from "@/components/organisms/SearchHistoryHeader/SearchHistoryHeader";
import SearchFilterTab from "@/components/organisms/SearchFilterTab/SearchFilterTab";
import Divider from "@/components/atoms/Divider/Divider";
import {
  SearchAutoCompleteList,
  SearchHistoryList,
  SearchResultList,
} from "@/components/organisms/SearchListContainer/lists";
import {
  SearchFilterBottomSheet,
  SearchSortBottomSheet,
} from "@/components/organisms/SearchBottomSheet";
import { useSearchContext } from "@/contexts/SearchContext";
import { usePortal } from "@/hooks/usePortal";

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
  observerRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
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
}: SearchPageTemplateProps) {
  const { currentSortLabel, openSheet, closeSheet, state } = useSearchContext();
  const createPortal = usePortal();

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
          <SearchHistoryHeader onClearHistory={onClearHistory} />
        )}
        {mode === "results" && (
          <>
            <SearchFilterTab
              onOpenFilterModal={() => {
                openSheet("filter");
              }}
            />
            <Divider />
            <SearchListSortTab
              totalCount={total}
              currentSortLabel={currentSortLabel}
              openSortSheet={() => {
                openSheet("sort");
              }}
            />
          </>
        )}
      </div>

      {/* 리스트 */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {isLoading && <p className="py-4 text-center">불러오는 중...</p>}

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
            <SearchResultList items={items} onItemClick={onItemClick} />
            {!isLoading && <div ref={observerRef} className="h-[1px]" />}
          </>
        )}
      </div>

      {/* 바텀시트 모달 */}
      {state.currentSheet === "sort" &&
        createPortal(<SearchSortBottomSheet onClose={closeSheet} />)}
      {state.currentSheet === "filter" &&
        createPortal(<SearchFilterBottomSheet onClose={closeSheet} />)}
    </div>
  );
}
