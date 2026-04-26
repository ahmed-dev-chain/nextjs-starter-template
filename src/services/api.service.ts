import { tokenManager } from "../utils/auth/token";
import { RequestOptions, ApiResponse } from "../types/api";
import { CONFIG } from "../config";

export class ApiService {
  protected baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || CONFIG.API_URL;
  }

   // Main request method with 401 retry logic
  protected async request<T>(
    method: string,
    url: string,
    options: RequestOptions & { body?: unknown } = {},
    isRetry = false
  ): Promise<ApiResponse<T>> {
    try {
      const finalUrl = this.buildUrl(url, options.query);
      const token = tokenManager.getAccessToken();

      const res = await fetch(finalUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: options.cache,
        next: options.next,
      });

      if (res.status === 401 && !isRetry) {
        const refreshed = await this.handleUnauthorized();
        if (refreshed) {
          return this.request<T>(method, url, options, true);
        }
      }

      return await this.parseResponse<T>(res);
    } catch (error) {
      return this.formatError(error);
    }
  }

  private buildUrl(url: string, query?: RequestOptions["query"]): string {
    let finalUrl = `${this.baseUrl}${url}`;

    if (query) {
      const searchParams = new URLSearchParams();
      Object.entries(query).forEach(([k, v]) => {
        if (v !== undefined) searchParams.append(k, String(v));
      });
      const queryString = searchParams.toString();
      if (queryString) {
        finalUrl += `?${queryString}`;
      }
    }

    return finalUrl;
  }

  private async parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
    const status = res.status;
    let data: unknown;

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    return {
      success: res.ok,
      status,
      data: data as T,
      ...(res.ok ? {} : { error: data }),
    } as ApiResponse<T>;
  }

  private formatError(error: unknown): ApiResponse<never> {
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : "Network error",
    };
  }

  protected async handleUnauthorized(): Promise<boolean> {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (res.ok) {
        const data = (await res.json()) as {
          accessToken: string;
          refreshToken: string;
        };
        if (data.accessToken && data.refreshToken) {
          tokenManager.setTokens(data.accessToken, data.refreshToken);
          return true;
        }
      }

      tokenManager.clearTokens();
      return false;
    } catch {
      tokenManager.clearTokens();
      return false;
    }
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
