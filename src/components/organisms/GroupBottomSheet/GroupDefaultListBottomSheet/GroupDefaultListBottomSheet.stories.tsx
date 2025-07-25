import type { Meta, StoryObj } from "@storybook/nextjs";
import GroupDefaultListBottomSheet from "./GroupDefaultListBottomSheet";

const mockGroups = [
  {
    group_id: "1",
    group_name: "맛집 모음",
    icon: "#FFB300",
    number_of_bookmark: 5,
    is_saved: false,
    create_at: "2024-01-01",
    saved_at: "2024-01-02",
  },
  {
    group_id: "2",
    group_name: "데이트 코스",
    icon: "#00B894",
    number_of_bookmark: 2,
    is_saved: false,
    create_at: "2024-01-03",
    saved_at: "2024-01-04",
  },
  {
    group_id: "3",
    group_name: "가족 외식",
    icon: "#0984E3",
    number_of_bookmark: 8,
    is_saved: false,
    create_at: "2024-01-05",
    saved_at: "2024-01-06",
  },
];

const meta: Meta<typeof GroupDefaultListBottomSheet> = {
  title: "Organisms/GroupDefaultListBottomSheet",
  component: GroupDefaultListBottomSheet,
  parameters: {
    docs: {
      description: {
        component: `
그룹 리스트에서 하나를 선택하고 완료할 수 있는 바텀시트 컴포넌트입니다.\n\n### 🔧 기본 사용법\n\n\`\`\`tsx\nimport GroupDefaultListBottomSheet from './GroupDefaultListBottomSheet';\n\n<GroupDefaultListBottomSheet\n  title="그룹 선택"\n  groups={[/* 그룹 배열 */]}\n  onClose={() => {}}\n  onDone={(groupId) => {}}\n/>\n\`\`\`\n\n### ✨ 주요 기능\n- 그룹 리스트에서 하나를 선택 후 완료 버튼으로 확정\n- 그룹이 없을 때 안내\n- props: title, groups, onClose, onDone, onSelectGroup(optional)\n`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "바텀시트 제목",
    },
    onClose: {
      action: "closed",
      description: "닫기 콜백 함수",
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
type Story = StoryObj<typeof GroupDefaultListBottomSheet>;

export const Default: Story = {
  args: {
    title: "그룹 선택",
    groups: mockGroups,
    onClose: () => alert("닫기 클릭"),
    onDone: (id) => alert(`완료: ${id}`),
  },
};

export const SingleGroup: Story = {
  args: {
    title: "그룹 1개",
    groups: [mockGroups[0]],
    onClose: () => alert("닫기 클릭"),
    onDone: (id) => alert(`완료: ${id}`),
  },
};

export const NoGroup: Story = {
  args: {
    title: "그룹 없음",
    groups: [],
    onClose: () => alert("닫기 클릭"),
    onDone: (id) => alert(`완료: ${id}`),
  },
};

export const WithSelectGroupCallback: Story = {
  args: {
    title: "그룹 선택 콜백",
    groups: mockGroups,
    onClose: () => alert("닫기 클릭"),
    onDone: (id) => alert(`완료: ${id}`),
    onSelectGroup: (group) => alert(`선택: ${group.group_name}`),
  },
};
