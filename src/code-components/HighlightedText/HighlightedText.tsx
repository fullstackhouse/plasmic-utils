import React from "react";
import Highlighter from "react-highlight-words";

interface HighlightedTextProps {
  text: string;
  highlight: string;
  textClassName?: string;
  highlightClassName?: string;
}

export function HighlightedText({
  text,
  highlight,
  textClassName,
  highlightClassName,
}: HighlightedTextProps) {
  return (
    <span className={textClassName}>
      <Highlighter
        searchWords={[highlight]}
        textToHighlight={text}
        highlightClassName={highlightClassName}
        caseSensitive={false}
      />
    </span>
  );
}
