export function customRule(...rule){ return "--terminal-"+rule.join("-"); }
/** @param {"stderr"|"stdout"} target */
	export function usesColors(target){//?also levels, see supports-color, and ?$.isFIFO
	if("FORCE_COLORS" in process.env){
		const { FORCE_COLORS: f }= process.env;
		if(f==="false"||f==="0") return false;
		return true;
	}
	const { hasColors= ()=> false }= process[target];
	return hasColors();
}
/**
 * @param {string} s
 * @returns {{ value: string, has_quotes: boolean }}
 * */
export function unQuoteSemicol(s){
	s= s.trim();
	if(s[s.length-1]===";") s= s.slice(0, -1).trimEnd();
	const out= { has_quotes: false };
	if(/^["']/.test(s)){
		s= s.slice(1, -1);
		out.has_quotes= true;
	}
	out.value= s;
	return out;
}
export function ruleCrean(rule){
	const [ name, ...value ]= rule.split(":");
	return [ name.trim(), value.join(":").trim() ];
}
export function parseCSSValueList(value_string){
	let curr= "";
	let out= [];
	let q= null; //quote char
	const addOut= ()=> { out.push(curr); curr= ""; };

	for (let i= 0, { length }= value_string; i < length; i+= 1) {
		const char = value_string[i];
		if(q){
			if(char===q){
				q= null;
			} else if(char==='\\'){
				i+= 1;
				curr+= value_string[i] || "";
			} else {
				curr+= char;
			}
			continue;
		}
		if(char==='"' || char==="'"){
			q= char;
			continue;
		}
		if(char!==" "){
			curr+= char;
			continue;
		}
		addOut();
	}
	if(curr) addOut();
	return out;
}
