import type { Meta, StoryObj } from "@storybook/nextjs";
import ListItem from "./ListItem";

const meta: Meta<typeof ListItem> = {
  title: "Atoms/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "text",
      description: "렌더링할 HTML 요소 타입",
    },
    variant: {
      control: "select",
      options: ["auto-complete", "history-search", "search-result"],
      description: "리스트 아이템의 스타일",
    },
    className: {
      control: "text",
      description: "추가 스타일을 적용하기 위한 className",
    },
    children: {
      control: false,
      description: "리스트 아이템의 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    children: "리스트 아이템",
  },
};

export const AsLi: Story = {
  args: {
    as: "li",
    children: "li 태그로 렌더링",
  },
};

export const AutoComplete: Story = {
  args: {
    variant: "auto-complete",
    children: "자동완성 스타일",
  },
};

export const HistorySearch: Story = {
  args: {
    variant: "history-search",
    children: "검색 기록 스타일",
  },
};

export const SearchResult: Story = {
  args: {
    variant: "search-result",
    children: "검색 결과 스타일",
  },
};

export const CustomClass: Story = {
  args: {
    className: "bg-green-100 p-4 rounded",
    children: "커스텀 스타일",
  },
};
