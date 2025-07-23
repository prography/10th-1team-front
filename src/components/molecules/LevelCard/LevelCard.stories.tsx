import type { Meta, StoryObj } from "@storybook/nextjs";
import LevelCard from "./LevelCard";

const meta: Meta<typeof LevelCard> = {
  title: "Molecules/LevelCard",
  component: LevelCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    voteCount: {
      control: { type: "number", min: 0, max: 25 },
      description: "사용자의 총 투표 수",
    },
    className: {
      control: { type: "text" },
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    voteCount: 0,
  },
};

export const Level1: Story = {
  args: {
    voteCount: 0,
  },
};

export const Level2: Story = {
  args: {
    voteCount: 1,
  },
};

export const Level3: Story = {
  args: {
    voteCount: 4,
  },
};

export const Level4: Story = {
  args: {
    voteCount: 11,
  },
};

export const Level5: Story = {
  args: {
    voteCount: 20,
  },
};

export const InProgress: Story = {
  args: {
    voteCount: 7,
  },
};
