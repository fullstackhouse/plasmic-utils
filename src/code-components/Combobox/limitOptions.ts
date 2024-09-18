import { OptionGroup } from "./Combobox";
import { groupOptions } from "./utils";

export function limitOptions(
  optionGroups: OptionGroup[],
  maxOptionsDisplay: number,
): {
  optionGroups: OptionGroup[];
  showTypeToSearchText: boolean;
} {
  const totalOptions = optionGroups.reduce(
    (count, group) => count + group.options.length,
    0,
  );

  const showTypeToSearchText = totalOptions > maxOptionsDisplay;

  const allVisibleOptions = optionGroups.flatMap((group) => group.options);

  const limitedOptions = showTypeToSearchText
    ? allVisibleOptions.slice(0, maxOptionsDisplay)
    : allVisibleOptions;

  const limitedOptionGroups = groupOptions(limitedOptions);

  return {
    optionGroups: limitedOptionGroups,
    showTypeToSearchText: showTypeToSearchText,
  };
}
