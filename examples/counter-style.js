import { log } from '../index.js';
const css= log.css`
	.before::before{ content: "Section " counter(i) ": "; counter-increment: i; }

	@counter-style num{
		system: extends decimal;
		suffix: ". ";
		pad: 2 " ";
	}
	.li{ display: list-item; list-style: num; counter-reset: i -11; }

	@counter-style spin{
		system: cyclic;
		symbols: ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏;
		suffix: " ";
	}
	.spin{ display: list-item; list-style: spin; }

	@counter-style time{
		system: extends --terminal-time;
		suffix: ") ";
		prefix: "(";
		--terminal-mask: "01" "00011111,111";
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
process.exit(0);
