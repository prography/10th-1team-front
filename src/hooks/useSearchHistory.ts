import { useState, useEffect } from "react";
import LocalStorage from "@/utils/localStorage";
import type { SearchRecentItem } from "@/types/search";

const SEARCH_HISTORY_KEY = "search_history";
const MAX_HISTORY_COUNT = 10;

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchRecentItem[]>([]);

  useEffect(() => {
    try {
      const stored = LocalStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) {
        const history = JSON.parse(stored) as SearchRecentItem[];
        setSearchHistory(Array.isArray(history) ? history : []);
      }
    } catch (error) {
      console.error("Failed to load search history:", error);
    }
  }, []);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;

    const newHistoryItem: SearchRecentItem = {
      id: Date.now().toString(),
      query: query.trim(),
    };

    const updatedHistory = [
      newHistoryItem,
      ...searchHistory.filter((item) => item.query !== query),
    ].slice(0, MAX_HISTORY_COUNT);

    setSearchHistory(updatedHistory);
    LocalStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const removeFromHistory = (id: string) => {
    const updatedHistory = searchHistory.filter((item) => item.id !== id);
    setSearchHistory(updatedHistory);
    LocalStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    LocalStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  return { searchHistory, addToHistory, removeFromHistory, clearHistory };
}
