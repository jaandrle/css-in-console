import { customRule } from './utils.js';
const [ system_dt, system_d, system_t ]= [ "datetime", "date", "time" ].map(v=> customRule(v));
/* 
 * https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style
 * https://developer.mozilla.org/en-US/docs/Web/CSS/counter
 * */
const store_styles= new Map();
let init= '[' +
	'["decimal",{"system":"numeric","symbols":["0","1","2","3","4","5","6","7","8","9"],"suffix":". "}],' +
	'["'+system_dt+'",{"system":"'+system_dt+'","suffix":" "}],["'+system_d+'",{"system":"'+system_d+'","suffix":" "}],["'+system_t+'",{"system":"'+system_t+'","suffix":" "}]' +
']';

export function register(style){
	loadInit();
	const name= style.slice(style.indexOf(" "), style.indexOf("{")).trim();
	const candidate= cssStringToObject(style);
	if(!candidate.system.startsWith("extends"))
		return store_styles.set(name, candidate);
	
	const system= store_styles.get(candidate.system.split(" ")[1]);
	if(system)
		store_styles.set(name, Object.assign({}, system, candidate, { system: system.system }));
}
export function has(name){
	loadInit();
	return store_styles.has(name);
}
export function get(name){
	loadInit();
	const curr= store_styles.get(name);
	let { current= 0 }= curr;
	curr.current= current + 1;
	return getSymbol(curr, curr);
}
const store_counters= new Map();
export function counterReset(c, value){
	store_counters.set(c, value);
}
export function counterIncrement(c, increase){
	const current= store_counters.get(c) || 0;
	if(Number.isNaN(increase)) increase= 1;
	store_counters.set(c, current + increase);
}
export function counterFunction(c, name){
	if(!name) name= "decimal";
	loadInit();
	const current= store_counters.get(c) || 0;
	if(!store_styles.has(name))
		return "";
	return getSymbol(store_styles.get(name), { suffix: "", prefix: "", current });
}

function loadInit(){
	if(!init) return;
	JSON.parse(init).forEach(([ key, value ])=> store_styles.set(key, value));
	init= false;
}
function getSymbol({ pad, system, symbols, negative, mask }, { current, suffix= "", prefix= "" }){
	let s= "";
	switch(system){
		case "fixed":
			s= symbols[current-1]; if(typeof s==="undefined") s= current; break;
		case "cyclic":
			s= symbols.at( ( current - 1 )%symbols.length ); break;
		case "numeric":
			s= current.toString(symbols.length).split("").map(n=> symbols[n]).join(""); break;
		case "alphabetic":
			s= current.toString(symbols.length).split("").map((n, i)=> symbols[n - Number(!i)]).join(""); break;
		case system_dt:
			s= applyMask(datetime(), mask); break;
		case system_d:
			s= applyMask(datetime().split("T")[0], mask); break;
		case system_t:
			s= applyMask(datetime().split("T")[1], mask); break;
	}
	if(current<0){
		negative= ( negative || '"-"' ).trim();
		const [ q ]= negative;
		const lastIndexOfq= negative.indexOf(q, 1);
		const [ pre, suf ]= [ negative.slice(0, lastIndexOfq+1), negative.slice(lastIndexOfq+1) || '""' ].map(s=> s.trim().slice(1, -1));
		s= pre + s + suf;
	}
	if(typeof pad!=="undefined"){
		const i_space= pad.indexOf(" ");
		const num= pad.slice(0, i_space);
		const chars= pad.slice(i_space + 2, -1);
		s= s.padStart(Number(num), chars);
	}
	return prefix+s+suffix;
}
function applyMask(value, mask){
	if(typeof mask==="undefined") return value;
	const [ symbols, m ]= mask.split(" ").map(v=> v.slice(1, -1));
	return value.split("").reduce(function(acc, curr, i){
		const mi= m[i] || "";
		if(mi===symbols[0]) return acc;
		return acc+( mi===symbols[1] ? curr : mi );
	}, "");
}
function datetime(){ return (new Date()).toISOString().split("Z")[0]; }

const quotes_strip= [ "suffix", "prefix" ];
function cssStringToObject(css_str){
	const css_body= css_str.slice(css_str.indexOf('{')+1, css_str.lastIndexOf('}'));
	return css_body.split(';').reduce(( out, curr ) => {
		let [ key, ...value ]= curr.split(':');
		if(!value.length) return out;
		[ key, value ]= [ key, value.join(':') ].map(s=> s.trim());
		if(quotes_strip.includes(key))
			value= value.slice(1, -1);
		else if("symbols"===key)
			value= value.replaceAll(/["']/g, "").split(" ");
		else if(customRule("mask")===key)
			key= "mask";
		Reflect.set(out, key, value);
		return out;
	}, {});
}
