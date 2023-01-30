import { log } from '../index.js';
const css= log.css`@import "./import.css"`;

log("%cStyling using external css file", css.headline);
log("%cExample shows:", css.p);
log("%cusing `margin-left`", css.li);
log("%cusing `color`", css.li);
log("%cusing `display:list-item`", css.li);
log("%cusing `::before` “pseudo element”", css.li);
log("%cthe class selector is preferred, you can also use `*`", css.li);
process.exit(0);
