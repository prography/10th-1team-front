export function sortByDate<T>(
  arr: T[],
  getKey: (item: T) => string,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...arr].sort((a, b) => {
    return order === "asc"
      ? new Date(getKey(a)).getTime() - new Date(getKey(b)).getTime()
      : new Date(getKey(b)).getTime() - new Date(getKey(a)).getTime();
  });
}

export function sortByName<T>(
  arr: T[],
  getKey: (item: T) => string,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...arr].sort((a, b) =>
    order === "asc"
      ? getKey(a).localeCompare(getKey(b), "ko")
      : getKey(b).localeCompare(getKey(a), "ko")
  );
}
