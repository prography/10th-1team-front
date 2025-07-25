"use client";

import { useModalStore } from "@/store/useModalStore";
import LoginRequiredModal from "@/components/molecules/LoginRequiredModal/LoginRequiredModal";
import ShareBottomSheet from "@/components/organisms/ShareBottomSheet/ShareBottomSheet";
import Toast from "@/components/atoms/Toast/Toast";
import PlatformMatchVoteModal from "@/components/organisms/PlatformMatchVoteModal/PlatformMatchVoteModal";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import PlaceSaveModal from "../organisms/PlaceSaveModal/PlaceSaveModal";
import LevelUpModal from "../molecules/LevelUpModal/LevelUpModal";

import GroupSaveModal from "../organisms/PlaceSaveModal/GroupSaveModal";

import CreateGroupModal from "../organisms/PlaceSaveModal/CreateGroupModal";
import ConfirmModal from "@/components/molecules/ConfirmModal/ConfirmModal";

export default function ModalRenderer() {
  const { type, props, closeModal } = useModalStore();
  const [isMounted, setIsMounted] = useState(false);

  // SSR에서 hydration 불일치 방지
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!type || !isMounted) return null;

  const modalContent = (() => {
    switch (type) {
      case "login": {
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

      case "share": {
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

      case "toast": {
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

      case "platformVote": {
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
          />
        );
      }

      case "placeSave": {
        const groupSaveProps = props as {
          placeName: string;
          placeId: string;
        };
        return (
          <PlaceSaveModal
            placeName={groupSaveProps?.placeName}
            placeId={groupSaveProps?.placeId}
            onClose={closeModal}
          />
        );
      }

      case "groupSave": {
        const groupSaveProps = props as {
          title: string;
          placeName?: string;
          newGroup?: string[] | null;
          onSave: (selectedGroups: string[], isCancelled?: boolean) => void;
          onCreateGroup?: () => void;
          onClose: () => void;
        };
        return (
          <GroupSaveModal
            title={groupSaveProps?.title}
            placeName={groupSaveProps?.placeName}
            newGroup={groupSaveProps?.newGroup}
            onSave={groupSaveProps?.onSave}
            onCreateGroup={groupSaveProps?.onCreateGroup}
            onClose={groupSaveProps?.onClose}
          />
        );
      }

      case "createGroup": {
        const createGroupProps = props as {
          isOpen: boolean;
          onClose: () => void;
          onCreateGroup: (groupName: string, selectedColor: string) => void;
          title?: string;
          showOverlay?: boolean;
        };
        return (
          <CreateGroupModal
            isOpen={true}
            onClose={createGroupProps?.onClose || closeModal}
            onCreateGroup={createGroupProps?.onCreateGroup}
            title={createGroupProps?.title}
            showOverlay={createGroupProps?.showOverlay}
          />
        );
      }

      case "confirm": {
        const confirmProps = props as {
          isOpen?: boolean;
          title: string;
          description: React.ReactNode;
          confirmText: string;
          onCancel: () => void;
          onConfirm: () => void;
        };
        return (
          <ConfirmModal
            isOpen={true}
            onClose={closeModal}
            title={confirmProps.title}
            description={confirmProps.description}
            rightButtonText={confirmProps.confirmText}
            onLeftButtonClick={confirmProps.onCancel}
            onRightButtonClick={confirmProps.onConfirm}
          />
        );
      }

      case "levelUp": {
        const levelUpProps = props as {
          imageSrc?: string;
        };
        return (
          <LevelUpModal
            isOpen={true}
            onClose={closeModal}
            imageSrc={levelUpProps?.imageSrc}
          />
        );
      }

      default:
        return null;
    }
  })();

  return createPortal(modalContent, document.body);
}
