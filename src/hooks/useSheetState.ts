import { useState, useCallback } from "react";

export function useSheetState<T extends string = string>() {
  const [sheet, setSheet] = useState<T | null>(null);

  const open = useCallback((key: T) => setSheet(key), []);
  const close = useCallback(() => setSheet(null), []);

  return { sheet, open, close };
}
