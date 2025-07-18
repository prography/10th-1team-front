import { useCallback, useState } from "react";
import { usePlaceDetailQuery } from "@/hooks/queries/usePlaceDetailQuery";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import { patchPlatformMatchVote } from "@/apis/place";
import { useGroupManagement } from "@/hooks/useGroupManagement";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePlaceDetailPage(placeId: string) {
  const { data, isLoading, voteData, voteSummary, isPlaceSaved } =
    usePlaceDetailQuery(placeId);
  const hasZeroReviews =
    data?.kakao_review_count === 0 || data?.naver_review_count === 0;
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();

  const { onSave, isLoggedIn } = useGroupManagement({
    placeName: data?.name,
    placeId,
  });

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

  const { mutate: onVoteMutate } = useMutation({
    mutationFn: ({
      platform,
      reasons,
    }: {
      platform: "KAKAO" | "NAVER";
      reasons: string[];
    }) => patchPlatformMatchVote(placeId, { platform, reasons }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voteSummary", placeId] });
    },
  });
  const onVoteSubmit = useCallback(
    (platform: "KAKAO" | "NAVER", reasons: string[]) => {
      onVoteMutate(
        { platform, reasons },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["platformMatchResult", placeId],
            });
          },
        }
      );
    },
    [onVoteMutate, queryClient, placeId]
  );

  const onShare = useCallback(() => {
    openModal("share", { url: currentUrl, placeName: data?.name });
  }, [openModal, currentUrl, data?.name]);
  const onVote = useCallback(() => {
    if (!isLoggedIn) {
      openModal("login", {
        onLogin: () => {
          router.push(`/login`);
          openModal(null);
        },
      });
      return;
    }
    openModal("platformVote", {
      onSubmit: onVoteSubmit,
      handleTabChange: handlePlatformVoteTabChange,
    });
  }, [
    openModal,
    onVoteSubmit,
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
    isPlaceSaved,
  };
}
