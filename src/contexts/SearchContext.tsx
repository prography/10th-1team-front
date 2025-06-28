"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import { getSortLabel } from "@/constants/sortOptions";
import type { CategoryType, SortType } from "@/types/search";

export enum SearchActionType {
  SET_SORT,
  SET_FOOD_TYPES,
}

interface SearchState {
  currentSort: SortType;
  filters: {
    foodTypes: CategoryType | undefined;
  };
}

type SearchAction =
  | { type: SearchActionType.SET_SORT; payload: SortType }
  | {
      type: SearchActionType.SET_FOOD_TYPES;
      payload: CategoryType | undefined;
    };

const initialState: SearchState = {
  currentSort: "RELATED",
  filters: {
    foodTypes: undefined,
  },
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case SearchActionType.SET_SORT:
      return {
        ...state,
        currentSort: action.payload,
      };

    case SearchActionType.SET_FOOD_TYPES:
      return {
        ...state,
        filters: {
          ...state.filters,
          foodTypes: action.payload,
        },
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
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const currentSortLabel = getSortLabel(state.currentSort);
  const hasActiveFilters = state.filters.foodTypes !== undefined;

  const updateSort = useCallback((sortType: SortType) => {
    dispatch({ type: SearchActionType.SET_SORT, payload: sortType });
  }, []);

  const updateFoodTypes = useCallback((foodTypes: CategoryType | undefined) => {
    dispatch({ type: SearchActionType.SET_FOOD_TYPES, payload: foodTypes });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        state,
        currentSortLabel,
        hasActiveFilters,
        dispatch,
        updateSort,
        updateFoodTypes,
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
