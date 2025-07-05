import StoreInfoCard from "@/components/organisms/StoreInfoCard/StoreInfoCard";
import type { SearchResultItem } from "@/types/search";
import { useRouter } from "next/navigation";

export default function RecommendedStoresContent({
  items,
}: {
  items: SearchResultItem[];
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-[12px]">
      {items.map((store) => (
        <StoreInfoCard
          key={store.id}
          item={store}
          className="rounded-[8px] border border-border-normal-lowemp"
          onClick={() => {
            router.push(`/place/${store.id}`);
          }}
        />
      ))}
    </div>
  );
}
