# Shared Types

The shared domain types of the dashboard.

## Metric

The `Metric` interface describes a single card on the dashboard: its `label`,
its `value` and an optional `trend` of `up` or `down`.

## DashboardStats

The `DashboardStats` interface is the payload returned by the dashboard
statistics endpoint: `activeUsers`, `openIssues` and `deploysThisWeek`.

## AlertSeverity

`AlertSeverity` is the union of the three severity levels a monitoring alert
can have: `info`, `warning` and `critical`.
