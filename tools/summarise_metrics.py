#!/usr/bin/env python3
"""Helper that turns the dashboard API payload into a Markdown summary.

This script exists so the LivingDocs pipeline has a Python source file to
index alongside the TypeScript sources. It is intentionally dependency
free so it can run with a bare Python interpreter.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any, Dict, List


@dataclass
class MetricSummary:
    """One rendered metric of the dashboard."""

    label: str
    value: int
    trend: str = "flat"

    def to_markdown(self) -> str:
        arrow = {"up": "▲", "down": "▼"}.get(self.trend, "•")
        return f"- {arrow} **{self.label}**: {self.value}"


def build_summaries(payload: Dict[str, Any]) -> List[MetricSummary]:
    """Turn an API payload into a list of metric summaries."""

    summaries: List[MetricSummary] = []
    for label, value in payload.items():
        if not isinstance(value, (int, float)):
            continue
        summaries.append(MetricSummary(label=label, value=int(value)))
    return summaries


def render_markdown(summaries: List[MetricSummary]) -> str:
    """Render the summaries as a Markdown bullet list."""

    lines = ["## Dashboard metrics", ""]
    lines.extend(summary.to_markdown() for summary in summaries)
    return "\n".join(lines) + "\n"


def main() -> None:
    """Read a JSON payload from stdin and print the Markdown summary."""

    import sys

    raw = sys.stdin.read().strip()
    payload = json.loads(raw) if raw else {}
    print(render_markdown(build_summaries(payload)))


if __name__ == "__main__":
    main()
