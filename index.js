import { usesColors, unQuoteSemicol } from "./src/utils.js";
import { apply, cssLine } from "./src/css.js";

import { formatWithOptions as formatWithOptionsNative } from "node:util";
export function format(...messages){
	return formatWithOptions({}, ...messages);
}
export function formatWithOptions(options, ...messages){
	const { colors: is_colors= true }= options || {};
	messages= apply(messages, { is_colors });
	return formatWithOptionsNative(options, ...messages);
}

export const css= style;
import { log as cLog, error as cError } from "node:console";
import { argv } from 'node:process';
export default function log(...messages){
	return cLog(formatWithOptions({ colors: usesColors("stdout") },...messages));
}
Object.assign(log, { style, css });
export { log };
export function error(...messages){
	return cError(formatWithOptions({ colors: usesColors("stderr") },...messages));
}
Object.assign(error, { style, css });

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
export function style(pieces, ...styles_arr){
	if(Array.isArray(pieces))
		styles_arr= CSStoLines(String.raw(pieces, styles_arr));
	else
		styles_arr.unshift(pieces);
	const out= { unset: "unset:all" };
	let all= "";
	const styles_preprocessed= styles_arr.flatMap(function(style){
		style= style.trim();
		if(!style) return [];

		if(style[0]==="@"){
			if(style.indexOf("@import")!==0) return [];
			let url= unQuoteSemicol(style.slice(7)).value;
			if(url[0]===".") url= resolve(argv[1], "..", url);
			try{
				return CSStoLines(readFileSync(url, { encoding: "utf-8" }).toString())
					.flatMap(cssLine);
			} catch(error) {
				throw new Error(`Unable to import file ${url}: ${error.message}`);
			}
		}
		return cssLine(style);
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
