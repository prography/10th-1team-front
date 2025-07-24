"use client";

import useUserStore from "@/store/useUserStore";
import LoginPageTemplate from "@/components/templates/LoginPageTemplate/LoginPageTemplate";
import AlreadyLoginTemplate from "@/components/templates/AlreadyLoginTemplate/AlreadyLoginTemplate";
import AuthValidator from "@/providers/AuthValidator";
import LocalStorage from "@/utils/localStorage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const user = useUserStore((state) => state.user);
  const [lastProvider, setLastProvider] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

  useEffect(() => {
    setLastProvider(LocalStorage.getItem("lastProvider"));
  }, []);

  return (
    <AuthValidator>
      {user ? (
        <AlreadyLoginTemplate />
      ) : (
        <LoginPageTemplate lastProvider={lastProvider} from={from} />
      )}
    </AuthValidator>
  );
}
