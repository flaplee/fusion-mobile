"use strict";define(function(){var e,n;return self.TouchEvent?e={start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"}:self.PointerEvent?(e={start:"pointerdown",move:"pointermove",end:"pointerup",cancel:"pointercancel"},n="touchAction"):self.MSPointerEvent?(e={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp",cancel:"MSPointerCancel"},n="msTouchAction"):e={start:"mousedown",move:"mousemove",end:"mouseup"},function(i,c){var o={pointers:[],destory:function(){i.removeEventListener(e.start,r,!1)}};return n&&(i.style[n]="none"),i.addEventListener(e.start,r,!1),o;function r(e){!function(e,n,i,c){if("pointerId"in e)n.call(c,{type:"start",id:e.pointerId,x:e.clientX,y:e.clientY,domEvent:e})&&(i.push(e.pointerId),1===i.length&&t(n,i,c,e.view));else if("changedTouches"in e)for(var o=0;o<e.changedTouches.length;o++){var r=e.changedTouches[o];n.call(c,{type:"start",id:r.identifier,x:r.clientX,y:r.clientY,domEvent:e})&&(i.push(r.identifier),1===i.length&&t(n,i,c,e.view))}else n.call(c,{type:"start",id:void 0,x:e.clientX,y:e.clientY,domEvent:e})&&(i.push(void 0),1===i.length&&t(n,i,c,e.view))}(e,c,o.pointers,o)}};function t(n,t,i,o){var r={move:function(e){c(e,n,t,"move",r,i)},end:function(e){c(e,n,t,"end",r,i)},cancel:function(e){c(e,n,t,"cancel",r,i)}};o.addEventListener(e.move,r.move,{capture:!0,passive:!1}),o.addEventListener(e.end,r.end,{capture:!0}),r.cancel&&o.addEventListener(e.cancel,r.cancel,{capture:!0})}function i(n,t){t.removeEventListener(e.move,n.move,{capture:!0,passive:!1}),t.removeEventListener(e.end,n.end,{capture:!0}),n.cancel&&t.removeEventListener(e.cancel,n.cancel,{capture:!0})}function c(e,n,t,c,o,r){if("pointerId"in e){var v=t.indexOf(e.pointerId);v>=0&&(n.call(r,{type:c,id:e.pointerId,x:e.clientX,y:e.clientY,domEvent:e})||"move"!==c)&&(t.splice(v,1),t.length||i(o,e.view))}else if("changedTouches"in e)for(var a=0;a<e.changedTouches.length;a++){var d=e.changedTouches[a],l=t.indexOf(d.identifier);if(l>=0&&(n.call(r,{type:c,id:d.identifier,x:d.clientX,y:d.clientY,domEvent:e})||"move"!==c)&&(t.splice(l,1),!t.length)){i(o,e.view);break}}else{var s=t.indexOf(void 0);s>=0&&(n.call(r,{type:c,id:void 0,x:e.clientX,y:e.clientY,domEvent:e})||"move"!==c)&&(t.splice(s,1),t.length||i(o,e.view))}}});