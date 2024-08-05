import { ComboboxOption } from "./Combobox";

export function normalizeSearchedText(text: string): string {
  return (
    text
      // To let users find texts with irregular hyphens (e.g. FPGY–2)
      // with a regular hyphen
      .replace(/–/g, "-")
      .toLowerCase()
  );
}
export function matchesQuery(text: string, query: string): boolean {
  return normalizeSearchedText(text).includes(
    normalizeSearchedText(query).trim(),
  );
}

export const groupOptions = (
  options: ComboboxOption[],
): Record<string, ComboboxOption[]> => {
  return options.reduce((groups: Record<string, ComboboxOption[]>, option) => {
    if (option.group) {
      if (!groups[option.group]) {
        groups[option.group] = [];
      }
      groups[option.group].push(option);
    } else {
      if (!groups["noGroup"]) {
        groups["noGroup"] = [];
      }
      groups["noGroup"].push(option);
    }
    return groups;
  }, {});
};
