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
  getOptionDisabled?: (value: T) => boolean;
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
  getOptionDisabled,
}: SelectButtonGroupProps<T>) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const isDisabled = (value: T): boolean => {
    if (getOptionDisabled && getOptionDisabled(value)) return true;
    if (!multiple) {
      return false;
    }
    const isAlreadySelected = selectedValues.includes(value);
    if (maxSelection !== undefined) {
      return selectedValues.length >= maxSelection && !isAlreadySelected;
    }
    return false;
  };

  const handleClick = (value: T) => {
    const isAlreadySelected = selectedValues.includes(value);
    if (!multiple) {
      if (isAlreadySelected) {
        onToggle(undefined as unknown as T);
      } else {
        onToggle(value);
      }
    } else {
      onToggle(value);
    }
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
          const showDisabledStyle =
            !multiple && selectedValues.length > 0 && !selected;
          return (
            <Button
              key={String(option.value)}
              onClick={() => handleClick(option.value)}
              disabled={isDisabled(option.value)}
              variant={buttonVariant}
              isPressed={selected}
              className={
                showDisabledStyle
                  ? "bg-button-secondary-bg_disabled text-button-secondary-text_disabled"
                  : undefined
              }
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
