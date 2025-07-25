import type { Meta } from "@storybook/nextjs";
import DefaultHeader from "./DefaultHeader";
import Icon from "@/components/atoms/Icon/Icon";

const meta: Meta<typeof DefaultHeader> = {
  title: "Molecules/DefaultHeader",
  component: DefaultHeader,
  parameters: {
    docs: {
      description: {
        component: `
기본 헤더 컴포넌트입니다.\n\n### 🔧 기본 사용법\n\n\`\`\`tsx\n<DefaultHeader\n  title="헤더 타이틀"\n  startIcon={<Icon icon="Back" />}\n  endIcon={<Icon icon="Exit" />}\n  onClickStartIcon={() => {}}\n  onClickEndIcon={() => {}}\n  fullWidth\n  className="border-b border-border-normal-lowemp"\n/>\n\`\`\`\n`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "바텀시트 제목",
    },
    startIcon: {
      control: "text",
      description: "시작 아이콘",
    },
    endIcon: {
      control: "text",
      description: "끝 아이콘",
    },
    onClickStartIcon: {
      action: "onClickStartIcon",
      description: "시작 아이콘 클릭 핸들러",
    },
    onClickEndIcon: {
      action: "onClickEndIcon",
      description: "끝 아이콘 클릭 핸들러",
    },
    className: {
      control: "text",
      description: "추가 클래스",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비 사용 여부",
    },
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

export const Default = {
  render: () => {
    return (
      <DefaultHeader
        title="헤더 타이틀"
        startIcon={<Icon icon="Back" />}
        endIcon={<Icon icon="Exit" />}
        onClickStartIcon={() => {}}
        onClickEndIcon={() => {}}
        fullWidth
        className="border-b border-border-normal-lowemp"
      />
    );
  },
  args: {
    title: "새 그룹 만들기",
  },
};

export const StartIcon = {
  render: () => {
    return (
      <DefaultHeader
        title="헤더 타이틀"
        startIcon={<Icon icon="Back" />}
        fullWidth
        className="border-b border-border-normal-lowemp"
      />
    );
  },
};

export const EndIcon = {
  render: () => {
    return (
      <DefaultHeader
        title="헤더 타이틀"
        endIcon={<Icon icon="Exit" />}
        fullWidth
        className="border-b border-border-normal-lowemp"
      />
    );
  },
};
