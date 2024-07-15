import { useMemo } from "react";
import { SWRResponse } from "swr";
import { FetchError } from "./FetchError";
import { FetchApiOptions } from "./fetchApi";
import { ResponseTransform } from "./transformResponse";

export enum EditorMode {
  interactive = "interactive",
  loading = "loading",
  error = "error",
  success = "success",
}

export function useMockedResponse<TData>({
  response,
  inEditor,
  editorMode,
  previewData,
  transformResponse,
  fetchOptions,
}: {
  response: SWRResponse<TData>;
  inEditor: boolean;
  editorMode: EditorMode;
  previewData: TData;
  transformResponse: ResponseTransform;
  fetchOptions: FetchApiOptions;
}): SWRResponse<TData> {
  if (!inEditor) {
    return response;
  }

  const interactive = editorMode === EditorMode.interactive;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo((): SWRResponse => {
    if (interactive) {
      return response;
    }

    if (editorMode === EditorMode.loading) {
      return {
        data: undefined,
        error: undefined,
        isLoading: true,
        isValidating: true,
        mutate: () => new Promise(() => {}),
      };
    }

    if (editorMode === EditorMode.error) {
      return {
        data: undefined,
        error: new FetchError(
          "mocked error url",
          null,
          "mocked error for inEditor mode",
        ),
        isLoading: true,
        isValidating: true,
        mutate: () => new Promise(() => {}),
      };
    }

    return {
      data: transformResponse(previewData, fetchOptions),
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: () => new Promise(() => {}),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    interactive,
    editorMode,
    previewData,
    response,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(fetchOptions),
  ]);
}
