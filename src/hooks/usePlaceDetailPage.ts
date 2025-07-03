import { useCallback, useState } from "react";
import { usePlaceDetailQuery } from "@/hooks/queries/usePlaceDetailQuery";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import { patchPlatformMatchVote } from "@/apis/place";

export function usePlaceDetailPage(placeId: string) {
  const {
    data,
    isLoading,
    voteData,
    refetch,
    voteSummary,
    refetchVoteSummary,
  } = usePlaceDetailQuery(placeId);

  const hasZeroReviews =
    data?.kakao_review_count === 0 || data?.naver_review_count === 0;
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  const isLoggedIn = false;
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  const [platformVoteTab, setPlatformVoteTab] = useState<"vote" | "result">(
    "vote"
  );
  const handlePlatformVoteTabChange = useCallback(
    (value: "vote" | "result") => {
      setPlatformVoteTab(value);
    },
    []
  );

  const reviewDetailClick = useCallback(() => {
    router.push(`/place/${placeId}/reviews`);
  }, [placeId, router]);
  const onVoteSubmit = useCallback(
    (platform: "KAKAO" | "NAVER", reasons: string[]) => {
      patchPlatformMatchVote(placeId, { platform, reasons });
      refetchVoteSummary();
    },
    [placeId, refetchVoteSummary]
  );
  const onShare = useCallback(() => {
    openModal("share", { url: currentUrl, placeName: data?.name });
  }, [openModal, currentUrl, data?.name]);
  const onSave = useCallback(() => {
    if (!isLoggedIn) {
      openModal("login", {
        onLogin: () => {
          router.push(`/login`);
        },
      });
      return;
    }
  }, [isLoggedIn, openModal, router]);
  const onVote = useCallback(() => {
    if (!isLoggedIn) {
      openModal("login", {
        onLogin: () => {
          router.push(`/login`);
        },
      });
      return;
    }
    openModal("platformVote", {
      onSubmit: onVoteSubmit,
      refetch: refetch,
      handleTabChange: handlePlatformVoteTabChange,
    });
  }, [
    openModal,
    onVoteSubmit,
    refetch,
    isLoggedIn,
    handlePlatformVoteTabChange,
    router,
  ]);

  return {
    data,
    isLoading,
    voteData,
    voteSummary,
    hasZeroReviews,
    currentUrl,
    isLoggedIn,
    router,
    platformVoteTab,
    handlePlatformVoteTabChange,
    reviewDetailClick,
    onVoteSubmit,
    onShare,
    onVote,
    onSave,
  };
}
