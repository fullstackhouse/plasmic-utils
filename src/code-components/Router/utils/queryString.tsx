export type Query = Record<string, string>;

export function parseQueryString(queryString: string): Query {
  const search = new URLSearchParams(queryString ?? "");
  return [...search.keys()].reduce((acc, key) => {
    return {
      ...acc,
      // We intentionally don't support arrays (for now)
      // - if there are multiple param values, only the first value will be retrieved
      [key]: search.get(key),
    };
  }, {});
}

export function buildQueryString(query: Record<string, string | null>): string {
  const queryPairs: string[][] = Object.entries(query).flatMap(
    ([key, value]) => {
      if (value === null || value == undefined) {
        return [];
      }
      return [[key, value]];
    },
  );

  return new URLSearchParams(queryPairs).toString();
}
