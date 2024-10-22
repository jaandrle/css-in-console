[← Home](../../..) | css-in-console

# css-in-console

## Table of contents

### Public Functions

- [format](README.md#format)
- [formatWithOptions](README.md#formatwithoptions)
- [style](README.md#style)
- [log](README.md#log)
- [error](README.md#error)
- [css](README.md#css)

### Type Aliases

- [css\_rgb](README.md#css_rgb)
- [css\_colors](README.md#css_colors)
- [css\_rules](README.md#css_rules)
- [cssTemplate](README.md#csstemplate)

### Namespaces

- [nodejs](modules/nodejs.md)

### Interfaces

- [Log](interfaces/Log.md)

## Public Functions

### format

▸ **format**(`message?`, `...optionalParams`): `string`

This is extended version of [format](modules/nodejs.md#format) whith CSS-like styling support.
So all [format](modules/nodejs.md#format) features supported, e. g.:
```js
format('%s:%s', 'foo', 'bar', 'baz');
// Returns: 'foo:bar baz'
```
In additional you can use [Styling console output](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output):
```js
format("%cRed", "color:red");
```
…supported rules: [css_rules](README.md#css_rules).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message?` | `any` | The text to print. |
| `...optionalParams` | `any`[] | - |

#### Returns

`string`

___

### formatWithOptions

▸ **formatWithOptions**(`inspectOptions`, `format?`, `...param`): `string`

This is extended version of [formatWithOptions](modules/nodejs.md#formatwithoptions) whith CSS-like styling support.
So, it is similar to [format](README.md#format).
```js
formatWithOptions({ colors: true }, "%cRed", "color:red");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inspectOptions` | [`InspectOptions`](interfaces/nodejs.InspectOptions.md) | Argument which specifies options that are passed along to [inspect](modules/nodejs.md#inspect). |
| `format?` | `any` | - |
| `...param` | `any`[] | - |

#### Returns

`string`

___

### style

▸ **style**(`...styles`): `Record`<`string`, `string`\>

This is helper function to predefine CSS-like rules for being used with [log](README.md#log)/[formatWithOptions](README.md#formatwithoptions)/[format](README.md#format)/….
```js
const css= style(".red { color: red; }", ".blue { color: blue; }");
log("%cRed text", css.red);
log("%cBlue text", css.blue);
```
…there is special style name `*` which applies to all defined classes:
```js
const css= style("* { font-weight: bold; }", ".red { color: red; }", ".blue { color: blue; }");
log("%cRed and bold text", css.red);
log("%cBlue and bold text", css.blue);
```
…you can also import css file:
```js
const css= style("@import './file.css'");
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `...styles` | (\`.${string}{ @import "${string}" }\` \| \`.${string}{ display: none; }\` \| \`.${string}{ display: list-item; }\` \| \`.${string}{ color: rgb(${number} ${number} ${number}); }\` \| \`.${string}{ color: rgb(${number}, ${number}, ${number}); }\` \| \`.${string}{ color: black; }\` \| \`.${string}{ color: red; }\` \| \`.${string}{ color: green; }\` \| \`.${string}{ color: yellow; }\` \| \`.${string}{ color: blue; }\` \| \`.${string}{ color: magenta; }\` \| \`.${string}{ color: cyan; }\` \| \`.${string}{ color: white; }\` \| \`.${string}{ color: gray; }\` \| \`.${string}{ color: lightred; }\` \| \`.${string}{ color: lightgreen; }\` \| \`.${string}{ color: lightyellow; }\` \| \`.${string}{ color: lightblue; }\` \| \`.${string}{ color: lightmagenta; }\` \| \`.${string}{ color: lightcyan; }\` \| \`.${string}{ color: whitesmoke; }\` \| \`.${string}{ background: rgb(${number} ${number} ${number}); }\` \| \`.${string}{ background: rgb(${number}, ${number}, ${number}); }\` \| \`.${string}{ background: black; }\` \| \`.${string}{ background: red; }\` \| \`.${string}{ background: green; }\` \| \`.${string}{ background: yellow; }\` \| \`.${string}{ background: blue; }\` \| \`.${string}{ background: magenta; }\` \| \`.${string}{ background: cyan; }\` \| \`.${string}{ background: white; }\` \| \`.${string}{ background: gray; }\` \| \`.${string}{ background: lightred; }\` \| \`.${string}{ background: lightgreen; }\` \| \`.${string}{ background: lightyellow; }\` \| \`.${string}{ background: lightblue; }\` \| \`.${string}{ background: lightmagenta; }\` \| \`.${string}{ background: lightcyan; }\` \| \`.${string}{ background: whitesmoke; }\` \| \`.${string}{ margin-left: ${number}; }\` \| \`.${string}{ margin-right: ${number}; }\` \| \`.${string}{ text-decoration: underline }\` \| \`.${string}{ text-decoration: line-through }\` \| \`.${string}{ list-style-type: ${string} }\` \| \`.${string}{ unset: all; }\` \| \`.${string}{ font-style: italic; }\` \| \`.${string}{ font-weight: bold; }\` \| \`.${string}{ animation: blink; }\`)[] |

#### Returns

`Record`<`string`, `string`\>

▸ **style**(`...styles`): `Record`<`string`, `string`\>

You can use it aslo as template function:
```js
const css= style`
	@import "./file.css";
	.red{ color: red; }
`;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `...styles` | [`cssTemplate`](README.md#csstemplate) |

#### Returns

`Record`<`string`, `string`\>

___

### log

▸ **log**(`message?`, `...optionalParams`): `void`

This is extended version of [log](modules/nodejs.md#log) whith CSS-like styling support.
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
…supported rules: [css_rules](README.md#css_rules). Also (see [Log](interfaces/Log.md)):
```js
log.css`*{ color: red; }`
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalParams` | `any`[] |

#### Returns

`void`

___

### error

▸ **error**(`message?`, `...optionalParams`): `void`

This is extended version of [error](modules/nodejs.md#error) whith CSS-like styling support.
Prints to `stderr` with newline. Multiple arguments can be passed, with the
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
…supported rules: [css_rules](README.md#css_rules). Also (see [Log](interfaces/Log.md)):
```js
error.css`*{ color: red; }`
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalParams` | `any`[] |

#### Returns

`void`

___

### css

▸ **css**(`...styles`): `Record`<`string`, `string`\>

An alias for [style](README.md#style). It can be helpful for your editor to detect css syntaxt in "css&#96;…&#96;", see:
- [jonsmithers/vim-html-template-literals](https://github.com/jonsmithers/vim-html-template-literals)<br>
- [es6-string-css - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=bashmish.es6-string-css)
```js
const c= css`
	@import "./file.css";
	.red{ color: red; }
`;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `...styles` | (\`.${string}{ @import "${string}" }\` \| \`.${string}{ display: none; }\` \| \`.${string}{ display: list-item; }\` \| \`.${string}{ color: rgb(${number} ${number} ${number}); }\` \| \`.${string}{ color: rgb(${number}, ${number}, ${number}); }\` \| \`.${string}{ color: black; }\` \| \`.${string}{ color: red; }\` \| \`.${string}{ color: green; }\` \| \`.${string}{ color: yellow; }\` \| \`.${string}{ color: blue; }\` \| \`.${string}{ color: magenta; }\` \| \`.${string}{ color: cyan; }\` \| \`.${string}{ color: white; }\` \| \`.${string}{ color: gray; }\` \| \`.${string}{ color: lightred; }\` \| \`.${string}{ color: lightgreen; }\` \| \`.${string}{ color: lightyellow; }\` \| \`.${string}{ color: lightblue; }\` \| \`.${string}{ color: lightmagenta; }\` \| \`.${string}{ color: lightcyan; }\` \| \`.${string}{ color: whitesmoke; }\` \| \`.${string}{ background: rgb(${number} ${number} ${number}); }\` \| \`.${string}{ background: rgb(${number}, ${number}, ${number}); }\` \| \`.${string}{ background: black; }\` \| \`.${string}{ background: red; }\` \| \`.${string}{ background: green; }\` \| \`.${string}{ background: yellow; }\` \| \`.${string}{ background: blue; }\` \| \`.${string}{ background: magenta; }\` \| \`.${string}{ background: cyan; }\` \| \`.${string}{ background: white; }\` \| \`.${string}{ background: gray; }\` \| \`.${string}{ background: lightred; }\` \| \`.${string}{ background: lightgreen; }\` \| \`.${string}{ background: lightyellow; }\` \| \`.${string}{ background: lightblue; }\` \| \`.${string}{ background: lightmagenta; }\` \| \`.${string}{ background: lightcyan; }\` \| \`.${string}{ background: whitesmoke; }\` \| \`.${string}{ margin-left: ${number}; }\` \| \`.${string}{ margin-right: ${number}; }\` \| \`.${string}{ text-decoration: underline }\` \| \`.${string}{ text-decoration: line-through }\` \| \`.${string}{ list-style-type: ${string} }\` \| \`.${string}{ unset: all; }\` \| \`.${string}{ font-style: italic; }\` \| \`.${string}{ font-weight: bold; }\` \| \`.${string}{ animation: blink; }\`)[] |

#### Returns

`Record`<`string`, `string`\>

▸ **css**(`...styles`): `Record`<`string`, `string`\>

An alias for [style](README.md#style). It can be helpful for your editor to detect css syntaxt in "css&#96;…&#96;", see:
- [jonsmithers/vim-html-template-literals](https://github.com/jonsmithers/vim-html-template-literals)<br>
- [es6-string-css - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=bashmish.es6-string-css)
```js
const c= css`
	@import "./file.css";
	.red{ color: red; }
`;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `...styles` | [`cssTemplate`](README.md#csstemplate) |

#### Returns

`Record`<`string`, `string`\>

## Type Aliases

### css\_rgb

Ƭ **css\_rgb**: \`rgb(${number} ${number} ${number})\` \| \`rgb(${number}, ${number}, ${number})\`

The `rgb(…)` is used in enviroment with `$TERM` sets to `xterm-256color`.
You can leverage of the CSS fallback property, to sets the fallback color:
```JavaScript
log.css`
	.red_with_fallback { color: red; color: rgb(190 90 90); }
`;
```

___

### css\_colors

Ƭ **css\_colors**: [`css_rgb`](README.md#css_rgb) \| ``"black"`` \| ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"lightred"`` \| ``"lightgreen"`` \| ``"lightyellow"`` \| ``"lightblue"`` \| ``"lightmagenta"`` \| ``"lightcyan"`` \| ``"whitesmoke"``

___

### css\_rules

Ƭ **css\_rules**: \`@import "${string}"\` \| ``"unset: all;"`` \| \`display: ${"none" \| "list-item"};\` \| \`color: ${css\_colors};\` \| \`background: ${css\_colors};\` \| \`margin-${"left" \| "right"}: ${number};\` \| ``"font-style: italic;"`` \| ``"font-weight: bold;"`` \| \`text-decoration: ${"underline" \| "line-through"}\` \| \`list-style-type: ${string}\` \| ``"animation: blink;"``

___

### cssTemplate

Ƭ **cssTemplate**: [css\_text: TemplateStringsArray, css\_vars: string[]]

See [css_rules](README.md#css_rules)
