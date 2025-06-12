import type { Meta, StoryObj } from "@storybook/nextjs";
import List from "./List";

const meta: Meta<typeof List> = {
  title: "Atoms/List",
  component: List,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "text",
      description: "렌더링할 HTML 요소 타입",
    },
    variant: {
      control: "select",
      options: ["search-list"],
      description: "리스트의 스타일",
    },
    className: {
      control: "text",
      description: "추가 스타일을 적용하기 위한 className",
    },
    children: {
      control: false,
      description: "리스트의 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div>리스트 아이템 1</div>
        <div>리스트 아이템 2</div>
        <div>리스트 아이템 3</div>
      </>
    ),
  },
};

export const AsUl: Story = {
  args: {
    as: "ul",
    children: (
      <>
        <li>ul 리스트 아이템 1</li>
        <li>ul 리스트 아이템 2</li>
        <li>ul 리스트 아이템 3</li>
      </>
    ),
  },
};

export const CustomClass: Story = {
  args: {
    className: "bg-blue-100 p-4 rounded",
    children: (
      <>
        <div>커스텀 스타일 1</div>
        <div>커스텀 스타일 2</div>
      </>
    ),
  },
};
