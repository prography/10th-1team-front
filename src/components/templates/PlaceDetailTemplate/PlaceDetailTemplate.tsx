import MainLayout from "@/components/templates/MainLayout/MainLayout";
import PlaceHeader from "@/components/organisms/PlaceHeader/PlaceHeader";
import Divider from "@/components/atoms/Divider/Divider";
import TabScroll from "@/components/organisms/TabScroll/TabScroll";
import { ReactNode } from "react";
import PlaceCard from "@/components/organisms/PlaceCard/PlaceCard";
import Footer from "@/components/molecules/Footer/Footer";

interface PlaceDetailTemplateProps {
  placeName: string;
  onBack: () => void;
  onHome: () => void;
  placeCardProps: {
    images: { url: string }[];
    name: string;
    category: string;
    naverScore: number | null;
    kakaoScore: number | null;
    naverReviewCount: number | null;
    kakaoReviewCount: number | null;
    address: string;
    location: string;
    onShare?: () => void;
    onSave?: () => void;
  };
  tabItems: Array<{
    id: string;
    label: string;
    content: ReactNode;
  }>;
  navHeight?: number;
}

export default function PlaceDetailTemplate({
  placeName,
  onBack,
  onHome,
  placeCardProps,
  tabItems,
  navHeight = 108,
}: PlaceDetailTemplateProps) {
  return (
    <MainLayout>
      <PlaceHeader placeName={placeName} onBack={onBack} onHome={onHome} />
      <PlaceCard {...placeCardProps} />
      <Divider />
      <TabScroll items={tabItems} navHeight={navHeight} />
      <Footer />
    </MainLayout>
  );
}
