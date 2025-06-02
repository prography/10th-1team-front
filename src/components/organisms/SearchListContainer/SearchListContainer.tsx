import {
  AutoCompleteItem,
  SearchMode,
  SearchRecentItem,
  SearchResultItem,
} from "@/types/search";
import {
  SearchAutoCompleteList,
  SearchHistoryList,
  SearchResultList,
} from "./lists";

interface SearchListContainerProps<T> {
  mode: SearchMode;
  query: string;
  items: T[];
  onItemClick: (item: T) => void;
  onDeleteHistory: (id: string) => void;
}

export default function SearchListContainer({
  mode,
  query,
  items,
  onItemClick,
  onDeleteHistory,
}: SearchListContainerProps<
  SearchRecentItem | AutoCompleteItem | SearchResultItem
>) {
  switch (mode) {
    case "history":
      return (
        <SearchHistoryList
          items={items as SearchRecentItem[]}
          onDeleteItem={onDeleteHistory}
          onItemClick={onItemClick}
        />
      );
    case "autocomplete":
      return (
        <SearchAutoCompleteList
          items={items as AutoCompleteItem[]}
          query={query}
          onItemClick={onItemClick}
        />
      );
    case "results":
      return (
        <SearchResultList
          items={items as SearchResultItem[]}
          onItemClick={onItemClick}
        />
      );
    default:
      return null;
  }
}
