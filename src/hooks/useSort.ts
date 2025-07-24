import { useState, useMemo } from "react";

export function useSort<T, K extends string>(
  items: T[],
  sorters: Record<K, (arr: T[]) => T[]>,
  defaultKey?: K
) {
  const initialKey = defaultKey || (Object.keys(sorters)[0] as K);
  const [sortKey, setSortKey] = useState<K>(initialKey);

  const sortedItems = useMemo(() => {
    return sorters[sortKey](items);
  }, [items, sortKey, sorters]);

  return { sortKey, setSortKey, sortedItems };
}
