import Button from "@/components/atoms/Button/Button";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/atoms/Button/buttonVariants";
import { VariantProps } from "class-variance-authority";
import { FilterOption } from "@/types/search";

interface SelectButtonGroupProps<T> {
  options: FilterOption<T>[];
  selectedValues: T[] | undefined;
  onToggle: (value: T) => void;
  columns?: 2 | 3 | 4;
  description?: string;
  onReset?: () => void;
  multiple?: boolean;
  maxSelection?: number;
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
}

export default function SelectButtonGroup<T>({
  options,
  selectedValues = [],
  onToggle,
  className,
  buttonVariant,
  columns = 2,
  description,
  multiple = true,
  maxSelection,
}: SelectButtonGroupProps<T>) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const isDisabled = (value: T): boolean => {
    const isAlreadySelected = selectedValues.includes(value);

    if (!multiple) {
      // 단일 선택 모드: 이미 하나가 선택된 상태에서 다른 것 선택 불가
      return selectedValues.length > 0 && !isAlreadySelected;
    }

    if (maxSelection !== undefined) {
      // 복수 선택 제한 모드: 최대 개수 도달 시 추가 선택 불가
      return selectedValues.length >= maxSelection && !isAlreadySelected;
    }

    return false;
  };

  return (
    <div>
      {description && (
        <p className="mb-[12px] body-s-regular text-texticon-onnormal-highestemp">
          <span className="text-texticon-onnormal-main-500">* </span>
          {description}
        </p>
      )}

      <div className={cn("grid gap-2", gridCols[columns], className)}>
        {options.map((option) => {
          const selected = selectedValues.includes(option.value);
          return (
            <Button
              key={String(option.value)} // value 기반으로 key 안정화
              onClick={() => onToggle(option.value)}
              disabled={isDisabled(option.value)}
              variant={buttonVariant}
              isPressed={selected}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
