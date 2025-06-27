import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  ScrollTabsContainer,
  ScrollTabsList,
  ScrollTab,
  ScrollTabsContent,
  ScrollTabPanel,
} from "@/components/molecules/ScrollTabs";

const meta: Meta<typeof ScrollTabsContainer> = {
  title: "Molecules/ScrollTabs",
  component: ScrollTabsContainer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `

스크롤과 연동되는 탭 컴포넌트입니다.

### 🔧 기본 구조
\`\`\`tsx
<ScrollTabsContainer>
  <ScrollTabsList>
    <ScrollTab value="tab1">탭 1</ScrollTab>
    <ScrollTab value="tab2">탭 2</ScrollTab>
  </ScrollTabsList>
  
  <ScrollTabsContent>
    <ScrollTabPanel value="tab1">내용 1</ScrollTabPanel>
    <ScrollTabPanel value="tab2">내용 2</ScrollTabPanel>
  </ScrollTabsContent>
</ScrollTabsContainer>
\`\`\`

### 🧩 컴포넌트 설명

#### **ScrollTabsContainer**
- **역할**: 전체 ScrollTabs의 Context Provider 역할
- **기능**: 스크롤 위치 추적 및 탭 상태 관리
- **필수**: 모든 ScrollTabs 관련 컴포넌트는 이 컨테이너 내부에 있어야 함

#### **ScrollTabsList**
- **역할**: 탭 버튼들을 감싸는 컨테이너
- **스타일링**: 탭 버튼들의 레이아웃과 간격 조정
- **예시**: \`className="gap-4"\`로 탭 간격 설정

#### **ScrollTab**
- **역할**: 개별 탭 버튼
- **필수 props**: \`value\` (고유 식별자)
- **기능**: 
  - 클릭시 해당 섹션으로 스크롤
  - 현재 활성화된 탭 스타일링
- **예시**: \`<ScrollTab value="section1">섹션 1</ScrollTab>\`

#### **ScrollTabsContent**
- **역할**: 탭 패널들을 감싸는 스크롤 영역
- **기능**: 스크롤 이벤트 감지 및 탭 상태 업데이트
- **스타일링**: 스크롤 영역의 높이와 패딩 설정

#### **ScrollTabPanel**
- **역할**: 각 탭에 해당하는 콘텐츠 영역
- **필수 props**: \`value\` (ScrollTab의 value와 일치해야 함)
- **기능**: 스크롤 위치에 따라 활성화 여부 결정
- **예시**: \`<ScrollTabPanel value="section1">섹션 1 내용</ScrollTabPanel>\`

### ⚠️ 주의사항
- \`ScrollTab\`의 \`value\`와 \`ScrollTabPanel\`의 \`value\`가 **반드시 일치**해야 합니다
- 관련 컴포넌트는 \`ScrollTabsContainer(Context Provider)\` **내부에서 호출**되어야 합니다.

### ✨ 주요 기능
- 스크롤 위치에 따라 탭 자동 활성화
- 탭 클릭시 해당 섹션으로 스크롤
- 부드러운 스크롤 애니메이션
- 반응형 디자인 지원
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollTabsContainer>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="h-96 border border-gray-300 rounded-lg overflow-hidden">
      <ScrollTabsContainer {...args}>
        <ScrollTabsList className="gap-4">
          <ScrollTab value="first">첫 번째 탭</ScrollTab>
          <ScrollTab value="second">두 번째 탭</ScrollTab>
          <ScrollTab value="third">세 번째 탭</ScrollTab>
        </ScrollTabsList>

        <ScrollTabsContent className="p-4">
          <ScrollTabPanel
            value="first"
            className="h-64 bg-red-50 rounded p-4 mb-4"
          >
            <h2 className="text-lg font-bold mb-2">첫 번째 섹션</h2>
            <p>첫 번째 탭의 내용입니다.</p>
          </ScrollTabPanel>

          <ScrollTabPanel
            value="second"
            className="h-64 bg-blue-50 rounded p-4 mb-4"
          >
            <h2 className="text-lg font-bold mb-2">두 번째 섹션</h2>
            <p>두 번째 탭의 내용입니다.</p>
          </ScrollTabPanel>

          <ScrollTabPanel
            value="third"
            className="h-64 bg-green-50 rounded p-4"
          >
            <h2 className="text-lg font-bold mb-2">세 번째 섹션</h2>
            <p>세 번째 탭의 내용입니다.</p>
          </ScrollTabPanel>
        </ScrollTabsContent>
      </ScrollTabsContainer>
    </div>
  ),
};
