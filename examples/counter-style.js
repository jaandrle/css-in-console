import { log } from '../index.js';
const css= log.css`
	.before::before{ content: "Section " counter(i) ": "; counter-increment: i; }

	@counter-style num{
		system: extends decimal;
		suffix: ". ";
		pad: 2 " ";
	}
	.li{ display: list-item; list-style: num; counter-reset: i -11; }

	@counter-style thumbs {
		system: cyclic;
		symbols: 👍 👎;
		suffix: " ";
	}
	@counter-style spin{
		system: extends --terminal-spin;
		symbols: \ | / -;
	}
	.spin{ margin-left: 1ch; }
	.spin::before{ content: counter(spin-i, spin) " "; color: lightgreen; counter-increment: spin-i; }

	@counter-style time{
		system: extends --terminal-time;
		suffix: ") ";
		prefix: "(";
		--terminal-mask: "01" "000111110000";
	}
	.time{ display: list-item; list-style: time; }
`;
log("%cThis uses `counter(i)` in `content` (`::before`).", css.before);
log("%cThis uses `counter(i)` in `content` (`::before`).", css.before);
log("");
log("%cCustom list style example.", css.li);
log("%cCustom list style example.", css.li);
log("%cCustom list style example.", css.li);
log("%cCustom list style example.", css.li);
log("%cCustom list style example.", css.li);
log("%cCustom list style example.", css.li);
log("%cCustom list style example.", css.li);
log("%cCustom list style example.", css.li);
log("%cCustom list style example.", css.li);
log("%cCustom list style example. It also resets `counter(i)` to minus ten.", css.li);
log("");
log("%cThis uses `counter(i)` in `content` (`::before`).", css.before);
log("%cThis uses `counter(i)` in `content` (`::before`).", css.before);
log("");
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("%cSpinner example", css.spin);
log("");
log("%cTimestamp example with `mask`.", css.time);
log("%cTimestamp example with `mask`.", css.time);
process.exit(0);
