"use client";

import CustomQueryClientProvider from "@/providers/CustomQueryClientProvider";
import UserProvider from "@/providers/UserProvider";
import MixpanelProvider from "@/providers/MixpanelProvider";
import GAProvider from "@/providers/GAProvider";
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
      <UserProvider initialUser={user}>
        <MixpanelProvider>
          <GAProvider>{children}</GAProvider>
        </MixpanelProvider>
      </UserProvider>
    </CustomQueryClientProvider>
  );
}
