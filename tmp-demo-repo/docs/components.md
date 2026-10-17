# Components

## StatItem

The `StatItem` interface defines a single statistic on the dashboard. It is rendered by the `StatCard` component.

## StatCard

The `StatCard` component accepts a `StatItem` and displays its label, value, and optional trend indicator.

```tsx
<StatCard label="Users" value={42} />
```

## DashboardPage

The `DashboardPage` page uses a list of `StatItem` objects to render multiple `StatCard` instances in a row.
