import{M as w,T as M,S as y,a as b,P as L,B as P,b as v,c as x,W as C,d as O,e as S,D as j,O as z}from"./vendor.js";const R=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}};R();const A=e=>e*Math.PI/180,m=(e,o)=>Math.random()*(o-e)+e,D=()=>{let e=m(1,10)>7.75?Math.floor(m(128512,128592)):Math.floor(m(127744,128318));return String.fromCodePoint(e)},W=(e,o)=>{let i=D();console.log(i+" "+e+" :",o)};class g extends w{constructor(o,i){const t=new M().load(o),n=new y(i,30,30),s=new b({color:16777215,map:t});super(n,s)}}class E extends L{constructor(o,i){const r=o,t=i,n=new P,s=new Float32Array(t*3);for(let c=0;c<t;c++){const u=Math.PI*Math.random(),f=Math.PI*Math.random()*2;s[c*3]=r*Math.sin(u)*Math.cos(f),s[c*3+1]=r*Math.sin(u)*Math.sin(f),s[c*3+2]=r*Math.cos(u)}console.log(s.length),n.setAttribute("position",new v(s,3));const a=new x({size:10});super(n,a)}}var F="./assets/img/earth3.jpg",G="./assets/img/moon.jpg";W("test","output");let l,d,h;const I=(e,o,i)=>{const r=new j(16777215);return r.position.set(e,o,i),r},N=()=>{const e=new z(l,document.body);return e.enableDamping=!0,e.dampingFactor=.2,e},q=()=>{const e=window.innerWidth,o=window.innerHeight;let i=0,r=0;h=new C({canvas:document.querySelector("#app")}),h.setSize(e,o),d=new O,l=new S(45,e/o,1,1e4),l.position.set(0,1e3,3e3);const t=300,n=new g(F,t);d.add(n);const s=t/4,a=new g(G,s);a.position.set(1e3,0,1e3),d.add(a);const c=new E(5e3,5e5);d.add(c);const u=N(),f=I(5e3,5e3,5e3);d.add(f);const p=()=>{i+=1,r=A(i),n.rotation.y+=.01,a.position.x=1e3*Math.cos(r),a.position.z=1e3*Math.sin(r),a.rotation.y+=.05,u.update(),h.render(d,l),requestAnimationFrame(p)};p()},B=()=>{const e=window.innerWidth,o=window.innerHeight;l.aspect=e/o,l.updateProjectionMatrix(),h.setSize(e,o)};document.addEventListener("DOMContentLoaded",q);window.addEventListener("resize",B,!1);
