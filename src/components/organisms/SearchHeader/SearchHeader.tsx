"use client";

import { useRouter } from "next/navigation";
import IconButton from "@/components/molecules/IconButton/IconButton";
import SearchForm from "@/components/molecules/SearchForm/SearchForm";
import { cn } from "@/utils/cn";
import Icon from "@/components/atoms/Icon/Icon";
import { useCallback } from "react";

interface SearchHeaderProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchHeader({
  onSearch,
  placeholder = "검색어를 입력하세요",
  className,
}: SearchHeaderProps) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <header
      className={cn(
        "flex items-center gap-[12px] w-full px-[16px] pt-[60px] pb-[16px] bg-surface-normal-bg01 border-b border-brand-primary-main",
        className
      )}
    >
      <IconButton
        startIcon={<Icon icon="Back" size={20} />}
        onClick={handleBack}
      />
      <div className="flex-1">
        <SearchForm onSearch={onSearch} placeholder={placeholder} />
      </div>
    </header>
  );
}
