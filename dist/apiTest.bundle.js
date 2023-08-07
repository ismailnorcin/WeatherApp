(()=>{"use strict";class e{constructor(e){this._pageTitle=e.title,this._pageBreadcrumbItem='<li class="breadcrumb-item"><a href="#">App</a></li>'+e.breadcrumb,this._pageBreadcrumbCover=e.breadcrumbCover,this._formMessage=e.formMessage,this._form=e.form,this._formLatitude=e.formLat,this._formLongitude=e.formLang,this._extra=e.extra}get title(){return this._pageTitle}get message(){return this._formMessage}get extra(){return this._extra}get breadcrumbCover(){return document.querySelector(this._pageBreadcrumbCover)}get breadcrumbItem(){return this._pageBreadcrumbItem}get form(){return document.querySelector(this._form)}get formLat(){return document.querySelector(this._formLatitude)}get formLong(){return document.querySelector(this._formLongitude)}}class t{constructor(e){this._api=e}url(){let{baseUrl:e,latitude:t,longitude:r}=this._api;return`${e}?latitude=${t}&longitude=${r}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`}fetch(){let e,t=new XMLHttpRequest;return t.open("GET",this.url(),!1),t.onreadystatechange=()=>{4==t.readyState&&200==t.status&&(e=t.response)},t.onerror=()=>{throw new Error("Error 1")},t.send(),e}getResult(){try{let e=JSON.parse(this.fetch());return{now:{temperature:e.current_weather.temperature,date:e.current_weather.time,temperatureType:e.daily_units.temperature_2m_max},dailiy:{temperaturesMax:e.daily.temperature_2m_max,temperaturesMin:e.daily.temperature_2m_min,dates:e.daily.time,temperatureType:e.daily_units.temperature_2m_max}}}catch(e){return"error"}}}class r{constructor(e,t){this._baseUrl="https://api.open-meteo.com/v1/forecast",this._latitude=e,this._longitude=t}get baseUrl(){return this._baseUrl}get latitude(){return this._latitude}get longitude(){return this._longitude}}var a,u,s;const o=new class{constructor(t){this._page=new e(t)}setTitle(){return document.title=this._page.title,this}setBreadcrumb(){let e=(new DOMParser).parseFromString(this._page.breadcrumbItem,"text/html").body.childNodes;return Array.from(e).forEach((e=>{var t;null===(t=this._page.breadcrumbCover)||void 0===t||t.appendChild(e)})),this}page(){return this._page}}({title:"API Test Sayfası",breadcrumbCover:"ol.breadcrumb",breadcrumb:'<li class="breadcrumb-item active" aria-current="page">Test</li>',form:"#apiForm",formLat:"#latitude",formLang:"#longitude",formMessage:".result"}),i=o.page(),l=document.querySelector("blockquote"),m=document.querySelector(i.message);o.setTitle().setBreadcrumb();let n=new class{latRules(e){return isNaN(e)?e.replace(/[^\d]+/g,""):e}longRules(e){return isNaN(e)?e.replace(/[^\d]+/g,""):e}};null===(a=i.form)||void 0===a||a.addEventListener("submit",(e=>{e.preventDefault();let a,u,s=i.formLat,o=i.formLong;"error"===new t(new r(Number(s.value),Number(o.value))).getResult()?(a="blockquote blockquote-danger",u="Başarısız"):(a="blockquote blockquote-success",u="Başarılı"),l&&(l.className=a,m&&(m.textContent=u))})),null===(u=o.page().formLat)||void 0===u||u.addEventListener("input",(e=>{let t=e.target;t.value=n.latRules(t.value)})),null===(s=o.page().formLong)||void 0===s||s.addEventListener("input",(e=>{let t=e.target;t.value=n.latRules(t.value)}))})();