import { createMark, customRule } from './utils.js';
const store= new Map();

export function rule(...r){
	return customRule("include", ...r);
}
export function add(name, type, css){
	const mark= createMark();
	store.set(mark, { type, css });
	return [ name, rule(type)+":"+mark+";" ];
}
export function get(mark){
	return store.get(mark);
}
