/*
https://github.com/mzusin/mz-graph
MIT License      
Copyright (c) 2023-present, Miriam Zusin       
*/
var c=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var g=(o,e)=>{for(var r in e)c(o,r,{get:e[r],enumerable:!0})},b=(o,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of l(e))!h.call(o,t)&&t!==r&&c(o,t,{get:()=>e[t],enumerable:!(s=p(e,t))||s.enumerable});return o};var f=o=>b(c({},"__esModule",{value:!0}),o);var T={};g(T,{graph:()=>I});module.exports=f(T);var I=o=>{let e=new Map;return{addVertex:n=>{e.has(n.label)||e.set(n.label,[])},addEdge:(n,a)=>{var d,i;(d=e.get(n.label))==null||d.push(a),o||(i=e.get(a.label))==null||i.push(n)},printGraph:()=>{for(let[n,a]of e.entries()){let d=a.join(", ");console.log(`${n} -> [${d}]`)}}}};0&&(module.exports={graph});
