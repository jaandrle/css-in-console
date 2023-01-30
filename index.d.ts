export type css_colors= "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "lightred" | "lightgreen" | "lightyellow" | "lightblue" | "lightmagenta" | "lightcyan" | "whitesmoke";
/**
 * - `color: COLOR` – see {@link css_colors}
 * - `background: COLOR` – see {@link css_colors}
 * - `margin-left: NUMBER` – counts spaces before string
 * - `margin-right: NUMBER` – counts spaces after string
 * - `font-style: italic`
 * - `font-weight: bold`
 * - `text-decoration: underline|line-through`
 * - `display: none|list-item`
 * - `list-style-type: "…"` – to be used for `display:list-item` (default: `"- "`)
 * - `animation:blink`
 * - `content: "…"` – allowed only for pseudo selectors `::before`/`::after`
 * - `@import "…"` – to import styles from css file, not supported recursive importing ⇒ can be used only in JavaScript function {@link style}
 * - TODO: `tab-size`
*/
export type css_rules=
	  `@import "${string}"`
	| "unset: all;"
	| `display: ${"none"|"list-item"};`
	| `color: ${css_colors};`
	| `background: ${css_colors};`
	| `margin-${"left"|"right"}: ${number};`
	| "font-style: italic;"
	| "font-weight: bold;"
	| `text-decoration: ${"underline"|"line-through"}`
	| `list-style-type: ${string}`
	| "animation: blink;";

import { format as nodejs_format } from "util";
/** Contains all internally used types (functions, …) from nodejs packages. */
export namespace nodejs{ export { nodejs_format as format }; }
/**
 * This is extended version of {@link nodejs.format} whith CSS-like styling support.
 * So all {@link nodejs.format} features supported, e. g.:
 * ```js
 * format('%s:%s', 'foo', 'bar', 'baz');
 * // Returns: 'foo:bar baz'
 * ```
 * In additional you can use [Styling console output](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output):
 * ```js
 * format("%cRed", "color:red");
 * ```
 * …supported rules: {@link css_rules}.
 *
 * @category Public
 * @param message The text to print.
 * */
export function format(message?: any, ...optionalParams: any[]): string
import { formatWithOptions as nodejs_formatWithOptions, inspect as nodejs_inspect, InspectOptions } from "util";
export namespace nodejs{ export { nodejs_formatWithOptions as formatWithOptions, nodejs_inspect as inspect, InspectOptions }; }
/**
 * This is extended version of {@link nodejs.formatWithOptions} whith CSS-like styling support.
 * So, it is similar to {@link format}.
 * ```js
 * formatWithOptions({ colors: true }, "%cRed", "color:red");
 * ```
 * @category Public
 * @param inspectOptions Argument which specifies options that are passed along to {@link nodejs.inspect}.
 * */
export function formatWithOptions(inspectOptions: InspectOptions, format?: any, ...param: any[]): string;

import { log as nodejs_log, error as nodejs_error } from "console";
export namespace nodejs{ export { nodejs_log as log, nodejs_error as error }; }
interface Log{
	(message?: any, ...optionalParams: any[]): void;
	style: typeof style;
	css: typeof style;
}
/**
 * This is extended version of {@link nodejs.log} whith CSS-like styling support.
 * Prints to `stdout` with newline. Multiple arguments can be passed, with the
 * first used as the primary message and all additional used as substitution
 * values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to `util.format()`).
 * ```js
 * log('%s:%s', 'foo', 'bar', 'baz');
 * log('count: %d', 5);
 * ```
 * In additional you can use [Styling console output](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output):
 * ```js
 * log("%cRed", "color:red");
 * ```
 * …supported rules: {@link css_rules}. Also (see {@link Log}):
 * ```js
 * log.css`*{ color: red; }`
 * ```
 *
 * @category Public
 * */
export const log: Log;
/**
 * This is extended version of {@link nodejs.error} whith CSS-like styling support.
 * Prints to `stderr` with newline. Multiple arguments can be passed, with the
 * first used as the primary message and all additional used as substitution
 * values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to `util.format()`).
 * ```js
 * log('%s:%s', 'foo', 'bar', 'baz');
 * log('count: %d', 5);
 * ```
 * In additional you can use [Styling console output](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output):
 * ```js
 * log("%cRed", "color:red");
 * ```
 * …supported rules: {@link css_rules}. Also (see {@link Log}):
 * ```js
 * error.css`*{ color: red; }`
 * ```
 *
 * @category Public
 * */
export const error: Log;

/** See {@link css_rules} */
export type cssTemplate= [ css_text: TemplateStringsArray, ...css_vars: string[] ];
/**
 * This is helper function to predefine CSS-like rules for being used with {@link log}/{@link formatWithOptions}/{@link format}/….
 * ```js
 * const css= style(".red { color: red; }", ".blue { color: blue; }");
 * log("%cRed text", css.red);
 * log("%cBlue text", css.blue);
 * ```
 * …there is special style name `*` which applies to all defined classes:
 * ```js
 * const css= style("* { font-weight: bold; }", ".red { color: red; }", ".blue { color: blue; }");
 * log("%cRed and bold text", css.red);
 * log("%cBlue and bold text", css.blue);
 * ```
 * …you can also import css file:
 * ```js
 * const css= style("@import './file.css'");
 * ```
 * @category Public
 */
export function style(...styles: `.${string}{ ${css_rules} }`[]): Record<string, string>;
/**
 * You can use it aslo as template function:
 * ```js
 * const css= style`
 * 	@import "./file.css";
 * 	.red{ color: red; }
 * `;
 * ```
 * @category Public
 * */
export function style(...styles: cssTemplate): Record<string, string>;
/**
 * An alias for {@link style}. It can be helpful for your editor to detect css syntaxt in "css&#96;…&#96;", see:
 * - [jonsmithers/vim-html-template-literals](https://github.com/jonsmithers/vim-html-template-literals)<br>
 * - [es6-string-css - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=bashmish.es6-string-css)
 * ```js
 * const c= css`
 * 	@import "./file.css";
 * 	.red{ color: red; }
 * `;
 * ```
 * @category Public
 * */
export const css: typeof style;
