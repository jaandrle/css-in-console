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
This library provides extended alternatives to native functions such as `console.log`/`util.format`/….
For `log`/`error`/`format`/`formatWithOptions` functions, you can use [Styling console output](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output).

The exported functions process the CSS (`%c` expression) in the first step and then return to the corresponding native functions:
- `log`/`error` ⇒ [`console.log`](https://nodejs.org/api/console.html#consolelogdata-args)/[`console.error`](https://nodejs.org/api/console.html#consoleerrordata-args)
- `format`/`formatWithOptions` ⇒ [`util.format`](https://nodejs.org/api/console.html#consoleerrordata-args)/[`util.formatWithOptions`](https://nodejs.org/api/util.html#utilformatwithoptionsinspectoptions-format-args)
…**Important consequence**: `%c` is processed firstly so indestead of `log("%i%c", 5, "color:red")` you must reorder arguments and so use `log("%i%c", "color:red", 5)`!

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

For more information see:
- [documentation](./docs/README.md) (generated from TypeScript definition file)
	- [`css_rules`](./docs/README.md#css_rules): supported CSS rules
	- [`css_colors`](./docs/README.md#css_colors): supported CSS colors
- [examples](./examples)

## Options under consideration for next release(s)
- support (some) functions/keywords for `content`/`list-style-type` (+ add custom such as ‘timestamp’/‘date’/‘time’)
- `width`/`text-overflow`/`white-space`
- `display:block` ⇒ append "\n"?
- `text-align`
- another pseudo-elements e.g. `::first-letter`, `::marker`, …
- another at-rules e.g. `@counter-style`, `@supports`, …
- `display:table`/`display:table-row`: more likely not, there are better ways to use (for example [console.table - npm](https://www.npmjs.com/package/console.table))
- `position:absolute`/`position:fixed`: starts rewritable mode + `@keyframes`/`animation` (for spinners, progress bars, etc.) … more likely not
- `margin-*`/`padding-*`: now work the same
