import { OptionGroup, ComboboxOption } from "./Combobox";
import { normalizeSearchedText } from "./utils";

export function filterOptionGroupsByQuery(
  groups: OptionGroup[],
  query: string | undefined,
): OptionGroup[] {
  if (!query) {
    return groups;
  }

  return groups.flatMap((group) => {
    if (group.name && matchesQuery(group.name, query)) {
      return [group];
    }

    const matchingOptions = group.options.filter((option) =>
      optionMatchesQuery(option, query),
    );
    if (matchingOptions.length === 0) {
      return [];
    }

    return [
      {
        ...group,
        options: matchingOptions,
      },
    ];
  });
}
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
