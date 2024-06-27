import{a as l,S as d,i}from"./assets/vendor-c493984e.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const p="44507065-2e810e6cd55f29a257fa3dc75";async function u(e){const n=`https://pixabay.com/api/?key=${p}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true`;try{return(await l.get(n)).data}catch(r){throw console.error("Axios error: ",r),r}}function m(e,n){const r=document.getElementById("gallery");let s=e.map(t=>f(t)).join("");r.innerHTML=s,n.refresh()}function f(e){return`
  <div class="gallery-item-container">  
  <a href="${e.largeImageURL}" class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}" title="${e.tags}" loading="lazy" />
      <div class="info">
        <p><span>Likes:</span> ${e.likes}</p>
        <p><span>Views:</span> ${e.views}</p>
        <p><span>Comments:</span> ${e.comments}</p>
        <p><span>Downloads:</span> ${e.downloads}</p>
      </div>
    </a>
  </div>
  `}function y(){const e=document.getElementById("loader");e.style.display="block"}function g(){const e=document.getElementById("loader");e.style.display="none"}let h=new d(".gallery a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"title",captionPosition:"bottom",captionDelay:250,animationSpeed:250,fadeSpeed:300,close:!0,showCounter:!0});const w=document.getElementById("search-form"),c=document.getElementById("search-input");w.addEventListener("submit",async e=>{e.preventDefault();const n=c.value.trim();if(!n){i.error({title:"Error",message:"Please enter a search query."});return}y();try{const r=await u(n);r.hits.length===0?i.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}):(m(r.hits,h),c.value="")}catch{i.error({title:"Error",message:"An error occurred while fetching images."})}finally{g()}});
//# sourceMappingURL=commonHelpers.js.map
