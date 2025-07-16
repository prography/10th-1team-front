import type { Meta, StoryObj } from "@storybook/nextjs";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      description: "버튼의 스타일",
      options: [
        "primary",
        "neutral",
        "secondary",
        "brandNaver",
        "brandKakao",
        "filterDefault",
        "filterActive",
        "filterOption",
        "filterSingle",
        "filterMulti",
        "filterLabel",
        "filterLocationLabel",
        "text",
      ],
    },
    fullWidth: {
      control: "boolean",
      description: "버튼을 부모 너비만큼 확장할지 여부",
    },
    disabled: {
      control: "boolean",
      description: "버튼을 비활성화할지 여부",
    },
    isPressed: {
      control: "boolean",
      description: "눌린 상태를 시각적으로 표현합니다 (pressed 클래스)",
    },
    className: {
      control: "text",
      description: "추가 스타일을 적용하기 위한 className",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};

export const Neutral: Story = {
  args: {
    children: "Button",
    variant: "neutral",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  },
};

export const BrandNaver: Story = {
  args: {
    children: "Button",
    variant: "brandNaver",
  },
};

export const BrandKakao: Story = {
  args: {
    children: "Button",
    variant: "brandKakao",
  },
};

export const FilterDefault: Story = {
  args: {
    children: "Button",
    variant: "filterDefault",
  },
};

export const FilterActive: Story = {
  args: {
    children: "Button",
    variant: "filterActive",
  },
};

export const FilterOption: Story = {
  args: {
    children: "Button",
    variant: "filterOption",
  },
};

export const FilterSingle: Story = {
  args: {
    children: "Button",
    variant: "filterSingle",
  },
};

export const FilterMulti: Story = {
  args: {
    children: "Button",
    variant: "filterMulti",
  },
};

export const FilterLabel: Story = {
  args: {
    children: "Button",
    variant: "filterLabel",
  },
};

export const FilterLocationLabel: Story = {
  args: {
    children: "Button",
    variant: "filterLocationLabel",
  },
};

export const Text: Story = {
  args: {
    children: "Button",
    variant: "text",
  },
};
