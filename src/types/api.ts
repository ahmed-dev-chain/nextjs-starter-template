export type ApiResponse<T> =
  | { success: true; data: T; status: number }
  | { success: false; error: unknown; status: number };

export type RequestOptions = {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  params?: Record<string, string | number>;
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
};
