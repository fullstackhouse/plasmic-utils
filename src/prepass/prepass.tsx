import prepass, {
  ClientReferenceVisitor,
} from "@fullstackhouse/react-ssr-prepass";
import React from "react";
import { PlasmicPrepassContext } from "./context";

/**
 * Runs prepass on the React tree and returns all data for prerendering a Plasmic page.
 */
// Copied from https://github.com/plasmicapp/plasmic/blob/fbcc6ef/packages/prepass/src/index.tsx
// (only so that it works with our swr v2 as a peer depedency)
export async function plasmicPrepassExtract(
  element: React.ReactElement,
  onClientComponentRef?: ClientReferenceVisitor,
): Promise<Record<string, any>> {
  const cache = new Map<string, any>();
  try {
    await plasmicPrepass(
      <PlasmicPrepassContext cache={cache}>{element}</PlasmicPrepassContext>,
      onClientComponentRef,
    );
  } catch (error) {
    console.warn(
      new Error(`PLASMIC: Error encountered while pre-rendering`, {
        cause: error,
      }),
    );
  }

  // Ignore SWR cache keys and query taggeds with $csq$ that indicate a query that
  // the value is exected to be only loaded in client-side and not possible to
  // extract from server-side.
  const filteredCache = Object.fromEntries(
    Array.from(cache.entries())
      .filter(
        ([key, val]) =>
          !key.startsWith("$swr$") &&
          !key.startsWith("$csq$") &&
          val &&
          val.data,
      )
      .map(([key, val]) => [key, val.data]),
  );

  const queryData = (() => {
    try {
      return JSON.parse(
        JSON.stringify(filteredCache, (_key, value) =>
          value !== undefined ? value : null,
        ),
      );
    } catch {
      return filteredCache;
    }
  })();

  return queryData;
}

/**
 * Runs prepass on the React tree and returns query data for prerendering a Plasmic page.
 */
export async function extractPlasmicQueryData(
  element: React.ReactElement,
  onClientComponentRef?: ClientReferenceVisitor,
): Promise<Record<string, any>> {
  return await plasmicPrepassExtract(element, onClientComponentRef);
}

/**
 * Runs prepass on the React tree.
 */
export async function plasmicPrepass(
  element: React.ReactElement,
  onClientComponentRef?: ClientReferenceVisitor,
) {
  await prepass(element, undefined, onClientComponentRef);
}
