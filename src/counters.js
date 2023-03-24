const store= new Map();
let init= '[["decimal",{"system":"numeric","symbols":["0","1","2","3","4","5","6","7","8","9"],"suffix":". "}],["--terminal-datetime",{"system":"--terminal-datetime","suffix":" "}],["--terminal-date",{"system":"--terminal-date","suffix":" "}],["--terminal-time",{"system":"--terminal-time","suffix":" "}]]'

export function register(style){
	loadInit();
	const name= style.slice(style.indexOf(" "), style.indexOf("{")).trim();
	const candidate= cssStringToObject(style);
	if(!candidate.system.startsWith("extends"))
		return store.set(name, candidate);
	
	const system= store.get(candidate.system.split(" ")[1]);
	if(system)
		store.set(name, Object.assign({}, system, candidate, { system: system.system }));
}
export function has(name){
	loadInit();
	return store.has(name);
}
export function get(name){
	loadInit();
	const curr= store.get(name);
	if(!Reflect.has(curr, "current"))
		curr.current= 1;
	else
		curr.current+= 1;
	return getSymbol(curr);
}

function loadInit(){
	if(!init) return;
	JSON.parse(init).forEach(([ key, value ])=> store.set(key, value));
	init= false;
}
function getSymbol({ system, symbols, current, suffix= "", prefix= "", mask }){
	let s= "";
	switch(system){
		case "fixed":
			s= symbols[current-1] ?? current; break;
		case "cyclic":
			s= symbols[( current - 1 )%symbols.length]; break;
		case "numeric":
			s= current.toString(symbols.length).split("").map(n=> symbols[n]).join(""); break;
		case "alphabetic":
			s= current.toString(symbols.length).split("").map((n, i)=> symbols[n - Number(!i)]).join(""); break;
		case "--terminal-datetime":
			s= applyMask(datetime(), mask); break;
		case "--terminal-date":
			s= applyMask(datetime().split("T")[0], mask); break;
		case "--terminal-time":
			s= applyMask(datetime().split("T")[1], mask); break;
	}
	return prefix+s+suffix;
}
function applyMask(value, mask){
	if(typeof mask==="undefined") return value;
	const [ symbols, m ]= mask.split(" ").map(v=> v.slice(1, -1));
	return value.split("").reduce(function(acc, curr, i){
		const mi= m[i] ?? "";
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
		else if("--terminal-mask"===key)
			key= "mask";
		Reflect.set(out, key, value);
		return out;
	}, {});
}
