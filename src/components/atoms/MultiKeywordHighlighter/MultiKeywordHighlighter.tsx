import React, { useMemo } from "react";

type Highlight = {
  word: string;
  color: string;
  className?: string;
  style?: React.CSSProperties;
};

interface MultiKeywordHighlighterProps {
  text: string;
  highlights: Highlight[]; // [{ word: "네이버", color: "#03C75A" }, ...]
  caseSensitive?: boolean; // 기본 true
}

function escapeRegExp(str: string) {
  // 정규식 메타문자 이스케이프
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function MultiKeywordHighlighter({
  text,
  highlights,
  caseSensitive = true,
}: MultiKeywordHighlighterProps) {
  const { regex, mapByWord } = useMemo(() => {
    if (!highlights?.length) {
      return {
        regex: null as RegExp | null,
        mapByWord: new Map<string, Highlight>(),
      };
    }

    // 길이 내림차순 정렬 → 더 긴 키워드가 먼저 매칭(부분 중첩 완화)
    const sorted = [...highlights].sort(
      (a, b) => b.word.length - a.word.length
    );

    // word -> 설정 맵
    const m = new Map<string, Highlight>();
    sorted.forEach((h) => m.set(h.word, h));

    // 정규식 생성
    const pattern = `(${sorted.map((h) => escapeRegExp(h.word)).join("|")})`;
    const flags = `g${caseSensitive ? "" : "i"}`;
    return { regex: new RegExp(pattern, flags), mapByWord: m };
  }, [highlights, caseSensitive]);

  if (!regex) return <>{text}</>;

  // split으로 캡처그룹을 포함해서 쪼갬 → 매칭된 단어가 배열에 그대로 들어옴
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        // caseSensitive=false일 때는 원문(part)와 동일한 키를 못 찾을 수 있으므로
        // 하이라이트 목록에서 대소문자 무시 비교로 다시 찾음
        const matched = [...mapByWord.keys()].find((key) =>
          caseSensitive
            ? key === part
            : key.toLowerCase() === part.toLowerCase()
        );

        if (matched) {
          const conf = mapByWord.get(matched)!;
          return (
            <span
              key={idx}
              className={conf.className}
              style={{ color: conf.color, ...conf.style }}
            >
              {part}
            </span>
          );
        }

        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
}
