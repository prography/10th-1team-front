import StoreInfoCardSkeleton from "./StoreInfoCardSkeleton";

interface StoreInfoCardListSkeletonProps {
  count?: number;
}

export default function StoreInfoCardListSkeleton({
  count = 3,
}: StoreInfoCardListSkeletonProps) {
  return (
    <ul className="flex flex-col gap-[12px]">
      {Array.from({ length: count }).map((_, idx) => (
        <StoreInfoCardSkeleton key={idx} />
      ))}
    </ul>
  );
}
