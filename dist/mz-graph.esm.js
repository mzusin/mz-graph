/*
https://github.com/mzusin/mz-graph
MIT License      
Copyright (c) 2023-present, Miriam Zusin       
*/
var i=a=>{let o=new Map;return{addVertex:e=>{o.has(e.label)||o.set(e.label,[])},addEdge:(e,n)=>{var t,r;(t=o.get(e.label))==null||t.push(n),a||(r=o.get(n.label))==null||r.push(e)},printGraph:()=>{for(let[e,n]of o.entries()){let t=n.join(", ");console.log(`${e} -> [${t}]`)}}}};export{i as graph};
