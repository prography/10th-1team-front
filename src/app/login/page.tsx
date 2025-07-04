"use client";

import useUserStore from "@/store/useUserStore";
import LoginPageTemplate from "@/components/templates/LoginPageTemplate/LoginPageTemplate";
import AlreadyLoginTemplate from "@/components/templates/AlreadyLoginTemplate/AlreadyLoginTemplate";
import AuthValidator from "@/providers/AuthValidator";

export default function LoginPage() {
  const user = useUserStore((state) => state.user);

  return (
    <AuthValidator>
      {user ? <AlreadyLoginTemplate /> : <LoginPageTemplate />}
    </AuthValidator>
  );
}
