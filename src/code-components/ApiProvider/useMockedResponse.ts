import { useMemo } from "react";
import { ApiResponse } from "./ApiProvider";
import { FetchError } from "./FetchError";
import { ResponseTransform } from "./transformResponse";
import { ApiRequest } from "./middlewares/middleware";

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
  request,
}: {
  response: ApiResponse<TData>;
  inEditor: boolean;
  editorMode: EditorMode;
  previewData: TData;
  transformResponse: ResponseTransform;
  request: ApiRequest;
}): ApiResponse<TData> {
  if (!inEditor) {
    return response;
  }

  const interactive = editorMode === EditorMode.interactive;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo((): ApiResponse<TData> => {
    if (interactive) {
      return response;
    }

    if (editorMode === EditorMode.loading) {
      return {
        data: undefined,
        error: undefined,
        isLoading: true,
        isLagging: false,
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
        isLagging: false,
        isValidating: true,
        mutate: () => new Promise(() => {}),
      };
    }

    return {
      data: transformResponse(previewData, request),
      error: undefined,
      isLoading: false,
      isLagging: false,
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
    JSON.stringify(request),
  ]);
}
