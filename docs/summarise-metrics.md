# Metrics Summariser

`tools/summarise_metrics.py` is a small command line helper that turns the
dashboard API payload into a Markdown summary. It is dependency free and
reads the JSON payload from standard input.

## MetricSummary

`MetricSummary` is the dataclass that holds one metric: its `label`, its
`value` and its `trend`.

## build_summaries

`build_summaries` converts the raw API payload into a list of
`MetricSummary` objects, skipping values that are not numbers.

## render_markdown

`render_markdown` renders the summaries as a Markdown bullet list.

## main

`main` reads the payload from standard input and prints the Markdown summary.
