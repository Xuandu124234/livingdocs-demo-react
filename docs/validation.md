# Validation Utilities

The validation helpers provide reusable input checks shared across forms in the dashboard.

## validateEmail

`validateEmail` returns a `ValidationResult`. It reports an error when the email is empty and when the address does not match a simple email pattern.

## validatePassword

`validatePassword` returns a `ValidationResult`. It enforces a minimum length of 8 characters, at least one uppercase letter, and at least one digit.

## normaliseText

`normaliseText` trims the input and collapses internal whitespace runs into a single space.

## truncate

`truncate` shortens a string to the given maximum length, appending an ellipsis when the string was cut.
