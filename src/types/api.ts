export type ApiError = {
  status: number;
  message: string;
};

export type ApiSuccess<T> = {
  status: number;
  data: T;
};

export type RequestOptions = {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  params?: Record<string, string | number>;
};
