"use client";

import CustomQueryClientProvider from "@/providers/CustomQueryClientProvider";
import UserProvider from "@/providers/UserProvider";
import type { UserInfoResponse } from "@/types/user";

export default function Providers({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: UserInfoResponse["data"] | null;
}) {
  return (
    <CustomQueryClientProvider>
      <UserProvider initialUser={user}>{children}</UserProvider>
    </CustomQueryClientProvider>
  );
}
