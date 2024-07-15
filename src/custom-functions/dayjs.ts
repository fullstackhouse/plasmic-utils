import * as dayjsLib from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import duration from "dayjs/plugin/duration";

dayjsLib.extend(relativeTime);
dayjsLib.extend(isBetween);
dayjsLib.extend(isSameOrAfter);
dayjsLib.extend(isSameOrBefore);
dayjsLib.extend(duration);

const dayjs = dayjsLib.default;

export { dayjs };
