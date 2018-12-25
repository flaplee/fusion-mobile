"use strict";define(["common/touchslider/touchslider","common/touchguesture/touchguesture","common/pointerevents/pointerevents","common/svgicos/svgicos","site/pages/pages","site/panels/panels","site/popups/popups","./lang"],function(t,e,n,s,i,a,o,l){var r,c,f,h,u,d,y,m,v,w=document.body.querySelector("#activities"),g={appendCss:function(t){var e=document.createElement("link");return self.less?(e.rel="stylesheet/less",e.href=t+".less",less.sheets.push(e),less.refresh()):(e.rel="stylesheet",e.href=t+".css"),document.head.appendChild(e)},removeCss:function(t){return t.remove(),"stylesheet/less"===t.rel&&(less.sheets.splice(less.sheets.indexOf(t),1),less.refresh()),t.getAttribute("href").replace(/\.(le|c)ss$/,"")},makeSvg:function(t,e){var n="http://www.w3.org/2000/svg",s=document.createElementNS(n,"svg");return s.appendChild(document.createElementNS(n,"path")),t&&g.setSvgPath(s,t,e),s},setSvgPath:function(t,e,n){var i=g.makeSvg();s.hasOwnProperty(e)&&(e=s[e]),t.firstChild.setAttribute("d",e),i.style.position="absolute",i.style.bottom=i.style.right="100%",i.firstChild.setAttribute("d",e),document.body.appendChild(i);var a=i.firstChild.getBBox();i.remove(),2==n?(a.width+=2*a.x,a.x=0,a.height+=2*a.y,a.y=0):n&&(a.width>a.height?(a.y-=(a.width-a.height)/2,a.height=a.width):(a.x-=(a.height-a.width)/2,a.width=a.height)),t.setAttribute("viewBox",a.x+" "+a.y+" "+a.width+" "+a.height)},parseHash:function(t){var e={id:r,args:{}},n=(t=t.substr(1).replace(/[#?].*$/,"")).match(/[^=&]+(=[^&]*)?/g);if(n&&"!"===n[0].charAt(0)){var s=decodeURIComponent(n[0].substr(1));i.hasOwnProperty(s)&&(e.id=s);for(var a=1;a<n.length;a++)(s=n[a].match(/^([^=]+)(=)?(.+)?$/))&&(e.args[decodeURIComponent(s[1])]=s[2]?decodeURIComponent(s[3]||""):void 0)}return e},getDefaultBack:function(t){var e;if(t||(t=g.location),t.args.backHash)try{e=g.parseHash(t.args.backHash)}catch(l){}if(e)return e;var n=i[t.id].backLoc;if(i[t.id].back&&i[i[t.id].back]){e={id:i[t.id].back,args:{}};var s=i[i[t.id].back].alias?i[i[i[t.id].back].alias]:i[i[t.id].back];if(s.args)for(var a=0;a<s.args.length;a++)t.args.hasOwnProperty(s.args[a])&&(e.args[s.args[a]]=t.args[s.args[a]])}if(n&&e){for(var o in e.args)if(e.args[o]!==n.args[o])return e;return n}return n||e},isGoingback:function(t,e){var n=t;if(n!==e){if(e===r||n.length>e.length+1&&n.substr(0,e.length+1)===e+"-")return!0;for(;i[n].back;)if((n=i[n].back)===e)return!0;n=t.split("-");for(var s,a=e.split("-"),o=Math.min(n.length,a.length);s<o&&n[s]===a[s];)s++;if(s<Math.max(n.length,a.length)-1)return s<n.length-1&&n.splice(s+1),s<a.length-1&&a.splice(s+1),g.isGoingback(n.join("-"),a.join("-"))}},replaceLocation:function(t){g.location&&g.isSameLocation(t,g.location)?g.reloadPage():location.replace(g.buildHash(t))}};return document.documentElement.style.hasOwnProperty("animation")?(c="animationend",f="animationName",h="animationDuration"):(c="webkitAnimationEnd",f="webkitAnimationName",h="webkitAnimationDuration"),self.frameElement&&frameElement.kernel?self.Reflect?Reflect.setPrototypeOf(g,frameElement.kernel):g.__proto__=frameElement.kernel:(g.buildHash=function(t){var e="#!"+encodeURIComponent(t.id);for(var n in t.args)e+=void 0===t.args[n]?"&"+encodeURIComponent(n):"&"+encodeURIComponent(n)+"="+encodeURIComponent(t.args[n]);return e},g.isSameLocation=function(t,e){if(t.id===e.id&&Object.keys(t.args).length===Object.keys(e.args).length){for(var n in t.args){if(!e.args.hasOwnProperty(n))return!1;if(void 0===t.args[n]){if(t.args[n]!==e.args[n])return!1}else if(""+t.args[n]!=""+e.args[n])return!1}return!0}return!1},g.getLang=function(t){if(navigator.languages){for(var e=0;e<navigator.languages.length;e++)if(t.hasOwnProperty(navigator.languages[e]))return t[navigator.languages[e]]}else if(t.hasOwnProperty(navigator.language))return t[navigator.language];return t.en},function(){var t,e,n,s,i=document.head.querySelector("meta[name=viewport]"),a=i.content;function o(){var s=i.content.match(/initial-scale=([\d\.]+)/);s=s?+s[1]:1;var a=Math.round(innerWidth*s),r=Math.round(innerHeight*s);t===a&&e===r?n=requestAnimationFrame(o):(l(a,r),t=a,e=r,n=void 0)}function l(t,e,n){if(t&&e){var a=Math.min(t,e),o=a/s;o>1&&(o=Math.sqrt(o)),o=n?"user-scalable=no, width="+Math.round(t/o):"user-scalable=no, initial-scale="+(o=a/Math.round(a/o))+", maximum-scale="+o+", minimum-scale="+o,i.content!==o&&(i.content=o)}}g.setAutoScale=function(n){(s=n)>0?self.visualViewport?self.visualViewport.dispatchEvent(new Event("resize")):self.dispatchEvent(new Event("resize")):(i.content=a,t=e=void 0)},self.visualViewport?self.visualViewport.addEventListener("resize",function(){s>0&&l(Math.round(this.width*this.scale),Math.round(this.height*this.scale),!0)}):self.addEventListener("resize",function(){s>0&&(n&&cancelAnimationFrame(n),o())})}(),function(){var t="function"==typeof Symbol?Symbol("xEvents"):"xEvents";function e(e){this[t][e.type].locked=!0;for(var s=0;s<this[t][e.type].heap.length;s++)this[t][e.type].heap[s].call(this,e);for(this[t][e.type].locked=!1;this[t][e.type].stack.length;){if(this[t][e.type].stack[0])if("function"==typeof this[t][e.type].stack[0]){var i=this[t][e.type].heap.indexOf(this[t][e.type].stack[0]);i>=0&&this[t][e.type].heap.splice(i,1)}else this[t][e.type].heap.indexOf(this[t][e.type].stack[0][0])<0&&this[t][e.type].heap.push(this[t][e.type].stack[0][0]);else this[t][e.type].heap.splice(0);this[t][e.type].stack.shift()}n(this,e.type)}function n(e,n,s){!s&&e[t][n].heap.length||(delete e[t][n],e["on"+n]=null)}g.listeners={add:function(n,s,i){var a=0;return"function"==typeof i&&(n.hasOwnProperty(t)||(n[t]={}),n[t].hasOwnProperty(s)||(n[t][s]={stack:[],heap:[],locked:!1},n["on"+s]=e),n[t][s].locked?(n[t][s].stack.push([i]),a=2):n[t][s].heap.indexOf(i)<0&&(n[t][s].heap.push(i),a=1)),a},list:function(e,n){var s;if(n)s=e.hasOwnProperty(t)&&e[t].hasOwnProperty(n)?e[t][n].heap.slice(0):[];else if(s={},e.hasOwnProperty(t))for(var i in e[t])s[i]=e[t][i].heap.slice(0);return s},remove:function(e,s,i){var a=0;if(e.hasOwnProperty(t))if(s){if(e[t].hasOwnProperty(s))if(e[t][s].locked)e[t][s].stack.push(i),a=2;else if("function"==typeof i){var o=e[t][s].heap.indexOf(i);o>=0&&(e[t][s].heap.splice(o,1),n(e,s),a=1)}else n(e,s,!0),a=1}else{for(var l in e[t])e[t][l].locked?(e[t][l].stack.push(void 0),a=2):n(e,l,!0);a||(a=1)}return a}}}(),function(){function t(t){0===this.scrollTop?this.scrollTop=1:this.scrollTop+this.clientHeight===this.scrollHeight&&(this.scrollTop-=1)}g.scrollReload=function(t,e){var s,i,a,o,l=this,r=n(t,function(n){var f;if("start"===n.type){if(0===r.pointers.length&&0===l.getScrollTop(t))return s=n.y,n.domEvent.view.addEventListener("scroll",c,!0),!0}else{if(o)return o=!1,!0;if(n.y>s)i||(i=!0,n.domEvent.view.removeEventListener("scroll",c,!0)),n.domEvent.preventDefault(),n.domEvent.stopPropagation(),a||((a=n.domEvent.view.document.createElement("div")).className="reloadHint",a.appendChild(l.makeSvg("sync-alt-solid",1)),t.appendChild(a)),f=a.offsetHeight||a.clientHeight,n.y-s<2*f?(a.style.top=n.y-s-f+"px",a.classList.remove("pin"),a.style.opacity=(n.y-s)/f/2,a.style.transform="rotate("+360*a.style.opacity+"deg)"):(a.style.top=f+"px",a.style.opacity=1,a.classList.add("pin"),a.style.transform="");else{if(n.y<s&&!i)return!0;a&&(a.remove(),a=void 0)}"end"!==n.type&&"cancel"!==n.type||(a&&(a.remove(),a.classList.contains("pin")&&("function"==typeof e?e():l.reloadPage()),a=void 0),i=!1)}});function c(e){e.target!==t&&(o=!0,this.removeEventListener("scroll",c,!0))}l.fixIosScrolling(t)},g.fixIosScrolling=function(e,n){"IOS"===browser.name&&(e.addEventListener("touchmove",q,{passive:!1}),n||(e.classList.add("iosScrollFix"),e.scrollTop=1,e.addEventListener("scroll",t)))},g.getScrollTop=function(t){return t.classList.contains("iosScrollFix")?t.scrollTop-1:t.scrollTop},g.getScrollHeight=function(t){return t.classList.contains("iosScrollFix")?t.scrollHeight-2:t.scrollHeight},g.setScrollTop=function(t,e){t.scrollTop=t.classList.contains("iosScrollFix")?e+1:e}}(),function(){var t,e=document.body.querySelector("#helper"),n=e.firstChild,s=e.lastChild;function i(t){s.src=t.img,"right"in t&&(s.style.right=t.right),"left"in t&&(s.style.left=t.left),"top"in t&&(s.style.top=t.top),"bottom"in t&&(s.style.bottom=t.bottom),"width"in t&&(s.style.width=t.width),"height"in t&&(s.style.height=t.height);for(var e=0;e<n.childNodes.length;e++){var i=n.childNodes[e];t.rows[e]?(i.style.height=t.rows[e],i.className="unflexable"):(i.style.height="auto",i.className="flexable")}for(var a=0;a<n.childNodes[1].childNodes.length;a++){var o=n.childNodes[1].childNodes[a];t.cells[a]?(o.style.width=t.cells[a],o.className="unflexable"):(o.style.width="auto",o.className="flexable")}}e.addEventListener("click",function n(){t.length>1?(t.shift(),"function"==typeof t[0]?(t[0](),n()):i(t[0])):e.style.display=""}),g.showHelper=function(n){i((t="Array"===dataType(n)?n:[n])[0]),e.style.display="block"}}(),function(){var t,e,s,i,o,l,r,c,f,h,u=document.querySelector("#panel"),d=u.querySelector(":scope>.backdrop"),y=u.querySelector(":scope>.content"),m=n(u,function(n){if("start"===n.type){if(!m.pointers.length&&!t)return y.querySelector(":scope>."+e),o=l=i=n.x,r=c=n.domEvent.timeStamp,n.domEvent.view.addEventListener("scroll",b,!0),!0}else{if(h)return h=!1,!0;if("move"===n.type)o=l,r=c,l=n.x,c=n.domEvent.timeStamp,!f&&Math.abs(l-i)>5&&(f=!0,n.domEvent.view.removeEventListener("scroll",b,!0)),f&&(n.domEvent.preventDefault(),y.style.transform="translateX("+Math.max(Math.min(l-i,0),-y.offsetWidth)+"px)");else{if(f){var s=(n.x-o)/(n.domEvent.timeStamp-r),a=4e3*Math.pow(s,2);s<0&&(a=-a),(!(a=a+l-i<-y.offsetWidth/2)||g.closePanel())&&a||"translateX(0px)"===y.style.transform||(y.style.transition="",y.style.transform="translateX(0px)",y.addEventListener("transitionend",w))}else n.domEvent.view.addEventListener("scroll",b,!0);h=f=!1}}});function v(n){if("function"!=typeof a[e].onunload||!a[e].onunload())return a[e].status--,t=y.querySelector(":scope>."+e),y.style.transition=y.style.transform="",n&&(d.style.opacity=""),!0}function w(t){t.target===this&&(this.style.transition="none",this.removeEventListener(t.type,w))}function b(){h=!0,this.removeEventListener("scroll",b,!0)}g.openPanel=function(t,e){if(a.hasOwnProperty(t))return L("panel",t,function(n){"function"==typeof a[t].open?a[t].open(e):g.showPanel(t)}),!0},g.showPanel=function(n){var i=0;return a[n].status>1&&(t?(s=g.showPopup.bind(this,n),i=2):e?e===n?("function"!=typeof a[n].onload&&a[n].onload(),"function"==typeof a[n].onloadend&&a[n].onloadend(),i=1):v()&&(s=g.showPanel.bind(this,n),i=1):(a[n].status++,"fucntion"==typeof a[n].onload&&a[n].onload(),u.style.visibility="inherit",d.style.opacity=1,(t=y.querySelector(":scope>."+n)).style.right=t.style.top="auto",t.style.position="relative",y.style.width=t.offsetWidth+"px",y.style.transform="translateX(0px)",u.className=e=n)),i},g.closePanel=function(n){var i=0;return t?(s=g.closePanel.bind(this,n),i=2):e&&(!n||e===n||"Array"===dataType(n)&&n.indexOf(e)>=0)&&v(!0)&&(i=1),i},g.getCurrentPanel=function(){return e},g.destroyPanel=function(t){if(2===a[t].status)return E(a[t],"panel",t),!0},y.addEventListener("transitionend",function(n){if(t&&n.target===this&&(this.style.transform?("function"==typeof a[e].onloadend&&a[e].onloadend(),a[e].status++,this.style.width="",this.style.transition="none"):("function"==typeof a[e].onunloadend&&a[e].onunloadend(),a[e].status--,t.style.position=t.style.right=t.style.top="",a[e].autoDestroy?E(a[e],"panel",e):document.activeElement&&t.contains(document.activeElement)&&document.activeElement.blur(),e=void 0),t=void 0,s)){var i=s;s=void 0,i()}}),d.addEventListener("transitionend",function(t){t.target!==this||d.style.opacity||(u.style.visibility="")}),d.addEventListener("click",g.closePanel.bind(g,void 0))}(),function(){var t,e,n,s,i,a=document.body.querySelector("#popup"),r=a.querySelector(":scope>.header>.close"),f=a.querySelector(":scope>.header>.title").firstChild,h=a.querySelector(":scope>.header>.back");function u(s){t&&a.classList.remove(t),e=n=void 0,t=s,a.classList.add(t),f.data=o[s].title,w.classList.contains("hidePopupHeader")&&(document.title=f.data),h.style.display="none"}g.openPopup=function(e,n,s){if(o.hasOwnProperty(e))return L("popup",e,function(){"function"==typeof o[e].open?o[e].open(n,t&&s):g.showPopup(e,s)}),!0},g.showPopup=function(e,n){var l=0;if(o[e].status>1)if(s)i=g.showPopup.bind(this,e,n),l=2;else if(t){if(t===e)"function"==typeof o[e].onload&&o[e].onload(),"function"==typeof o[e].onloadend&&o[e].onloadend(),l=1;else if("function"!=typeof o[t].onunload||!o[t].onunload()){var r=a.querySelector(":scope>.content>."+t);o[t].status--,o[e].status++,"function"==typeof o[e].onload&&o[e].onload(n),b(a.querySelector(":scope>.content>."+e),r,n,function(){var a=t;if(s=!1,u(e),"function"==typeof o[a].onunloadend&&o[a].onunloadend(),o[a].status--,o[a].autoDestroy?E(o[a],"popup",a):document.activeElement&&r.contains(document.activeElement)&&document.activeElement.blur(),"function"==typeof o[t].onloadend&&o[t].onloadend(n),o[e].status++,"function"==typeof i){var l=i;i=void 0,l()}}),s=e,l=1}}else{o[e].status++,"fucntion"==typeof o[e].onload&&o[e].onload();var c=a.querySelector(":scope>.content>."+e);c.style.left=0,c.style.visibility="inherit",a.classList.add("in"),s=e,"function"==typeof g.popupEvents.onshow&&g.popupEvents.onshow({type:"show",id:e}),u(e),g.hideReadable(),l=1}return l},g.closePopup=function(e){var n=0;return s?(i=g.closePopup.bind(this,e),n=2):!t||e&&t!==e&&!("Array"===dataType(e)&&e.indexOf(t)>=0)||"function"==typeof o[t].onunload&&o[t].onunload()||(o[t].status--,a.classList.remove("in"),a.classList.add("out"),s=!0,"function"==typeof g.popupEvents.onhide&&g.popupEvents.onhide({type:"hide",id:t}),n=1),n},g.getCurrentPopup=function(){return t},g.setPopupBack=function(t,s){a.classList.contains("in")&&(t?(h.lastChild.data="function"!=typeof t&&o[t].title?o[t].title:l.back,e=t,h.style.display="",n=s):h.style.display="none")},g.setPopupTitle=function(e,n){n?o.hasOwnProperty(n)&&(o[n].title=e,t===n&&(f.data=e,w.classList.contains("hidePopupHeader")&&(document.title=f.data))):a.classList.contains("in")&&(f.data=e,w.classList.contains("hidePopupHeader")&&(document.title=f.data))},g.destroyPopup=function(t){if(2===o[t].status)return E(o[t],"popup",t),!0},g.popupEvents={},r.appendChild(g.makeSvg("times-light",1)),r.addEventListener("click",function(){g.closePopup()}),h.insertBefore(g.makeSvg("angle-left-light",1),h.firstChild),h.addEventListener("click",function(t){"function"==typeof e?e(n):g.openPopup(e,n,!0)}),a.addEventListener(c,function(e){if(e.target===this){if(s=!1,this.classList.contains("out")){this.classList.remove("out"),"function"==typeof g.popupEvents.onhideend&&g.popupEvents.onhideend({type:"hideend",id:t});var n=a.querySelector(":scope>.content>."+t);n.style.left=n.style.visibility="","function"==typeof o[t].onunloadend&&o[t].onunloadend(),o[t].status--,o[t].autoDestroy?E(o[t],"popup",t):document.activeElement&&n.contains(document.activeElement)&&document.activeElement.blur(),a.classList.remove(t),t=void 0}else"function"==typeof o[t].onloadend&&o[t].onloadend(),o[t].status++,"function"==typeof g.popupEvents.onshowend&&g.popupEvents.onshowend({type:"showend",id:t});if("function"==typeof i){var l=i;i=void 0,l()}}})}(),y=document.body.querySelector("#readable"),m=y.querySelector(":scope>.close"),v=y.querySelector(":scope>.content"),g.fixIosScrolling(v),d=v.className,g.showReadable=function(t,e,n){"string"==typeof t?v.innerHTML=t:v.appendChild(t),v.className=n?d+" "+n:d,y.className="in",u=e},g.hideReadable=function(){y.classList.contains("in")&&(y.classList.remove("in"),y.classList.add("out"),"function"==typeof u&&u())},g.showForeign=function(t,e){g.showReadable(`<iframe frameborder="no" scrolling="${"IOS"===browser.name?"no":"auto"}" sandbox="allow-same-origin allow-forms allow-scripts allow-modals" src="${t}"></iframe>`,e,"foreign")},m.appendChild(g.makeSvg("times-solid",1)),m.addEventListener("click",g.hideReadable),y.addEventListener(c,function(t){if(t.target===this&&this.classList.contains("out")){for(;v.childNodes.length>0;)v.firstChild.remove();this.className=""}}),function(){var n,s,i=0,a=[],o={},r=document.body.querySelector("#loading"),c=document.body.querySelector("#hint"),f=document.body.querySelector("#dialog"),h=f.querySelector(":scope>div"),u=h.querySelector(":scope>.content"),d=h.querySelector(":scope>.close"),y=h.querySelector(":scope>.btns>.yes"),m=h.querySelector(":scope>.btns>.no"),v=document.body.querySelector("#sliderView"),E=v.querySelector(":scope>.close"),L=t(v.querySelector(":scope>.content")),b=document.body.querySelector("#photoView"),S=b.querySelector(":scope>.close"),C=b.querySelector(":scope>img"),p=b.querySelector(":scope>.actions"),q=e(b);function M(){g.closeDialog()}function O(t,e,n){"inherit"===f.style.visibility?a.push([t,e,n]):(h.className=t,"alert"===t?"Array"===dataType(e)?(u.textContent=e[0],y.firstChild.data=e[1]):(u.textContent=e,y.firstChild.data=l.ok):"confirm"===t?"Array"===dataType(e)?(u.textContent=e[0],y.firstChild.data=e[1],m.firstChild.data=e[2]):(u.textContent=e,y.firstChild.data=l.yes,m.firstChild.data=l.no):"string"==typeof e?u.innerHTML=e:u.appendChild(e),self.addEventListener("resize",T),T(),f.style.visibility="inherit",s=n)}function T(){h.style.width=h.style.height="",h.style.left=h.style.top="20px",h.style.bottom=h.style.right="auto",h.style.width=h.offsetWidth+"px",h.style.height=h.offsetHeight+"px",h.style.left=h.style.top=h.style.bottom=h.style.right=""}function N(){C.style.width=o.w+"px",C.style.height=o.h+"px",C.style.left=o.l+"px",C.style.top=o.t+"px"}function z(){o.ww=innerWidth,o.wh=innerHeight,o.wr=o.ww/o.wh,o.ow=C.naturalWidth,o.oh=C.naturalHeight,o.r=o.ow/o.oh,o.ow>o.ww||o.oh>o.wh?o.r>o.wr?(o.z=o.mz=o.ww/o.ow,o.l=0,o.w=o.ww,o.h=o.w/o.r,o.t=(o.wh-o.h)/2):(o.z=o.mz=o.wh/o.oh,o.t=0,o.h=o.wh,o.w=o.h*o.r,o.l=(o.ww-o.w)/2):(o.z=o.mz=1,o.w=o.ow,o.h=o.oh,o.l=(o.ww-o.w)/2,o.t=(o.wh-o.h)/2),N()}q.onzoomstart=function t(e){var n=e.x,s=e.y,i=o.z;this.onzoomstart=null;this.onzoomchange=a;this.onzoomend=function(e){a.call(this,e),this.onzoomchange=this.zoomend=null,this.onzoomstart=t};function a(t){var e=Math.max(Math.min(t.zoom*i,1),o.mz);e!==o.z&&(o.w=o.ow*e,o.h=o.oh*e,o.l=o.w>o.ww?Math.min(Math.max(n+(o.l-n)*e/o.z,o.ww-o.w),0):(o.ww-o.w)/2,o.t=o.h>o.wh?Math.min(Math.max(s+(o.t-s)*e/o.z,o.wh-o.h),0):(o.wh-o.h)/2,o.z=e,N())}},q.ondragstart=function t(e){var n=e.x,s=e.y,i=o.l,a=o.t;q.ondragmove=l;q.ondragend=function(e){l.call(this,e),this.ondragmove=this.ondragend=null,this.ondragstart=t};function l(t){o.w>o.ww&&(o.l=Math.min(Math.max(i+t.x-n,o.ww-o.w),0)),o.h>o.wh&&(o.t=Math.min(Math.max(a+t.y-s,o.wh-o.h),0)),N()}},g.showPhotoView=function(t,e,n){for(C.src=t;p.childNodes.length;)p.firstChild.remove();if("function"==typeof n&&e&&e.length){for(var s=0;s<e.length;s++){var i=document.createElement("a");i.href="javascript:;",i.appendChild(document.createTextNode(e[s])),i.addEventListener("click",n.bind(g,s)),p.appendChild(i)}p.style.display=""}else p.style.display="none"},g.hidePhotoView=function(){C.src="about:blank"},C.addEventListener("load",function(){b.style.visibility="inherit",self.addEventListener("resize",z),z()}),C.addEventListener("error",function(){b.style.visibility="",self.removeEventListener("resize",z)}),g.showSliderView=function(t,e,n){v.className=n||"";for(var s=0;s<t.length;s++)L.add(t[s]);e&&L.slideTo(e,!0)},g.hideSliderView=function(){L.clear()},g.alert=function(t,e){O("alert",t,e)},g.confirm=function(t,e){O("confirm",t,e)},g.htmlDialog=function(t,e,n){O(e||"",t,n)},g.closeDialog=function(t){if("function"==typeof s){var e=s;s=void 0,e(t)}for(self.removeEventListener("resize",T),f.style.visibility="";u.childNodes.length;)u.lastChild.remove();a.length&&O.apply(void 0,a.shift())},g.showLoading=function(t){r.querySelector(":scope>div").lastChild.data=t||l.loading,0===i&&(r.style.visibility="inherit",w.classList.add("mask")),i++},g.hideLoading=function(){i>0&&0===--i&&(r.style.visibility="",w.classList.remove("mask"),"function"==typeof g.dialogEvents.onloaded&&g.dialogEvents.onloaded({type:"loaded"}))},g.isLoading=function(){return i>0},g.hint=function(t,e){c.querySelector(":scope>.text").firstChild.data=t,n?clearTimeout(n):c.style.opacity=1,n=setTimeout(function(){c.style.opacity="",n=void 0},e||5e3)},g.dialogEvents={},L.onchange=function(){var t="";if(this.children.length){if(this.children.length>1)for(var e=0;e<this.children.length;e++)t+=e===this.current?"●":"○";v.style.visibility="inherit"}else v.style.visibility="";v.querySelector(":scope>.nav").firstChild.data=t},d.appendChild(g.makeSvg("times-light",1)),d.addEventListener("click",M),m.addEventListener("click",M),y.addEventListener("click",g.closeDialog),E.appendChild(g.makeSvg("times-solid",1)),S.appendChild(E.firstChild.cloneNode(!0)),E.addEventListener("click",g.hideSliderView),S.addEventListener("click",g.hidePhotoView)}()),function(){var t,e,n,s,a,o,c=location.pathname,f=document.body.querySelector("#page"),u=f.querySelector(":scope>.navMenu"),d=f.querySelector(":scope>.header>.title").firstChild,y=f.querySelector(":scope>.header>.back"),m=f.querySelector(":scope>.header>.leftMenuBtn"),v=f.querySelector(":scope>.header>.rightMenuBtn");try{sessionStorage.setItem(0,0),sessionStorage.removeItem(0)}catch(z){Storage.prototype.setItem=function(){}}function S(t){t&&(g.listeners.remove(this,t.type,S),setTimeout(function(){document.body.querySelector("#popup").style[h]=""},400)),document.body.addEventListener("transitionend",C),document.documentElement.classList.remove("loading")}function C(t){t.target===this&&(this.removeEventListener(t.type,C),this.style.transition="")}function p(t){for(;u.childNodes.length;)u.firstChild.remove();for(var e in o={},a=t)i.hasOwnProperty(e)&&(o[e]=u.appendChild(document.createElement("a")),o[e].href="#!"+e,RegExp("^"+e+"(?:-|$)").test(g.location.id)?(o[e].className="selected",o[e].appendChild(g.makeSvg("string"==typeof a[e]?a[e]:a[e].selected,1))):o[e].appendChild(g.makeSvg("string"==typeof a[e]?a[e]:a[e].normal,1)),o[e].appendChild(document.createTextNode(i[e].alias?i[e].title||i[i[e].alias].title:i[e].title)))}function q(){var e=g.parseHash(location.hash);g.isSameLocation(e,g.location)||(g.lastLocation=g.location,g.location=e,!i[g.location.id].back||g.lastLocation.id!==i[g.location.id].back&&i[g.lastLocation.id].alias!==i[g.location.id].back?i[g.lastLocation.id].backLoc&&(g.location.id===i[g.lastLocation.id].back||i[g.location.id].alias&&i[g.location.id].alias===i[g.lastLocation.id].back)&&(delete i[g.lastLocation.id].backLoc,delete t[g.lastLocation.id],sessionStorage.setItem(c,toJsex(t))):(t[g.location.id]=i[g.location.id].backLoc=g.lastLocation,sessionStorage.setItem(c,toJsex(t))),M())}function M(){var t=g.location.id;if(g.hasOwnProperty("lastLocation")){var r=t.replace(/-.*$/,""),c=g.lastLocation.id.replace(/-.*$/,"");r!==c&&(o.hasOwnProperty(r)&&(o[r].className="selected","string"!=typeof a[r]&&g.setSvgPath(o[r].firstChild,a[r].selected,1)),o.hasOwnProperty(c)&&(o[c].className="","string"!=typeof a[c]&&g.setSvgPath(o[c].firstChild,a[c].normal,1))),T()}"function"==typeof g.pageEvents.onroute&&g.pageEvents.onroute({type:"route"}),L("page",t,function(a){if(n)s=!0;else{var o;if(t===e)N();else{var r=i[t].alias?i[t].alias:t,c=i[t].title||i[r].title;for(f.classList.add(t),d.data=c,(w.classList.contains("clean")||w.classList.contains("hidePageHeader"))&&(document.title=c),self.frameElement&&frameElement.kernel&&"page"===g.getCurrentPopup()&&g.setPopupTitle(c);v.childNodes.length;)v.firstChild.remove();for(v.removeAttribute("href");m.childNodes.length;)m.firstChild.remove();m.removeAttribute("href"),i[r].rightMenuContent||i[r].onrightmenuclick?("string"==typeof i[r].rightMenuContent?v.innerHTML=i[r].rightMenuContent:i[r].rightMenuContent&&v.appendChild(i[r].rightMenuContent),"function"==typeof i[r].onrightmenuclick?v.href="javascript:;":i[r].onrightmenuclick&&(v.href=i[r].onrightmenuclick),v.style.display=""):v.style.display="none",i[r].leftMenuContent||i[r].onleftmenuclick?("string"==typeof i[r].leftMenuContent?m.innerHTML=i[r].leftMenuContent:i[r].leftMenuContent&&m.appendChild(i[r].leftMenuContent),"function"==typeof i[r].onleftmenuclick?m.href="javascript:;":i[r].onleftmenuclick&&(m.href=i[r].onleftmenuclick),m.style.display=""):m.style.display="none";var h=g.getDefaultBack();if(h){var u=i[h.id].title;!u&&i[h.id].alias&&(u=i[i[h.id].alias].title),y.lastChild.data=u||l.back,y.href=g.buildHash(h),y.style.display=""}else y.style.display="none";var L=f.querySelector(":scope>.content>."+r);if(e){f.classList.remove(e);var S=i[e].alias?i[e].alias:e,C=e;if(e=t,r===S)N(o=!0);else{n=!0;var p=f.querySelector(":scope>.content>."+S),q=g.lastLocation&&g.lastLocation.args.backHash===location.hash||g.isGoingback(C,t);o=!q||a,b(L,p,q,function(){n=!1,"function"==typeof i[S].onunloadend&&i[S].onunloadend(),i[S].status--,i[S].autoDestroy?E(i[S],"page",S):document.activeElement&&p.contains(document.activeElement)&&document.activeElement.blur(),"function"==typeof i[r].onloadend&&i[r].onloadend(o),i[r].status++,s&&(s=!1,L.style.visibility="inherit",M())}),"function"==typeof i[S].onunload&&i[S].onunload(),i[S].status--,i[r].status++,"function"==typeof i[r].onload&&i[r].onload(o)}}else o=!0,e=t,L.style.left=0,L.style.visibility="inherit",N(o)}"function"==typeof g.pageEvents.onrouteend&&g.pageEvents.onrouteend({type:"routeend",force:o})}})}function O(t,n){var s=i[e].alias?i[i[e].alias]:i[e];(!t||t===e||"Array"===dataType(t)&&t.indexOf(e)>=0)&&(n||T(),"function"==typeof s.onload&&s.onload(!0),"function"==typeof s.onloadend&&s.onloadend(!0))}function T(){self.frameElement&&frameElement.kernel||(g.hideReadable(),g.closePopup())}function N(t){var n=i[e].alias?i[i[e].alias]:i[e];n.status<3&&n.status++,"function"==typeof n.onload&&n.onload(t),"function"==typeof n.onloadend&&n.onloadend(t),n.status<4&&n.status++}g.init=function(e,n){if(i.hasOwnProperty(e))if(r){if(n&&p(n),r!==e){var s=r;if(r=e,g.location.id===s)return q(),!0}}else{for(var a in r=e,g.location=g.parseHash(location.hash),g.location.args.ui&&g.location.args.ui.split(",").forEach(function(t){w.classList.add(t)}),(t=sessionStorage.getItem(c))&&(t=t.parseJsex())&&(t=t.value),t||(t={}),t)i.hasOwnProperty(a)&&(i[a].backLoc=t[a]);var o;if(self.addEventListener("hashchange",q),p(n),M(),g.location.args.hasOwnProperty("autoPopup"))g.location.args.hasOwnProperty("autoPopupArg")&&(o=g.location.args.autoPopupArg.parseJsex())&&(o=o.value),g.openPopup(g.location.args.autoPopup,o)?(document.body.querySelector("#popup").style[h]="1ms",g.listeners.add(g.popupEvents,"showend",S)):S();else S()}},g.reloadPage=function(t,e){var n;g.isLoading()?(n=g.location,g.listeners.add(g.dialogEvents,"loaded",function s(i){g.listeners.remove(this,i.type,s);n===g.location&&O(t,e)})):O(t,e)},g.destroyPage=function(t){if(2===i[t].status)return E(i[t],"page",t),!0},g.pageEvents={},y.insertBefore(g.makeSvg("angle-left-light",1),y.firstChild),v.addEventListener("click",function(t){var n=i[i[e].alias?i[e].alias:e];"function"==typeof n.onrightmenuclick&&n.onrightmenuclick()}),m.addEventListener("click",function(t){var n=i[i[e].alias?i[e].alias:e];"function"==typeof n.onleftmenuclick&&n.onleftmenuclick()})}(),l=g.getLang(l),self.addEventListener("contextmenu","Firefox"===browser.name?q:p),self.addEventListener("dragstart",p),"IOS"===browser.name&&(self.addEventListener("gesturestart",p,{passive:!1}),self.addEventListener("touchmove",p,{passive:!1})),g;function E(t,e,n){var s=document.body.querySelector("#"+e+">.content>."+n);if(s&&("function"==typeof t.ondestroy&&t.ondestroy(),s.remove(),t.js)){var i=e+"/"+n+"/"+n;require.defined(i)&&(s=require(i),require.undef(i),s&&(self.Reflect?Reflect.setPrototypeOf(t,Object.prototype):t.__proto__=Object.prototype))}t.css&&t.css.href&&(g.removeCss(t.css),t.css=!0),delete t.status}function L(t,e,n){var s,r;if("panel"===t?s=a[e]:"popup"===t?s=o[e]:(s=i[e]).alias&&(e=s.alias,s=i[s.alias]),s.status>1)n();else if(!s.status){var c=function(i){var a=document.body.querySelector("#"+t+">.content");a.insertAdjacentHTML("beforeEnd",'<div class="'+e+'">'+i+"</div>");var o=a.lastChild;if("panel"!==t&&S(o),s.js){g.showLoading(),o.style.opacity=0,o.style.transition="opacity 400ms ease-in-out",o.addEventListener("transitionend",function t(e){e.target===this&&(this.removeEventListener(e.type,t),this.style.transition="")}),g.listeners.add(g.dialogEvents,"loaded",function t(e){g.listeners.remove(this,e.type,t);o.style.opacity=""});var l=r+e;require([l],function(t){t&&(self.Reflect?Reflect.setPrototypeOf(s,t):s.__proto__=t),s.status++,n(!0),g.hideLoading()},BUILD&&function(n){E(s,t,e),n.requireType&&"scripterror"!==n.requireType&&"nodefine"!==n.requireType||n.xhr&&404!==n.xhr.status?f(l,n.message):h(),g.hideLoading()})}else s.status++,n(!0)},f=function(e,n){g.alert(l.error.replace("${res}",e)+n,"page"===t?function(){history.back()}:void 0)},h=function(){"page"===t?location.reload():g.confirm(l.update,function(t){t&&location.reload()})};s.status=1,r=t+"/"+e+"/";var u=require.toUrl(r);if(s.css&&(s.css=g.appendCss(u+e)),s.html){g.showLoading();var d=u+e+".html",y=new XMLHttpRequest;y.open("get",d,!0),y.onreadystatechange=function(){4===this.readyState&&(200===this.status?c(this.responseText):(E(s,t,e),BUILD&&404===this.status?h():f(d,this.status)),g.hideLoading())},y.send("")}else c("")}}function b(t,e,n,s){t.style.visibility="inherit",n?(e.style[f]="viewTransR1",t.style[f]="viewTransR2"):(e.style[f]="viewTransL1",t.style[f]="viewTransL2"),"function"==typeof s&&S(t,function t(e){this.removeEventListener(e.type,t,!1);s()})}function S(t,e){"function"!=typeof e&&(e=C),t.addEventListener(c,e)}function C(t){t.target===this&&("1"===this.style[f].substr(this.style[f].length-1)?this.style.left=this.style.visibility="":this.style.left=0,this.style[f]="")}function p(t){t.preventDefault()}function q(t){t.stopPropagation()}});