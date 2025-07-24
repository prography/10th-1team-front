import { getMyInfo } from "@/apis/user";
import { redirect } from "next/navigation";

export async function requireLogin(redirectTo: string) {
  const user = await getMyInfo();
  if (!user) {
    redirect(`/login?from=${encodeURIComponent(redirectTo)}`);
  }
  return user;
}
