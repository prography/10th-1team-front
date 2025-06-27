import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import BottomSheet from "@/components/molecules/BottomSheet/BottomSheet";

const meta: Meta<typeof BottomSheet> = {
  title: "Molecules/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `

화면 하단에서 올라오는 모달 시트 컴포넌트입니다.

### 🔧 기본 사용법
\`\`\`tsx
import BottomSheet from '@/components/molecules/BottomSheet/BottomSheet';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>바텀시트 열기</button>
      
      {isOpen && (
        <BottomSheet title="제목" onClose={() => setIsOpen(false)}>
          <div className="p-4">바텀시트 내용</div>
        </BottomSheet>
      )}
    </>
  );
}
\`\`\`

### ✨ 주요 기능
- slide-up/slide-down 애니메이션
- 배경 클릭으로 닫기
- 최대 600px 너비 제한
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "바텀시트 제목",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
    onClose: {
      action: "closed",
      description: "닫기 콜백 함수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  args: {
    title: "바텀시트 제목",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="h-screen bg-gray-100 p-4">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            바텀시트 열기
          </button>

          {isOpen && (
            <BottomSheet {...args} onClose={() => setIsOpen(false)}>
              <div className="p-4">
                <p className="mb-4">바텀시트 내용입니다.</p>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded">항목 1</div>
                  <div className="p-3 bg-gray-50 rounded">항목 2</div>
                  <div className="p-3 bg-gray-50 rounded">항목 3</div>
                  <div className="p-3 bg-gray-50 rounded">항목 4</div>
                </div>
              </div>
            </BottomSheet>
          )}
        </div>
      </div>
    );
  },
};

export const MultipleButtons: Story = {
  args: {
    title: "다양한 크기의 바텀시트",
  },
  render: (args) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    return (
      <div className="h-screen bg-gray-100 p-4">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => setIsOpen1(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              작은 바텀시트
            </button>
            <button
              onClick={() => setIsOpen2(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              중간 바텀시트
            </button>
            <button
              onClick={() => setIsOpen3(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              큰 바텀시트
            </button>
          </div>

          {isOpen1 && (
            <BottomSheet
              {...args}
              title="작은 바텀시트"
              className="h-1/3"
              onClose={() => setIsOpen1(false)}
            >
              <div className="p-4">
                <p>작은 크기의 바텀시트입니다.</p>
              </div>
            </BottomSheet>
          )}

          {isOpen2 && (
            <BottomSheet
              {...args}
              title="중간 바텀시트"
              className="h-2/3"
              onClose={() => setIsOpen2(false)}
            >
              <div className="p-4">
                <p>중간 크기의 바텀시트입니다.</p>
                <div className="space-y-2 mt-4">
                  <div className="p-2 bg-gray-50 rounded">항목 1</div>
                  <div className="p-2 bg-gray-50 rounded">항목 2</div>
                  <div className="p-2 bg-gray-50 rounded">항목 3</div>
                </div>
              </div>
            </BottomSheet>
          )}

          {isOpen3 && (
            <BottomSheet
              {...args}
              title="큰 바텀시트"
              className="h-4/5"
              onClose={() => setIsOpen3(false)}
            >
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {Array.from({ length: 15 }, (_, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded">
                      큰 바텀시트 항목 {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </BottomSheet>
          )}
        </div>
      </div>
    );
  },
};
