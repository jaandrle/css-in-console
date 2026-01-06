[**css-in-console**](../../../../README.md)

***

[css-in-console](../../../../README.md) / [nodejs](../README.md) / log

# Function: log()

## Call Signature

> **log**(...`data`): `void`

The **`console.log()`** static method outputs a message to the console.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log_static)

### Parameters

#### data

...`any`[]

### Returns

`void`

## Call Signature

> **log**(`message?`, ...`optionalParams?`): `void`

Prints to `stdout` with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html)
(the arguments are all passed to [`util.format()`](https://nodejs.org/docs/latest-v18.x/api/util.html#utilformatformat-args)).

```js
const count = 5;
console.log('count: %d', count);
// Prints: count: 5, to stdout
console.log('count:', count);
// Prints: count: 5, to stdout
```

See [`util.format()`](https://nodejs.org/docs/latest-v18.x/api/util.html#utilformatformat-args) for more information.

### Parameters

#### message?

`any`

#### optionalParams?

...`any`[]

### Returns

`void`

### Since

v0.1.100
