import { ChangeEvent, FormEvent, useCallback, useRef } from "react";
import { cn } from "@/utils/cn";
import Input from "@/components/atoms/Input/Input";
import IconButton from "@/components/molecules/IconButton/IconButton";
import Icon from "@/components/atoms/Icon/Icon";

interface SearchFormProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchForm({
  query,
  onQueryChange,
  onSearch,
  placeholder = "검색어를 입력하세요",
  className,
}: SearchFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onQueryChange(e.target.value);
    },
    [onQueryChange]
  );

  const handleClear = useCallback(() => {
    onQueryChange("");
    inputRef.current?.focus();
  }, [onQueryChange]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch(query.trim());
      }
    },
    [query, onSearch]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex items-center", className)}
      role="search"
    >
      <div className="flex-1 mr-[12px]">
        <Input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          fullWidth
          className="pr-[35px]"
          endAdornment={
            query && (
              <IconButton
                startIcon={<Icon icon="Delete" />}
                onClick={handleClear}
              />
            )
          }
        />
      </div>
      <IconButton
        startIcon={<Icon icon="Search" />}
        type="submit"
        disabled={!query.trim()}
      />
    </form>
  );
}
