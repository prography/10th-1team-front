"use client";

import OnboardingPageTemplate from "@/components/templates/OnboardingPageTemplate/OnboardingPageTemplate";
import useUserStore from "@/store/useUserStore";

export default function OnboardingPage() {
  const user = useUserStore((state) => state.user ?? null);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <OnboardingPageTemplate user={user} />;
}
