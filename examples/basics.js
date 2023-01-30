import { log } from '../index.js';
const css= log.css`
	*{ margin-left: 1rem; }
	.headline, .tab{ color: lightgreen; }
	.p{}
	.li{ display: list-item; margin-left: 2rem; }
	.tab{ tab-size: 4; }
`;
log("%cSimple stylings", css.headline);
log("%cExample shows:", css.p);
log("%cusing `margin-left`", css.li);
log("%cusing `color`", css.li);
log("%cusing `display:list-item`", css.li);
log("%cusing `::before` “pseudo element”", css.li);
log("%cthe class selector is preferred, you can also use `*`", css.li);
log("\tTab test 1 (as default `console.log`)");
log("%c\tTab test 2 (with custom styling)", css.tab);
process.exit(0);
