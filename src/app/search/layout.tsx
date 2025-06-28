import { SearchProvider } from "@/contexts/SearchContext";
import { Suspense } from "react";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchProvider>{children}</SearchProvider>
      </Suspense>
    </MainLayout>
  );
}
