```js
import { log, style } from "css-in-console";
const css= style`
	@import "./example.css";
	.h1{ color: red; }
	.h1::before{ content: "# "; }
	.li{ display: list-item; }
	.b{ font-weight: bold;}
`;
log("%cHeading 1", css.h1);
log("%cParagraph & code style –", css.p,
	"let's say they are defined in the file %c`./example.css`%c.",
	css.code, css.unset);
log("UL %c↓%c:", "color:green", css.unset);
log("%cLI (by default %cstarts%c with `- `)",
	css.li, css.b, css.unset,
	"…you can use `list-style-type` to change it."
);
```
# css-in-console
`css-in-console` is a library that allows you to apply CSS-like styling to console outputs using TypeScript/JavaScript.
With this library, you can format text, apply colors, and use various other CSS properties to style your console output.

The library provides extended alternatives to native functions such as `console.log`/`util.format`/….
For `log`/`error`/`format`/`formatWithOptions` functions, you can use [Styling console output](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output).

## Installation
You can install the `css-in-console` library using your favorite package manager.

For example, with npm:

```sh
npm install css-in-console --save
```

## Usage

First, you need to import the required functions and types from the `css-in-console` library:

```javascript
import { format, formatWithOptions, log, error, style } from 'css-in-console';
// OR
import log from 'css-in-console';
```

### Basic usage
You can use the `log` and `error` functions to print styled messages to the console. For example:

```javascript
log("%cRed text", "color:red");
error("%cGreen text", "color:green");
```
…or prepare formated text:
```javascript
console.log(format("%cBlue text", "color:blue"));
console.log(formatWithOptions({ colors: true }, "%cBlue text", "color:blue"));
```

The exported functions process the CSS (`%c` expression) in the first step and then return to the corresponding native functions:
- `log`/`error` ⇒ [`console.log`](https://nodejs.org/api/console.html#consolelogdata-args)/[`console.error`](https://nodejs.org/api/console.html#consoleerrordata-args)
- `format`/`formatWithOptions` ⇒ [`util.format`](https://nodejs.org/api/console.html#consoleerrordata-args)/[`util.formatWithOptions`](https://nodejs.org/api/util.html#utilformatwithoptionsinspectoptions-format-args)

> …**Important consequence**: `%c` is processed firstly so indestead of `log("%i%c", 5, "color:red")` you must reorder arguments and so use `log("%i%c", "color:red", 5)`!

### Defining CSS-like rules
You can also use the `style`/`css` or `log.style`/`log.css` helpers to prepare styling rules (they are aliases for the same function).
Beware of using ‘real’ CSS! Treat the syntax more like keywords, the library is not intended to implement a CSS parser.
Originally, there was only `style`, but other options (mainly `log.css`) seem to be convenient when you want to use `css` variable and use syntax highlight in your editor, e.g.:
- [jonsmithers/vim-html-template-literals](https://github.com/jonsmithers/vim-html-template-literals)
- [es6-string-css - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=bashmish.es6-string-css)
```js
const css= log.css`
	.example{ color: red; }
`;
log("%cExample", css.example);
```

## Documentation and Examples

### CSS at-rules
This library mimic [At-rules | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule) behaviour
and supports:

- <details> <summary><code>@import</code> — To include an external style sheet. (<i>expand for more</i>)</summary>

	Supported syntax is only `@import 'url';`, you can provide full path or relative to main script (internally uses `argv[1]`).
	```javascript
	const importedStyles = style("@import './styles.css'");
	```
	…there is also another limitation, the `@import` is supported **only inside `style`/`css`/`log.css` functions**.

	For original documentation visits [@import - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@import).
	</details>
- <details> <summary><code>@media</code> — To provide styles when terminal (not) supports “colours”. (<i>expand for more</i>)</summary>

	…so, only `color` is supported:
	```css
	@media (color){ … }
	@media not (color){ … }
	```
	…in case of terminal the `color` means [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code). Meaning, colours and font styling.
	
	For original documentation visits [@media - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media).
	</details>
- <details> <summary><code>@counter-style</code> — To define specific counter styles that are not part of the predefined set of styles. (<i>expand for more</i>)</summary>

	The implementation in this library is very similar to the specification.
	```css
	@counter-style thumbs {
		system: cyclic;
		symbols: 👍;
		suffix: " ";
	}
	.li {
		display: list-item;
		list-style: thumbs;
	}
	```

	You can utilize the `symbols`, `suffix`, `prefix`, `pad`, and `negative`
	properties in a manner similar to the CSS specification. Additionally,
	you can specify `system` values of `fixed`, `cyclic`, `numeric`
	and `alphabetic`, just like in CSS. Furthermore, you can use library-specific
	`--terminal-*` systems such as `--terminal-datetime` (`--terminal-date` and
	`--terminal-time`) as illustrated in the `list-style` examples below.
	The cyclic `⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏` symbols are available through
	the `--terminal-spin` property.

	Predefined counters include `decimal` and `--terminal-*` (`datetime`/`date`/`time` and `spin`).

	```javascript
	log("%c@counter-style", `display: list-item;
		list-style: decimal`); //= 1. @counter-style
	log("%c@counter-style", `display: list-item;
		list-style: --terminal-spin`); //= ⠋ @counter-style
	log("%c@counter-style", `display: list-item;
		list-style: --terminal-datetime`); //= 2023-05-05T10:28:18.696 @counter-style
	log("%c@counter-style", `display: list-item;
		list-style: --terminal-date`); //= 2023-05-05 @counter-style
	log("%c@counter-style", `display: list-item;
		list-style: --terminal-time`); //= 10:28:18.697 @counter-style
	```
	…you can extend these with `extend` syntax `system: extend --terminal-time;`.

	To utilize `--terminal-*` date and time counters, you can use `--terminal-mask: <symbols> <mask>;`.
	Symbols contains two characters (firs/secondt represents ‘remove’/‘keep’), see example:
	```
	--terminal-mask: "01" "111111CSS001"
	```
	…this mask applied to “Hello World!” leads to “Hello CSS!”.
	
	For more information, see:
	- [some examples `./examples/counter-style.js`](./examples/counter-style.js)
	- [@counter-style - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style).
	- [counter() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/counter)
	</details>

## TypeScript Documentation & Examples
For more information see:
- [documentation](./docs/README.md) (generated from TypeScript definition file)
	- [`css_rules`](./docs/README.md#css_rules): supported CSS rules
	- [`css_colors`](./docs/README.md#css_colors): supported CSS colors
- [examples](./examples)

## Options under consideration for next release(s)
- support (some) functions/keywords for `content`/`list-style-type` (+ add custom such as ‘timestamp’/‘date’/‘time’)
- `@media … (color) …`?
- `width`/`text-overflow`/`white-space`
- `display:block` ⇒ append "\n"?
- `text-align`
- another pseudo-elements e.g. `::first-letter`, `::marker`, …
- another at-rules e.g. `@supports`, …
- `display:table`/`display:table-row`: more likely not, there are better ways to use (for example [console.table - npm](https://www.npmjs.com/package/console.table))
- `position:absolute`/`position:fixed`: starts rewritable mode + `@keyframes`/`animation` (for spinners, progress bars, etc.) … more likely not
- `margin-*`/`padding-*`: now work the same
