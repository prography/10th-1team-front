import { useCallback, useState } from "react";
import { usePlaceDetailQuery } from "@/hooks/queries/usePlaceDetailQuery";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import { patchPlatformMatchVote } from "@/apis/place";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/store/useUserStore";

export function usePlaceDetailPage(placeId: string) {
  const { data, isLoading, voteData, voteSummary, isPlaceSaved } =
    usePlaceDetailQuery(placeId);
  const hasZeroReviews =
    data?.kakao_review_count === 0 || data?.naver_review_count === 0;
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/place/" + placeId
      : "";
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();
  const { user: userInfo } = useUserStore((state) => state);
  const isLoggedIn = !!userInfo;
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
      queryClient.invalidateQueries({ queryKey: ["votedActivity"] });
      queryClient.invalidateQueries({ queryKey: ["voteCount"] });
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
            queryClient.invalidateQueries({
              queryKey: ["platformMatchSummary", placeId],
            });
          },
        }
      );
    },
    [onVoteMutate, queryClient, placeId]
  );
  const onSave = useCallback(() => {
    if (!isLoggedIn) {
      openModal("login", {
        onLogin: () => {
          router.push(`/login?from=/place/${decodeURIComponent(placeId)}`);
          openModal(null);
        },
        description: "음식점을 저장하시려면 \n 로그인을 먼저 진행해주세요",
      });
      return;
    }
    openModal("placeSave", {
      placeName: data?.name,
      placeId,
    });
  }, [isLoggedIn, openModal, router, data?.name, placeId]);

  const onShare = useCallback(() => {
    openModal("share", { url: currentUrl, placeName: data?.name });
  }, [openModal, currentUrl, data?.name]);
  const onVote = useCallback(() => {
    if (!isLoggedIn) {
      openModal("login", {
        onLogin: () => {
          router.push(`/login?from=/place/${decodeURIComponent(placeId)}`);
          openModal(null);
        },
        description: "투표를 진행하시려면 \n 로그인을 먼저 진행해주세요",
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
    placeId,
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
