/**
 * HTTP client for the dashboard API.
 */
export class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor(baseUrl = 'https://api.example.com', token: string | null = null) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
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
    });
    if (!response.ok) {
      throw new Error(`POST ${path} failed with status ${response.status}`);
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
