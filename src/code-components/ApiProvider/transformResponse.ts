import { ApiRequest } from "./middlewares/middleware";

export type ResponseTransform<TData = any, TFinalData = TData> = (
  data: TData,
  request: ApiRequest,
) => TFinalData;

export function defaultResponseTransform<TData>(data: TData) {
  return data;
}
