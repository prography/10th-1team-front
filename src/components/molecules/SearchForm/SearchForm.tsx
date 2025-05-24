import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Input from "@/components/atoms/Input/Input";
import IconButton from "@/components/molecules/IconButton/IconButton";
import { cn } from "@/utils/style";
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
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex items-center", className)}
    >
      <div className="relative flex-1 mr-[12px]">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          fullWidth
          className="pr-[35px]"
        />
        {value && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[24px]">
            <IconButton
              startIcon={<Icon icon="Exit" size={20} />}
              onClick={handleClear}
            />
          </div>
        )}
      </div>
      <IconButton
        startIcon={<Icon icon="Search" size={20} />}
        type="submit"
        disabled={!value.trim()}
      />
    </form>
  );
}
