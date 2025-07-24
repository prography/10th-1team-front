"use client";

import useUserStore from "@/store/useUserStore";
import LoginPageTemplate from "@/components/templates/LoginPageTemplate/LoginPageTemplate";
import AlreadyLoginTemplate from "@/components/templates/AlreadyLoginTemplate/AlreadyLoginTemplate";
import AuthValidator from "@/providers/AuthValidator";
import LocalStorage from "@/utils/localStorage";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const user = useUserStore((state) => state.user);
  const lastProvider = LocalStorage.getItem("lastProvider");

  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

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
