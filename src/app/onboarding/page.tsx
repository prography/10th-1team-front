"use client";

import OnboardingPageTemplate from "@/components/templates/OnboardingPageTemplate/OnboardingPageTemplate";
import AuthValidator from "@/providers/AuthValidator";
import useUserStore from "@/store/useUserStore";

export default function OnboardingPage() {
  const user = useUserStore((state) => state.user);

  return (
    <AuthValidator>
      {user ? <OnboardingPageTemplate user={user} /> : <div>Loading...</div>}
    </AuthValidator>
  );
}
