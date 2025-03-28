import { createContext, PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export const PrepassContext = createContext<boolean>(false);

// Copied from https://github.com/plasmicapp/plasmic/blob/fbcc6ef/packages/query/src/query-data.tsx
// (only so that it works with our swr v2 as a peer depedency)
export function PlasmicPrepassContext(
  props: PropsWithChildren<{
    cache: Map<string, any>;
  }>,
) {
  const { cache, children } = props;
  return (
    <PrepassContext.Provider value={true}>
      <SWRConfig
        value={{
          provider: () => cache,
          // react-ssr-prepass only works with suspense-throwing data fetching
          suspense: true,
          fallback: {},
        }}
      >
        {children}
      </SWRConfig>
    </PrepassContext.Provider>
  );
}
