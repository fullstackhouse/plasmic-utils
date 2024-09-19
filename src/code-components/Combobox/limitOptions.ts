import { OptionGroup } from "./Combobox";
import { groupOptions } from "./utils";

export function limitOptions(
  optionGroups: OptionGroup[],
  limit: number,
): {
  optionGroups: OptionGroup[];
  limited: boolean;
} {
  const totalOptions = optionGroups.reduce(
    (count, group) => count + group.options.length,
    0,
  );

  const overLimit = totalOptions > limit;

  if (!overLimit) {
    return { limited: false, optionGroups };
  }

  const allVisibleOptions = optionGroups.flatMap((group) => group.options);

  const limitedOptions = overLimit
    ? allVisibleOptions.slice(0, limit)
    : allVisibleOptions;

  const limitedOptionGroups = groupOptions(limitedOptions);

  return {
    optionGroups: limitedOptionGroups,
    limited: overLimit,
  };
}
