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
var import_node_util2 = require("node:util");

// src/utils.js
function createMark() {
  return Math.random().toString().slice(2);
}
function customRule(...rule2) {
  return "--terminal-" + rule2.join("-");
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
function ruleCrean(rule2) {
  const [name, ...value] = rule2.split(":");
  return [name.trim(), value.join(":").trim()];
}
function parseCSSValueList(value_string) {
  let curr = "";
  let out = [];
  let q = null;
  const addOut = () => {
    out.push(curr);
    curr = "";
  };
  for (let i = 0, { length } = value_string; i < length; i += 1) {
    const char = value_string[i];
    if (q) {
      if (char === q) {
        q = null;
      } else if (char === "\\") {
        i += 1;
        curr += value_string[i] || "";
      } else {
        curr += char;
      }
      continue;
    }
    if (char === '"' || char === "'") {
      q = char;
      continue;
    }
    if (char !== " ") {
      curr += char;
      continue;
    }
    addOut();
  }
  if (curr)
    addOut();
  return out;
}

// src/subrules.js
var store = /* @__PURE__ */ new Map();
function rule(...r) {
  return customRule("include", ...r);
}
function add(name, type, css2) {
  const mark = createMark();
  store.set(mark, { type, css: css2 });
  const rule_str = Array.isArray(type) ? rule(...type) : rule(type);
  return [name, rule_str + ":" + mark + ";"];
}
function get(mark) {
  return store.get(mark);
}

// src/counters.js
var [system_dt, system_d, system_t] = ["datetime", "date", "time"].map((v) => customRule(v));
var store_styles = /* @__PURE__ */ new Map();
var init = '[["decimal",{"system":"numeric","symbols":["0","1","2","3","4","5","6","7","8","9"],"suffix":". "}],["' + system_dt + '",{"system":"' + system_dt + '","suffix":" "}],["' + system_d + '",{"system":"' + system_d + '","suffix":" "}],["' + system_t + '",{"system":"' + system_t + '","suffix":" "}],["' + customRule("spin") + '",{"system":"cyclic","symbols":["\u280B","\u2819","\u2839","\u2838","\u283C","\u2834","\u2826","\u2827","\u2807","\u280F"],"suffix":" "}]]';
function register(style2) {
  loadInit();
  const name = style2.slice(style2.indexOf(" "), style2.indexOf("{")).trim();
  const candidate = cssStringToObject(style2);
  if (!candidate.system.startsWith("extends"))
    return store_styles.set(name, candidate);
  const system = store_styles.get(candidate.system.split(" ")[1]);
  if (system)
    store_styles.set(name, Object.assign({}, system, candidate, { system: system.system }));
}
function has(name) {
  loadInit();
  return store_styles.has(name);
}
function get2(name) {
  loadInit();
  const curr = store_styles.get(name);
  let { current = 0 } = curr;
  curr.current = current + 1;
  return getSymbol(curr, curr);
}
var store_counters = /* @__PURE__ */ new Map();
function counterReset(c, value) {
  store_counters.set(c, value);
}
function counterIncrement(c, increase) {
  const current = store_counters.get(c) || 0;
  if (Number.isNaN(increase))
    increase = 1;
  store_counters.set(c, current + increase);
}
function counterFunction(c, name) {
  if (!name)
    name = "decimal";
  loadInit();
  const current = store_counters.get(c) || 0;
  if (!store_styles.has(name))
    return "";
  return getSymbol(store_styles.get(name), { suffix: "", prefix: "", current });
}
function loadInit() {
  if (!init)
    return;
  JSON.parse(init).forEach(([key, value]) => store_styles.set(key, value));
  init = false;
}
function getSymbol({ pad, system, symbols, negative, mask }, { current, suffix = "", prefix = "" }) {
  let s2 = "";
  switch (system) {
    case "fixed":
      s2 = symbols[current - 1];
      if (typeof s2 === "undefined")
        s2 = current;
      break;
    case "cyclic":
      s2 = symbols.at((current - 1) % symbols.length);
      break;
    case "numeric":
      s2 = current.toString(symbols.length).split("").map((n) => symbols[n]).join("");
      break;
    case "alphabetic":
      s2 = current.toString(symbols.length).split("").map((n, i) => symbols[n - Number(!i)]).join("");
      break;
    case system_dt:
      s2 = applyMask(datetime(), mask);
      break;
    case system_d:
      s2 = applyMask(datetime().split("T")[0], mask);
      break;
    case system_t:
      s2 = applyMask(datetime().split("T")[1], mask);
      break;
  }
  if (current < 0) {
    const [pre, suf = ""] = negative || ["-"];
    s2 = pre + s2 + suf;
  }
  if (typeof pad !== "undefined") {
    const [num, chars] = pad;
    s2 = s2.padStart(Number(num), chars);
  }
  return prefix + s2 + suffix;
}
function applyMask(value, mask) {
  if (typeof mask === "undefined")
    return value;
  const [symbols, m] = mask;
  return value.split("").reduce(function(acc, curr, i) {
    const mi = m[i] || "";
    if (mi === symbols[0])
      return acc;
    return acc + (mi === symbols[1] ? curr : mi);
  }, "");
}
function datetime() {
  return (/* @__PURE__ */ new Date()).toISOString().split("Z")[0];
}
var only_string = ["suffix", "prefix"];
function cssStringToObject(css_str) {
  const css_body = css_str.slice(css_str.indexOf("{") + 1, css_str.lastIndexOf("}"));
  return css_body.split(";").reduce((out, curr) => {
    let [key, ...value] = curr.split(":");
    if (!value.length)
      return out;
    [key, value] = [key, value.join(":")].map((s2) => s2.trim());
    if ("system" !== key)
      value = parseCSSValueList(value);
    if (only_string.includes(key))
      value = value.join("");
    else if (customRule("mask") === key)
      key = "mask";
    Reflect.set(out, key, value);
    return out;
  }, {});
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
      return add(name, pseudo, css2);
    if (css2[css2.length - 1] !== ";")
      css2 += ";";
    return [name, css2];
  });
}
function apply(messages, { is_colors, is_stdout }) {
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
      ms[j] = applyNth(messages[++i], { is_colors, is_stdout })(msj);
    }
    out.push(ms.join(""));
  }
  return out;
}
function applyNth(candidate, { is_colors, is_stdout }) {
  if (typeof candidate !== "string")
    return (m) => m.slice(2);
  if (candidate.indexOf(":") === -1)
    return (m) => m.slice(2);
  const filter = {};
  const margin = { left: "", right: "" };
  const content = { before: "", after: "", colors: {} };
  const content_todo = [];
  let tab_size = 7;
  const colors = candidate.split(";").reverse().reduce(function processCandidate(out, rule2) {
    if (!rule2)
      return out;
    const [name, value] = ruleCrean(rule2);
    const test = (t) => name.indexOf(t) === 0;
    if (test(rule())) {
      const { type, css: css2 } = get(value);
      if (type.indexOf("media") === 0 && testMediaAtRule(type.slice(1), is_colors, is_stdout))
        return css2.split(";").reverse().reduce(processCandidate, out);
      if (type !== "before" && type !== "after")
        return out;
      registerBeforeAndAfter(content, { type, css: css2 });
      return out;
    }
    if (filter[name])
      return out;
    filter[name] = true;
    if ("initial" === value)
      return out;
    if (test("padding") || test("margin")) {
      margin[name.split("-")[1].trim()] = " ".repeat(parseInt(value));
      return out;
    }
    if (test("tab-size")) {
      tab_size = parseInt(value);
      return out;
    }
    if (test("list-style")) {
      const { has_quotes, value: style_name } = unQuoteSemicol(value);
      if (has_quotes)
        content.before = style_name + content.before;
      else if (has(style_name))
        content.before = get2(style_name) + content.before;
      return out;
    }
    if (test("display") && value === "list-item") {
      if (!filter["list-style"])
        content.before = "- " + content.before;
      return out;
    }
    return commonRules(out, test, name, value);
  }, [[], []]);
  content_todo.forEach((f) => f());
  return function(match) {
    const out = applyColors(content.before, content.colors.before || colors) + applyColors(match.slice(2).replaceAll("	", " ".repeat(tab_size)), colors) + applyColors(content.after, content.colors.after || colors);
    return margin.left + out + margin.right;
  };
  function applyColors(test, colors2) {
    if (!colors2 || !colors2.length || !colors2[0].length)
      return test;
    return `\x1B[${colors2[0].join(";")}m` + test + `\x1B[${colors2[1].join(";")}m`;
  }
  function commonRules(out, test, name, value) {
    if (test("counter-reset")) {
      const [c, v] = value.split(" ");
      counterReset(c, Number(v));
      return out;
    }
    if (test("counter-increment")) {
      const [c, v] = value.split(" ");
      content_todo.unshift(() => counterIncrement(c, Number(v)));
      return out;
    }
    if (!is_colors)
      return out;
    return cssAnsiReducer(out, name + ":" + value);
  }
  function registerBeforeAndAfter(content2, { type, css: css2 }) {
    content2.colors[type] = css2.split(";").reverse().reduce(function(out, rule2) {
      if (!rule2)
        return out;
      const [name, value] = ruleCrean(rule2);
      if (filter[type + name])
        return out;
      filter[type + name] = true;
      if ("initial" === value)
        return out;
      const test = (t) => name.indexOf(t) === 0;
      if (test("content")) {
        content_todo.push(() => content2[type] += Array.from(value.replaceAll(/\\(?!\\)/g, "").replaceAll("\\\\", "\\").matchAll(new RegExp(`((['"])(?<q>(?:(?!\\2)[^\\\\]|\\\\[\\s\\S])*)\\2|counter\\((?<c>[^,\\)]*),? ?(?<cs>[^\\)]*)\\))`, "g"))).map(({ groups: { q, c, cs } }) => typeof q === "undefined" ? counterFunction(c, cs) : q).join(""));
        return out;
      }
      return commonRules(out, test, name, value);
    }, [[], []]);
  }
}
function testMediaAtRule(type, is_colors, is_stdout) {
  let out = false;
  let is_not = false;
  for (const item of type) {
    if ("not" === item) {
      is_not = true;
      continue;
    }
    if ("and" === item) {
      if (out)
        continue;
      return out;
    }
    if ("or" === item) {
      if (!out)
        continue;
      return out;
    }
    if ("color" === item)
      out = is_not !== is_colors;
    else if ("stdout" === item)
      out = is_not !== is_stdout;
    else {
    }
    is_not = false;
  }
  return out;
}
function cssAnsiReducer(curr, c) {
  const a = ansi_constants[c];
  if (a)
    curr.forEach((c2, i) => c2.push(a[i]));
  return curr;
}

