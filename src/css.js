import { customRule, ruleCrean, unQuoteSemicol } from "./utils.js";
export function cssLine(style){
	let [ name_candidate, css ]= style.replace("}","").split("{").map(v=> v.trim());
	name_candidate= name_candidate.replaceAll(/[\.#]/g, "");
	return name_candidate.split(",").map(name=> {
		let pseudo;
		[ name, pseudo ]= name.split(/:?:/).map(v=> v.trim());
		if(pseudo) css= css
			.replaceAll(new RegExp(customRule("content")+"-(before|after)", "g"), "content")
			.replaceAll("content", customRule("content", pseudo));
		if(css[css.length-1]!==";") css+= ";";
		return [ name, css ];
	});
}
export function apply(messages){
	const out= [];
	const c= "%c", cr= new RegExp(`(?<!%)(?=${c})`);
	for(let i=0, { length }= messages; i<length; i++){
		const m= messages[i];
		if(typeof m !== "string"||m.indexOf(c)===-1){ out.push(m); continue; }
		const ms= m.split(cr);
		for(let j=0, { length: jl }= ms; j<jl; j++){
			const msj= ms[j];
			if(msj.indexOf(c)!==0) continue;
			ms[j]= applyNth(messages[++i])(msj);
		}
		out.push(ms.join(""));
	}
	return out;
}

function applyNth(candidate= ""){
	if(typeof candidate !== "string") return m=> m.slice(2);
	if(candidate.indexOf(":")===-1) return m=> m.slice(2);
	const filter= {};
	const margin= { left: "", right: "" };
	const content= { before: "", after: "" };
	let tab_size= 7;
	const colors= candidate.split(";")
		.reverse().reduce(function(out, rule){
			if(!rule) return out;
			const [ name, value ]= ruleCrean(rule);
			if(filter[name]) return out;
			filter[name]= true;
			
			const test= t=> name.indexOf(t)===0;
			if(test("padding") || test("margin")){
				margin[name.split("-")[1].trim()]= " ".repeat(parseInt(value));
				return out;
			}
			if(test("tab-size")){
				tab_size= parseInt(value);
				return out;
			}
			if(test("list-style")){
				content.before= unQuoteSemicol(value).value + content.before;
				return out;
			}
			if(test(customRule("content"))){
				content[name.slice(name.lastIndexOf("-")+1)]+= unQuoteSemicol(value).value.replaceAll(/\\(?!\\)/g, "").replaceAll("\\\\", "\\");
				return out;
			}
			if(test("display")&&value==="list-item"){
				if(!filter["list-style"])
					content.before= "- " + content.before;
				return out;
			}
			return cssAnsiReducer(out, name+":"+value);
		}, [ [], [] ]);
	return function(match){
		return margin.left +
			`\x1B[${colors[0].join(';')}m` +
			content.before +
			match.slice(2).replaceAll("\t", " ".repeat(tab_size)) +
			content.after +
			`\x1B[${colors[1].join(';')}m` +
			margin.right;
	};
}
import { ansi_constants } from "./ansi_constants.js";
function cssAnsiReducer(curr, c){
	const a= ansi_constants[c];
	if(a) curr.forEach((c, i)=> c.push(a[i]));
	return curr;
}
