import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import Input from "@/components/atoms/Input/Input";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { cn } from "@/utils/cn";
import Icon from "@/components/atoms/Icon/Icon";

interface SearchFormProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchForm({
  onSearch,
  placeholder = "검색어를 입력하세요",
  className,
}: SearchFormProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

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
    >
      <div className="relative flex-1 mr-[12px]">
        <Input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          fullWidth
          className="pr-[35px]"
        />
        {query && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[24px]">
            <IconButton
              startIcon={<Icon icon="Delete" size={24} />}
              onClick={handleClear}
            />
          </div>
        )}
      </div>
      <IconButton
        startIcon={<Icon icon="Search" size={20} />}
        type="submit"
        disabled={!query.trim()}
      />
    </form>
  );
}
