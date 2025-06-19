import type { Meta, StoryObj } from "@storybook/nextjs";
import HighlightQuery from "./HighlightQuery";

const meta: Meta<typeof HighlightQuery> = {
  title: "Atoms/HighlightQuery",
  component: HighlightQuery,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    query: { control: "text" },
    className: { control: "text" },
    highlightClassName: { control: "text" },
    multiple: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof HighlightQuery>;

export const Default: Story = {
  args: {
    text: "쌀국수쌀국수 본점",
    query: "쌀국수",
  },
};

export const Multiple: Story = {
  args: {
    text: "쌀국수쌀국수 본점",
    query: "쌀국수",
    multiple: true,
  },
};

export const NoMatch: Story = {
  args: {
    text: "쌀국수쌀국수 본점",
    query: "국밥",
  },
};

export const CustomStyle: Story = {
  args: {
    text: "쌀국수쌀국수 본점",
    query: "쌀국수",
    highlightClassName: "text-texticon-onnormal-lowestemp",
  },
};
