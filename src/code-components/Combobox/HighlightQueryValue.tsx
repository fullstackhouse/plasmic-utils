import { normalizeSearchedText } from "./utils";

interface HighlightQueryProps {
  text: string;
  query: string;
  queryClassName?: string;
}

const HighlightQueryValue = ({
  text,
  query,
  queryClassName,
}: HighlightQueryProps) => {
  const normalizedText = normalizeSearchedText(text);
  const normalizedQuery = normalizeSearchedText(query);

  const startIndex = normalizedText.indexOf(normalizedQuery);

  if (startIndex !== -1) {
    const beforeMatch = text.slice(0, startIndex);
    const matchedQuery = text.slice(
      startIndex,
      startIndex + normalizedQuery.length,
    );
    const afterMatch = text.slice(startIndex + normalizedQuery.length);

    return (
      <>
        {beforeMatch}
        <span className={queryClassName}>{matchedQuery}</span>
        {afterMatch}
      </>
    );
  }

  return <>{text}</>;
};

export default HighlightQueryValue;
