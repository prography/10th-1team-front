import type { Meta, StoryObj } from "@storybook/nextjs";
import ConfirmModal from "./ConfirmModal";

const meta: Meta<typeof ConfirmModal> = {
  title: "Molecules/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**ConfirmModal Props**

화면 중앙에 뜨는 컨펌/알럿용 모달 컴포넌트입니다.

### 🔧 기본 사용법
\`\`\`tsx
import ConfirmModal from '@/components/molecules/ConfirmModal/ConfirmModal';

<ConfirmModal
  isOpen={isOpen}
  onClose={handleClose}
  title="정말 삭제할까요?"
  description="삭제하면 복구할 수 없습니다."
  leftButtonText="취소"
  rightButtonText="삭제"
  onLeftButtonClick={handleCancel}
  onRightButtonClick={handleDelete}
/>

\`\`\`

### ✨ 주요 기능
- 1~2개의 버튼(텍스트/variant/핸들러 분리)
- description에 string 또는 ReactNode 지원
- 오버레이 클릭 시 닫기(onClose)
- 뒷배경 스크롤 방지(scrollable)
- className으로 스타일 확장 가능
- 최대 600px 너비, 반응형 중앙 정렬

        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean", description: "모달 오픈 여부" },
    onClose: { action: "closed", description: "모달 닫기 콜백" },
    title: { control: "text", description: "모달 타이틀" },
    description: {
      control: "text",
      description: "설명(문자열 또는 ReactNode)",
    },
    leftButtonText: { control: "text", description: "왼쪽 버튼 텍스트" },
    rightButtonText: { control: "text", description: "오른쪽 버튼 텍스트" },
    onLeftButtonClick: {
      action: "leftClicked",
      description: "왼쪽 버튼 클릭 핸들러",
    },
    onRightButtonClick: {
      action: "rightClicked",
      description: "오른쪽 버튼 클릭 핸들러",
    },
    leftButtonVariant: {
      control: "select",
      options: ["neutral", "primary", "secondary"],
      description: "왼쪽 버튼 스타일",
    },
    rightButtonVariant: {
      control: "select",
      options: ["primary", "secondary", "neutral"],
      description: "오른쪽 버튼 스타일",
    },
    scrollable: {
      control: "boolean",
      description: "뒷배경 스크롤 가능 여부",
    },
    showOverlay: { control: "boolean", description: "오버레이 표시 여부" },
    className: { control: "text", description: "추가 클래스" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minWidth: 600,
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "확인하시겠어요?",
    description: "이 작업은 되돌릴 수 없습니다.",
    leftButtonText: "취소",
    rightButtonText: "확인",
    scrollable: true,
  },
};

export const OneButton: Story = {
  args: {
    isOpen: true,
    title: "확인만 있는 모달",
    rightButtonText: "확인",
    scrollable: true,
  },
};

export const TwoButtons: Story = {
  args: {
    isOpen: true,
    title: "정말 삭제할까요?",
    description: (
      <>
        삭제하면 <b>복구할 수 없습니다.</b>
        <br />
        진행하시겠습니까?
      </>
    ),
    leftButtonText: "취소",
    rightButtonText: "삭제",
    rightButtonVariant: "primary",
    leftButtonVariant: "neutral",
    scrollable: true,
  },
};

export const SecondaryVariant: Story = {
  args: {
    isOpen: true,
    title: "나가시겠어요?",
    description: "작성 중인 내용이 저장되지 않습니다.",
    leftButtonText: "취소",
    rightButtonText: "나가기",
    rightButtonVariant: "secondary",
    scrollable: true,
  },
};

export const NoOverlay: Story = {
  args: {
    isOpen: true,
    title: "오버레이 없는 모달",
    description: "배경 오버레이가 없습니다.",
    rightButtonText: "확인",
    showOverlay: false,
    scrollable: true,
  },
};
