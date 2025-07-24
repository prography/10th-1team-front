import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
