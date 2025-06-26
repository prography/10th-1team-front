"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { getSortLabel } from "@/constants/sortOptions";
import type { CategoryType, SortType } from "@/types/search";

interface SearchState {
  currentSort: SortType;
  filters: {
    foodTypes: CategoryType | undefined;
  };
  currentSheet: "sort" | "filter" | null;
  initialTab?: "foodType" | "region";
}

type SearchAction =
  | { type: "SET_SORT"; payload: SortType }
  | { type: "SET_FOOD_TYPES"; payload: CategoryType | undefined }
  | {
      type: "OPEN_SHEET";
      payload: {
        sheetType: "sort" | "filter";
        initialTab?: "foodType" | "region";
      };
    }
  | { type: "CLOSE_SHEET" };

const initialState: SearchState = {
  currentSort: "RELATED",
  filters: {
    foodTypes: undefined,
  },
  currentSheet: null,
  initialTab: undefined,
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_SORT":
      return {
        ...state,
        currentSort: action.payload,
      };

    case "SET_FOOD_TYPES":
      return {
        ...state,
        filters: {
          ...state.filters,
          foodTypes: action.payload,
        },
      };

    case "OPEN_SHEET":
      return {
        ...state,
        currentSheet: action.payload.sheetType,
        initialTab: action.payload.initialTab,
      };

    case "CLOSE_SHEET":
      return {
        ...state,
        currentSheet: null,
        initialTab: undefined,
      };

    default:
      return state;
  }
}

interface SearchContextType {
  state: SearchState;

  currentSortLabel: string;
  hasActiveFilters: boolean;

  dispatch: React.Dispatch<SearchAction>;

  updateSort: (sortType: SortType) => void;
  updateFoodTypes: (foodTypes: CategoryType | undefined) => void;
  openSheet: (
    sheetType: "sort" | "filter",
    initialTab?: "foodType" | "region"
  ) => void;
  closeSheet: () => void;
  isSheetOpen: (sheetType: "sort" | "filter") => boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const currentSortLabel = getSortLabel(state.currentSort);
  const hasActiveFilters = state.filters.foodTypes !== undefined;

  const updateSort = (sortType: SortType) => {
    dispatch({ type: "SET_SORT", payload: sortType });
  };

  const updateFoodTypes = (foodTypes: CategoryType | undefined) => {
    dispatch({ type: "SET_FOOD_TYPES", payload: foodTypes });
  };

  const openSheet = (
    sheetType: "sort" | "filter",
    initialTab?: "foodType" | "region"
  ) => {
    dispatch({ type: "OPEN_SHEET", payload: { sheetType, initialTab } });
  };

  const closeSheet = () => {
    dispatch({ type: "CLOSE_SHEET" });
  };

  const isSheetOpen = (sheetType: "sort" | "filter") => {
    return state.currentSheet === sheetType;
  };

  return (
    <SearchContext.Provider
      value={{
        state,
        currentSortLabel,
        hasActiveFilters,
        dispatch,
        updateSort,
        updateFoodTypes,
        openSheet,
        closeSheet,
        isSheetOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within SearchProvider");
  }
  return context;
}
