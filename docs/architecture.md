# Architecture

This project is a small single-page React application. It has no server of
its own — the dashboard statistics are fetched from an external HTTP API.

## Layers

- `src/pages` holds the page level components that compose the UI.
- `src/components` holds the reusable presentational components.
- `src/hooks` holds the reusable React hooks that encapsulate stateful logic.
- `src/services` holds the HTTP client used to talk to the backend.
- `src/utils` holds the pure helper functions.
- `src/types` holds the shared domain types.

## Data flow

The dashboard page renders the statistics that the `useDashboardStats` hook
loads. The hook calls the `ApiClient`, which attaches the bearer token to
every request and throws when the response status is not ok.

## Tooling

The project is built with Vite and TypeScript. `tools/summarise_metrics.py`
is an optional helper script that renders the API payload as Markdown.
