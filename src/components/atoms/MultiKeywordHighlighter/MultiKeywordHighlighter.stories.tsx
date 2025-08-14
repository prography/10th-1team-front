import type { Meta, StoryObj } from "@storybook/nextjs";
import MultiKeywordHighlighter from "./MultiKeywordHighlighter";

const meta: Meta<typeof MultiKeywordHighlighter> = {
  title: "Atoms/MultiKeywordHighlighter",
  component: MultiKeywordHighlighter,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "원본 텍스트",
    },
    highlights: {
      control: "object",
      description:
        "하이라이트 설정 배열. 예: [{ word: '네이버', color: '#03C75A' }]",
    },
    caseSensitive: {
      control: "boolean",
      description: "대소문자 구분 여부 (기본 true)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiKeywordHighlighter>;

export const Default: Story = {
  args: {
    text: "네이버와 카카오, 네이버지도와 카카오맵을 비교합니다.",
    highlights: [
      { word: "네이버", color: "#03C75A" },
      { word: "카카오", color: "#FEE500" },
    ],
  },
};

export const CaseInsensitive: Story = {
  args: {
    text: "Naver와 KAkaO를 비교합니다. NAVER 서비스와 kakao 서비스",
    highlights: [
      { word: "naver", color: "#03C75A" },
      { word: "kakao", color: "#FEE500" },
    ],
    caseSensitive: false,
  },
};

export const OverlapPriority: Story = {
  args: {
    text: "네이버지도와 네이버는 다르게 매칭됩니다.",
    highlights: [
      { word: "네이버지도", color: "#00AA88" },
      { word: "네이버", color: "#03C75A" },
    ],
  },
};

export const WithCustomStyle: Story = {
  args: {
    text: "강조 색상과 굵기를 함께 적용합니다: 네이버, 카카오",
    highlights: [
      { word: "네이버", color: "#03C75A", className: "font-semibold" },
      {
        word: "카카오",
        color: "#F59E0B",
        style: { textDecoration: "underline" },
      },
    ],
  },
};
