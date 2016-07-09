"use strict";define("common/kernel/kernel",["common/touchslider/touchslider","common/pointerevents/pointerevents","common/svgicos/svgicos","site/pages/pages","site/popups/popups"],function(e,t,n,o,i){function s(e,t,n,o){function i(i){var d;c.querySelector(":scope>.content").insertAdjacentHTML("beforeEnd",'<div class="'+t+'">'+i+"</div>"),r(c.querySelector(":scope>.content>."+t)),"js"in e?(f.showLoading(),d=p+e.js,require.data.debug?require([d],s):require([d],s,function(t){e.loaded=0,t.requireType&&"scripterror"!==t.requireType&&"nodefine"!==t.requireType||t.xhr&&404!==t.xhr.status?(require.undef(d),l(d,t.message,n)):a(n),f.hideLoading()})):(e.loaded=2,o(!0))}function s(t){delete e.js,t&&f.extendIn(e,t,u),e.loaded=2,o(!0),f.hideLoading()}var c,d,u,p,h,y,v;2===e.loaded?o():1!==e.loaded&&(e.loaded=1,n?(c=document.getElementById("page"),d="page",u=["onload","onloadend","onunload","onunloadend","onrightmenuclick","onleftmenuclick","rightMenuDomContent","leftMenuDomContent"]):(c=document.getElementById("popup"),d="popup",u=["onload","onloadend","onunload","onunloadend","open"]),p=d+"/"+t+"/",h=require.toUrl(p),"css"in e&&(f.appendCss(h+e.css),delete e.css),"html"in e?(f.showLoading(),y=h+e.html,v=new XMLHttpRequest,v.open("get",y,!0),v.onreadystatechange=function(){4===this.readyState&&(200===this.status?(delete e.html,i(this.responseText)):(e.loaded=0,require.data.debug||404!==this.status?l(y,this.status,n):a(n)),f.hideLoading())},v.send("")):i(""))}function l(e,t,n){f.alert("加载"+e+"时发生了一个错误: "+t,n?function(){history.back()}:void 0)}function a(e){e?location.reload():f.confirm("网站已经更新, 使用该功能需要先重新加载. 是否立即刷新本页?",function(e){e&&location.reload()})}function c(e,t,n,o){function i(e){this.removeEventListener(e.type,i,!1),o()}e.style.visibility="visible",n?(t.classList.add("panelTransR1"),e.classList.add("panelTransR2")):(t.classList.add("panelTransL1"),e.classList.add("panelTransL2")),"function"==typeof o&&r(e,i)}function r(e,t){"function"!=typeof t&&(t=d),e.addEventListener(f.names.aniEvt,t,!1)}function d(e){e.target===this&&(this.className.match(/ panelTrans[LR]1/)?this.style.right=this.style.visibility="":this.style.right=0,this.className=this.className.replace(/ panelTrans[LR][12]/,""))}var u,f={appendCss:function(e){var t=document.createElement("link");/\.less$/.test(e)?"object"==typeof less?(t.rel="stylesheet/less",t.href=e,less.sheets.push(t),less.refresh()):(t.rel="stylesheet",t.href=e.replace(/less$/,"css")):(t.rel="stylesheet",t.href=e),document.head.appendChild(t)},makeSvg:function(e,t){var n="http://www.w3.org/2000/svg",o=document.createElementNS(n,"svg");return o.appendChild(document.createElementNS(n,"path")).setAttribute("transform","scale(1,-1)"),e&&f.setSvgPath(o,e,t),o},setSvgPath:function(e,t,o){var i,s=f.makeSvg();s.style.position="absolute",s.style.bottom=s.style.right="100%",s.firstChild.setAttribute("d",n[t]),document.body.appendChild(s),i=s.firstChild.getBBox(),document.body.removeChild(s),o&&(i.width>i.height?(i.y-=(i.width-i.height)/2,i.height=i.width):(i.x-=(i.height-i.width)/2,i.width=i.height)),e.firstChild.setAttribute("d",n[t]),e.setAttribute("viewBox",i.x+" "+(-i.y-i.height)+" "+i.width+" "+i.height)},extendIn:function(e,t,n){for(var o=0;o<n.length;o++)n[o]in t&&(e[n[o]]=t[n[o]])},buildHash:function(e){var t,n="#!"+encodeURIComponent(e.id);for(t in e.args)n+=void 0===e.args[t]?"&"+encodeURIComponent(t):"&"+encodeURIComponent(t)+"="+encodeURIComponent(e.args[t]);return n},parseHash:function(e){var t,n,i,s={id:u,args:{}};if(e=e.substr(1).replace(/[#\?].*$/,""),i=e.match(/[^=&]+(=[^&]*)?/g)){"!"===i[0].charAt(0)&&(n=i[0].substr(1),n in o&&(s.id=decodeURIComponent(n)));for(t=1;t<i.length;t++)n=i[t].match(/^([^=]+)(=)?(.+)?$/),n&&(s.args[decodeURIComponent(n[1])]=n[2]?decodeURIComponent(n[3]||""):void 0)}return s},getDefaultBack:function(e){var t,n,i,s;if(e||(e=f.location),n=o[e.id],n&&(n.back?s=n.back:e.id!==u&&(s=u),s&&o[s]))if(n.backArgs instanceof Object)i={id:s,args:n.backArgs};else if(i={id:s,args:{}},o[s].args)for(t=0;t<o[s].args.length;t++)o[s].args[t]in e.args&&(i.args[o[s].args[t]]=e.args[o[s].args[t]]);return i},isSameLocation:function(e,t){var n;if(e.id===t.id&&Object.keys(e.args).length===Object.keys(t.args).length){for(n in e.args)if(!(n in t.args)||e.args[n]!==t.args[n])return!1;return!0}return!1},isGoingback:function(e,t){if(t===u)return!0;for(;e!==u&&e!==t;)e=o[e].back||u;return e!==u},clone:function(e){var t,n;if(e instanceof Date)t=new Date(e.valueOf());else if(e instanceof RegExp)n="",e.ignoreCase&&(n+="i"),e.multiline&&(n+="m"),e.global&&(n+="g"),t=RegExp(e.source.RegEncode(),n);else if(e instanceof Error)n=e.message?e.message:"",t=e instanceof RangeError?RangeError(n):e instanceof ReferenceError?ReferenceError(n):e instanceof SyntaxError?SyntaxError(n):e instanceof TypeError?TypeError(n):e instanceof URIError?URIError(n):Error(n);else if(e instanceof Array)for(t=[],n=0;n<e.length;n++)t[n]=f.clone(e[n]);else if(e instanceof Object){t={};for(n in e)t[n]=f.clone(e[n])}else t=e;return t},isEqual:function(e,t){var n,o=Object.prototype.toString.call(e);if(o===Object.prototype.toString.call(t)){if("[object Object]"===o){if(Object.keys(e).length===Object.keys(t).length){for(n in e)if(!(n in t&&f.isEqual(e[n],t[n])))return!1;return!0}return!1}if("[object Array]"===o){if(e.length===t.length){for(n=0;n<e.length;n++)if(!f.isEqual(e[n],t[n]))return!1;return!0}return!1}return"[object String]"===o||"[object Number]"===o||"[object Undefined]"===o||"[object Null]"===o?e===t:!1}return!1},cancelEvent:function(e){e.preventDefault()},stopEvent:function(e){e.stopPropagation()}};return!function(){function e(e,t){var n,o,i;for(e.xEvents[t.type].locked=!0,n=0;n<e.xEvents[t.type].length;n++)e.xEvents[t.type][n].call(e,t);for(e.xEvents[t.type].locked=!1;e.xEvents[t.type].stack.length>0;)e.xEvents[t.type].stack[0]?(o=e.xEvents[t.type].indexOf(e.xEvents[t.type].stack[0][1]),e.xEvents[t.type].stack[0][0]?-1!==o&&e.xEvents[t.type].splice(o,1):-1===o&&e.xEvents[t.type].push(e.xEvents[t.type].stack[0][1])):e.xEvents[t.type].splice(0,e.xEvents[t.type].length),e.xEvents[t.type].stack.shift();if(0===e.xEvents[t.type].length&&(delete e.xEvents[t.type],e["on"+t.type]=null),e.xEvents.removeMark){delete e.xEvents.removeMark;for(i in e.xEvents)delete e.xEvents[i],e["on"+i]=null;e.xEvents=null}}f.listeners={add:function(t,n,o){t.xEvents||(t.xEvents=function(n){e(t,n)}),t.xEvents[n]||(t.xEvents[n]=[],t.xEvents[n].stack=[],t.xEvents[n].locked=!1,t["on"+n]=t.xEvents),t.xEvents[n].locked?t.xEvents[n].stack.push([!1,o]):t.xEvents[n].indexOf(o)<0&&t.xEvents[n].push(o)},list:function(e,t){var n,o;if(t)n=e.xEvents&&e.xEvents[t]?e.xEvents[t].slice(0):[];else if(n={},e.xEvents)for(o in e.xEvents)e.xEvents[o]instanceof Array&&e.xEvents[o].length>0&&(n[o]=e.xEvents[o].slice(0));return n},remove:function(e,t,n){var o,i,s;if(e.xEvents)if(t)e.xEvents[t]&&(e.xEvents[t].locked?n?e.xEvents[t].stack.push([!0,n]):e.xEvents[t].stack.push(null):n?(s=e.xEvents[t].indexOf(n),-1!==s&&e.xEvents[t].splice(s,1)):e.xEvents[t].splice(0,e.xEvents[t].length),0===e.xEvents[t].length&&(delete e.xEvents[t],e["on"+t]=null));else if(!e.xEvents.removeMark){for(o in e.xEvents)e.xEvents[o].locked?i=!0:(delete e.xEvents[o],e["on"+o]=null);i?e.xEvents.removeMark=!0:e.xEvents=null}}}}(),!function(){f.names={},"animation"in document.documentElement.style?(f.names.aniEvt="animationend",f.names.aniStyle="animation"):(f.names.aniEvt="webkitAnimationEnd",f.names.aniStyle="webkitAnimation"),"transition"in document.documentElement.style?(f.names.transEvt="transitionend",f.names.transStyle="transition"):(f.names.transEvt="webkitTransitionEnd",f.names.transStyle="webkitTransition"),"transform"in document.documentElement.style?f.names.transform="transform":f.names.transform="webkitTransform"}(),!function(){function e(e){0===this.scrollTop?this.scrollTop=1:this.scrollTop+this.clientHeight===this.scrollHeight&&(this.scrollTop-=1)}function n(e){e.target===this&&(this.scrollTo?this.scrollTo(0,0):this.scrollLeft=this.scrollTop=0)}f.scrollReload=function(e,n){var o,i,s,l,a;f.fixIosScrolling(e),a=t(e,function(t){function c(t){t.target!==e&&(l=!0,r())}function r(){window.removeEventListener("scroll",c,!0)}if("start"===t.type){if(0===a.pointers.length&&(e.classList.contains("iosScrollFix")&&1===e.scrollTop||!e.classList.contains("iosScrollFix")&&0===e.scrollTop))return o=t.y,window.addEventListener("scroll",c,!0),!0}else{if(l)return l=!1,!0;var d;if(t.y>o+5)i||(i=!0,r()),t.domEvent.preventDefault(),s||(s=document.createElement("div"),s.className="reloadHint",s.appendChild(f.makeSvg("refresh")),e.appendChild(s)),d=s.offsetHeight||s.clientHeight,t.y-o<2*d?(s.style.top=t.y-o-d+"px",s.classList.remove("pin"),s.style.opacity=(t.y-o)/d/2,s.style[f.names.transform]="rotate("+360*s.style.opacity+"deg)"):(s.style.top=d+"px",s.style.opacity=1,s.classList.add("pin"),s.style[f.names.transform]="");else{if(t.y<o&&!i)return!0;s&&(e.removeChild(s),s=void 0)}"end"!==t.type&&"cancel"!==t.type||(s&&(e.removeChild(s),s.classList.contains("pin")&&("function"==typeof n?n():f.reloadPage()),s=void 0),i=!1)}})},f.fixIosScrolling=function(t){var n;"IOS"===browser.name&&(t.classList.add("iosScrollFix"),"none"==getComputedStyle(t).display?(n=t.style.display,t.style.display="block",t.scrollTop=1,t.style.display=n):t.scrollTop=1,t.addEventListener("scroll",e,!1))},f.getScrollHeight=function(e){return e.classList.contains("iosScrollFix")?e.scrollHeight-1:e.scrollHeight},"IOS"===browser.name&&window.addEventListener("touchmove",function(e){for(var t=e.target;t!=document.body;){if(t.classList.contains("iosScrollFix")||t.classList.contains("hScroll"))return;t=t.parentNode}e.preventDefault()},!1),window.addEventListener("scroll",n,!1),document.documentElement.addEventListener("scroll",n,!1),document.body.addEventListener("scroll",n,!1),document.getElementById("page").addEventListener("scroll",n,!1),document.getElementById("popup").addEventListener("scroll",n,!1)}(),!function(){function e(e){var t,n,s;i.src=e.img,"right"in e&&(i.style.right=e.right),"left"in e&&(i.style.left=e.left),"top"in e&&(i.style.top=e.top),"bottom"in e&&(i.style.bottom=e.bottom),"width"in e&&(i.style.width=e.width),"height"in e&&(i.style.height=e.height);for(s=0;s<o.childNodes.length;s++)t=o.childNodes[s],e.rows[s]?(t.style.height=e.rows[s],t.className="unflexable"):(t.style.height="auto",t.className="flexable");for(t=o.childNodes[1],s=0;s<t.childNodes.length;s++)n=t.childNodes[s],e.cells[s]?(n.style.width=e.cells[s],n.className="unflexable"):(n.style.width="auto",n.className="flexable")}var t,n=document.getElementById("helper"),o=n.firstChild,i=n.lastChild;n.addEventListener("click",function(o){t.length>1?(t.shift(),e(t[0])):n.style.display=""},!1),f.showHelper=function(o){t=o instanceof Array?o:[o],e(t[0]),n.style.display="block"}}(),!function(){function e(e,t){return o&&"function"==typeof i[o].onunload&&i[o].onunload()||"function"==typeof i[e].onload&&i[e].onload(t)}function t(e){o&&(d.classList.remove(o),delete i[o].backParam),l=void 0,o=e,d.classList.add(o),p.data=i[e].title,i[e].back?(h.lastChild.data=i[i[e].back].title,h.style.visibility="visible"):h.style.visibility="hidden"}function n(n,s){var u=o;return e(n,s)?!0:(c(d.querySelector(":scope>.content>."+n),d.querySelector(":scope>.content>."+o),n===i[o].back||n===l,function(){var e;a=!1,t(n),"function"==typeof i[u].onunloadend&&i[u].onunloadend(),"function"==typeof i[o].onloadend&&i[o].onloadend(),"function"==typeof r&&(e=r,r=void 0,e())}),void(a=n))}var o,l,a,r,d=document.getElementById("popup"),u=d.querySelector(":scope>.header>.close"),p=d.querySelector(":scope>.header>.title").firstChild,h=d.querySelector(":scope>.header>.back");f.openPopup=function(e,t){var n=i[e];n?s(n,e,!1,function(){"function"==typeof n.open?n.open(t):f.showPopup(e,t)}):f.hint("popup config not found: "+e)},f.showPopup=function(s,l){if(a)r=function(){f.showPopup(s,l)};else{var c;if(d.classList.contains("in")){if(o!==s)return n(s,l);"function"==typeof i[s].onload&&i[s].onload(l)||"function"==typeof i[s].onloadend&&i[s].onloadend()}else{if(e(s,l))return!0;c=d.querySelector(":scope>.content>."+s),c.style.right=0,c.style.visibility="visible",d.classList.add("in"),a=s,"function"==typeof f.popupEvents.onshow&&f.popupEvents.onshow({type:"show",id:s}),t(s),f.hideReadable()}}},f.closePopup=function(e){var t;a?r=function(){f.closePopup(e)}:(t=f.getCurrentPopup(),t&&(!e||t===e||e instanceof Array&&e.indexOf(t)>=0)&&("function"==typeof i[t].onunload&&i[t].onunload()||(d.classList.remove("in"),d.classList.add("out"),a=!0,delete i[t].backParam,"function"==typeof f.popupEvents.onhide&&f.popupEvents.onhide({type:"hide",id:t}))))},f.getCurrentPopup=function(){return d.classList.contains("in")?o:void 0},f.setPopupBackParam=function(e){d.classList.contains("in")&&(i[o].backParam=e)},f.setPopupBack=function(e,t){t?t in i&&(e?(i[t].back=e,o===t&&(h.lastChild.data=i[e].title)):(delete i[t].back,h.style.visibility="hidden")):d.classList.contains("in")&&(e?(h.lastChild.data=i[e].title,l=e,h.style.visibility=""):h.style.visibility="hidden")},f.setPopupTitle=function(e,t){t?t in i&&(i[t].title=e,o===t&&(p.data=e)):d.classList.contains("in")&&(p.data=e)},f.popupEvents={},u.appendChild(f.makeSvg("close")),u.addEventListener("click",function(){f.closePopup()},!1),h.insertBefore(f.makeSvg("chevron-left"),h.firstChild),h.addEventListener("click",function(e){f.openPopup(l?l:i[o].back,i[o].backParam)},!1),d.addEventListener(f.names.aniEvt,function(e){var t,n;e.target===this&&(a=!1,this.classList.contains("out")?(this.classList.remove("out"),"function"==typeof f.popupEvents.onhideend&&f.popupEvents.onhideend({type:"hideend",id:o}),t=d.querySelector(":scope>.content>."+o),t.style.right=t.style.visibility="","function"==typeof i[o].onunloadend&&i[o].onunloadend(),o=void 0):("function"==typeof i[o].onloadend&&i[o].onloadend(),"function"==typeof f.popupEvents.onshowend&&f.popupEvents.onshowend({type:"showend",id:o})),"function"==typeof r&&(n=r,r=void 0,n()))},!1)}(),!function(){var e,t=document.getElementById("readable"),n=document.querySelector("#readable>.close"),o=document.querySelector("#readable>.content");f.fixIosScrolling(o),f.showReadable=function(n,i){"string"==typeof n?o.innerHTML=n:o.appendChild(n),t.className="in",e=i},f.hideReadable=function(){"in"===t.className&&(t.className="out","function"==typeof e&&e())},f.isReadableShowing=function(){return"in"===t.className},f.showForeign=function(e,t){f.showReadable('<iframe frameborder="0" frameborder="no" scrolling="auto" sandbox="allow-same-origin allow-forms allow-scripts" style="position:absolute;width:100%;height:100%;" src="'+e+'"></iframe>',t)},f.clearPopup=function(){f.isReadableShowing()&&f.hideReadable(),f.closePopup()},n.appendChild(f.makeSvg("close")),n.addEventListener("click",f.hideReadable,!1),t.addEventListener(f.names.aniEvt,function(e){if(e.target===this&&this.classList.contains("out")){for(;o.childNodes.length>0;)o.removeChild(o.firstChild);this.className=""}},!1)}(),!function(){function t(){""===r.style.visibility&&""===d.style.visibility&&""===c.style.visibility&&""===y.style.visibility&&document.body.classList.remove("mask")}function n(e,t,n){"visible"===d.style.visibility?a.push([e,t,n]):(u.className=e,"htmlDialog"===e?"string"==typeof t?p.innerHTML=t:p.appendChild(t):p.textContent=t,window.addEventListener("resize",o,!1),o(),document.body.classList.add("mask"),d.style.visibility="visible",s=n)}function o(){u.style.width=u.style.height="",u.style.bottom=u.style.right="auto",u.style.width=u.offsetWidth+"px",u.style.height=u.offsetHeight+"px",u.style.bottom=u.style.right=""}var i,s,l=0,a=[],c=document.getElementById("loading"),r=document.getElementById("hint"),d=document.getElementById("dialog"),u=d.querySelector("div"),p=u.querySelector(".content"),h=u.querySelector(".close"),y=document.getElementById("photoView"),v=y.querySelector(".close"),m=e(y.querySelector(".content"));f.showPhotoView=function(e,t){var n,o;for(n=0;n<e.length;n++)o=document.createElement("div"),o.style.backgroundImage="url("+e[n]+")",o.className="item",m.add(o);t?m.slideTo(t,!0):m.children.length>1&&m.onchange(),document.getElementById("photoView").style.visibility="visible",document.body.classList.add("mask")},f.hidePhotoView=function(){for(;m.children.length;)m.remove(0)},f.alert=function(e,t){n("alert",e,t)},f.confirm=function(e,t){n("confirm",e,t)},f.htmlDialog=function(e,t){n("htmlDialog",e,t)},f.closeDialog=function(e){var n;for(window.removeEventListener("resize",o,!1),d.style.visibility="",t(),"function"==typeof s&&s(e);p.childNodes.length;)p.removeChild(p.lastChild);s=void 0,a.length&&(n=a.shift(),f[n.shift()].apply(f,n))},f.showLoading=function(e){c.querySelector("div").lastChild.data=e?e:"加载中...",0===l&&(c.style.visibility="visible",document.body.classList.add("mask")),l++},f.hideLoading=function(){l>0&&(l--,0===l&&(c.style.visibility="",t(),"function"==typeof f.dialogEvents.onloaded&&f.dialogEvents.onloaded({type:"loaded"})))},f.isLoading=function(){return l>0},f.hint=function(e,t){document.querySelector("#hint>.text").firstChild.data=e,i?clearTimeout(i):r.style.opacity=1,i=setTimeout(function(){r.style.opacity="",i=void 0},t?t:5e3)},f.dialogEvents={},m.onchange=function(){var e,n;if(this.children.length>0){if(n="",this.children.length>1)for(e=0;e<this.children.length;e++)n+=e===this.current?"●":"○";document.querySelector("#photoView>.nav").firstChild.data=n}else y.style.visibility="",t()},h.appendChild(f.makeSvg("close")),h.addEventListener("click",f.closeDialog,!1),u.querySelector(".yes").addEventListener("click",f.closeDialog,!1),u.querySelector(".no").addEventListener("click",function(){f.closeDialog()},!1),v.appendChild(h.firstChild.cloneNode(!0)),v.addEventListener("click",f.hidePhotoView,!1)}(),!function(){function e(){var t,l,a=f.location.id,u=o[a];f.lastLocation.id&&(t=a.replace(/-.*$/,""),l=f.lastLocation.id.replace(/-.*$/,""),t!==l&&(t in v&&(v[t].className="selected","object"==typeof y[t]&&f.setSvgPath(v[t].firstChild,y[t].selected,!0)),l in v&&(v[l].className="","object"==typeof y[l]&&f.setSvgPath(v[l].firstChild,y[l].normal,!0))),f.clearPopup()),"function"==typeof h&&h(),s(u,a,!0,function(t){if(d)p=!0;else{var s,l,a,u,h=f.location.id;if(h!==r){for(a=document.getElementById("page"),a.classList.add(h),m.querySelector(":scope>.header>.title").firstChild.data=o[h].title;b.childNodes.length;)b.removeChild(b.firstChild);for(;E.childNodes.length;)E.removeChild(E.firstChild);o[h].onrightmenuclick?("function"==typeof o[h].onrightmenuclick?b.href="javascript:;":b.href=o[h].onrightmenuclick,o[h].rightMenuDomContent&&b.appendChild(o[h].rightMenuDomContent),b.style.display=""):b.style.display="none",o[h].onleftmenuclick?("function"==typeof o[h].onleftmenuclick?E.href="javascript:;":E.href=o[h].onleftmenuclick,o[h].leftMenuDomContent&&E.appendChild(o[h].leftMenuDomContent),E.style.display="",g.style.display="none"):E.style.display="none",i(f.getDefaultBack()),s=m.querySelector(":scope>.content>."+h),r?(a.classList.remove(r),l=r,r=h,u=f.isGoingback(l,h),d=!0,c(s,m.querySelector(":scope>.content>."+l),u,function(){d=!1,"function"==typeof o[l].onunloadend&&o[l].onunloadend(!u),"function"==typeof o[h].onloadend&&o[h].onloadend(!u),p&&(p=!1,s.style.visibility="visible",e())}),"function"==typeof o[l].onunload&&o[l].onunload(),"function"==typeof o[h].onload&&o[h].onload(!u||t)):(r=h,s.style.right=0,s.style.visibility="visible",n(!0))}else n()}})}function t(){f.clearPopup(),"function"==typeof o[r].onunload&&o[r].onunload(!0),"function"==typeof o[r].onunloadend&&o[r].onunloadend(!0),"function"==typeof o[r].onload&&o[r].onload(!0),"function"==typeof o[r].onloadend&&o[r].onloadend(!0)}function n(e){"function"==typeof o[r].onload&&o[r].onload(e),"function"==typeof o[r].onloadend&&o[r].onloadend()}function i(e){if(e&&e.id){var t=o[e.id].title;t||(t="返回"),g.lastChild.data=t,g.href=f.buildHash(e),g.style.display=""}else g.href="#!",g.style.display="none"}function l(){var t=f.parseHash(location.hash);f.isSameLocation(t,f.location)||(f.lastLocation=f.location,f.location=t,o[f.location.id].back&&f.lastLocation.id===o[f.location.id].back||!o[f.location.id].back&&f.lastLocation.id===u?(a[f.location.id]=o[f.location.id].backArgs=f.lastLocation.args,sessionStorage.setItem("kernelHistory",JSON.stringify(a))):o[f.lastLocation.id].backArgs&&f.location.id===o[f.lastLocation.id].back&&(delete o[f.lastLocation.id].backArgs,delete a[f.lastLocation.id],sessionStorage.setItem("kernelHistory",JSON.stringify(a))),e())}var a,r,d,p,h,y,v,m=document.getElementById("page"),g=m.querySelector(":scope>.header>.back"),E=m.querySelector(":scope>.header>.leftMenuBtn"),b=m.querySelector(":scope>.header>.rightMenuBtn");try{sessionStorage.setItem(0,0),sessionStorage.removeItem(0)}catch(k){Storage.prototype.setItem=function(){}}f.init=function(t,n,i){var s,c=m.querySelector(":scope>.navMenu");if(!f.location){u=t,y=n,h=i,f.location=f.parseHash(location.hash),"clean"===f.location.args.ui&&document.body.classList.add("clean"),f.lastLocation={id:void 0,args:{}},a=sessionStorage.getItem("routerHistory"),a=a?JSON.parse(a):{};for(s in a)s in o&&(o[s].backArgs=a[s]);for(window.addEventListener("hashchange",l,!1),v={};c.childNodes.length;)c.removeChild(c.childNodes[0]);for(s in y)s in o&&(v[s]=c.appendChild(document.createElement("a")),v[s].href="#!"+s,RegExp("^"+s+"(?:-|$)").test(f.location.id)?(v[s].className="selected",v[s].appendChild(f.makeSvg("object"==typeof y[s]?y[s].selected:y[s],!0))):v[s].appendChild(f.makeSvg("object"==typeof y[s]?y[s].normal:y[s],!0)),v[s].appendChild(document.createTextNode(o[s].title)));window.addEventListener("contextmenu","Firefox"===browser.name?f.stopEvent:f.cancelEvent,!1),window.addEventListener("dragstart",f.cancelEvent,!1),document.body.classList.remove("loading"),e(),"autopopup"in f.location.args&&f.openPopup(f.location.args.autopopup,f.location.args.autopopuparg?JSON.parse(f.location.args.autopopuparg):void 0)}},f.reloadPage=function(){function e(o){f.listeners.remove(this,o.type,e),f.isSameLocation(n,f.location)&&t()}var n;f.isLoading()?(n=f.location,f.listeners.add(f.dialogEvents,"loaded",e)):t()},g.insertBefore(f.makeSvg("chevron-left"),g.firstChild),b.addEventListener("click",function(e){"function"==typeof o[r].onrightmenuclick&&o[r].onrightmenuclick()},!1),E.addEventListener("click",function(e){"function"==typeof o[r].onleftmenuclick&&o[r].onleftmenuclick()},!1)}(),f});