[**css-in-console**](../README.md)

***

[css-in-console](../README.md) / formatWithOptions

# Function: formatWithOptions()

> **formatWithOptions**(`inspectOptions`, `format?`, ...`param?`): `string`

This is extended version of [nodejs.formatWithOptions](../css-in-console/namespaces/nodejs/functions/formatWithOptions.md) whith CSS-like styling support.
So, it is similar to [format](#formatwithoptions).
```js
formatWithOptions({ colors: true }, "%cRed", "color:red");
```

## Parameters

### inspectOptions

[`InspectOptions`](../css-in-console/namespaces/nodejs/interfaces/InspectOptions.md)

Argument which specifies options that are passed along to [nodejs.inspect](../css-in-console/namespaces/nodejs/functions/inspect.md).

### format?

`any`

### param?

...`any`[]

## Returns

`string`
