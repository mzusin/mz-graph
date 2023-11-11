/*
https://github.com/mzusin/mz-graph
MIT License      
Copyright (c) 2023-present, Miriam Zusin       
*/
var i=a=>{let n=new Map;return{addVertex:e=>{n.has(e.label)||n.set(e.label,[])},getVertex:e=>{var t;return(t=n.get(e))!=null?t:null},addEdge:(e,t)=>{var o,r;(o=n.get(e.label))==null||o.push(t),a||(r=n.get(t.label))==null||r.push(e)},printGraph:()=>{for(let[e,t]of n.entries()){let o=t.map(r=>r.label).join(", ");console.log(`${e} -> [${o}]`)}}}};export{i as graph};
