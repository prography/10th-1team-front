// stories/SelectButtonGroup/SelectButtonGroup.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs";
import SelectButtonGroup from "@/components/molecules/SelectButtonGroup/SelectButtonGroup";
import { useState } from "react";

const meta: Meta<typeof SelectButtonGroup<string>> = {
  title: "Molecules/SelectButtonGroup",
  component: SelectButtonGroup,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `

다중/단일 선택이 가능한 버튼 그룹 컴포넌트입니다.

### 🔧 기본 사용법
\`\`\`tsx
import SelectButtonGroup from '@/components/molecules/SelectButtonGroup';

const options = [
  { value: 'korean', label: '한식' },
  { value: 'chinese', label: '중식' },
  { value: 'japanese', label: '일식' },
];

function MyComponent() {
  const [selected, setSelected] = useState([]);

  const handleToggle = (value) => {
    setSelected(prev => 
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <SelectButtonGroup
      options={options}
      selectedValues={selected}
      onToggle={handleToggle}
      description="음식 종류를 선택하세요"
      multiple={true}
    />
  );
}
\`\`\`

### ✨ 주요 기능
- 다중/단일 선택 모드 지원
- 최대 선택 개수 제한 가능
- 그리드 컬럼 수 조정 (2, 3, 4열)
- 다양한 버튼 스타일 지원
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
      description: "다중 선택 여부",
    },
    columns: {
      control: { type: "select" },
      options: [2, 3, 4],
      description: "그리드 컬럼 수",
    },
    description: {
      control: "text",
      description: "설명 텍스트",
    },
    maxSelection: {
      control: "number",
      description: "최대 선택 개수",
    },
    buttonVariant: {
      control: { type: "select" },
      options: [
        "filter",
        "filterSingle",
        "filterMulti",
        "filterLabel",
        "filterLocationLabel",
      ],
      description: "버튼 스타일",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectButtonGroup<string>>;

const FOOD_OPTIONS = [
  { value: "korean", label: "한식" },
  { value: "chinese", label: "중식" },
  { value: "japanese", label: "일식" },
  { value: "western", label: "양식" },
  { value: "snack", label: "분식" },
  { value: "cafe", label: "카페" },
];

const REGION_OPTIONS = [
  { value: "seoul", label: "서울" },
  { value: "busan", label: "부산" },
  { value: "daegu", label: "대구" },
  { value: "incheon", label: "인천" },
  { value: "gwangju", label: "광주" },
  { value: "daejeon", label: "대전" },
];

export const Multiple: Story = {
  name: "다중 선택 (기본)",
  args: {
    options: FOOD_OPTIONS,
    multiple: true,
    columns: 2,
    description: "음식 종류를 선택하세요 (복수 선택 가능)",
    maxSelection: 3,
    buttonVariant: "filterMulti",
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([
      "korean",
      "chinese",
    ]);

    const handleToggle = (value: string) => {
      console.log("Toggle:", value);
      setSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    };

    return (
      <div className="max-w-md">
        <SelectButtonGroup<string>
          {...args}
          selectedValues={selectedValues}
          onToggle={handleToggle}
        />

        <div className="mt-4 p-3 bg-gray-50 rounded">
          <p className="text-sm font-medium">선택된 값:</p>
          <p className="text-sm text-gray-600">
            {selectedValues.length > 0 ? selectedValues.join(", ") : "없음"}
          </p>
        </div>
      </div>
    );
  },
};

export const Single: Story = {
  name: "단일 선택",
  args: {
    options: REGION_OPTIONS,
    multiple: false,
    columns: 3,
    description: "지역을 선택하세요 (단일 선택)",
    buttonVariant: "filterSingle",
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(["seoul"]);

    const handleToggle = (value: string) => {
      console.log("Toggle:", value);
      // 단일 선택: 같은 값이면 해제, 다른 값이면 교체
      setSelectedValues((prev) => (prev.includes(value) ? [] : [value]));
    };

    return (
      <div className="max-w-md">
        <SelectButtonGroup<string>
          {...args}
          selectedValues={selectedValues}
          onToggle={handleToggle}
        />

        <div className="mt-4 p-3 bg-gray-50 rounded">
          <p className="text-sm font-medium">선택된 값:</p>
          <p className="text-sm text-gray-600">
            {selectedValues.length > 0 ? selectedValues[0] : "없음"}
          </p>
        </div>
      </div>
    );
  },
};
