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
import * as console from "node:console";
import * as process from 'node:process';
export default function log(...messages){
	return console.log(formatWithOptions({ colors: usesColors("stdout") },...messages));
}
Object.assign(log, { style, css });
export { log };
export function error(...messages){
	return console.error(formatWithOptions({ colors: usesColors("stderr") },...messages));
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
	let skip= false;
	const styles_preprocessed= styles_arr.flatMap(function(style){
		style= style.trim();
		if(!style) return [];

		if(style==="}"){
			skip= false;
			return [];
		}
		if(skip)
			return [];
		if(style[0]==="@"){
			if(style.indexOf("@supports")===0){
				skip= true;
				const idx_slice= style.indexOf("{");
				const condition= style.slice(0, idx_slice).replaceAll(/\s/g, "");
				const is_not= condition.indexOf("not")===9;
				const is_colors= condition.indexOf("color:", 9)===13 || condition.indexOf("background", 9)===13;
				if(!is_colors) return [];
				const curr= usesColors("stdout");
				console.log({ is_not, curr });
				if(is_not&&curr || !is_not&&!curr)
					return [];
				skip= false;
				return cssLine(style.slice(idx_slice+1));
			}
			if(style.indexOf("@import")!==0) return [];
			let url= unQuoteSemicol(style.slice(7)).value;
			if(url[0]===".") url= resolve(process.argv[1], "..", url);
			try{
				return CSStoLines(readFileSync(url, { encoding: "utf-8" }).toString())
					.flatMap(cssLine);
			} catch(error) {
				throw new Error(`Unable to import file ${url}: ${error.message}`);
			}
		}
		return cssLine(style);
	});
	console.log(styles_preprocessed);
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
