[**css-in-console**](../README.md)

***

[css-in-console](../README.md) / css\_rgb

# Type Alias: css\_rgb

> **css\_rgb** = `` `rgb(${number} ${number} ${number})` `` \| `` `rgb(${number}, ${number}, ${number})` ``

The `rgb(…)` is used in enviroment with `$TERM` sets to `xterm-256color`.
You can leverage of the CSS fallback property, to sets the fallback color:
```JavaScript
log.css`
	.red_with_fallback { color: red; color: rgb(190 90 90); }
`;
```
