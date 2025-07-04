import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
