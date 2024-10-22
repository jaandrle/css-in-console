import { log } from '../index.js';
const css= log.css`
	.red { color: red; color: rgb(190 90 90); }
	.green { color: green; color: rgb(90,190,90); }
	.blue { color: blue; color: rgb(90, 90, 190); }

	.bg_red { background: red; background: rgb(190 90 90); }
	.bg_green { background: green; background: rgb(90,190,90); }
	.bg_blue { background: blue; background: rgb(90, 90, 190); }
`;
log("%cHello %cWorld%c!", css.red, css.bg_blue);
log("%cHello %cWorld%c!", css.green, css.bg_green);
log("%cHello %cWorld%c!", css.blue, css.bg_red);
