"use client";

import { useEffect } from "react";
import { getMyInfo } from "@/apis/user";
import useUserStore from "@/store/useUserStore";

export default function AuthValidator({
  children,
}: {
  children: React.ReactNode;
}) {
  const clearUser = useUserStore((s) => s.clearUser);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const validate = async () => {
      try {
        const user = await getMyInfo();
        setUser(user);
      } catch {
        clearUser();
      }
    };
    validate();
  }, [setUser, clearUser]);

  return children;
}
