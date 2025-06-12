import type { Meta, StoryObj } from "@storybook/nextjs";
import Input from "./Input";
import Icon from "../Icon/Icon";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "입력 필드의 스타일",
    },
    value: {
      control: "text",
      description: "입력 필드의 값",
    },
    placeholder: {
      control: "text",
      description: "입력 필드의 플레이스홀더 텍스트",
    },
    error: {
      control: "boolean",
      description: "에러 상태 표시 여부",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비 사용 여부",
    },
    startAdornment: {
      control: false,
      description: "입력 필드 왼쪽에 표시될 요소",
    },
    endAdornment: {
      control: false,
      description: "입력 필드 오른쪽에 표시될 요소",
    },
    startAdornmentHeight: {
      control: "text",
      description: "왼쪽 요소의 높이",
    },
    endAdornmentHeight: {
      control: "text",
      description: "오른쪽 요소의 높이",
    },
    className: {
      control: "text",
      description: "추가 스타일을 적용하기 위한 className",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "입력하세요",
  },
};

export const Error: Story = {
  args: {
    placeholder: "에러 상태",
    error: true,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: "전체 너비",
    fullWidth: true,
  },
};

export const WithStartAdornment: Story = {
  args: {
    placeholder: "아이콘 왼쪽",
    startAdornment: <Icon icon="Search" size={20} />,
  },
};

export const WithEndAdornment: Story = {
  args: {
    placeholder: "아이콘 오른쪽",
    endAdornment: <Icon icon="Delete" size={20} />,
  },
};

export const WithBothAdornments: Story = {
  args: {
    placeholder: "양쪽 아이콘",
    startAdornment: <Icon icon="Search" size={20} />,
    endAdornment: <Icon icon="Delete" size={20} />,
  },
};

export const CustomAdornmentHeight: Story = {
  args: {
    placeholder: "커스텀 높이",
    startAdornment: <Icon icon="Search" size={16} />,
    startAdornmentHeight: "40px",
    endAdornment: <Icon icon="Delete" size={16} />,
    endAdornmentHeight: "40px",
  },
};
