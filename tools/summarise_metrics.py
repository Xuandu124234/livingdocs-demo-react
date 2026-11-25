/**
 * Helper that turns the dashboard API payload into a Markdown summary.
 */
from __future__ import annotations

import json
import sys
from dataclasses import dataclass


@dataclass
class MetricSummary:
    """One metric of the dashboard."""

    label: str
    value: float
    trend: str | None = None


def build_summaries(payload: dict) -> list[MetricSummary]:
    """Convert the raw API payload into a list of MetricSummary objects."""
    summaries: list[MetricSummary] = []
    for label, value in payload.items():
        if isinstance(value, dict):
            raw = value.get("value")
            trend = value.get("trend")
        else:
            raw = value
            trend = None
        if not isinstance(raw, (int, float)) or isinstance(raw, bool):
            continue
        summaries.append(MetricSummary(label=label, value=float(raw), trend=trend))
    return summaries


def render_markdown(summaries: list[MetricSummary]) -> str:
    """Render the summaries as a Markdown bullet list."""
    lines = []
    for summary in summaries:
        trend = f" ({summary.trend})" if summary.trend else ""
        lines.append(f"- **{summary.label}**: {summary.value:g}{trend}")
    return "\n".join(lines)


def render_table(summaries: list[MetricSummary]) -> str:
    """Render the summaries as a Markdown table."""
    lines = ["| Metric | Value | Trend |", "| --- | --- | --- |"]
    for summary in summaries:
        trend = summary.trend or "—"
        lines.append(f"| {summary.label} | {summary.value:g} | {trend} |")
    return "\n".join(lines)


def main() -> None:
    """Read the payload from standard input and print the summary."""
    payload = json.load(sys.stdin)
    print(render_markdown(build_summaries(payload)))


if __name__ == "__main__":
    main()
