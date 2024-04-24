export function format(...messages){
	return formatWithOptions({}, ...messages);
}
import { formatWithOptions as formatWithOptionsNative } from "node:util";
import { usesColors, use256Colors } from "./src/utils.js";
import { apply } from "./src/css.js";
export function formatWithOptions(options, ...messages){
	const { colors: is_colors= usesColors("stdout"), is_rgb= use256Colors(), is_stdout= true }= options || {};
	messages= apply(messages, { is_colors, is_rgb, is_stdout });
	return formatWithOptionsNative(options, ...messages);
}

import { log as cLog, error as cError } from "node:console";
export default function log(...messages){
	return cLog(formatWithOptions({ colors: usesColors("stdout"), is_stdout: true },...messages));
}
export { log };
export const css= style;
Object.assign(log, { style, css });
export function error(...messages){
	return cError(formatWithOptions({ colors: usesColors("stderr"), is_stdout: false },...messages));
}
Object.assign(error, { style, css });

import { argv } from 'node:process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cssLine } from "./src/css.js";
import { register as registerCounter } from "./src/counters.js";
import { unQuoteSemicol } from "./src/utils.js";
import { add as  addSubrule } from "./src/subrules.js";
import { customRule } from './src/utils.js';
export function style(pieces, ...styles_arr){
	if(Array.isArray(pieces))
		styles_arr= CSStoLines(String.raw(pieces, styles_arr));
	else
		styles_arr.unshift(pieces);
	const out= { unset: "unset:all" };
	let all= "", subrule_css= "";
	const styles_preprocessed= styles_arr.flatMap(function(style_nth){
		style_nth= style_nth.trim();
		if(!style_nth) return [];
		if(subrule_css){
			if(style_nth!=="}"){
				subrule_css+= style_nth;
				return [];
			}
			if(!subrule_css.startsWith("@media") || !subrule_css.includes("color"))
				return [];
			const idx= subrule_css.indexOf("{");
			const name= subrule_css.slice(1, idx).replace(/[\(\)]/g, "").replaceAll(customRule(), "").split(" ").filter(Boolean);
			const css= style(...CSStoLines(subrule_css.slice(idx+1)));
			subrule_css= "";
			return Object.entries(css).slice(1)
				.map(([ key, css ])=> addSubrule(key, name, css));
		}

		if(style_nth[0]==="@"){
			if(style_nth.indexOf("@import")!==0){
				if(style_nth.indexOf("@counter-style")===0)
					registerCounter(style_nth);
				else
					subrule_css+= style_nth;
				return [];
			}
			let url= unQuoteSemicol(style_nth.slice(7)).value;
			if(url[0]===".") url= resolve(argv[1], "..", url);
			try{
				return CSStoLines(readFileSync(url, { encoding: "utf-8" }).toString())
					.flatMap(cssLine);
			} catch(error) {
				throw new Error(`Unable to import file ${url}: ${error.message}`);
			}
		}
		return cssLine(style_nth);
	});
	for(const [ name, css ] of styles_preprocessed){
		if(name==="*"){
			all+= css;
			Object.keys(out).forEach(key=> key!=="unset" && ( out[key]+= css ));
			continue;
		}
		if(out[name])
			out[name]+= css;
		else
			out[name]= all + css;
	}
	return out;
}
function CSStoLines(s){
	return s
		.replaceAll(/\n(\s?)\s*/g, "$1")
		.split(/(?<=})/g)
		.filter(Boolean);
}
