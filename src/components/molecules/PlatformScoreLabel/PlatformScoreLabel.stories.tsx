import type { Meta } from "@storybook/nextjs";
import PlatformScoreLabel from "./PlatformScoreLabel";

const meta: Meta<typeof PlatformScoreLabel> = {
  title: "Molecules/PlatformScoreLabel",
  component: PlatformScoreLabel,
  parameters: {
    docs: {
      description: {
        component: `
플랫폼 점수 라벨 컴포넌트입니다.\n\n### 🔧 기본 사용법\n\n\`\`\`tsx\n<PlatformScoreLabel\n  platform="네이버"\n  score={4.5}\n  count={10}\n/>\n\`\`\`\n`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    platform: {
      control: "text",
      description: "플랫폼",
    },
    score: {
      control: "number",
      description: "점수",
    },
    count: {
      control: "number",
      description: "카운트",
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
    return <PlatformScoreLabel platform="네이버" score={4.5} count={10} />;
  },
};

export const Kakao = {
  render: () => {
    return <PlatformScoreLabel platform="카카오" score={4.5} count={10} />;
  },
  args: {
    platform: "카카오",
    score: 4.5,
    count: 10,
  },
};

export const Null = {
  render: () => {
    return <PlatformScoreLabel platform="네이버" score={0} count={0} />;
  },
};
