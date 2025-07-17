import React from "react";
import Icon, { IconName } from "./Icon";
import * as icons from "./icons";

const iconNames = Object.keys(icons) as IconName[];

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: iconNames,
    },
    size: {
      control: { type: "number", min: 16, max: 64, step: 4 },
    },
    fill: {
      control: "color",
    },
    stroke: {
      control: "color",
    },
    strokeWidth: {
      control: { type: "number", min: 1, max: 4, step: 0.5 },
    },
  },
};

export default meta;

// 기본 아이콘 스토리
export const Default = {
  args: {
    icon: "Search",
    size: 24,
  },
};

// 다양한 크기 변형
export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Icon icon="Search" size={16} />
      <Icon icon="Search" size={24} />
      <Icon icon="Search" size={32} />
      <Icon icon="Search" size={48} />
    </div>
  ),
};

// 다양한 색상 변형
export const Colors = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Icon icon="Star" size={24} fill="#FFD700" />
      <Icon icon="Check" size={24} fill="#4CAF50" />
      <Icon icon="Delete" size={24} fill="#F44336" />
      <Icon icon="Save" size={24} fill="#2196F3" />
    </div>
  ),
};

// Stroke 스타일 변형
export const StrokeStyles = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Icon icon="Check" size={24} stroke="#333" strokeWidth={2} fill="none" />
      <Icon icon="Check" size={24} stroke="#333" strokeWidth={4} fill="none" />
      <Icon icon="Check" size={24} stroke="#333" strokeWidth={6} fill="none" />
    </div>
  ),
};

// 모든 아이콘 갤러리
export const AllIcons = {
  render: () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "24px",
          padding: "24px",
          maxWidth: "800px",
        }}
      >
        {iconNames.map((iconName) => (
          <div
            key={iconName}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            <Icon icon={iconName} size={32} />
            <span
              style={{ fontSize: "12px", color: "#666", textAlign: "center" }}
            >
              {iconName}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
