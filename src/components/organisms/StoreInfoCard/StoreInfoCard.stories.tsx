import type { Meta } from "@storybook/nextjs";
import StoreInfoCard from "./StoreInfoCard";
import StoreInfoCardSkeleton from "./StoreInfoCardSkeleton";

const meta: Meta<typeof StoreInfoCard> = {
  title: "Organisms/StoreInfoCard",
  component: StoreInfoCard,
  parameters: {
    docs: {
      description: {
        component: `
기본 헤더 컴포넌트입니다.\n\n### 🔧 기본 사용법\n\n\`\`\`tsx\n<StoreInfoCard\n  item={item}\n  onClick={() => {}}\n  className="border-b border-border-normal-lowemp"\n/>\n\`\`\`\n
스켈레톤 컴포넌트를 활용하여 로딩 상태를 표시할 수 있습니다.\n\n### 🔧 스켈레톤 사용법\n\n\`\`\`tsx\n<StoreInfoCardSkeleton />\n\`\`\`\n`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    item: {
      control: "object",
      description: "가게 정보",
    },
    onClick: {
      action: "onClick",
      description: "클릭 핸들러",
    },
    className: {
      control: "text",
      description: "추가 클래스",
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
      <StoreInfoCard
        item={{
          id: "1",
          name: "가게 이름",
          image_url: "https://via.placeholder.com/150",
          addresses: "가게 주소",
          region: {
            dong_name: "가게 동",
            dong_code: "1234567890",
          },
          road_addresses: "가게 도로명 주소",
          category: "가게 카테고리",
          kakao: {
            count: 10,
            score: 4.5,
            processed: true,
          },
          naver: {
            count: 10,
            score: 4.5,
            processed: true,
          },
        }}
        onClick={() => {}}
      />
    );
  },
  args: {
    title: "새 그룹 만들기",
  },
};

export const Skeleton = {
  render: () => {
    return <StoreInfoCardSkeleton />;
  },
};