// index.js
var import_node_console = require("node:console");
var import_node_process = require("node:process");
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
function format(...messages) {
  return formatWithOptions({}, ...messages);
}
function formatWithOptions(options, ...messages) {
  const { colors: is_colors = true, is_stdout = true } = options || {};
  messages = apply(messages, { is_colors, is_stdout });
  return (0, import_node_util2.formatWithOptions)(options, ...messages);
}
function log(...messages) {
  return (0, import_node_console.log)(formatWithOptions({ colors: usesColors("stdout"), is_stdout: true }, ...messages));
}
var css = style;
Object.assign(log, { style, css });
function error(...messages) {
  return (0, import_node_console.error)(formatWithOptions({ colors: usesColors("stderr"), is_stdout: false }, ...messages));
}
Object.assign(error, { style, css });
function style(pieces, ...styles_arr) {
  if (Array.isArray(pieces))
    styles_arr = CSStoLines(String.raw(pieces, styles_arr));
  else
    styles_arr.unshift(pieces);
  const out = { unset: "unset:all" };
  let all = "", subrule_css = "";
  const styles_preprocessed = styles_arr.flatMap(function(style_nth) {
    style_nth = style_nth.trim();
    if (!style_nth)
      return [];
    if (subrule_css) {
      if (style_nth !== "}") {
        subrule_css += style_nth;
        return [];
      }
      if (!subrule_css.startsWith("@media") || !subrule_css.includes("color"))
        return [];
      const idx = subrule_css.indexOf("{");
      const name = subrule_css.slice(1, idx).replace(/[\(\)]/g, "").replaceAll(customRule(), "").split(" ").filter(Boolean);
      const css2 = style(...CSStoLines(subrule_css.slice(idx + 1)));
      subrule_css = "";
      return Object.entries(css2).slice(1).map(([key, css3]) => add(key, name, css3));
    }
    if (style_nth[0] === "@") {
      if (style_nth.indexOf("@import") !== 0) {
        if (style_nth.indexOf("@counter-style") === 0)
          register(style_nth);
        else
          subrule_css += style_nth;
        return [];
      }
      let url = unQuoteSemicol(style_nth.slice(7)).value;
      if (url[0] === ".")
        url = (0, import_node_path.resolve)(import_node_process.argv[1], "..", url);
      try {
        return CSStoLines((0, import_node_fs.readFileSync)(url, { encoding: "utf-8" }).toString()).flatMap(cssLine);
      } catch (error2) {
        throw new Error(`Unable to import file ${url}: ${error2.message}`);
      }
    }
    return cssLine(style_nth);
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
