import { ComboboxOption, OptionGroup } from "./Combobox";

function matchesQuery(text: string, query: string): boolean {
  return normalizeSearchedText(text).includes(
    normalizeSearchedText(query).trim(),
  );
}

function optionMatchesQuery(option: ComboboxOption, query: string): boolean {
  if (matchesQuery(option.label ?? option.value.toString(), query)) {
    return true;
  }

  if (option.description && matchesQuery(option.description, query)) {
    return true;
  }

  return false;
}

export function normalizeSearchedText(text: string): string {
  return (
    text
      // To let users find texts with irregular hyphens (e.g. FPGY–2)
      // with a regular hyphen
      .replace(/–/g, "-")
      .toLowerCase()
  );
}

export const groupOptions = (options: ComboboxOption[]): OptionGroup[] => {
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
};

export function optionGroupMatchesQuery(
  group: OptionGroup,
  query: string,
): boolean {
  return group.options.some((option) => optionMatchesQuery(option, query));
}
