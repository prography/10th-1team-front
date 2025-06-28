import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useSearchState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(!!initialQuery);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const currentQuery = searchParams.get("q") || "";
    if (currentQuery !== searchQuery) {
      setQuery(currentQuery);
      setSearchQuery(currentQuery);
      setIsSearching(!!currentQuery);
      setIsEditing(false);
    }
  }, [searchParams]);

  // 검색 중: isEditing을 true로 설정
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setIsSearching(false);
    setIsEditing(true);
  };

  // 검색 완료: isSearching을 true로 설정하고 isEditing을 false로 설정
  const handleSearch = (value: string) => {
    setQuery(value);
    setSearchQuery(value);
    setIsSearching(true);
    setIsEditing(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  // 뒤로가기: 검색 중일 때는 검색 중인 쿼리로 돌아가고, 검색 완료일 때는 홈으로 이동
  const handleBack = () => {
    if (isEditing) {
      setQuery(searchQuery);
      setIsSearching(true);
      setIsEditing(false);
    } else {
      router.push("/");
    }
  };

  const mode = !query ? "history" : isEditing ? "autocomplete" : "results";

  return {
    query,
    setQuery: handleQueryChange,
    searchQuery,
    isSearching,
    isEditing,
    handleSearch,
    handleBack,
    mode,
  };
}
