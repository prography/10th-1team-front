import type { Meta, StoryObj } from "@storybook/nextjs";
import Divider from "./Divider";
import Button from "../Button/Button";

const meta: Meta<typeof Divider> = {
  title: "Atoms/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "구분선의 방향을 설정합니다",
    },
    thickness: {
      control: "select",
      options: [1, 2, 4, 8, 12],
      description: "구분선의 두께를 설정합니다 (px)",
    },
    variant: {
      control: "select",
      options: ["normal", "strong", "weak"],
      description: "구분선의 스타일을 설정합니다",
    },
    className: {
      control: "text",
      description: "추가 스타일을 적용하기 위한 className",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    thickness: 8,
    variant: "normal",
  },
};

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: 300 }}>
      <Button variant="primary">위 버튼</Button>
      <Divider {...args} />
      <Button variant="secondary">아래 버튼</Button>
    </div>
  ),
  args: {
    orientation: "horizontal",
    thickness: 8,
    variant: "normal",
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", height: 100 }}>
      <Button variant="primary">왼쪽</Button>
      <Divider {...args} />
      <Button variant="secondary">오른쪽</Button>
    </div>
  ),
  args: {
    orientation: "vertical",
    thickness: 8,
    variant: "normal",
  },
  parameters: {
    layout: "centered",
  },
};
