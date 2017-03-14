"use strict";define("common/kernel/kernel",["common/touchslider/touchslider","common/touchguesture/touchguesture","common/pointerevents/pointerevents","common/svgicos/svgicos","site/pages/pages","site/popups/popups"],function(e,t,n,o,i,s){function a(e,t,n,o){function s(i){var s;d.querySelector(":scope>.content").insertAdjacentHTML("beforeEnd",'<div class="'+t+'">'+i+"</div>"),r(d.querySelector(":scope>.content>."+t)),"js"in e?(m.showLoading(),s=p+e.js,require.data.debug?require([s],a):require([s],a,function(t){e.loaded=0,t.requireType&&"scripterror"!==t.requireType&&"nodefine"!==t.requireType||t.xhr&&404!==t.xhr.status?(require.undef(s),l(s,t.message,n)):c(n),m.hideLoading()})):(e.loaded=2,o(!0))}function a(t){delete e.js,t&&m.extendIn(e,t,h),e.loaded=2,o(!0),m.hideLoading()}var d,u,h,p,f,y,v;n&&e.alias&&(t=e.alias,e=i[e.alias]),2===e.loaded?o():1!==e.loaded&&(e.loaded=1,n?(d=document.getElementById("page"),u="page",h=["onload","onloadend","onunload","onunloadend","onrightmenuclick","onleftmenuclick","rightMenuDomContent","leftMenuDomContent"]):(d=document.getElementById("popup"),u="popup",h=["onload","onloadend","onunload","onunloadend","open"]),p=u+"/"+t+"/",f=require.toUrl(p),"css"in e&&(m.appendCss(f+e.css),delete e.css),"html"in e?(m.showLoading(),y=f+e.html,v=new XMLHttpRequest,v.open("get",y,!0),v.onreadystatechange=function(){4===this.readyState&&(200===this.status?(delete e.html,s(this.responseText)):(e.loaded=0,require.data.debug||404!==this.status?l(y,this.status,n):c(n)),m.hideLoading())},v.send("")):s(""))}function l(e,t,n){m.alert("加载"+e+"时发生了一个错误: "+t,n?function(){history.back()}:void 0)}function c(e){e?location.reload():m.confirm("网站已经更新, 使用该功能需要先重新加载. 是否立即刷新本页?",function(e){e&&location.reload()})}function d(e,t,n,o){function i(e){this.removeEventListener(e.type,i,!1),o()}e.style.visibility="visible",n?(t.classList.add("panelTransR1"),e.classList.add("panelTransR2")):(t.classList.add("panelTransL1"),e.classList.add("panelTransL2")),"function"==typeof o&&r(e,i)}function r(e,t){"function"!=typeof t&&(t=u),e.addEventListener(m.names.aniEvt,t,!1)}function u(e){e.target===this&&(this.className.match(/ panelTrans[LR]1/)?this.style.right=this.style.visibility="":this.style.right=0,this.className=this.className.replace(/ panelTrans[LR][12]/,""))}function h(e,t){for(;i[e].back;)if(e=i[e].back,e===t)return!0}function p(e){e.preventDefault()}function f(e){e.stopPropagation()}var y,m={appendCss:function(e){var t=document.createElement("link");/\.less$/.test(e)?"object"==typeof less?(t.rel="stylesheet/less",t.href=e,less.sheets.push(t),less.refresh()):(t.rel="stylesheet",t.href=e.replace(/less$/,"css")):(t.rel="stylesheet",t.href=e),document.head.appendChild(t)},makeSvg:function(e,t){var n="http://www.w3.org/2000/svg",o=document.createElementNS(n,"svg");return o.appendChild(document.createElementNS(n,"path")).setAttribute("transform","scale(1,-1)"),e&&m.setSvgPath(o,e,t),o},setSvgPath:function(e,t,n){var i,s=m.makeSvg();s.style.position="absolute",s.style.bottom=s.style.right="100%",s.firstChild.setAttribute("d",o[t]),document.body.appendChild(s),i=s.firstChild.getBBox(),document.body.removeChild(s),n&&(i.width>i.height?(i.y-=(i.width-i.height)/2,i.height=i.width):(i.x-=(i.height-i.width)/2,i.width=i.height)),e.firstChild.setAttribute("d",o[t]),e.setAttribute("viewBox",i.x+" "+(-i.y-i.height)+" "+i.width+" "+i.height)},extendIn:function(e,t,n){for(var o=0;o<n.length;o++)n[o]in t&&(e[n[o]]=t[n[o]])},buildHash:function(e){var t,n="#!"+encodeURIComponent(e.id);for(t in e.args)n+=void 0===e.args[t]?"&"+encodeURIComponent(t):"&"+encodeURIComponent(t)+"="+encodeURIComponent(e.args[t]);return n},parseHash:function(e){var t,n,o,s={id:y,args:{}};if(e=e.substr(1).replace(/[#\?].*$/,""),o=e.match(/[^=&]+(=[^&]*)?/g)){"!"===o[0].charAt(0)&&(n=o[0].substr(1),n in i&&(s.id=decodeURIComponent(n)));for(t=1;t<o.length;t++)n=o[t].match(/^([^=]+)(=)?(.+)?$/),n&&(s.args[decodeURIComponent(n[1])]=n[2]?decodeURIComponent(n[3]||""):void 0)}return s},getDefaultBack:function(e){var t,n,o;if(e||(e=m.location),i[e.id])if("object"===m.dataType(i[e.id].backLoc))o=i[e.id].backLoc;else if(i[e.id].back&&i[i[e.id].back]&&(o={id:i[e.id].back,args:{}},n=i[i[e.id].back].alias?i[i[i[e.id].back].alias]:i[i[e.id].back],n.args))for(t=0;t<n.args.length;t++)n.args[t]in e.args&&(o.args[n.args[t]]=e.args[n.args[t]]);return o},isSameLocation:function(e,t){var n;if(e.id===t.id&&Object.keys(e.args).length===Object.keys(t.args).length){for(n in e.args)if(!(n in t.args)||e.args[n]!==t.args[n])return!1;return!0}return!1},isGoingback:function(e,t){return h(e,t)?!0:h(t,e)?!1:i[e].alias?h(i[e].alias,t)?!0:h(t,i[e].alias)?!1:t===y:i[t].alias?h(e,i[t].alias)?!0:h(i[t].alias,e)?!1:i[e]===y:t===y},dataType:function(e){var t=typeof e;return"string"===t||"number"===t||"function"===t||"undefined"===t?t:(t=Object.prototype.toString.call(e).replace(/^\[object |\]$/g,"").toLowerCase(),"date"===t||"array"===t||"regexp"===t||"error"===t||"null"===t?t:"object")}};return!function(){function e(e,t){var n,o,i;for(e.xEvents[t.type].locked=!0,n=0;n<e.xEvents[t.type].length;n++)e.xEvents[t.type][n].call(e,t);for(e.xEvents[t.type].locked=!1;e.xEvents[t.type].stack.length;)e.xEvents[t.type].stack[0]?(o=e.xEvents[t.type].indexOf(e.xEvents[t.type].stack[0][1]),e.xEvents[t.type].stack[0][0]?-1!==o&&e.xEvents[t.type].splice(o,1):-1===o&&e.xEvents[t.type].push(e.xEvents[t.type].stack[0][1])):e.xEvents[t.type].splice(0,e.xEvents[t.type].length),e.xEvents[t.type].stack.shift();if(e.xEvents[t.type].length||(delete e.xEvents[t.type],e["on"+t.type]=null),e.xEvents.removeMark){delete e.xEvents.removeMark;for(i in e.xEvents)delete e.xEvents[i],e["on"+i]=null;e.xEvents=null}}m.listeners={add:function(t,n,o){t.xEvents||(t.xEvents=function(n){e(t,n)}),t.xEvents[n]||(t.xEvents[n]=[],t.xEvents[n].stack=[],t.xEvents[n].locked=!1,t["on"+n]=t.xEvents),t.xEvents[n].locked?t.xEvents[n].stack.push([!1,o]):t.xEvents[n].indexOf(o)<0&&t.xEvents[n].push(o)},list:function(e,t){var n,o;if(t)n=e.xEvents&&e.xEvents[t]?e.xEvents[t].slice(0):[];else if(n={},e.xEvents)for(o in e.xEvents)"array"===m.dataType(e.xEvents[o])&&e.xEvents[o].length&&(n[o]=e.xEvents[o].slice(0));return n},remove:function(e,t,n){var o,i,s;if(e.xEvents)if(t)e.xEvents[t]&&(e.xEvents[t].locked?n?e.xEvents[t].stack.push([!0,n]):e.xEvents[t].stack.push(null):n?(s=e.xEvents[t].indexOf(n),-1!==s&&e.xEvents[t].splice(s,1)):e.xEvents[t].splice(0,e.xEvents[t].length),0===e.xEvents[t].length&&(delete e.xEvents[t],e["on"+t]=null));else if(!e.xEvents.removeMark){for(o in e.xEvents)e.xEvents[o].locked?i=!0:(delete e.xEvents[o],e["on"+o]=null);i?e.xEvents.removeMark=!0:e.xEvents=null}}}}(),!function(){m.names={},"animation"in document.documentElement.style?(m.names.aniEvt="animationend",m.names.aniStyle="animation"):(m.names.aniEvt="webkitAnimationEnd",m.names.aniStyle="webkitAnimation"),"transition"in document.documentElement.style?(m.names.transEvt="transitionend",m.names.transStyle="transition"):(m.names.transEvt="webkitTransitionEnd",m.names.transStyle="webkitTransition"),"transform"in document.documentElement.style?m.names.transform="transform":m.names.transform="webkitTransform"}(),!function(){function e(e){0===this.scrollTop?this.scrollTop=1:this.scrollTop+this.clientHeight===this.scrollHeight&&(this.scrollTop-=1)}function t(e){e.target===this&&(this.scrollTo?this.scrollTo(0,0):this.scrollLeft=this.scrollTop=0)}m.scrollReload=function(e,t){var o,i,s,a,l;m.fixIosScrolling(e),l=n(e,function(n){function c(t){t.target!==e&&(a=!0,d())}function d(){window.removeEventListener("scroll",c,!0)}if("start"===n.type){if(0===l.pointers.length&&(e.classList.contains("iosScrollFix")&&1===e.scrollTop||!e.classList.contains("iosScrollFix")&&0===e.scrollTop))return o=n.y,window.addEventListener("scroll",c,!0),!0}else{if(a)return a=!1,!0;var r;if(n.y>o+5)i||(i=!0,d()),n.domEvent.preventDefault(),s||(s=document.createElement("div"),s.className="reloadHint",s.appendChild(m.makeSvg("refresh")),e.appendChild(s)),r=s.offsetHeight||s.clientHeight,n.y-o<2*r?(s.style.top=n.y-o-r+"px",s.classList.remove("pin"),s.style.opacity=(n.y-o)/r/2,s.style[m.names.transform]="rotate("+360*s.style.opacity+"deg)"):(s.style.top=r+"px",s.style.opacity=1,s.classList.add("pin"),s.style[m.names.transform]="");else{if(n.y<o&&!i)return!0;s&&(e.removeChild(s),s=void 0)}"end"!==n.type&&"cancel"!==n.type||(s&&(e.removeChild(s),s.classList.contains("pin")&&("function"==typeof t?t():m.reloadPage()),s=void 0),i=!1)}})},m.fixIosScrolling=function(t){var n;"IOS"===browser.name&&(t.classList.add("iosScrollFix"),"none"==getComputedStyle(t).display?(n=t.style.display,t.style.display="block",t.scrollTop=1,t.style.display=n):t.scrollTop=1,t.addEventListener("scroll",e,!1))},m.getScrollHeight=function(e){return e.classList.contains("iosScrollFix")?e.scrollHeight-1:e.scrollHeight},"IOS"===browser.name&&window.addEventListener("touchmove",function(e){for(var t=e.target;t!=document.body;){if(t.classList.contains("iosScrollFix")||t.classList.contains("hScroll"))return;t=t.parentNode}e.preventDefault()},!1),window.addEventListener("scroll",t,!1),document.documentElement.addEventListener("scroll",t,!1),document.body.addEventListener("scroll",t,!1),document.getElementById("page").addEventListener("scroll",t,!1),document.getElementById("popup").addEventListener("scroll",t,!1)}(),!function(){function e(){n.length>1?(n.shift(),"function"==typeof n[0]?(n[0](),e()):t(n[0])):o.style.display=""}function t(e){var t,n,o;s.src=e.img,"right"in e&&(s.style.right=e.right),"left"in e&&(s.style.left=e.left),"top"in e&&(s.style.top=e.top),"bottom"in e&&(s.style.bottom=e.bottom),"width"in e&&(s.style.width=e.width),"height"in e&&(s.style.height=e.height);for(o=0;o<i.childNodes.length;o++)t=i.childNodes[o],e.rows[o]?(t.style.height=e.rows[o],t.className="unflexable"):(t.style.height="auto",t.className="flexable");for(t=i.childNodes[1],o=0;o<t.childNodes.length;o++)n=t.childNodes[o],e.cells[o]?(n.style.width=e.cells[o],n.className="unflexable"):(n.style.width="auto",n.className="flexable")}var n,o=document.getElementById("helper"),i=o.firstChild,s=o.lastChild;o.addEventListener("click",e),m.showHelper=function(e){n="array"===m.dataType(e)?e:[e],t(n[0]),o.style.display="block"}}(),!function(){function e(e,t){return o&&"function"==typeof s[o].onunload&&s[o].onunload()||"function"==typeof s[e].onload&&s[e].onload(t)}function t(e){o&&(r.classList.remove(o),delete s[o].backParam),i=void 0,o=e,r.classList.add(o),h.data=s[e].title,s[e].back?(p.lastChild.data=s[s[e].back].title,p.style.visibility="visible"):p.style.visibility="hidden"}function n(n,a){var u=o;return e(n,a)?!0:(d(r.querySelector(":scope>.content>."+n),r.querySelector(":scope>.content>."+o),n===s[o].back||n===i,function(){var e;l=!1,t(n),"function"==typeof s[u].onunloadend&&s[u].onunloadend(),"function"==typeof s[o].onloadend&&s[o].onloadend(),"function"==typeof c&&(e=c,c=void 0,e())}),void(l=n))}var o,i,l,c,r=document.getElementById("popup"),u=r.querySelector(":scope>.header>.close"),h=r.querySelector(":scope>.header>.title").firstChild,p=r.querySelector(":scope>.header>.back");m.openPopup=function(e,t){if(window.frameElement&&window.frameElement.kernel&&"function"==typeof window.frameElement.kernel.openPopup)window.frameElement.kernel.openPopup(e,t);else{var n=s[e];n?a(n,e,!1,function(){"function"==typeof n.open?n.open(t):m.showPopup(e,t)}):m.hint("popup config not found: "+e)}},m.showPopup=function(i,a){if(l)c=function(){m.showPopup(i,a)};else{var d;if(r.classList.contains("in")){if(o!==i)return n(i,a);"function"==typeof s[i].onload&&s[i].onload(a)||"function"==typeof s[i].onloadend&&s[i].onloadend()}else{if(e(i,a))return!0;d=r.querySelector(":scope>.content>."+i),d.style.right=0,d.style.visibility="visible",r.classList.add("in"),l=i,"function"==typeof m.popupEvents.onshow&&m.popupEvents.onshow({type:"show",id:i}),t(i),m.hideReadable()}}},m.closePopup=function(e){var t;l?c=function(){m.closePopup(e)}:(t=m.getCurrentPopup(),t&&(!e||t===e||"array"===m.dataType(e)&&e.indexOf(t)>=0)&&("function"==typeof s[t].onunload&&s[t].onunload()||(r.classList.remove("in"),r.classList.add("out"),l=!0,delete s[t].backParam,"function"==typeof m.popupEvents.onhide&&m.popupEvents.onhide({type:"hide",id:t}))))},m.getCurrentPopup=function(){return r.classList.contains("in")?o:void 0},m.setPopupBackParam=function(e){r.classList.contains("in")&&(s[o].backParam=e)},m.setPopupBack=function(e,t){t?t in s&&(e?(s[t].back=e,o===t&&(p.lastChild.data=s[e].title)):(delete s[t].back,p.style.visibility="hidden")):r.classList.contains("in")&&(e?(p.lastChild.data=s[e].title,i=e,p.style.visibility=""):p.style.visibility="hidden")},m.setPopupTitle=function(e,t){t?t in s&&(s[t].title=e,o===t&&(h.data=e)):r.classList.contains("in")&&(h.data=e)},m.popupEvents={},u.appendChild(m.makeSvg("close")),u.addEventListener("click",function(){m.closePopup()},!1),p.insertBefore(m.makeSvg("chevron-left"),p.firstChild),p.addEventListener("click",function(e){m.openPopup(i?i:s[o].back,s[o].backParam)},!1),r.addEventListener(m.names.aniEvt,function(e){var t,n;e.target===this&&(l=!1,this.classList.contains("out")?(this.classList.remove("out"),"function"==typeof m.popupEvents.onhideend&&m.popupEvents.onhideend({type:"hideend",id:o}),t=r.querySelector(":scope>.content>."+o),t.style.right=t.style.visibility="","function"==typeof s[o].onunloadend&&s[o].onunloadend(),r.classList.remove(o),o=void 0):("function"==typeof s[o].onloadend&&s[o].onloadend(),"function"==typeof m.popupEvents.onshowend&&m.popupEvents.onshowend({type:"showend",id:o})),"function"==typeof c&&(n=c,c=void 0,n()))},!1)}(),!function(){var e,t=document.getElementById("readable"),n=document.querySelector("#readable>.close"),o=document.querySelector("#readable>.content");m.fixIosScrolling(o),m.showReadable=function(n,i){"string"==typeof n?o.innerHTML=n:o.appendChild(n),o.classList.remove("foreign"),t.className="in",e=i},m.hideReadable=function(){"in"===t.className&&(t.className="out","function"==typeof e&&e())},m.isReadableShowing=function(){return"in"===t.className},m.showForeign=function(e,t){m.showReadable('<iframe frameborder="no" scrolling="auto" sandbox="allow-same-origin allow-forms allow-scripts" src="'+e+'"></iframe>',t),o.classList.add("foreign")},m.clearPopup=function(){m.isReadableShowing()&&m.hideReadable(),m.closePopup()},n.appendChild(m.makeSvg("close")),n.addEventListener("click",m.hideReadable,!1),t.addEventListener(m.names.aniEvt,function(e){if(e.target===this&&this.classList.contains("out")){for(;o.childNodes.length>0;)o.removeChild(o.firstChild);this.className=""}},!1)}(),!function(){function n(){""===v.style.visibility&&""===f.style.visibility&&""===b.style.visibility&&""===x.style.visibility&&document.body.classList.remove("mask")}function o(e,t,n){"visible"===v.style.visibility?h.push([e,t,n]):(g.className=e,"htmlDialog"===e?"string"==typeof t?w.innerHTML=t:w.appendChild(t):w.textContent=t,window.addEventListener("resize",i,!1),i(),document.body.classList.add("mask"),v.style.visibility="visible",r=n)}function i(){g.style.width=g.style.height="",g.style.bottom=g.style.right="auto",g.style.width=g.offsetWidth+"px",g.style.height=g.offsetHeight+"px",g.style.bottom=g.style.right=""}function s(){C.style.width=p.w+"px",C.style.height=p.h+"px",C.style.left=p.l+"px",C.style.top=p.t+"px"}function a(){p.ww=window.innerWidth,p.wh=window.innerHeight,p.wr=p.ww/p.wh,p.ow=C.naturalWidth,p.oh=C.naturalHeight,p.r=p.ow/p.oh,p.ow>p.ww||p.oh>p.wh?p.r>p.wr?(p.z=p.mz=p.ww/p.ow,p.l=0,p.w=p.ww,p.h=p.w/p.r,p.t=(p.wh-p.h)/2):(p.z=p.mz=p.wh/p.oh,p.t=0,p.h=p.wh,p.w=p.h*p.r,p.l=(p.ww-p.w)/2):(p.z=p.mz=1,p.w=p.ow,p.h=p.oh,p.l=(p.ww-p.w)/2,p.t=(p.wh-p.h)/2),s()}function l(e){function t(e){var t=Math.max(Math.min(e.zoom*i,1),p.mz);t!==p.z&&(p.w=p.ow*t,p.h=p.oh*t,p.l=p.w>p.ww?Math.min(Math.max(n+(p.l-n)*t/p.z,p.ww-p.w),0):(p.ww-p.w)/2,p.t=p.h>p.wh?Math.min(Math.max(o+(p.t-o)*t/p.z,p.wh-p.h),0):(p.wh-p.h)/2,p.z=t,s())}var n=e.x,o=e.y,i=p.z;this.onzoomstart=null,this.onzoomchange=t,this.onzoomend=function(e){t.call(this,e),this.onzoomchange=this.zoomend=null,this.onzoomstart=l}}function c(e){function t(e){p.w>p.ww&&(p.l=Math.min(Math.max(i+e.x-n,p.ww-p.w),0)),p.h>p.wh&&(p.t=Math.min(Math.max(a+e.y-o,p.wh-p.h),0)),s()}var n=e.x,o=e.y,i=p.l,a=p.t;N.ondragmove=t,N.ondragend=function(e){t.call(this,e),this.ondragmove=this.ondragend=null,this.ondragstart=c}}var d,r,u=0,h=[],p={},f=document.getElementById("loading"),y=document.getElementById("hint"),v=document.getElementById("dialog"),g=v.querySelector("div"),w=g.querySelector(".content"),E=g.querySelector(".close"),b=document.getElementById("sliderView"),k=b.querySelector(".close"),L=e(b.querySelector(".content")),x=document.getElementById("photoView"),S=x.querySelector(".close"),C=x.querySelector("img"),q=x.querySelector(".actions"),N=t(x);N.onzoomstart=l,N.ondragstart=c,m.showPhotoView=function(e,t,n){var o,i;for(C.src=e;q.childNodes.length;)q.removeChild(q.firstChild);if("function"==typeof n&&t&&t.length){for(o=0;o<t.length;o++)i=document.createElement("a"),i.href="javascript:;",i.appendChild(document.createTextNode(t[o])),i.addEventListener("click",n.bind(m,o)),q.appendChild(i);q.style.display=""}else q.style.display="none"},m.hidePhotoView=function(){C.src="about:blank"},C.addEventListener("load",function(){x.style.visibility="visible",document.body.classList.add("mask"),window.addEventListener("resize",a),a()}),C.addEventListener("error",function(){x.style.visibility="",window.removeEventListener("resize",a),n()}),m.showSliderView=function(e,t){var n,o;for(n=0;n<e.length;n++)o=document.createElement("div"),o.style.backgroundImage="url("+e[n]+")",o.className="item",L.add(o);t&&L.slideTo(t,!0)},m.hideSliderView=function(){L.clear()},m.alert=function(e,t){o("alert",e,t)},m.confirm=function(e,t){o("confirm",e,t)},m.htmlDialog=function(e,t){o("htmlDialog",e,t)},m.closeDialog=function(e){var t;for(window.removeEventListener("resize",i,!1),v.style.visibility="",n(),"function"==typeof r&&r(e);w.childNodes.length;)w.removeChild(w.lastChild);r=void 0,h.length&&(t=h.shift(),m[t.shift()].apply(m,t))},m.showLoading=function(e){f.querySelector("div").lastChild.data=e?e:"加载中...",0===u&&(f.style.visibility="visible",document.body.classList.add("mask")),u++},m.hideLoading=function(){u>0&&(u--,0===u&&(f.style.visibility="",n(),"function"==typeof m.dialogEvents.onloaded&&m.dialogEvents.onloaded({type:"loaded"})))},m.isLoading=function(){return u>0},m.hint=function(e,t){document.querySelector("#hint>.text").firstChild.data=e,d?clearTimeout(d):y.style.opacity=1,d=setTimeout(function(){y.style.opacity="",d=void 0},t?t:5e3)},m.dialogEvents={},L.onchange=function(){var e,t="";if(this.children.length){if(this.children.length>1)for(e=0;e<this.children.length;e++)t+=e===this.current?"●":"○";document.getElementById("sliderView").style.visibility="visible",document.body.classList.add("mask")}else b.style.visibility="",n();document.querySelector("#sliderView>.nav").firstChild.data=t},E.appendChild(m.makeSvg("close")),E.addEventListener("click",m.closeDialog,!1),g.querySelector(".yes").addEventListener("click",m.closeDialog,!1),g.querySelector(".no").addEventListener("click",function(){m.closeDialog()},!1),k.appendChild(E.firstChild.cloneNode(!0)),S.appendChild(E.firstChild.cloneNode(!0)),k.addEventListener("click",m.hideSliderView,!1),S.addEventListener("click",m.hidePhotoView,!1)}(),!function(){function e(){var t,s,l=m.location.id,p=i[l];m.lastLocation.id&&(t=l.replace(/-.*$/,""),s=m.lastLocation.id.replace(/-.*$/,""),t!==s&&(t in g&&(g[t].className="selected","object"==typeof v[t]&&m.setSvgPath(g[t].firstChild,v[t].selected,!0)),s in g&&(g[s].className="","object"==typeof v[s]&&m.setSvgPath(g[s].firstChild,v[s].normal,!0))),m.clearPopup()),"function"==typeof h&&h(),a(p,l,!0,function(t){if(r)u=!0;else{var s,a,h,p,f=i[l].alias?i[l].alias:l;if(l!==c){for(w.classList.add(l),w.querySelector(":scope>.header>.title").firstChild.data=i[l].title,window.frameElement&&window.frameElement.kernel&&"function"==typeof window.frameElement.kernel.getCurrentPopup&&"page"===window.frameElement.kernel.getCurrentPopup()&&window.frameElement.kernel.setPopupTitle(i[l].title);k.childNodes.length;)k.removeChild(k.firstChild);for(;b.childNodes.length;)b.removeChild(b.firstChild);i[l].onrightmenuclick?("function"==typeof i[l].onrightmenuclick?k.href="javascript:;":k.href=i[l].onrightmenuclick,i[l].rightMenuDomContent&&k.appendChild(i[l].rightMenuDomContent),k.style.display=""):k.style.display="none",i[l].onleftmenuclick?("function"==typeof i[l].onleftmenuclick?b.href="javascript:;":b.href=i[l].onleftmenuclick,i[l].leftMenuDomContent&&b.appendChild(i[l].leftMenuDomContent),b.style.display="",E.style.display="none"):b.style.display="none",o(m.getDefaultBack()),s=w.querySelector(":scope>.content>."+f),c?(w.classList.remove(c),a=c,h=i[a].alias?i[a].alias:a,c=l,f===h?n(!0):(p=m.isGoingback(a,l),r=!0,d(s,w.querySelector(":scope>.content>."+h),p,function(){r=!1,"function"==typeof i[h].onunloadend&&i[h].onunloadend(!p),"function"==typeof i[f].onloadend&&i[l].onloadend(!p),u&&(u=!1,s.style.visibility="visible",e())}),"function"==typeof i[h].onunload&&i[h].onunload(),"function"==typeof i[f].onload&&i[f].onload(!p||t))):(c=l,s.style.right=0,s.style.visibility="visible",n(!0))}else n()}})}function t(e,t){var n=i[c].alias?i[i[c].alias]:i[c];(!e||"string"==typeof e&&e===m.location.id||e.indexOf(m.location.id)>=0)&&(t||m.clearPopup(),"function"==typeof n.onunload&&n.onunload(!0),"function"==typeof n.onunloadend&&n.onunloadend(!0),"function"==typeof n.onload&&n.onload(!0),"function"==typeof n.onloadend&&n.onloadend(!0))}function n(e){var t=i[c].alias?i[i[c].alias]:i[c];"function"==typeof t.onload&&t.onload(e),"function"==typeof t.onloadend&&t.onloadend()}function o(e){if(e&&e.id){var t=i[e.id].title;t||(t="返回"),E.lastChild.data=t,E.href=m.buildHash(e),E.style.display=""}else E.href="#!",E.style.display="none"}function s(){var t=m.parseHash(location.hash);m.isSameLocation(t,m.location)||(m.lastLocation=m.location,m.location=t,!i[m.location.id].back||m.lastLocation.id!==i[m.location.id].back&&i[m.lastLocation.id].alias!==i[m.location.id].back?i[m.lastLocation.id].backLoc&&(m.location.id===i[m.lastLocation.id].back||i[m.location.id].alias&&i[m.location.id].alias===i[m.lastLocation.id].back)&&(delete i[m.lastLocation.id].backLoc,delete l[m.lastLocation.id],sessionStorage.setItem("kernelHistory",JSON.stringify(l))):(l[m.location.id]=i[m.location.id].backLoc=m.lastLocation,sessionStorage.setItem("kernelHistory",JSON.stringify(l))),e())}var l,c,r,u,h,v,g,w=document.getElementById("page"),E=w.querySelector(":scope>.header>.back"),b=w.querySelector(":scope>.header>.leftMenuBtn"),k=w.querySelector(":scope>.header>.rightMenuBtn");try{sessionStorage.setItem(0,0),sessionStorage.removeItem(0)}catch(L){Storage.prototype.setItem=function(){}}m.init=function(t,n,o){var a,c=w.querySelector(":scope>.navMenu");if(!m.location){y=t,v=n,h=o,m.location=m.parseHash(location.hash),"clean"===m.location.args.ui&&document.body.classList.add("clean"),m.lastLocation={id:void 0,args:{}},l=sessionStorage.getItem("kernelHistory"),l=l?JSON.parse(l):{};for(a in l)a in i&&(i[a].backLoc=l[a]);for(window.addEventListener("hashchange",s,!1),g={};c.childNodes.length;)c.removeChild(c.childNodes[0]);for(a in v)a in i&&(g[a]=c.appendChild(document.createElement("a")),g[a].href="#!"+a,RegExp("^"+a+"(?:-|$)").test(m.location.id)?(g[a].className="selected",g[a].appendChild(m.makeSvg("object"==typeof v[a]?v[a].selected:v[a],!0))):g[a].appendChild(m.makeSvg("object"==typeof v[a]?v[a].normal:v[a],!0)),g[a].appendChild(document.createTextNode(i[a].title)));window.addEventListener("contextmenu","Firefox"===browser.name?f:p,!1),window.addEventListener("dragstart",p,!1),document.body.classList.remove("loading"),e(),"autopopup"in m.location.args&&m.openPopup(m.location.args.autopopup,m.location.args.autopopuparg?JSON.parse(m.location.args.autopopuparg):void 0)}},m.reloadPage=function(e,n){function o(s){m.listeners.remove(this,s.type,o),m.isSameLocation(i,m.location)&&t(e,n)}var i;m.isLoading()?(i=m.location,m.listeners.add(m.dialogEvents,"loaded",o)):t(e,n)},E.insertBefore(m.makeSvg("chevron-left"),E.firstChild),k.addEventListener("click",function(e){"function"==typeof i[c].onrightmenuclick&&i[c].onrightmenuclick()},!1),b.addEventListener("click",function(e){"function"==typeof i[c].onleftmenuclick&&i[c].onleftmenuclick()},!1)}(),m});