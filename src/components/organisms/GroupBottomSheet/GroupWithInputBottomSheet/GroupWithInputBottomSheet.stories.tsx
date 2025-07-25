import type { Meta } from "@storybook/nextjs";
import { useState } from "react";
import GroupWithInputBottomSheet, {
  GroupWithInputBottomSheetProps,
} from "./GroupWithInputBottomSheet";

const meta: Meta<typeof GroupWithInputBottomSheet> = {
  title: "Organisms/GroupWithInputBottomSheet",
  component: GroupWithInputBottomSheet,
  parameters: {
    docs: {
      description: {
        component: `
그룹 이름 입력과 색상 선택이 가능한 바텀시트 컴포넌트입니다.\n\n### 🔧 기본 사용법\n\n\`\`\`tsx\n<GroupWithInputBottomSheet\n  title="새 그룹 만들기"\n  groupName={groupName}\n  selectedColor={selectedColor}\n  onGroupNameChange={setGroupName}\n  onColorSelect={setSelectedColor}\n  onClose={close}\n  onDone={submit}\n/>\n\`\`\`\n`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "바텀시트 제목",
    },
    groupName: {
      control: "text",
      description: "그룹 이름",
    },
    selectedColor: {
      control: "text",
      description: "선택된 색상",
    },
    onGroupNameChange: {
      action: "groupNameChanged",
      description: "그룹 이름 변경 핸들러",
    },
    onColorSelect: {
      action: "colorSelected",
      description: "색상 선택 핸들러",
    },
    onClose: {
      action: "closed",
      description: "닫기 콜백 함수",
    },
    onDone: {
      action: "done",
      description: "완료 핸들러",
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
  render: (args: GroupWithInputBottomSheetProps) => {
    const [groupName, setGroupName] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    return (
      <GroupWithInputBottomSheet
        {...args}
        groupName={groupName}
        selectedColor={selectedColor}
        onGroupNameChange={setGroupName}
        onColorSelect={setSelectedColor}
        onClose={() => alert("닫기 클릭")}
        onDone={() => alert(`완료: ${groupName}, ${selectedColor}`)}
      />
    );
  },
  args: {
    title: "새 그룹 만들기",
  },
};
