import Divider from "@/components/atoms/Divider/Divider";
import Icon from "@/components/atoms/Icon/Icon";
import DefaultHeader from "@/components/molecules/Header/DefaultHeader";
import {
  SearchFilterBottomSheet,
  SearchSortBottomSheet,
} from "@/components/organisms/SearchBottomSheet";
import SearchFilterTab from "@/components/organisms/SearchFilterTab/SearchFilterTab";
import { SearchResultList } from "@/components/organisms/SearchListContainer/lists";
import SearchListSortTab from "@/components/organisms/SearchListSortTab/SearchListSortTab";
import StoreInfoCardListSkeleton from "@/components/organisms/StoreInfoCard/StoreInfoCardListSkeleton";
import { usePortal } from "@/hooks";
import { SearchResultItem } from "@/types/search";
import { useRouter } from "next/navigation";
import { RefObject, useCallback, useState } from "react";

interface ExplorePageTemplateProps {
  total: number;
  items: SearchResultItem[];
  onItemClick: (item: SearchResultItem) => void;
  isLoading: boolean;
  observerRef: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

export default function ExplorePageTemplate({
  total,
  items,
  onItemClick,
  observerRef,
  isLoading,
  isFetchingNextPage,
}: ExplorePageTemplateProps) {
  const createPortal = usePortal();
  const router = useRouter();

  const [currentSheet, setCurrentSheet] = useState<"sort" | "filter" | null>(
    null
  );
  const [initialTab, setInitialTab] = useState<"foodType" | "region">(
    "foodType"
  );

  const openSheet = useCallback(
    (sheetType: "sort" | "filter", initTab?: "foodType" | "region") => {
      setCurrentSheet(sheetType);
      if (initTab) {
        setInitialTab(initTab);
      }
    },
    []
  );

  const closeSheet = useCallback(() => {
    setCurrentSheet(null);
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen w-full bg-surface-normal-container0">
      {/* 헤더 */}
      <div className="sticky top-0 z-10">
        <DefaultHeader
          title="둘러보기"
          startIcon={<Icon icon="Back" />}
          onClickStartIcon={() => router.back()}
          fullWidth
          className="border-b border-border-normal-lowemp"
        />

        <>
          <SearchFilterTab openSheet={openSheet} />
          <Divider />
          <SearchListSortTab
            totalCount={total}
            openSortSheet={() => {
              openSheet("sort");
            }}
          />
        </>
      </div>

      {/* 리스트 */}
      <div className="flex-1">
        <>
          {isLoading ? (
            <StoreInfoCardListSkeleton count={2} />
          ) : (
            <SearchResultList items={items} onItemClick={onItemClick} />
          )}
          {isFetchingNextPage && <StoreInfoCardListSkeleton count={2} />}
          {!isLoading && <div ref={observerRef} className="h-[1px]" />}
        </>
      </div>

      {/* 바텀시트 모달 */}
      {currentSheet === "sort" &&
        createPortal(<SearchSortBottomSheet onClose={closeSheet} />)}
      {currentSheet === "filter" &&
        createPortal(
          <SearchFilterBottomSheet
            onClose={closeSheet}
            initialTab={initialTab}
          />
        )}
    </div>
  );
}
