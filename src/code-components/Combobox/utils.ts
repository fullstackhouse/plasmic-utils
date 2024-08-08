import { ComboboxOption, OptionGroup } from "./Combobox";

export function normalizeSearchedText(text: string): string {
  return (
    text
      // To let users find texts with irregular hyphens (e.g. FPGY–2)
      // with a regular hyphen
      .replace(/–/g, "-")
      .toLowerCase()
  );
}

export function groupOptions(options: ComboboxOption[]): OptionGroup[] {
  const grouped = options.reduce<Record<string, ComboboxOption[]>>(
    (groups, option) => {
      const groupKey = option.group || "noGroup";
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(option);
      return groups;
    },
    {},
  );
  return Object.entries(grouped).map(([group, options]) => ({
    name: group === "noGroup" ? undefined : group,
    options,
  }));
}
