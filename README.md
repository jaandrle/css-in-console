```js
import { log, style } from "terminal-css";
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
# terminal-css
This library provides extended alternatives to native functions such as `console.log`/`util.format`/….
For `log`/`error`/`format`/`formatWithOptions` functions you can use [Styling console output](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output).

The exported functions process CSS (`%c`) in the first step and then return to the corresponding native functions:
- `log`/`error` ⇒ [`console.log`](https://nodejs.org/api/console.html#consolelogdata-args)/[`console.error`](https://nodejs.org/api/console.html#consoleerrordata-args)
- `format`/`formatWithOptions` ⇒ [`util.format`](https://nodejs.org/api/console.html#consoleerrordata-args)/[`util.formatWithOptions`](https://nodejs.org/api/util.html#utilformatwithoptionsinspectoptions-format-args)

You can also use helpers `style`/`css` or `log.style`/`log.css` to prepare styling rules (they are aliases for the same function).
Beware of using ‘real’ CSS! Consider syntax more like keywords, the library is not intended to implement a CSS parser.
Originally, there was only `style`, but another options (mainly `log.css`) seems to be convenient when you want to use `css` variable and use editor code syntax:
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
	- [`css_rules`](./docs/README.md#css_rules): supported CSS rules (modified)
	- [`css_colors`](./docs/README.md#css_colors): supported CSS colors (modified)
- [examples](./examples)
