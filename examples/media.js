import { log, formatWithOptions } from '../index.js';
const css= log.css`
	.red { color: red; }
	.blue { color: blue; }
	@media not (color){
		.red::before, .red::after { content: "'"; }
		.blue::before, .blue::after { content: "-"; }
	}
	.blue::before, .blue::after { content: "$"; }
`;
console.log(css);
console.log(formatWithOptions({ colors: true }, "%cTest", css.blue));
process.exit(0);
