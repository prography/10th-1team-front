import StoreInfoCardSkeleton from "../StoreInfoCard/StoreInfoCardSkeleton";

export default function RecommendedStoresSkeleton() {
  return (
    <div className="flex flex-col gap-[12px]">
      {Array.from({ length: 3 }, (_, i) => (
        <StoreInfoCardSkeleton key={i} />
      ))}
    </div>
  );
}
