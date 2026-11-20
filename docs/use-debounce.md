# Debounce Hook

## useDebounce

`useDebounce` returns a value that only updates after `delayMs` milliseconds
have passed without the input changing. Every change resets the timer, so the
returned value reflects the last value that stayed stable long enough.
