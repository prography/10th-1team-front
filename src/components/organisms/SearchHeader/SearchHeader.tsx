"use client";

import IconButton from "@/components/molecules/IconButton/IconButton";
import SearchForm from "@/components/molecules/SearchForm/SearchForm";
import { cn } from "@/utils/cn";
import Icon from "@/components/atoms/Icon/Icon";

interface SearchHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (value: string) => void;
  onBack: () => void;
  placeholder?: string;
  className?: string;
}

export default function SearchHeader({
  query,
  onQueryChange,
  onSearch,
  onBack,
  placeholder = "검색어를 입력하세요",
  className,
}: SearchHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center gap-[12px] w-full px-[16px] pt-[60px] pb-[16px] bg-surface-normal-bg01 border-b border-brand-primary-main",
        className
      )}
    >
      <IconButton startIcon={<Icon icon="Back" />} onClick={onBack} />
      <div className="flex-1">
        <SearchForm
          query={query}
          onQueryChange={onQueryChange}
          onSearch={onSearch}
          placeholder={placeholder}
        />
      </div>
    </header>
  );
}
