interface HighlightQueryProps {
  text: string;
  query: string;
  className?: string;
  highlightClassName?: string;
  multiple?: boolean;
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightQuery({
  text,
  query,
  className = "body-m-semibold text-texticon-onnormal-highestemp",
  highlightClassName = "text-texticon-onnormal-main-500",
  multiple = false,
}: HighlightQueryProps) {
  if (!query) return <span className={className}>{text}</span>;

  const escapedQuery = escapeRegExp(query);
  const regex = new RegExp(escapedQuery, multiple ? "gi" : "i");

  if (multiple) {
    const parts = text.split(regex);
    const matches = text.match(regex);
    if (!matches) return <span className={className}>{text}</span>;

    return (
      <span className={className}>
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < matches.length && (
              <mark className={highlightClassName}>{matches[i]}</mark>
            )}
          </span>
        ))}
      </span>
    );
  }

  const match = text.match(regex);
  if (!match) return <span className={className}>{text}</span>;

  const start = match.index!;
  const end = start + match[0].length;

  return (
    <span className={className}>
      {text.slice(0, start)}
      <mark className={highlightClassName}>{text.slice(start, end)}</mark>
      {text.slice(end)}
    </span>
  );
}
