import RecommendedStoresHeader from "./RecommendedStoresHeader";
import RecommendedStoresContent from "./RecommendedStoresContent";
import type { SearchResultItem } from "@/types/search";
import StoreInfoCardListSkeleton from "@/components/organisms/StoreInfoCard/StoreInfoCardListSkeleton";

interface RecommendedStoresProps {
  items: SearchResultItem[];
  isLoading: boolean;
}

export default function RecommendedStores({
  items,
  isLoading,
}: RecommendedStoresProps) {
  return (
    <section className="flex flex-col bg-surface-normal-container-b50 pt-[80px] pb-[160px] px-[16px]">
      <RecommendedStoresHeader />
      {isLoading ? (
        <StoreInfoCardListSkeleton count={3} />
      ) : (
        <RecommendedStoresContent items={items} />
      )}
    </section>
  );
}
