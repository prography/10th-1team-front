import type { Meta, StoryObj } from "@storybook/nextjs";
import ContextMenu from "./ContextMenu";
import Icon from "@/components/atoms/Icon/Icon";
import IconButton from "../IconButton/IconButton";
import { useState } from "react";

const meta: Meta<typeof ContextMenu> = {
  title: "Molecules/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
  \`ContextMenu\`는 사용자 인터랙션에 따라 메뉴를 동적으로 표시할 수 있는 컴포넌트입니다.
  
  ### 사용 예시
  
  다음은 아이콘 버튼을 트리거로 사용하는 예시입니다:
  
  \`\`\`tsx
  <ContextMenu
    align="right"
    offset={{ x: 0, y: 16 }}
    trigger={(props) => (
      <IconButton {...props} startIcon={<Icon icon="More" />} />
    )}
    className="w-[120px]"
    icon={<Icon icon="Check" size={20} />}
    items={[
      {
        label: "수정",
        onClick: () => alert("수정"),
      },
      {
        label: "삭제",
        onClick: () => alert("삭제"),
      },
    ]}
  />
  \`\`\`
  
  ### ✨ 주요 기능
  - 트리거 버튼 클릭 시 메뉴 표시
  - 메뉴 항목 클릭 시 해당 함수 실행
  - 선택된 메뉴 항목 우측에 아이콘 표시
  - 메뉴 위치 조정 가능 (수평, 수직 방향)
  - 메뉴 항목 간 구분선 표시
  - 메뉴 항목 클릭 시 클릭 이벤트 발생
  - 메뉴 항목 클릭 시 선택된 메뉴 항목 우측에 아이콘 표시
        `,
      },
    },
  },
  argTypes: {
    trigger: {
      description:
        "트리거 버튼 렌더 함수. props를 반드시 버튼에 바인딩해야 메뉴 위치가 올바르게 잡힙니다.",
    },
    align: {
      control: "select",
      options: ["left", "right", "center"],
      description: "트리거 버튼 기준 메뉴 위치 조정 (수평)",
    },
    side: {
      control: "select",
      options: ["top", "bottom"],
      description: "트리거 버튼 기준 메뉴 위치 조정 (수직)",
    },
    offset: {
      control: "object",
      description: "메뉴 위치 조정 (수평, 수직 방향)",
    },
    icon: {
      control: "object",
      description: "메뉴 항목 우측에 표시할 아이콘 컴포넌트",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  args: {
    trigger: (props) => (
      <IconButton
        {...props}
        endIcon={<Icon icon="More" />}
        text="더보기"
        variant="text"
      />
    ),
    items: [
      { label: "Item 1", onClick: () => {} },
      { label: "Item 2", onClick: () => {} },
      { label: "Item 3", onClick: () => {} },
    ],
  },
  render: (args) => (
    <div className="h-[400px] flex items-center justify-center">
      <ContextMenu {...args} />
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => {
    const [sortType, setSortType] = useState<"option1" | "option2" | "option3">(
      "option1"
    );

    return (
      <div className="h-[400px] flex items-center justify-center">
        <ContextMenu
          {...args}
          trigger={(props) => (
            <IconButton
              {...props}
              endIcon={<Icon icon="More" />}
              text={sortType}
              variant="text"
            />
          )}
          align="center"
          icon={<Icon icon="Check" size={16} />}
          items={[
            {
              label: "option1",
              onClick: () => {
                setSortType("option1");
              },
              selected: sortType === "option1",
            },
            {
              label: "option2",
              onClick: () => {
                setSortType("option2");
              },
              selected: sortType === "option2",
            },
            {
              label: "option3",
              onClick: () => {
                setSortType("option3");
              },
              selected: sortType === "option3",
            },
          ]}
        />
      </div>
    );
  },
};
