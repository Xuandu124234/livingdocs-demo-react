# LivingDocs Demo React App

A small demo app used to showcase the LivingDocs documentation auto‑update flow.

## Overview

This repository contains a React dashboard that demonstrates how LivingDocs can extract code entities, detect documentation drift, and suggest AI‑generated updates. The core functionality is provided by a set of utility functions for formatting dates, a reusable `StatCard` component that displays statistical data, and the main `App` component that renders the dashboard.

## Components

The React component hierarchy includes:

- **`StatCard`** – a functional component that renders a statistic label, value, and an optional trend indicator. It receives a `StatItem` prop. (See `src/components/StatCard.tsx`.)
- **`StatItem`** – an interface defining the shape of the data passed to `StatCard`. It contains a `label` (string), a `value` (number), and an optional `trend` that can be `'up'` or `'down'`. (See `src/components/StatCard.tsx`.)

The main entry point is the **`App`** component, which renders a header and the `DashboardPage` component inside the main section. (See `src/App.tsx`.)

## Utilities

The `src/utils/formatDate.ts` module exports two helper functions:

- **`formatDate(date: Date): string`** – returns a locale‑formatted date string in the format “MMM dd, yyyy”. (Implementation uses `toLocaleDateString` with `en-US` locale.)
- **`formatRelative(date: Date): string`** – returns a human‑readable relative time string such as “5 minutes ago” or “2 hours ago” based on the difference between the current time and the supplied `date`. (Implementation calculates the difference in minutes and formats accordingly.)

## Code Entity Reference

The following code entities are referenced in this documentation:

- `src/utils/formatDate.ts:formatDate` (function) – `export function formatDate(date: Date): string`
- `src/utils/formatDate.ts:formatRelative` (function) – `export function formatRelative(date: Date): string`
- `src/components/StatCard.tsx:StatCard` (function) – `export function StatCard({ label, value, trend }: StatItem)`
- `src/components/StatCard.tsx:StatItem` (interface) – `export interface StatItem { label: string; value: number; trend?: 'up' | 'down'; }`
- `src/App.tsx:App` (function) – `export function App()`

There are no public API endpoints or class definitions in this module. The module depends on React and TypeScript for its implementation.
