import { log, formatWithOptions } from '../index.js';
const css= log.css`
	.blue { color: blue; }
	.red::before, .red::after { content: "~"; color: red; }
	@media not (color){
		.red::before, .red::after { content: "'"; }
		.blue::before, .blue::after { content: "-"; }
	}
	.red { color: lightred; }
`;
console.log(css);
log("%cTest blue color", css.blue);
log("%cTest red color", css.red);
log(formatWithOptions({ colors: false }, "%cTest blue nocolor", css.blue));
log(formatWithOptions({ colors: false }, "%cTest red nocolor", css.red));
process.exit(0);
