import StoreInfoCard from "@/components/organisms/StoreInfoCard/StoreInfoCard";
import type { SearchResultItem } from "@/types/search";

export default function RecommendedStoresContent({
  items,
}: {
  items: SearchResultItem[];
}) {
  return (
    <div className="flex flex-col gap-[12px]">
      {items.map((store) => (
        <StoreInfoCard
          key={store.id}
          item={store}
          className="rounded-[8px] border border-border-normal-lowemp"
        />
      ))}
    </div>
  );
}
