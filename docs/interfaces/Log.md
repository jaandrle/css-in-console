[terminal-css](../README.md) / Log

# Interface: Log

## Callable

### Log

▸ **Log**(`message?`, `...optionalParams`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalParams` | `any`[] |

#### Returns

`void`

## Table of contents

### Public Properties

- [style](Log.md#style)
- [css](Log.md#css)

## Public Properties

### style

• **style**: (...`styles`: (\`.${string}{ @import "${string}" }\` \| \`.${string}{ display: none; }\` \| \`.${string}{ display: list-item; }\` \| \`.${string}{ color: black; }\` \| \`.${string}{ color: red; }\` \| \`.${string}{ color: green; }\` \| \`.${string}{ color: yellow; }\` \| \`.${string}{ color: blue; }\` \| \`.${string}{ color: magenta; }\` \| \`.${string}{ color: cyan; }\` \| \`.${string}{ color: white; }\` \| \`.${string}{ color: gray; }\` \| \`.${string}{ color: lightred; }\` \| \`.${string}{ color: lightgreen; }\` \| \`.${string}{ color: lightyellow; }\` \| \`.${string}{ color: lightblue; }\` \| \`.${string}{ color: lightmagenta; }\` \| \`.${string}{ color: lightcyan; }\` \| \`.${string}{ color: whitesmoke; }\` \| \`.${string}{ background: black; }\` \| \`.${string}{ background: red; }\` \| \`.${string}{ background: green; }\` \| \`.${string}{ background: yellow; }\` \| \`.${string}{ background: blue; }\` \| \`.${string}{ background: magenta; }\` \| \`.${string}{ background: cyan; }\` \| \`.${string}{ background: white; }\` \| \`.${string}{ background: gray; }\` \| \`.${string}{ background: lightred; }\` \| \`.${string}{ background: lightgreen; }\` \| \`.${string}{ background: lightyellow; }\` \| \`.${string}{ background: lightblue; }\` \| \`.${string}{ background: lightmagenta; }\` \| \`.${string}{ background: lightcyan; }\` \| \`.${string}{ background: whitesmoke; }\` \| \`.${string}{ margin-left: ${number}; }\` \| \`.${string}{ margin-right: ${number}; }\` \| \`.${string}{ text-decoration: underline }\` \| \`.${string}{ text-decoration: line-through }\` \| \`.${string}{ list-style-type: ${string} }\` \| \`.${string}{ unset: all; }\` \| \`.${string}{ font-style: italic; }\` \| \`.${string}{ font-weight: bold; }\` \| \`.${string}{ animation: blink; }\`)[]) => `Record`<`string`, `string`\>(...`styles`: [`cssTemplate`](../README.md#csstemplate)) => `Record`<`string`, `string`\>

#### Type declaration

▸ (`...styles`): `Record`<`string`, `string`\>

This is helper function to predefine CSS-like rules for being used with [log](../README.md#log)/[formatWithOptions](../README.md#formatwithoptions)/[format](../README.md#format)/….
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

##### Parameters

| Name | Type |
| :------ | :------ |
| `...styles` | (\`.${string}{ @import "${string}" }\` \| \`.${string}{ display: none; }\` \| \`.${string}{ display: list-item; }\` \| \`.${string}{ color: black; }\` \| \`.${string}{ color: red; }\` \| \`.${string}{ color: green; }\` \| \`.${string}{ color: yellow; }\` \| \`.${string}{ color: blue; }\` \| \`.${string}{ color: magenta; }\` \| \`.${string}{ color: cyan; }\` \| \`.${string}{ color: white; }\` \| \`.${string}{ color: gray; }\` \| \`.${string}{ color: lightred; }\` \| \`.${string}{ color: lightgreen; }\` \| \`.${string}{ color: lightyellow; }\` \| \`.${string}{ color: lightblue; }\` \| \`.${string}{ color: lightmagenta; }\` \| \`.${string}{ color: lightcyan; }\` \| \`.${string}{ color: whitesmoke; }\` \| \`.${string}{ background: black; }\` \| \`.${string}{ background: red; }\` \| \`.${string}{ background: green; }\` \| \`.${string}{ background: yellow; }\` \| \`.${string}{ background: blue; }\` \| \`.${string}{ background: magenta; }\` \| \`.${string}{ background: cyan; }\` \| \`.${string}{ background: white; }\` \| \`.${string}{ background: gray; }\` \| \`.${string}{ background: lightred; }\` \| \`.${string}{ background: lightgreen; }\` \| \`.${string}{ background: lightyellow; }\` \| \`.${string}{ background: lightblue; }\` \| \`.${string}{ background: lightmagenta; }\` \| \`.${string}{ background: lightcyan; }\` \| \`.${string}{ background: whitesmoke; }\` \| \`.${string}{ margin-left: ${number}; }\` \| \`.${string}{ margin-right: ${number}; }\` \| \`.${string}{ text-decoration: underline }\` \| \`.${string}{ text-decoration: line-through }\` \| \`.${string}{ list-style-type: ${string} }\` \| \`.${string}{ unset: all; }\` \| \`.${string}{ font-style: italic; }\` \| \`.${string}{ font-weight: bold; }\` \| \`.${string}{ animation: blink; }\`)[] |

##### Returns

`Record`<`string`, `string`\>

▸ (`...styles`): `Record`<`string`, `string`\>

You can use it aslo as template function:
```js
const css= style`
	@import "./file.css";
	.red{ color: red; }
`;
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `...styles` | [`cssTemplate`](../README.md#csstemplate) |

##### Returns

`Record`<`string`, `string`\>

___

### css

• **css**: (...`styles`: (\`.${string}{ @import "${string}" }\` \| \`.${string}{ display: none; }\` \| \`.${string}{ display: list-item; }\` \| \`.${string}{ color: black; }\` \| \`.${string}{ color: red; }\` \| \`.${string}{ color: green; }\` \| \`.${string}{ color: yellow; }\` \| \`.${string}{ color: blue; }\` \| \`.${string}{ color: magenta; }\` \| \`.${string}{ color: cyan; }\` \| \`.${string}{ color: white; }\` \| \`.${string}{ color: gray; }\` \| \`.${string}{ color: lightred; }\` \| \`.${string}{ color: lightgreen; }\` \| \`.${string}{ color: lightyellow; }\` \| \`.${string}{ color: lightblue; }\` \| \`.${string}{ color: lightmagenta; }\` \| \`.${string}{ color: lightcyan; }\` \| \`.${string}{ color: whitesmoke; }\` \| \`.${string}{ background: black; }\` \| \`.${string}{ background: red; }\` \| \`.${string}{ background: green; }\` \| \`.${string}{ background: yellow; }\` \| \`.${string}{ background: blue; }\` \| \`.${string}{ background: magenta; }\` \| \`.${string}{ background: cyan; }\` \| \`.${string}{ background: white; }\` \| \`.${string}{ background: gray; }\` \| \`.${string}{ background: lightred; }\` \| \`.${string}{ background: lightgreen; }\` \| \`.${string}{ background: lightyellow; }\` \| \`.${string}{ background: lightblue; }\` \| \`.${string}{ background: lightmagenta; }\` \| \`.${string}{ background: lightcyan; }\` \| \`.${string}{ background: whitesmoke; }\` \| \`.${string}{ margin-left: ${number}; }\` \| \`.${string}{ margin-right: ${number}; }\` \| \`.${string}{ text-decoration: underline }\` \| \`.${string}{ text-decoration: line-through }\` \| \`.${string}{ list-style-type: ${string} }\` \| \`.${string}{ unset: all; }\` \| \`.${string}{ font-style: italic; }\` \| \`.${string}{ font-weight: bold; }\` \| \`.${string}{ animation: blink; }\`)[]) => `Record`<`string`, `string`\>(...`styles`: [`cssTemplate`](../README.md#csstemplate)) => `Record`<`string`, `string`\>

#### Type declaration

▸ (`...styles`): `Record`<`string`, `string`\>

This is helper function to predefine CSS-like rules for being used with [log](../README.md#log)/[formatWithOptions](../README.md#formatwithoptions)/[format](../README.md#format)/….
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

##### Parameters

| Name | Type |
| :------ | :------ |
| `...styles` | (\`.${string}{ @import "${string}" }\` \| \`.${string}{ display: none; }\` \| \`.${string}{ display: list-item; }\` \| \`.${string}{ color: black; }\` \| \`.${string}{ color: red; }\` \| \`.${string}{ color: green; }\` \| \`.${string}{ color: yellow; }\` \| \`.${string}{ color: blue; }\` \| \`.${string}{ color: magenta; }\` \| \`.${string}{ color: cyan; }\` \| \`.${string}{ color: white; }\` \| \`.${string}{ color: gray; }\` \| \`.${string}{ color: lightred; }\` \| \`.${string}{ color: lightgreen; }\` \| \`.${string}{ color: lightyellow; }\` \| \`.${string}{ color: lightblue; }\` \| \`.${string}{ color: lightmagenta; }\` \| \`.${string}{ color: lightcyan; }\` \| \`.${string}{ color: whitesmoke; }\` \| \`.${string}{ background: black; }\` \| \`.${string}{ background: red; }\` \| \`.${string}{ background: green; }\` \| \`.${string}{ background: yellow; }\` \| \`.${string}{ background: blue; }\` \| \`.${string}{ background: magenta; }\` \| \`.${string}{ background: cyan; }\` \| \`.${string}{ background: white; }\` \| \`.${string}{ background: gray; }\` \| \`.${string}{ background: lightred; }\` \| \`.${string}{ background: lightgreen; }\` \| \`.${string}{ background: lightyellow; }\` \| \`.${string}{ background: lightblue; }\` \| \`.${string}{ background: lightmagenta; }\` \| \`.${string}{ background: lightcyan; }\` \| \`.${string}{ background: whitesmoke; }\` \| \`.${string}{ margin-left: ${number}; }\` \| \`.${string}{ margin-right: ${number}; }\` \| \`.${string}{ text-decoration: underline }\` \| \`.${string}{ text-decoration: line-through }\` \| \`.${string}{ list-style-type: ${string} }\` \| \`.${string}{ unset: all; }\` \| \`.${string}{ font-style: italic; }\` \| \`.${string}{ font-weight: bold; }\` \| \`.${string}{ animation: blink; }\`)[] |

##### Returns

`Record`<`string`, `string`\>

▸ (`...styles`): `Record`<`string`, `string`\>

You can use it aslo as template function:
```js
const css= style`
	@import "./file.css";
	.red{ color: red; }
`;
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `...styles` | [`cssTemplate`](../README.md#csstemplate) |

##### Returns

`Record`<`string`, `string`\>
