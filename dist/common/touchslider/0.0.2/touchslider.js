"use strict";define("common/touchslider/touchslider",["common/pointerevents/pointerevents"],function(t){function q(t,q){var l,h;q?(l=Math.round(Math.sqrt(-1*t.subcontainer.offsetLeft/t.container.clientWidth)*t.duration),h=0):(l=Math.round(Math.sqrt((t.container.offsetWidth+t.subcontainer.offsetLeft)/t.container.clientWidth)*t.duration),h="-100%"),l>0?(t.sliding=!0,t.subcontainer.style[d]="left "+l+"ms ease-in-out",t.subcontainer.style.left=h):s(t)}function l(t,q){if(t.target===this){for(q.invisible.appendChild("-100%"===this.style.left?this.firstChild:this.lastChild),this.style[d]="",this.style.left=0,q.sliding=!1;q.removeStack.length>0;)q.remove(q.removeStack.shift());for(;q.pushStack.length>0;)q.add(q.pushStack.shift());i(q,"slidend"),s(q)}}function h(t,q,l,h){if("start"===t.type){if(!l.pointers.length&&q.children.length>1&&!q.sliding)return q.timer&&(clearTimeout(q.timer),delete q.timer),h.ox=h.nx=h.x=t.x,h.ot=h.nt=t.domEvent.timeStamp,h.sl=function(t){document.removeEventListener("scroll",h.sl,!0),delete h.sl},document.addEventListener("scroll",h.sl,!0),!0}else(q.moving||h.sl)&&("move"===t.type?v(t,q,h):"end"===t.type?e(t,q,h):M(q,h))}function v(t,q,l){var h,v,e;q.children.length>1&&!q.sliding&&(l.ox=l.nx,l.ot=l.nt,l.nx=t.x,l.nt=t.domEvent.timeStamp,!q.moving&&Math.abs(l.nx-l.x)>q.minVal&&(q.moving=!0,l.sl()),q.moving&&(h=l.nx-l.x,v=l.nx>l.x?Math.floor(h/q.container.clientWidth):Math.ceil(h/q.container.clientWidth),h%=q.container.clientWidth,0===v?v=q.current:(l.x+=v*q.container.clientWidth,v=n(q.current-v,q.children.length)),e=0===h?v:n(h>0?v-1:v+1,q.children.length),q.children[v]!==q.subcontainer.firstChild&&q.children[e]!==q.subcontainer.firstChild&&q.invisible.appendChild(q.subcontainer.firstChild),q.subcontainer.lastChild&&q.children[v]!==q.subcontainer.lastChild&&q.children[e]!==q.subcontainer.lastChild&&q.invisible.appendChild(q.subcontainer.lastChild),q.children[v].parentNode!==q.subcontainer&&(q.subcontainer.childNodes.length>0&&0>h?q.subcontainer.insertBefore(q.children[v],q.children[e]):q.subcontainer.appendChild(q.children[v])),h>0?(q.subcontainer.firstChild!==q.children[e]&&q.subcontainer.insertBefore(q.children[e],q.children[v]),q.subcontainer.style.left=h-q.container.clientWidth+"px"):0>h?(q.subcontainer.lastChild!==q.children[e]&&q.subcontainer.appendChild(q.children[e]),q.subcontainer.style.left=h+"px"):q.subcontainer.style.left=0,v!==q.current&&(q.current=v,i(q,"change")))),q.moving&&t.domEvent.preventDefault()}function e(t,l,h){var v,e;2===l.subcontainer.childNodes.length?(v=(t.x-h.ox)/(t.domEvent.timeStamp-h.ot),e=Math.pow(v,2)*l.rate,0>v&&(e=-1*e),l.children[l.current]===l.subcontainer.firstChild?l.subcontainer.offsetLeft+e<l.container.offsetWidth*-.5?(q(l,!1),l.current=n(l.current+1,l.children.length),i(l,"change")):q(l,!0):l.subcontainer.offsetLeft+e>l.container.offsetWidth*-.5?(q(l,!0),l.current=n(l.current-1,l.children.length),i(l,"change")):q(l,!1)):s(l),z(l,h)}function M(t,l){2===t.subcontainer.childNodes.length?q(t,t.children[t.current]===t.subcontainer.firstChild):s(t),z(t,l)}function z(t,q){t.moving?t.moving=!1:q.sl&&q.sl()}function n(t,q){var l=t%q;return 0>l&&(l+=q),l}function i(t,q){var l="on"+q;"function"==typeof t[l]&&t[l]({type:q})}function o(t){t.preventDefault()}function s(t){t.delay&&(t.timer=setTimeout(function(){delete t.timer,t.slideTo(t.current+1)},t.delay))}function r(t){t.target===this&&(this.scrollLeft=this.scrollTop=0)}var a,c,d;return"transition"in document.documentElement.style?(d="transition",c="transitionend"):(d="webkitTransition",c="webkitTransitionEnd"),a=function(q,v,e){function M(t){return h(t,s,i,d)}function z(t){s.sliding&&(t.preventDefault(),t.stopPropagation())}if(!(this instanceof a))return new a(q);var n,i,s=this,d={};if(this.pushStack=[],this.removeStack=[],q?(this.container=q,"static"===getComputedStyle(q).position&&(q.style.position="relative")):(this.container=document.createElement("div"),this.container.style.position="relative"),this.container.style.overflow="hidden",this.container.style.userSelect="none",this.invisible=this.container.appendChild(document.createElement("div")),this.invisible.style.position="absolute",this.invisible.style.visibility="hidden",this.subcontainer=this.container.appendChild(document.createElement("div")),this.subcontainer.style.position="absolute",this.subcontainer.style.width="200%",this.subcontainer.style.height="100%",this.subcontainer.style.left=0,this.subcontainer.addEventListener(c,function(t){l.call(this,t,s)},!1),this.container.addEventListener("dragstart",o,!1),this.container.addEventListener("scroll",r,!1),this.container.addEventListener("click",z,!0),i=t(this.container,M),v instanceof Array&&v.length>0)for(this.children=v,"number"==typeof e&&e>=0&&e<v.length?this.current=e:this.current=0,n=0;n<v.length;n++)v[n].style.width="50%",v[n].style.height="100%",v[n].style.display="inline-block",n===this.current?this.subcontainer.appendChild(v[n]):this.invisible.appendChild(v[n]);else this.current=void 0,this.children=[]},a.prototype.rate=4e3,a.prototype.duration=400,a.prototype.minVal=5,a.prototype.add=function(t){var q;return this.sliding?this.pushStack.push(t):(q=this.children.length,t.style.width="50%",t.style.height="100%",t.style.display="inline-block",this.children.push(t),0===q?(this.subcontainer.appendChild(t),this.current=0,i(this,"change")):2===this.subcontainer.childNodes.length?this.current===q-1&&this.subcontainer.firstChild===this.children[this.current]?(this.invisible.appendChild(this.subcontainer.firstChild),this.subcontainer.insertBefore(t,this.subcontainer.lastChild)):0===this.current&&this.subcontainer.lastChild===this.children[this.current]?(this.invisible.appendChild(this.subcontainer.lastChild),this.subcontainer.appendChild(t)):this.invisible.appendChild(t):this.invisible.appendChild(t)),q},a.prototype.remove=function(t){var q;return this.sliding?this.removeStack.push("number"==typeof t?this.children[t]:t):this.children.length>0&&("number"!=typeof t&&(t=this.children.indexOf(t)),t=n(t,this.children.length),q=this.children.splice(t,1)[0],this.current===t?(2===this.subcontainer.childNodes.length?this.children.length>1?q===this.subcontainer.firstChild?(this.current=n(t-1,this.children.length),this.subcontainer.insertBefore(this.children[this.current],q)):(this.current=n(t,this.children.length),this.subcontainer.appendChild(this.children[this.current])):(this.current=0,this.subcontainer.style.left=0):this.children.length>0?(this.current=n(t,this.children.length),this.subcontainer.appendChild(this.children[this.current])):this.current=void 0,this.subcontainer.removeChild(q),i(this,"change")):(q.parentNode===this.subcontainer?(this.children.length>1?q===this.subcontainer.firstChild?this.subcontainer.insertBefore(this.children[n(t-1,this.children.length)],q):this.subcontainer.appendChild(this.children[n(t,this.children.length)]):(this.subcontainer.removeChild(q),this.subcontainer.style.left=0),this.subcontainer.removeChild(q)):this.invisible.removeChild(q),this.current>t&&(this.current-=1,i(this,"change")))),q},a.prototype.slideTo=function(t,l){var h;return 1===this.subcontainer.childNodes.length&&this.children.length>1?(t=n(t,this.children.length),t!==this.current&&(l?(this.invisible.appendChild(this.children[this.current]),this.subcontainer.appendChild(this.children[t])):0===t&&this.current===this.children.length-1||t>this.current?(this.subcontainer.appendChild(this.children[t]),q(this,!1)):(this.subcontainer.insertBefore(this.children[t],this.children[this.current]),this.subcontainer.style.left="-100%",q(this,!0)),this.current=t,i(this,"change")),h=!0):h=!1,h},a.prototype.startPlay=function(t){this.stopPlay(),this.delay=t,s(this)},a.prototype.stopPlay=function(){var t;return this.delay?(delete this.delay,this.timer&&(clearTimeout(this.timer),delete this.timer),t=!0):t=!1,t},a});