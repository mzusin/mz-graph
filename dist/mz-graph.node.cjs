/*
https://github.com/mzusin/mz-graph
MIT License      
Copyright (c) 2023-present, Miriam Zusin       
*/
var c=Object.defineProperty;var i=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var h=(t,e)=>{for(var a in e)c(t,a,{get:e[a],enumerable:!0})},b=(t,e,a,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of p(e))!g.call(t,r)&&r!==a&&c(t,r,{get:()=>e[r],enumerable:!(l=i(e,r))||l.enumerable});return t};var u=t=>b(c({},"__esModule",{value:!0}),t);var T={};h(T,{graph:()=>I});module.exports=u(T);var I=t=>{let e=new Map;return{addVertex:n=>{e.has(n.label)||e.set(n.label,[])},getVertex:n=>{var o;return(o=e.get(n))!=null?o:null},addEdge:(n,o)=>{var s,d;(s=e.get(n.label))==null||s.push(o),t||(d=e.get(o.label))==null||d.push(n)},printGraph:()=>{for(let[n,o]of e.entries()){let s=o.map(d=>d.label).join(", ");console.log(`${n} -> [${s}]`)}}}};0&&(module.exports={graph});
