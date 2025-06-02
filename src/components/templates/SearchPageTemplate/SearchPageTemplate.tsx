import SearchHeader from "@/components/organisms/SearchHeader/SearchHeader";
import SearchListSortTab from "@/components/organisms/SearchListSortTab/SearchListSortTab";
import SearchHistoryHeader from "@/components/organisms/SearchHistoryHeader/SearchHistoryHeader";
import SearchFilterTab from "@/components/organisms/SearchFilterTab/SearchFilterTab";
import SearchListContainer from "@/components/organisms/SearchListContainer/SearchListContainer";
import Divider from "@/components/atoms/Divider/Divider";

import type {
  AutoCompleteItem,
  SearchMode,
  SearchRecentItem,
  SearchResultItem,
} from "@/types/search";

interface SearchPageTemplateProps {
  mode: SearchMode;
  items: SearchResultItem[] | AutoCompleteItem[] | SearchRecentItem[];
  query: string;
  setQuery: (value: string) => void;
  onSearch: (value: string) => void;
  onDeleteHistory: (id: string) => void;
  onClearHistory: () => void;
  onItemClick: (
    item: SearchResultItem | AutoCompleteItem | SearchRecentItem
  ) => void;
  onBack: () => void;
  observerRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}

export default function SearchPageTemplate({
  mode,
  items,
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
  return (
    <div className="flex flex-col h-full w-full bg-surface-normal-container0">
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
            <SearchFilterTab onOpenFilterModal={() => {}} />
            <Divider />
            <SearchListSortTab openSortSheet={() => {}} />
          </>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {isLoading && <p className="py-4 text-center">불러오는 중...</p>}

        <SearchListContainer
          mode={mode}
          query={query}
          items={items}
          onItemClick={onItemClick}
          onDeleteHistory={onDeleteHistory}
        />

        {mode === "results" && <div ref={observerRef} className="h-[1px]" />}
      </div>
    </div>
  );
}
