# Storage Utilities

The storage helpers wrap `localStorage` so the dashboard can persist small
pieces of state without every call site repeating the try/catch dance.

## readJson

`readJson` returns the parsed JSON value stored under `key`, or the given
`fallback` when the key is absent or the stored value cannot be parsed.

## writeJson

`writeJson` serialises the value and stores it under `key`. Storage failures
(private browsing, quota exceeded) are swallowed silently.

## removeKey

`removeKey` deletes the value stored under `key`.
