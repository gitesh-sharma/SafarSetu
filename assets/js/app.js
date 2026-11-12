import {t,getLang,chrome,effStatus} from "./i18n.js";
chrome();
const L=getLang(),el=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const badge=s=>`<span class="badge ${s}">${t(s)}</span>`;
let D;try{D=await (await fetch("/data/demo.json")).json()}catch{el("list").innerHTML=`<p class="note">${t("mapfail")}</p>`;throw 0}
let map;try{map=L_=window.L.map("map").setView([22.5,79],5);
 window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:"© OpenStreetMap contributors"}).addTo(map)}
catch{el("map").innerHTML=`<p class="note">${t("mapfail")}</p>`}
const byCode=Object.fromEntries(D.stations.map(s=>[s.code,s])),name=o=>o[L]||o.en,markers={};
D.stations.forEach(s=>{if(!map)return;markers[s.code]=window.L.marker([s.lat,s.lng]).addTo(map)
 .bindPopup(`<b>${esc(name(s))}</b> (${esc(s.code)})<br>${badge(effStatus("DEMO","train"))}`)});
const items=[...D.stations.map(s=>({k:"s",id:s.code,label:`${name(s)} (${s.code})`,hay:`${s.en} ${s.hi} ${s.code}`.toLowerCase()})),
 ...D.routes.map(r=>({k:"r",id:r.id,label:name(r),hay:`${r.en} ${r.hi}`.toLowerCase()}))];
function show(q){q=q.trim().toLowerCase();const r=items.filter(i=>!q||i.hay.includes(q));
 el("list").innerHTML=r.length?`<ul class="res">${r.map(i=>`<li><button data-k="${i.k}" data-id="${esc(i.id)}">${esc(i.label)} ${badge("DEMO")}</button></li>`).join("")}</ul>`:`<p class="note">${t("none")}</p>`}
el("q").oninput=e=>show(e.target.value);
el("list").onclick=e=>{const b=e.target.closest("button");if(!b||!map)return;
 if(b.dataset.k==="s"){const s=byCode[b.dataset.id];map.setView([s.lat,s.lng],10);markers[s.code].openPopup()}
 else{const r=D.routes.find(x=>x.id===b.dataset.id),pts=r.stations.map(c=>[byCode[c].lat,byCode[c].lng]);
  window.L.polyline(pts,{dashArray:"6 6"}).addTo(map);map.fitBounds(pts)}};
show("");
