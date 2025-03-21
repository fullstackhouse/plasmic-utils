export interface ApiRequest {
  headers?: Record<string, string>;
  method: string;
  path: string;
  query?: Record<string, string>;
  body?: Record<string, any>;
}

export interface ApiMiddleware<TResponseData = any> {
  name: string;
  fetch(request: ApiRequest): Promise<TResponseData>;
}
