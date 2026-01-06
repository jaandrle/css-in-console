[**css-in-console**](../../../../README.md)

***

[css-in-console](../../../../README.md) / [nodejs](../README.md) / error

# Function: error()

## Call Signature

> **error**(...`data`): `void`

The **`console.error()`** static method outputs a message to the console at the 'error' log level.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/console/error_static)

### Parameters

#### data

...`any`[]

### Returns

`void`

## Call Signature

> **error**(`message?`, ...`optionalParams?`): `void`

Prints to `stderr` with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html)
(the arguments are all passed to [`util.format()`](https://nodejs.org/docs/latest-v18.x/api/util.html#utilformatformat-args)).

```js
const code = 5;
console.error('error #%d', code);
// Prints: error #5, to stderr
console.error('error', code);
// Prints: error 5, to stderr
```

If formatting elements (e.g. `%d`) are not found in the first string then
[`util.inspect()`](https://nodejs.org/docs/latest-v18.x/api/util.html#utilinspectobject-options) is called on each argument and the
resulting string values are concatenated. See [`util.format()`](https://nodejs.org/docs/latest-v18.x/api/util.html#utilformatformat-args)
for more information.

### Parameters

#### message?

`any`

#### optionalParams?

...`any`[]

### Returns

`void`

### Since

v0.1.100
