import { SearchProvider } from "@/contexts/SearchContext";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <SearchProvider>{children}</SearchProvider>
    </MainLayout>
  );
}
