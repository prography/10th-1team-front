import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
