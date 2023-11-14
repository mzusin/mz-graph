/*
https://github.com/mzusin/mz-graph
MIT License      
Copyright (c) 2023-present, Miriam Zusin       
*/
var s=d=>{let t=new Map;return{addVertex:r=>{t.has(r.label)||t.set(r.label,[])},getVertex:r=>{var n;return(n=t.get(r))!=null?n:null},addEdge:(r,n)=>{var e,a;(e=t.get(r.label))==null||e.push(n),d||(a=t.get(n.label))==null||a.push(r)},printGraph:()=>{for(let[r,n]of t.entries()){let e=n.map(a=>a.label).join(", ");console.log(`${r} -> [${e}]`)}}}},p=(d,t,i=void 0)=>{let o=Array(d),c=()=>o,l=(n,e,a)=>{o[n][e]=a,t||(o[e][n]=a)},r=()=>{for(let n=0;n<d;n++)console.log(o[n].map(e=>e==null?"-":e).join(" "))};return(()=>{for(let n=0;n<d;n++)o[n]=Array(d),i!==void 0&&o[n].fill(i)})(),{getMatrix:c,addEdge:l,printGraph:r}};export{s as graph,p as matrix};
