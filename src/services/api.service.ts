import { tokenManager } from "../utils/auth/token";
import { RequestOptions, ApiSuccess } from "../types/api";

export class ApiService {
  constructor(protected baseUrl: string) {}

  protected async request<T>(
    method: string,
    url: string,
    options: RequestOptions & { body?: unknown } = {}
  ): Promise<ApiSuccess<T>> {
    const makeUrl = () => {
      let finalUrl = `${this.baseUrl}${url}`;

      // query params
      if (options.query) {
        const query = new URLSearchParams();

        Object.entries(options.query).forEach(([k, v]) => {
          if (v !== undefined) query.append(k, String(v));
        });

        finalUrl += `?${query.toString()}`;
      }

      return finalUrl;
    };

    const makeRequest = async () => {
      const token = tokenManager.getAccessToken();
      return fetch(makeUrl(), {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
    };

    const res = await makeRequest();

    const status = res.status;
    const data = await res.json();

    return {
      status,
      data: data as T,
    };
  }


  protected get<T>(url: string, options?: RequestOptions) {
    return this.request<T>("GET", url, options);
  }

  protected post<T>(url: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("POST", url, { ...options, body });
  }

  protected put<T>(url: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PUT", url, { ...options, body });
  }

  protected patch<T>(url: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PATCH", url, { ...options, body });
  }

  protected delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>("DELETE", url, options);
  }
}