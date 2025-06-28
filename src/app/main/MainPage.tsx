"use client";

import { useRecommendListQuery } from "@/hooks/queries/useRecommendListQuery";
import MainPageTemplate from "@/components/templates/MainPageTemplate/MainPageTemplate";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function MainPage() {
  const { data: recommendList, isLoading } = useRecommendListQuery({
    size: 3,
  });

  return (
    <MainLayout>
      <MainPageTemplate items={recommendList ?? []} isLoading={isLoading} />
    </MainLayout>
  );
}
