# Dashboard Stats Hook

The `useDashboardStats` hook loads the dashboard statistics from the API exactly once when the component mounts.

## useDashboardStats

`useDashboardStats` returns an object with three fields: `stats` holds the loaded `DashboardStats` (or `null` while loading), `loading` is `true` until the request settles, and `error` holds the failure reason when the request was rejected.

The hook guards against state updates after unmount by tracking a `cancelled` flag inside the effect cleanup, so a late response never calls `setState` on an unmounted component.
