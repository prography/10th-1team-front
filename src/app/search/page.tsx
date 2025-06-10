"use client";

import SearchHeader from "@/components/organisms/SearchHeader/SearchHeader";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function Search() {
  return (
    <MainLayout>
      <SearchHeader onSearch={() => {}} />
    </MainLayout>
  );
}
