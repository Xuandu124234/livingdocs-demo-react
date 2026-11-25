/**
 * HTTP client for the dashboard API.
 */
export class ApiClient {
  private baseUrl: string;
  private token: string | null;
  private timeoutMs: number;

  constructor(baseUrl = 'https://api.example.com', token: string | null = null, timeoutMs = 15000) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
    this.timeoutMs = timeoutMs;
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
    const response = await fetch(url.toString(), {
      headers: this.buildHeaders(),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!response.ok) {
      throw new Error(`GET ${path} failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  }

  /**
   * Send a JSON payload to the given path.
   */
  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`, {
      method: 'POST',
      headers: { ...this.buildHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!response.ok) {
      throw new Error(`POST ${path} failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  }

  /**
   * Replace the resource at the given path.
   */
  async put<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`, {
      method: 'PUT',
      headers: { ...this.buildHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!response.ok) {
      throw new Error(`PUT ${path} failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  }

  /**
   * Delete the resource at the given path.
   */
  async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`, {
      method: 'DELETE',
      headers: this.buildHeaders(),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!response.ok) {
      throw new Error(`DELETE ${path} failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  }

  /**
   * Apply an optimistic update to a numeric counter.
   */
  increment(counter: number, by = 1): number {
    return counter + by;
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
