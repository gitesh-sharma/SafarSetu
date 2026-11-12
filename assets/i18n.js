export const T={
en:{home:"Map",data:"Data sources",search:"Search stations or routes",none:"No results found.",tag:"Every journey, live and clear.",
demo:"All data shown is DEMO sample data. No live positions are available yet.",updated:"Last update",src:"Source",
LIVE:"LIVE",ESTIMATED:"ESTIMATED",SCHEDULED:"SCHEDULED",UNAVAILABLE:"UNAVAILABLE",DEMO:"DEMO",STALE:"STALE",
mapfail:"Map could not load. Check your network and retry.",lang:"Language",stations:"Stations",routes:"Routes"},
hi:{home:"नक्शा",data:"डेटा स्रोत",search:"स्टेशन या मार्ग खोजें",none:"कोई परिणाम नहीं मिला।",tag:"हर सफ़र, लाइव और स्पष्ट।",
demo:"दिखाया गया सारा डेटा DEMO नमूना डेटा है। अभी कोई लाइव लोकेशन उपलब्ध नहीं है।",updated:"अंतिम अपडेट",src:"स्रोत",
LIVE:"लाइव",ESTIMATED:"अनुमानित",SCHEDULED:"निर्धारित",UNAVAILABLE:"अनुपलब्ध",DEMO:"डेमो",STALE:"पुराना",
mapfail:"नक्शा लोड नहीं हो सका। नेटवर्क जाँचकर पुनः प्रयास करें।",lang:"भाषा",stations:"स्टेशन",routes:"मार्ग"}};
export const FRESH_MIN={train:5,road:2};
export const getLang=()=>localStorage.getItem("lang")||"en";
export const setLang=l=>{localStorage.setItem("lang",l);location.reload()};
export const t=k=>T[getLang()][k]||k;
// A LIVE record older than its threshold is shown as STALE, never as LIVE.
export function effStatus(status,type,ts){if(status!=="LIVE")return status;
 const age=(Date.now()-new Date(ts).getTime())/6e4;return age>(FRESH_MIN[type]||5)?"STALE":"LIVE"}
export function chrome(active){const l=getLang();document.documentElement.lang=l;
 document.querySelectorAll("[data-t]").forEach(e=>e.textContent=t(e.dataset.t));
 const s=document.getElementById("lang");if(s){s.value=l;s.onchange=()=>setLang(s.value)}}
