"use client";

import CustomQueryClientProvider from "@/providers/CustomQueryClientProvider";
import UserProvider from "@/providers/UserProvider";
import type { UserInfo } from "@/types/user";

export default function Providers({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: UserInfo | null;
}) {
  return (
    <CustomQueryClientProvider>
      <UserProvider initialUser={user}>{children}</UserProvider>
    </CustomQueryClientProvider>
  );
}
