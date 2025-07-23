import type { Meta, StoryObj } from "@storybook/nextjs";
import BasicConfirmModal from "./BasicConfirmModal";

const meta: Meta<typeof BasicConfirmModal> = {
  title: "Molecules/BasicConfirmModal",
  component: BasicConfirmModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "삭제할까요?",
    description: (
      <>
        그룹을 삭제하면
        <br />
        저장된 가게 정보도 함께 삭제돼요
      </>
    ),
    confirmText: "삭제",
    onCancel: () => console.log("취소"),
    onConfirm: () => console.log("확인"),
  },
};

export const LoginRequired: Story = {
  args: {
    isOpen: true,
    title: "로그인이 필요해요!",
    description: (
      <>
        투표를 진행하시려면
        <br />
        로그인을 먼저 진행해주세요
      </>
    ),
    confirmText: "로그인 할게요",
    onCancel: () => console.log("취소"),
    onConfirm: () => console.log("로그인"),
  },
};

export const WithSecondaryVariant: Story = {
  args: {
    isOpen: true,
    title: "정말 나가시겠어요?",
    description: "작성 중인 내용이 저장되지 않습니다.",
    confirmText: "나가기",
    variant: "secondary",
    onCancel: () => console.log("취소"),
    onConfirm: () => console.log("나가기"),
  },
};

export const SimpleTitle: Story = {
  args: {
    isOpen: true,
    title: "저장하시겠어요?",
    confirmText: "저장",
    onCancel: () => console.log("취소"),
    onConfirm: () => console.log("저장"),
  },
};
