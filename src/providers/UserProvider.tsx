import { useEffect } from "react";
import useUserStore from "@/store/useUserStore";
import type { UserInfoResponse } from "@/types/user";

export default function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: UserInfoResponse["data"] | null;
}) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(initialUser ?? null);
  }, [initialUser, setUser]);

  return <>{children}</>;
}
