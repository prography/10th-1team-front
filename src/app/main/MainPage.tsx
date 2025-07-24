"use client";

import { useRecommendListQuery } from "@/hooks/queries/useRecommendListQuery";
import MainPageTemplate from "@/components/templates/MainPageTemplate/MainPageTemplate";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import { logout } from "@/apis/login";
import { useEffect, useState } from "react";
import { getMyInfo } from "@/apis/user";
import { UserInfo } from "@/types/user";

interface MainPageProps {
  initialUser: UserInfo | null;
}

export default function MainPage({ initialUser }: MainPageProps) {
  const [user, setUser] = useState<UserInfo | null>(initialUser);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const { data: recommendList, isLoading } = useRecommendListQuery({
    size: 3,
  });

  useEffect(() => {
    if (!user) {
      getMyInfo()
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <MainLayout>
      <MainPageTemplate
        user={user}
        items={recommendList ?? []}
        isLoading={isLoading}
        onLogout={handleLogout}
      />
    </MainLayout>
  );
}
