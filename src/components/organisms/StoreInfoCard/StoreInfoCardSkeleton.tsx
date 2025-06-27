import { cn } from "@/utils/cn";

interface StoreInfoCardSkeletonProps {
  className?: string;
}

export default function StoreInfoCardSkeleton({
  className,
}: StoreInfoCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex-1 px-[16px] py-[12px] bg-surface-normal-bg01",
        className
      )}
    >
      <div className="flex items-center gap-[16px] mb-[4px]">
        <div className="h-[20px] w-[120px] bg-gray-200 rounded animate-pulse" />
        <div className="h-[16px] w-[60px] bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="mb-[12px]">
        <div className="h-[16px] w-[200px] bg-gray-200 rounded animate-pulse mb-[4px]" />
        <div className="h-[16px] w-[80px] bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-[8px] mb-[12px]">
        <div className="h-[20px] w-[60px] bg-gray-200 rounded animate-pulse" />
        <div className="h-[20px] w-[60px] bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="relative w-full aspect-[328/160] bg-gray-200 rounded-[4px] overflow-hidden animate-pulse" />
    </div>
  );
}
