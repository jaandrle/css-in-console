var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.js
var css_in_console_exports = {};
__export(css_in_console_exports, {
  css: () => css,
  default: () => log,
  error: () => error,
  format: () => format,
  formatWithOptions: () => formatWithOptions,
  log: () => log,
  style: () => style
});
module.exports = __toCommonJS(css_in_console_exports);

// src/utils.js
function customRule(...rule) {
  return "--terminal-" + rule.join("-");
}
function usesColors(target) {
  if ("FORCE_COLORS" in process.env) {
    const { FORCE_COLORS: f } = process.env;
    if (f === "false" || f === "0")
      return false;
    return true;
  }
  const { hasColors = () => false } = process[target];
  return hasColors();
}
function unQuoteSemicol(s2) {
  s2 = s2.trim();
  if (s2[s2.length - 1] === ";")
    s2 = s2.slice(0, -1).trimEnd();
  const out = { has_quotes: false };
  if (/^["']/.test(s2)) {
    s2 = s2.slice(1, -1);
    out.has_quotes = true;
  }
  out.value = s2;
  return out;
}
function ruleCrean(rule) {
  const [name, ...value] = rule.split(":");
  return [name.trim(), value.join(":").trim()];
}

// src/ansi_constants.js
var import_node_util = require("node:util");
var s = import_node_util.inspect.colors;
var ansi_constants = {
  "unset:all": s.reset,
  "display:none": s.hidden,
  "font-weight:bold": s.bold,
  "font-style:italic": s.italic,
  "text-decoration:underline": s.underline,
  "text-decoration:line-through": s.strikethrough,
  "animation:blink": s.blink,
  "color:black": s.black,
  "color:red": s.red,
  "color:green": s.green,
  "color:yellow": s.yellow,
  "color:blue": s.blue,
  "color:magenta": s.magenta,
  "color:cyan": s.cyan,
  "color:white": s.white,
  "color:gray": s.gray,
  "color:lightred": s.redBright,
  "color:lightgreen": s.greenBright,
  "color:lightyellow": s.yellowBright,
  "color:lightblue": s.blueBright,
  "color:lightmagenta": s.magentaBright,
  "color:lightcyan": s.cyanBright,
  "color:whitesmoke": s.whiteBright,
  "background:black": s.bgBlack,
  "background:red": s.bgRed,
  "background:green": s.bgGreen,
  "background:yellow": s.bgYellow,
  "background:blue": s.bgBlue,
  "background:magenta": s.bgMagenta,
  "background:cyan": s.bgCyan,
  "background:white": s.bgWhite,
  "background:gray": s.bgGray,
  "background:lightred": s.bgRedBright,
  "background:lightgreen": s.bgGreenBright,
  "background:lightyellow": s.bgYellowBright,
  "background:lightblue": s.bgBlueBright,
  "background:lightmagenta": s.bgMagentaBright,
  "background:lightcyan": s.bgCyanBright,
  "background:whitesmoke": s.bgEsmokeBright
  /* Special cases (see `applyNth` function):
   * margin-*
   * padding-* (for now? alias for margin-*)
   * content
   * display:list-item
   * list-style-type
   * */
};

// src/css.js
function cssLine(style2) {
  let [name_candidate, css2] = style2.replace("}", "").split("{").map((v) => v.trim());
  name_candidate = name_candidate.replaceAll(/[\.#]/g, "");
  return name_candidate.split(",").map((name) => {
    let pseudo;
    [name, pseudo] = name.split(/:?:/).map((v) => v.trim());
    if (pseudo)
      css2 = css2.replaceAll(new RegExp(customRule("content") + "-(before|after)", "g"), "content").replaceAll("content", customRule("content", pseudo));
    if (css2[css2.length - 1] !== ";")
      css2 += ";";
    return [name, css2];
  });
}
function apply(messages, { is_colors }) {
  const out = [];
  const c = "%c", cr = new RegExp(`(?<!%)(?=${c})`);
  for (let i = 0, { length } = messages; i < length; i++) {
    const m = messages[i];
    if (typeof m !== "string" || m.indexOf(c) === -1) {
      out.push(m);
      continue;
    }
    const ms = m.split(cr);
    for (let j = 0, { length: jl } = ms; j < jl; j++) {
      const msj = ms[j];
      if (msj.indexOf(c) !== 0)
        continue;
      ms[j] = applyNth(messages[++i], { is_colors })(msj);
    }
    out.push(ms.join(""));
  }
  return out;
}
function applyNth(candidate, { is_colors }) {
  if (typeof candidate !== "string")
    return (m) => m.slice(2);
  if (candidate.indexOf(":") === -1)
    return (m) => m.slice(2);
  const filter = {};
  const margin = { left: "", right: "" };
  const content = { before: "", after: "" };
  let tab_size = 7;
  const colors = candidate.split(";").reverse().reduce(function(out, rule) {
    if (!rule)
      return out;
    const [name, value] = ruleCrean(rule);
    if (filter[name])
      return out;
    filter[name] = true;
    const test = (t) => name.indexOf(t) === 0;
    if (test("padding") || test("margin")) {
      margin[name.split("-")[1].trim()] = " ".repeat(parseInt(value));
      return out;
    }
    if (test("tab-size")) {
      tab_size = parseInt(value);
      return out;
    }
    if (test("list-style")) {
      content.before = unQuoteSemicol(value).value + content.before;
      return out;
    }
    if (test(customRule("content"))) {
      content[name.slice(name.lastIndexOf("-") + 1)] += unQuoteSemicol(value).value.replaceAll(/\\(?!\\)/g, "").replaceAll("\\\\", "\\");
      return out;
    }
    if (test("display") && value === "list-item") {
      if (!filter["list-style"])
        content.before = "- " + content.before;
      return out;
    }
    if (!is_colors)
      return out;
    return cssAnsiReducer(out, name + ":" + value);
  }, [[], []]);
  return function(match) {
    let out = content.before + match.slice(2).replaceAll("	", " ".repeat(tab_size)) + content.after;
    if (colors[0].length)
      out = `\x1B[${colors[0].join(";")}m` + out + `\x1B[${colors[1].join(";")}m`;
    return margin.left + out + margin.right;
  };
}
function cssAnsiReducer(curr, c) {
  const a = ansi_constants[c];
  if (a)
    curr.forEach((c2, i) => c2.push(a[i]));
  return curr;
}

// index.js
var import_node_util2 = require("node:util");
var import_node_console = require("node:console");
var import_node_process = require("node:process");
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
function format(...messages) {
  return formatWithOptions({}, ...messages);
}
function formatWithOptions(options, ...messages) {
  const { colors: is_colors = true } = options || {};
  messages = apply(messages, { is_colors });
  return (0, import_node_util2.formatWithOptions)(options, ...messages);
}
var css = style;
function log(...messages) {
  return (0, import_node_console.log)(formatWithOptions({ colors: usesColors("stdout") }, ...messages));
}
Object.assign(log, { style, css });
function error(...messages) {
  return (0, import_node_console.error)(formatWithOptions({ colors: usesColors("stderr") }, ...messages));
}
Object.assign(error, { style, css });
function style(pieces, ...styles_arr) {
  if (Array.isArray(pieces))
    styles_arr = CSStoLines(String.raw(pieces, styles_arr));
  else
    styles_arr.unshift(pieces);
  const out = { unset: "unset:all" };
  let all = "";
  const styles_preprocessed = styles_arr.flatMap(function(style2) {
    style2 = style2.trim();
    if (!style2)
      return [];
    if (style2[0] === "@") {
      if (style2.indexOf("@import") !== 0)
        return [];
      let url = unQuoteSemicol(style2.slice(7)).value;
      if (url[0] === ".")
        url = (0, import_node_path.resolve)(import_node_process.argv[1], "..", url);
      try {
        return CSStoLines((0, import_node_fs.readFileSync)(url, { encoding: "utf-8" }).toString()).flatMap(cssLine);
      } catch (error2) {
        throw new Error(`Unable to import file ${url}: ${error2.message}`);
      }
    }
    return cssLine(style2);
  });
  for (const [name, css2] of styles_preprocessed) {
    if (name === "*") {
      all += css2;
      Object.keys(out).forEach((key) => key !== "unset" && (out[key] += css2));
      continue;
    }
    if (out[name])
      out[name] += css2;
    else
      out[name] = all + css2;
  }
  return out;
}
function CSStoLines(s2) {
  return s2.replaceAll(/\n(\s?)\s*/g, "$1").split(new RegExp("(?<=})", "g")).filter(Boolean);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  css,
  error,
  format,
  formatWithOptions,
  log,
  style
});
