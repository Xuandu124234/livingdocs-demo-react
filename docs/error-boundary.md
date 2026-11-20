# Error Boundary

`ErrorBoundary` is a React error boundary that catches rendering errors of its
children and shows a fallback instead of unmounting the whole tree.

## ErrorBoundaryProps

The `ErrorBoundaryProps` interface carries the optional `fallback` node and the
`children` that are protected.

## ErrorBoundary

`ErrorBoundary` stores the caught error in its state, reports it to the console
in `componentDidCatch` and renders the fallback when an error was caught.
