[**css-in-console**](../../../../README.md)

***

[css-in-console](../../../../README.md) / [nodejs](../README.md) / formatWithOptions

# Function: formatWithOptions()

> **formatWithOptions**(`inspectOptions`, `format?`, ...`param?`): `string`

This function is identical to [format](#formatwithoptions), except in that it takes
an `inspectOptions` argument which specifies options that are passed along to [inspect](inspect.md).

```js
util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 });
// Returns 'See object { foo: 42 }', where `42` is colored as a number
// when printed to a terminal.
```

## Parameters

### inspectOptions

[`InspectOptions`](../interfaces/InspectOptions.md)

### format?

`any`

### param?

...`any`[]

## Returns

`string`

## Since

v10.0.0
