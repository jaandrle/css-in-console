[**css-in-console**](../README.md)

***

[css-in-console](../README.md) / format

# Function: format()

> **format**(`message?`, ...`optionalParams?`): `string`

This is extended version of [nodejs.format](../css-in-console/namespaces/nodejs/functions/format.md) whith CSS-like styling support.
So all [nodejs.format](../css-in-console/namespaces/nodejs/functions/format.md) features supported, e. g.:
```js
format('%s:%s', 'foo', 'bar', 'baz');
// Returns: 'foo:bar baz'
```
In additional you can use [Styling console output](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output):
```js
format("%cRed", "color:red");
```
…supported rules: [css\_rules](../type-aliases/css_rules.md).

## Parameters

### message?

`any`

The text to print.

### optionalParams?

...`any`[]

## Returns

`string`
