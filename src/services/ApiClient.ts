/**
 * HTTP client for the dashboard API.
 */
export class ApiClient {
  private baseUrl: string;
  private token: string | null;
  private timeoutMs: number;
  private retries: number;

  constructor(
    baseUrl = 'https://api.example.com',
    token: string | null = null,
    timeoutMs = 15000,
    retries = 2,
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
    this.timeoutMs = timeoutMs;
    this.retries = retries;
  }

  /**
   * Fetch a JSON payload from the given path.
   */
  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }
    return this.request<T>(url.toString(), { method: 'GET' });
  }

  /**
   * Send a JSON payload to the given path.
   */
  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(this.url(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  /**
   * Replace the resource at the given path.
   */
  async put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(this.url(path), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  /**
   * Delete the resource at the given path.
   */
  async delete<T>(path: string): Promise<T> {
    return this.request<T>(this.url(path), { method: 'DELETE' });
  }

  /**
   * Apply an optimistic update to a numeric counter.
   */
  increment(counter: number, by = 1): number {
    return counter + by;
  }

  private url(path: string): string {
    return `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  /**
   * Perform the request, retrying it a couple of times on a network
   * failure or a 5xx response.
   */
  private async request<T>(url: string, init: RequestInit): Promise<T> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        const response = await fetch(url, {
          ...init,
          headers: { ...this.buildHeaders(), ...(init.headers ?? {}) },
          signal: AbortSignal.timeout(this.timeoutMs),
        });
        if (!response.ok) {
          if (response.status >= 500 && attempt < this.retries) {
            continue;
          }
          throw new Error(`${init.method} ${url} failed with status ${response.status}`);
        }
        return (await response.json()) as T;
      } catch (err) {
        lastError = err;
        if (attempt >= this.retries) {
          throw err;
        }
      }
    }
    throw lastError;
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    return headers;
  }
}

export const apiClient = new ApiClient();
