// RIFAD functionality extracted from the supplied reference website.

(function(){
var h=document.documentElement,b=document.getElementById('lang');
function set(l){document.querySelectorAll('[data-ar]').forEach(function(e){if(e.children.length===0){var v=e.getAttribute('data-'+l);if(v!==null)e.textContent=v;}});h.lang=l;h.dir=l==='ar'?'rtl':'ltr';try{localStorage.setItem('rifad-lang',l)}catch(e){}
var t=l==='ar'?'مرحباً، أريد طلب زيارة تمريضية':'Hello, I would like to request a nursing visit';
['wa1','wa2'].forEach(function(i){document.getElementById(i).href='https://wa.me/970592875877?text='+encodeURIComponent(t)});document.getElementById('wr').href='https://wa.me/970592875877?text='+encodeURIComponent(l==='ar'?'أود مشاركة رأيي في خدمة رفاد: ':'I would like to share my feedback about Rifad: ')}
document.querySelector('.mark.lg').src=document.querySelector('.hero-logo').src;
var R=[];/* أضف هنا آراء حقيقية فقط بهذا الشكل: {ar:"نص الرأي",en:"Review text",name:"اسم العميل"} */
if(R.length){var qs=document.getElementById('qs');R.forEach(function(r){var q=document.createElement('blockquote'),p=document.createElement('p'),c=document.createElement('cite');[['ar',r.ar],['en',r.en||r.ar]].forEach(function(x){var sp=document.createElement('span');sp.className=x[0];sp.textContent=x[1];p.appendChild(sp)});c.textContent=r.name||'';q.appendChild(p);q.appendChild(c);qs.appendChild(q)});document.getElementById('reviews').hidden=false}
var s='ar';try{s=localStorage.getItem('rifad-lang')||'ar'}catch(e){}
set(s);
b.addEventListener('click',function(){set(h.lang==='ar'?'en':'ar')});
var bf=document.getElementById('bf');
bf.addEventListener('submit',function(ev){ev.preventDefault();
if(!bf.checkValidity()){bf.reportValidity();return}
var ar=h.lang==='ar',g=function(k){return bf.elements[k].value.trim()},sv=bf.elements.s;
var L=ar?['طلب زيارة تمريضية','الاسم','الهاتف','الخدمة','المنطقة','الموعد المفضل','ملاحظات']:['Nursing visit request','Name','Phone','Service','Area','Preferred time','Notes'];
var t=[L[0],L[1]+': '+g('n'),L[2]+': '+g('p'),L[3]+': '+sv.options[sv.selectedIndex].textContent];
if(g('a'))t.push(L[4]+': '+g('a'));if(g('d'))t.push(L[5]+': '+g('d'));if(g('m'))t.push(L[6]+': '+g('m'));
window.open('https://wa.me/970592875877?text='+encodeURIComponent(t.join('\n')),'_blank','noopener')});
})();

