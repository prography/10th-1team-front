import type { Meta } from "@storybook/nextjs";
import EmptyPlaceholder from "./EmptyPlaceholder";

const meta: Meta<typeof EmptyPlaceholder> = {
  title: "Molecules/EmptyPlaceholder",
  component: EmptyPlaceholder,
  parameters: {
    docs: {
      description: {
        component: `
빈 플레이스홀더 컴포넌트입니다.\n\n### 🔧 기본 사용법\n\n\`\`\`tsx\n<EmptyPlaceholder\n  title="빈 플레이스홀더"\n  description="빈 플레이스홀더 설명"\n/>\n\`\`\`\n`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "제목",
    },
    description: {
      control: "text",
      description: "설명",
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
      <EmptyPlaceholder
        title="빈 플레이스홀더"
        description="빈 플레이스홀더 설명"
      />
    );
  },
};
