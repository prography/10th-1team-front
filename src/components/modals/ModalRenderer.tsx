"use client";

import { useModalStore } from "@/store/useModalStore";
import LoginRequiredModal from "@/components/molecules/LoginRequiredModal/LoginRequiredModal";
import ShareBottomSheet from "@/components/organisms/ShareBottomSheet/ShareBottomSheet";
import Toast from "@/components/atoms/Toast/Toast";
import PlatformMatchVoteModal from "@/components/organisms/PlatformMatchVoteModal/PlatformMatchVoteModal";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function ModalRenderer() {
  const { type, props, closeModal } = useModalStore();
  const [isMounted, setIsMounted] = useState(false);

  // SSR에서 hydration 불일치 방지
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!type || !isMounted) return null;

  const modalContent = (() => {
    if (type === "login") {
      const loginProps = props as {
        isOpen: boolean;
        onCancel: () => void;
        onLogin: () => void;
      };
      return (
        <LoginRequiredModal
          isOpen={true}
          onCancel={closeModal}
          onLogin={loginProps?.onLogin}
        />
      );
    }
    if (type === "share") {
      const shareProps = props as { url: string; placeName: string };
      return (
        <ShareBottomSheet
          isOpen={true}
          url={shareProps?.url}
          placeName={shareProps?.placeName}
          onClose={closeModal}
        />
      );
    }
    if (type === "toast") {
      const toastProps = props as {
        message: string;
        icon?: React.ReactNode;
        autoClose?: boolean;
        duration?: number;
      };
      return (
        <Toast
          message={toastProps?.message}
          icon={toastProps?.icon}
          isOpen={true}
          autoClose={toastProps?.autoClose}
          duration={toastProps?.duration}
          onClose={closeModal}
        />
      );
    }
    if (type === "platformVote") {
      type PlatformVoteProps = {
        isOpen?: boolean;
        onClose?: () => void;
        onSubmit: (platform: "KAKAO" | "NAVER", reasons: string[]) => void;
        handleTabChange?: (value: "vote" | "result") => void;
        refetch: () => void;
        [key: string]: unknown;
      };
      const voteProps = props as PlatformVoteProps;
      return (
        <PlatformMatchVoteModal
          isOpen={true}
          onClose={closeModal}
          onSubmit={voteProps.onSubmit}
          handleTabChange={voteProps.handleTabChange ?? (() => {})}
          refetch={voteProps.refetch ?? (() => {})}
        />
      );
    }
    return null;
  })();

  return createPortal(modalContent, document.body);
}
