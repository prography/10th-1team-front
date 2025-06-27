import { Suspense } from "react";
import RecommendedStoresHeader from "./RecommendedStoresHeader";
import RecommendedStoresContent from "./RecommendedStoresContent";
import RecommendedStoresSkeleton from "./RecommendedStoresSkeleton";

export default function RecommendedStores() {
  return (
    <section className="flex flex-col bg-surface-normal-container-b50 pt-[80px] pb-[160px] px-[16px]">
      <RecommendedStoresHeader />
      <Suspense fallback={<RecommendedStoresSkeleton />}>
        <RecommendedStoresContent />
      </Suspense>
    </section>
  );
}
