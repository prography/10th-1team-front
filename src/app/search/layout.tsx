import { SearchProvider } from "@/contexts/SearchContext";
import { Suspense } from "react";
import ScreenHeightLayout from "@/components/templates/ScreenHeightLayout/ScreenHeightLayout";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScreenHeightLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchProvider>{children}</SearchProvider>
      </Suspense>
    </ScreenHeightLayout>
  );
}
