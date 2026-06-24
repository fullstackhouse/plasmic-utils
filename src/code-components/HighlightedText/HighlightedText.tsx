import React from "react";
import Highlighter from "react-highlight-words";

interface HighlightedTextProps {
  text: string;
  highlight: string | string[];
  textClassName?: string;
  highlightClassName?: string;
}

export function HighlightedText({
  text,
  highlight,
  textClassName,
  highlightClassName,
}: HighlightedTextProps) {
  const searchWords = Array.isArray(highlight) ? highlight : [highlight];
  return (
    <span className={textClassName}>
      <Highlighter
        searchWords={searchWords}
        textToHighlight={text}
        highlightClassName={highlightClassName}
        caseSensitive={false}
        autoEscape={true}
      />
    </span>
  );
}
