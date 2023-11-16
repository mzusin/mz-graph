/*
https://github.com/mzusin/mz-graph
MIT License      
Copyright (c) 2023-present, Miriam Zusin       
*/
var y=l=>{let s=new Map,b=n=>{s.has(n.label)||s.set(n.label,[])},c=n=>{var t;return(t=s.get(n))!=null?t:null},h=(n,t)=>{var o,i;(o=s.get(n.label))==null||o.push(t),l.isDirected||(i=s.get(t.label))==null||i.push(n)},L=()=>{for(let[n,t]of s.entries()){let o=t.map(i=>{let u=i.value!==void 0?`(${i.value})`:"";return`${i.label}${u}`}).join(", ");console.log(`${n} -> [${o}]`)}},p=(n,t)=>{let o=new Set,i=e=>{let r=[e];for(o.add(e);r.length>0;){let a=r.shift();n(a);let f=c(a)||[];for(let d of f)o.has(d.label)||(o.add(d.label),r.push(d.label))}};if(t!==void 0){i(t);return}let u=s.keys();for(let e of u)o.has(e)||i(e)},v=(n,t)=>{let o=new Set,i=e=>{let r=[e];for(o.add(e);r.length>0;){let a=r.pop();n(a);let f=c(a)||[];for(let d of f)o.has(d.label)||(o.add(d.label),r.push(d.label))}};if(t!==void 0){i(t);return}let u=s.keys();for(let e of u)o.has(e)||i(e)},T=(n,t)=>{let o=new Set,i=e=>{if(o.has(e))return;o.add(e),n(e);let r=c(e);if(r)for(let a of r)i(a.label)};if(t!==void 0){i(t);return}let u=s.keys();for(let e of u)i(e)};return(()=>{if(!l.initial)return;let n=Object.keys(l.initial);for(let t of n){let o=l.initial[t]||[];s.set(t,o)}})(),{addVertex:b,getVertex:c,addEdge:h,printGraph:L,bfs:p,dfs:v,dfsRecursive:T}};var w=l=>{var s,b;if(l.initial){let c=l.initial.length,h=c>0?l.initial[0].length:0;return[c,h]}return[(s=l.rowsCount)!=null?s:0,(b=l.columnsCount)!=null?b:0]},I=l=>{let[s,b]=w(l),c=Array(s),h=()=>c,L=(n,t,o)=>{c[n][t]=o,l.isDirected||(c[t][n]=o)},p=()=>{for(let n=0;n<s;n++)console.log(c[n].map(t=>t==null?"-":t).join(" "))},v=n=>{let t=[[0,-1],[0,1],[-1,0],[1,0]],o=[[0,0]],i=[];for(let e=0;e<s;e++)i[e]=[];let u=(e,r)=>e>=0&&e<s&&r>=0&&r<b&&!i[e][r];for(;o.length>0;){let[e,r]=o.shift();if(!i[e][r]){i[e][r]=!0,n(e,r,c[e][r]);for(let a=0;a<t.length;a++){let[f,d]=t[a],m=e+f,g=r+d;u(m,g)&&o.push([m,g])}}}},T=n=>{let t=[[0,-1],[0,1],[-1,0],[1,0]],o=[[0,0]],i=[];for(let e=0;e<s;e++)i[e]=[];let u=(e,r)=>e>=0&&e<s&&r>=0&&r<b&&!i[e][r];for(;o.length>0;){let[e,r]=o.pop();if(!i[e][r]){i[e][r]=!0,n(e,r,c[e][r]);for(let a=0;a<t.length;a++){let[f,d]=t[a],m=e+f,g=r+d;u(m,g)&&o.push([m,g])}}}};return(()=>{if(l.initial){c=l.initial;return}for(let n=0;n<s;n++)c[n]=Array(b),l.defaultValue!==void 0&&c[n].fill(l.defaultValue)})(),{getMatrix:h,addEdge:L,printGraph:p,bfs:v,dfs:T}};export{y as graph,I as matrix};
