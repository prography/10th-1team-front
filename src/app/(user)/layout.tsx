import { getMyInfo } from "@/apis/user";
import { redirect } from "next/navigation";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMyInfo();

  if (!user) {
    redirect("/login");
  }

  return <MainLayout>{children}</MainLayout>;
}
