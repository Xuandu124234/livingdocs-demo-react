# API Client

The `ApiClient` class wraps `fetch` and provides a typed, authenticated way of talking to the dashboard backend.

## ApiClient

`ApiClient` is constructed with a base URL and an optional bearer token. Every request attaches an `Accept: application/json` header, and adds an `Authorization: Bearer <token>` header when a token was supplied.

### get

`get` issues an HTTP `GET` request. Optional `params` are appended to the query string. It resolves with the parsed JSON body and throws when the response status is not ok.

### post

`post` issues an HTTP `POST` request with a JSON body. It resolves with the parsed JSON body and throws when the response status is not ok.

### increment

`increment` applies an optimistic update to a numeric counter. It is a pure helper that does not perform any I/O.
