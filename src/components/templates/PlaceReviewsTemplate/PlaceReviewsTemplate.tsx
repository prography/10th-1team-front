import MainLayout from "@/components/templates/MainLayout/MainLayout";
import PlaceHeader from "@/components/organisms/PlaceHeader/PlaceHeader";
import Divider from "@/components/atoms/Divider/Divider";
import Tabs from "@/components/organisms/Tabs/Tabs";
import PlaceReviewSummary from "@/components/molecules/PlaceReviewSummary/PlaceReviewSummary";
import PlaceReviewSummarySkeleton from "@/components/molecules/PlaceReviewSummary/PlaceReviewSummarySkeleton";
import ReviewPlatformLinks from "@/components/molecules/ReviewPlatformLinks/ReviewPlatformLinks";
import Footer from "@/components/molecules/Footer/Footer";
import { ReactNode } from "react";

interface PlaceReviewsTemplateProps {
  placeName: string;
  onBack: () => void;
  onHome: () => void;
  isLoading?: boolean;
  placeReviewSummaryProps?: {
    name: string;
    roadAddress: string;
    totalCount: number;
    kakaoCount: number;
    naverCount: number;
    date: string;
  };
  tabItems?: Array<{
    value: string;
    label: string;
    content: ReactNode;
  }>;
  reviewPlatformLinksProps?: {
    kakaoPlaceId: string;
    naverPlaceId: string;
  };
}

export default function PlaceReviewsTemplate({
  placeName,
  onBack,
  onHome,
  isLoading = false,
  placeReviewSummaryProps,
  tabItems = [],
  reviewPlatformLinksProps,
}: PlaceReviewsTemplateProps) {
  return (
    <MainLayout>
      <PlaceHeader placeName={placeName} onBack={onBack} onHome={onHome} />
      {isLoading ? (
        <PlaceReviewSummarySkeleton />
      ) : (
        placeReviewSummaryProps && (
          <PlaceReviewSummary {...placeReviewSummaryProps} />
        )
      )}
      <Divider />
      {!isLoading && tabItems.length > 0 && (
        <Tabs
          items={tabItems}
          className="bg-surface-normal-container0 w-full py-[24px]"
        />
      )}
      {!isLoading && reviewPlatformLinksProps && (
        <ReviewPlatformLinks {...reviewPlatformLinksProps} />
      )}
      <Divider />
      <Footer />
    </MainLayout>
  );
}
