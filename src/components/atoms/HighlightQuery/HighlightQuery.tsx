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
    const matches = [...text.matchAll(regex)];
    if (matches.length === 0) return <span className={className}>{text}</span>;

    const highlighted: React.ReactNode[] = [];
    let lastIndex = 0;

    for (const match of matches) {
      if (match.index === undefined)
        throw new Error("RegExp match index is undefined");

      const start = match.index;
      const end = start + match[0].length;

      if (lastIndex < start) highlighted.push(text.slice(lastIndex, start));

      highlighted.push(
        <mark key={start} className={highlightClassName}>
          {text.slice(start, end)}
        </mark>
      );

      lastIndex = end;
    }

    if (lastIndex < text.length) highlighted.push(text.slice(lastIndex));
    return <span className={className}>{highlighted}</span>;
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
