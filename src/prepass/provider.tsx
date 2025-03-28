import { useContext } from "react";
import { PrepassContext } from "./context";
import { SWRConfig } from "swr";

// Copied from https://github.com/plasmicapp/plasmic/blob/fbcc6ef/packages/query/src/query-data.tsx
// (only so that it works with our swr v2 as a peer depedency)
export function PlasmicQueryDataProvider(props: {
  suspense?: boolean;
  children: React.ReactNode;
  prefetchedCache?: Record<string, any>;
}) {
  const { children, suspense, prefetchedCache } = props;
  const prepass = useContext(PrepassContext);
  if (prepass) {
    // If we're in prepass, then there's already a wrapping SWRConfig;
    // don't interfere with it.
    return <>{children}</>;
  } else {
    return (
      <SWRConfig
        value={{
          fallback: prefetchedCache ?? {},
          suspense,
        }}
      >
        {children}
      </SWRConfig>
    );
  }
}
