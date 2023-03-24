import { log } from '../index.js';
const css= log.css`
	@counter-style time{
		system: extends decimal;
		suffix: ") ";
		prefix: "(";
		pad: 3 "0";
	}
	.li{ display: list-item; list-style: time; }
`;
log("%cusing custom list style", css.li);
log("%cusing custom list style", css.li);
log("%cusing custom list style", css.li);
log("%cusing custom list style", css.li);
log("%cusing custom list style", css.li);
log("%cusing custom list style", css.li);
log("%cusing custom list style", css.li);
log("%cusing custom list style", css.li);
log("%cusing custom list style", css.li);
log("%cusing custom list style", css.li);
process.exit(0);
