const { log }= require('..');
const css= log.css`
	*{ margin-left: 1rem; }
	.headline{ color: lightgreen; }
	.p{}
	.li{ display: list-item; margin-left: 2rem; }
`;
log("%cSimple stylings", css.headline);
log("%cExample shows:", css.p);
log("%cusing `margin-left`", css.li);
log("%cusing `color`", css.li);
log("%cusing `display:list-item`", css.li);
log("%cusing `::before` “pseudo element”", css.li);
log("%cthe class selector is preferred, you can also use `*`", css.li);
process.exit(0);
