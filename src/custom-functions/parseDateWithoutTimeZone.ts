/**
 * Same as `new Date(...)`,
 * but avoids converting date's time zone to the environment (e.g. browser's) time zone,
 * which happens whenever you're using `new Date` to build a date from a string.
 */
export function parseDateWithoutTimeZone(timestamp: string): Date {
  // Inspired by https://dev.to/shubhampatilsd/removing-timezones-from-dates-in-javascript-46ah
  // datetime in UTC (with `Z` suffix)
  if (timestamp.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?Z$/)) {
    return new Date(timestamp.slice(0, -"Z".length));
  }

  // datetime without UTC offset
  if (timestamp.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?$/)) {
    return new Date(timestamp);
  }

  // datetime with UTC offset
  if (
    timestamp.match(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?[+-]\d{2}:\d{2}$/,
    )
  ) {
    return new Date(timestamp.slice(0, -"+00:00".length));
  }

  // date
  if (timestamp.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return new Date(timestamp + "T00:00:00");
  }

  throw new TypeError(`invalid date string: ${timestamp}`);
}
