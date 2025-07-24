import { useState, useCallback } from "react";

export function useSelection<T>(items: T[], getKey: (item: T) => string) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const toggleAll = useCallback(() => {
    const all = items.map(getKey);
    setSelected((prev) => (prev.length === all.length ? [] : all));
  }, [items, getKey]);

  const reset = useCallback(() => setSelected([]), []);

  return { selected, setSelected, toggle, toggleAll, reset };
}
