/*
https://github.com/mzusin/mz-graph
MIT License      
Copyright (c) 2023-present, Miriam Zusin       
*/
var b=i=>{let t=new Map,d=n=>{t.has(n.label)||t.set(n.label,[])},o=n=>{var r;return(r=t.get(n))!=null?r:null};return{addVertex:d,getVertex:o,addEdge:(n,r)=>{var e,s;(e=t.get(n.label))==null||e.push(r),i||(s=t.get(r.label))==null||s.push(n)},printGraph:()=>{for(let[n,r]of t.entries()){let e=r.map(s=>s.label).join(", ");console.log(`${n} -> [${e}]`)}},inorderRecursive:n=>{let r=new Set,e=a=>{if(r.has(a))return;r.add(a);let f=o(a);if(f){for(let p of f)e(p.label);n(a)}},s=t.keys();for(let a of s)e(a)}}},u=(i,t,d=void 0)=>{let o=Array(i),c=()=>o,l=(n,r,e)=>{o[n][r]=e,t||(o[r][n]=e)},g=()=>{for(let n=0;n<i;n++)console.log(o[n].map(r=>r==null?"-":r).join(" "))};return(()=>{for(let n=0;n<i;n++)o[n]=Array(i),d!==void 0&&o[n].fill(d)})(),{getMatrix:c,addEdge:l,printGraph:g}};export{b as graph,u as matrix};
