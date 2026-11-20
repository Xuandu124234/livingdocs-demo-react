# Formatting Helpers

The dashboard uses a couple of formatting helpers to render timestamps.

## formatDate

`formatDate(date: string): string` converts the given date into a localized
string such as `Jan 1, 2026`.

## formatRelative

`formatRelative(date: Date): string` returns a human readable string that
describes how long ago the given date occurred, for example `5 minutes ago`.

## useOldDashboardStats

The `useOldDashboardStats` hook was used by the previous dashboard layout to
load the statistics. It has been replaced by `useDashboardStats`.
