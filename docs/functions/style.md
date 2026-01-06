[**css-in-console**](../README.md)

***

[css-in-console](../README.md) / style

# Function: style()

## Call Signature

> **style**(...`styles`): `Record`\<`string`, `string`\>

This is helper function to predefine CSS-like rules for being used with [log](../variables/log.md)/[formatWithOptions](formatWithOptions.md)/[format](format.md)/….
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

### Parameters

#### styles

...(`` `.${string}{ @import "${string}" }` `` \| `` `.${string}{ display: none; }` `` \| `` `.${string}{ display: list-item; }` `` \| `` `.${string}{ color: rgb(${number} ${number} ${number}); }` `` \| `` `.${string}{ color: rgb(${number}, ${number}, ${number}); }` `` \| `` `.${string}{ color: black; }` `` \| `` `.${string}{ color: red; }` `` \| `` `.${string}{ color: green; }` `` \| `` `.${string}{ color: yellow; }` `` \| `` `.${string}{ color: blue; }` `` \| `` `.${string}{ color: magenta; }` `` \| `` `.${string}{ color: cyan; }` `` \| `` `.${string}{ color: white; }` `` \| `` `.${string}{ color: gray; }` `` \| `` `.${string}{ color: lightred; }` `` \| `` `.${string}{ color: lightgreen; }` `` \| `` `.${string}{ color: lightyellow; }` `` \| `` `.${string}{ color: lightblue; }` `` \| `` `.${string}{ color: lightmagenta; }` `` \| `` `.${string}{ color: lightcyan; }` `` \| `` `.${string}{ color: whitesmoke; }` `` \| `` `.${string}{ background: rgb(${number} ${number} ${number}); }` `` \| `` `.${string}{ background: rgb(${number}, ${number}, ${number}); }` `` \| `` `.${string}{ background: black; }` `` \| `` `.${string}{ background: red; }` `` \| `` `.${string}{ background: green; }` `` \| `` `.${string}{ background: yellow; }` `` \| `` `.${string}{ background: blue; }` `` \| `` `.${string}{ background: magenta; }` `` \| `` `.${string}{ background: cyan; }` `` \| `` `.${string}{ background: white; }` `` \| `` `.${string}{ background: gray; }` `` \| `` `.${string}{ background: lightred; }` `` \| `` `.${string}{ background: lightgreen; }` `` \| `` `.${string}{ background: lightyellow; }` `` \| `` `.${string}{ background: lightblue; }` `` \| `` `.${string}{ background: lightmagenta; }` `` \| `` `.${string}{ background: lightcyan; }` `` \| `` `.${string}{ background: whitesmoke; }` `` \| `` `.${string}{ margin-left: ${number}; }` `` \| `` `.${string}{ margin-right: ${number}; }` `` \| `` `.${string}{ text-decoration: underline }` `` \| `` `.${string}{ text-decoration: line-through }` `` \| `` `.${string}{ list-style-type: ${string} }` `` \| `` `.${string}{ unset: all; }` `` \| `` `.${string}{ font-style: italic; }` `` \| `` `.${string}{ font-weight: bold; }` `` \| `` `.${string}{ animation: blink; }` ``)[]

### Returns

`Record`\<`string`, `string`\>

## Call Signature

> **style**(...`styles`): `Record`\<`string`, `string`\>

You can use it aslo as template function:
```js
const css= style`
	@import "./file.css";
	.red{ color: red; }
`;
```

### Parameters

#### styles

...[`cssTemplate`](../type-aliases/cssTemplate.md)

### Returns

`Record`\<`string`, `string`\>
