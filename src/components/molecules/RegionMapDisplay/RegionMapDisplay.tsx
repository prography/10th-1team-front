import { DongInfo, Region } from "@/types/region";
import React from "react";

interface RegionMapDisplayProps {
  regions: Region[];
  selectedDong?: DongInfo[];
  isDragging?: boolean;
  position?: { x: number; y: number };
  scale?: number;
  onRegionClick?: (dong: DongInfo) => void;
}

const COLORS = {
  default: "#F5F8FF",
  selected: "#99B6FF",
  stroke: "#99B6FF",
  selectedStroke: "white",
  selectedText: "white",
  defaultText: "#0048FF",
};

export default function RegionMapDisplay({
  regions,
  selectedDong = [],
  isDragging = false,
  position = { x: 0, y: 0 },
  scale = 1,
  onRegionClick = () => {},
}: RegionMapDisplayProps) {
  return (
    <svg
      viewBox="0 0 317 284"
      className="w-full h-auto"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transformOrigin: "center",
        transition: isDragging ? "none" : "transform 0.2s",
      }}
    >
      {regions.map((region: Region) => {
        const isSelected = selectedDong.some(
          (d) => d.dong_code === region.name
        );
        return (
          <g key={region.name}>
            {region.strokePath && (
              <path
                d={region.strokePath}
                fill="none"
                stroke={isSelected ? COLORS.selectedStroke : COLORS.stroke}
                strokeWidth={1}
                pointerEvents="none"
              />
            )}
            {region.fillPath && (
              <path
                d={region.fillPath}
                style={{
                  fill: isSelected ? COLORS.selected : COLORS.default,
                  stroke: isSelected ? COLORS.selectedStroke : COLORS.stroke,
                  cursor: "pointer",
                  transition: "fill 0.2s",
                }}
                onMouseLeave={(e) => {
                  if (!isDragging) {
                    e.currentTarget.style.fill = isSelected
                      ? COLORS.selected
                      : COLORS.default;
                  }
                }}
                onClick={() =>
                  onRegionClick({
                    name: region.name,
                    dong_code: region.name,
                  })
                }
                data-region={region.name}
              />
            )}
            {region.label && (
              <text
                x={region.label.x}
                y={region.label.y}
                fontFamily="pretendard"
                fontSize={region.label.fontSize ?? 10}
                fill={isSelected ? COLORS.selectedText : COLORS.defaultText}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {region.label.text}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
