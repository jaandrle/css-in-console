[**css-in-console**](../README.md)

***

[css-in-console](../README.md) / log

# Variable: log

> `const` **log**: [`Log`](../interfaces/Log.md)

This is extended version of [nodejs.log](../css-in-console/namespaces/nodejs/functions/log.md) whith CSS-like styling support.
Prints to `stdout` with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to `util.format()`).
```js
log('%s:%s', 'foo', 'bar', 'baz');
log('count: %d', 5);
```
In additional you can use [Styling console output](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output):
```js
log("%cRed", "color:red");
```
…supported rules: [css\_rules](../type-aliases/css_rules.md). Also (see [Log](../interfaces/Log.md)):
```js
log.css`*{ color: red; }`
```
