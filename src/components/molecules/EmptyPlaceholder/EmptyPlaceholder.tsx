import Icon from "@/components/atoms/Icon/Icon";
import { cn } from "@/utils/cn";

interface EmptyPlaceholderProps {
  title: string;
  description: string;
  className?: string;
}

export default function EmptyPlaceholder({
  title,
  description,
  className,
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-[12px]",
        className
      )}
    >
      <Icon icon="Empty" size={40} />
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <div className="body-m-semibold text-texticon-onnormal-highestemp">
          {title}
        </div>
        <div className="caption-m-regular text-texticon-onnormal-midemp">
          {description}
        </div>
      </div>
    </div>
  );
}
