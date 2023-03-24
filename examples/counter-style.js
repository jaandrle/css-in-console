import { log } from '../index.js';
const css= log.css`
	@counter-style time{
		system: extends --terminal-time;
		suffix: ") ";
		prefix: "(";
		--terminal-mask: "01" "11111111";
	}
	.li{ display: list-item; list-style: decimal; }
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
