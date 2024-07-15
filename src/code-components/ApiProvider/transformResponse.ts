import { FetchApiOptions } from "./fetchApi";

export type ResponseTransform<TData = any, TFinalData = TData> = (
  data: TData,
  options: FetchApiOptions,
) => TFinalData;

export function defaultResponseTransform<TData>(data: TData) {
  return data;
}
