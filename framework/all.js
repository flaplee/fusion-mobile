var requirejs,require,define,browser;try{document.querySelector(":scope *")}catch(e){!function(e){var t,i,r,n=/:scope(?![\w-])/gi,o=a(e.querySelector);function a(e){return function(t){var i,r,o=t&&n.test(t);return o?(i="q"+Math.floor(9e6*Math.random())+1e6,arguments[0]=t.replace(n,"["+i+"]"),this.setAttribute(i,""),r=e.apply(this,arguments),this.removeAttribute(i),r):e.apply(this,arguments)}}e.querySelector=function(e){return o.apply(this,arguments)},t=a(e.querySelectorAll),e.querySelectorAll=function(e){return t.apply(this,arguments)},e.matches&&(i=a(e.matches),e.matches=function(e){return i.apply(this,arguments)}),e.closest&&(r=a(e.closest),e.closest=function(e){return r.apply(this,arguments)})}(Element.prototype)}"SVGElement"in self&&!("classList"in SVGElement)&&function(e){"use strict";var t,i="classList",r="prototype",n=self.SVGElement[r],o=Object,a=String[r].trim||function(){return this.replace(/^\s+|\s+$/g,"")},s=Array[r].indexOf||function(e){for(var t=0,i=this.length;t<i;t++)if(t in this&&this[t]===e)return t;return-1},u=function(e,t){this.name=e,this.code=DOMException[e],this.message=t},c=function(e,t){if(""===t)throw new u("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(t))throw new u("INVALID_CHARACTER_ERR","String contains an invalid character");return s.call(e,t)},d=function(e){for(var t=a.call(e.getAttribute("class")||""),i=t?t.split(/\s+/):[],r=0,n=i.length;r<n;r++)this.push(i[r]);this._updateClassName=function(){e.setAttribute("class",this.toString())}},l=d[r]=[],p=function(){return new d(this)};u[r]=Error[r],l.item=function(e){return this[e]||null},l.contains=function(e){return-1!==c(this,e+="")},l.add=function(){var e,t=arguments,i=0,r=t.length,n=!1;do{e=t[i]+"",-1===c(this,e)&&(this.push(e),n=!0)}while(++i<r);n&&this._updateClassName()},l.remove=function(){var e,t,i=arguments,r=0,n=i.length,o=!1;do{e=i[r]+"",-1!==(t=c(this,e))&&(this.splice(t,1),o=!0)}while(++r<n);o&&this._updateClassName()},l.toggle=function(e,t){e+="";var i=this.contains(e),r=i?!0!==t&&"remove":!1!==t&&"add";return r&&this[r](e),!i},l.toString=function(){return this.join(" ")},o.defineProperty?(t={get:p,enumerable:!0,configurable:!0},o.defineProperty(n,i,t)):o[r].__defineGetter__&&n.__defineGetter__(i,p)}(),function(global,setTimeout){var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.3.6",commentRegExp=/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;function commentReplace(e,t){return t||""}function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){var i;if(e)for(i=0;i<e.length&&(!e[i]||!t(e[i],i,e));i+=1);}function eachReverse(e,t){var i;if(e)for(i=e.length-1;i>-1&&(!e[i]||!t(e[i],i,e));i-=1);}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var i;for(i in e)if(hasProp(e,i)&&t(e[i],i))break}function mixin(e,t,i,r){return t&&eachProp(t,function(t,n){!i&&hasProp(e,n)||(!r||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[n]=t:(e[n]||(e[n]={}),mixin(e[n],t,i,r)))}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,i,r){var n=Error(t+"\nhttps://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=r,i&&(n.originalError=i),n}if(void 0===define){if(void 0!==requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,i,r){var n,o,a=defContextName;return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=i,i=r):e=[]),o&&o.context&&(a=o.context),(n=getOwn(contexts,a))||(n=contexts[a]=req.s.newContext(a)),o&&n.configure(o),n.require(e,t,i)},req.config=function(e){return req(e)},req.nextTick=void 0!==setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e,t,i){var r=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return r.type=e.scriptType||"text/javascript",r.charset="utf-8",r.async=!0,r},req.load=function(e,t,i){var r,n=e&&e.config||{};if(isBrowser)return(r=req.createNode(n,t,i)).setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",t),!r.attachEvent||r.attachEvent.toString&&r.attachEvent.toString().indexOf("[native code")<0||isOpera?(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)),r.src=i,n.onNodeCreated&&n.onNodeCreated(r,n,t,i),currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{setTimeout(function(){},0),importScripts(i),e.completeLoad(t)}catch(r){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+i,r,[t]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){if(head||(head=e.parentNode),dataMain=e.getAttribute("data-main"))return mainScript=dataMain,cfg.baseUrl||-1!==mainScript.indexOf("!")||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),define=function(e,t,i){var r,n;"string"!=typeof e&&(i=t,t=e,e=null),isArray(t)||(i=t,t=null),!t&&isFunction(i)&&(t=[],i.length&&(i.toString().replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(e,i){t.push(i)}),t=(1===i.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript())&&(e||(e=r.getAttribute("data-requiremodule")),n=contexts[r.getAttribute("data-requirecontext")]),n?(n.defQueue.push([e,t,i]),n.defQueueMap[e]=!0):globalDefQueue.push([e,t,i])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}function newContext(e){var t,i,r,n,o,a={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},s={},u={},c={},d=[],l={},p={},f={},h=1,m=1;function g(e,t,i){var r,n,o,s,u,c,d,l,p,f,h=t&&t.split("/"),m=a.map,g=m&&m["*"];if(e&&(c=(e=e.split("/")).length-1,a.nodeIdCompat&&jsSuffixRegExp.test(e[c])&&(e[c]=e[c].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&h&&(e=h.slice(0,h.length-1).concat(e)),function(e){var t,i;for(t=0;t<e.length;t++)if("."===(i=e[t]))e.splice(t,1),t-=1;else if(".."===i){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}(e),e=e.join("/")),i&&m&&(h||g)){e:for(o=(n=e.split("/")).length;o>0;o-=1){if(u=n.slice(0,o).join("/"),h)for(s=h.length;s>0;s-=1)if((r=getOwn(m,h.slice(0,s).join("/")))&&(r=getOwn(r,u))){d=r,l=o;break e}!p&&g&&getOwn(g,u)&&(p=getOwn(g,u),f=o)}!d&&p&&(d=p,l=f),d&&(n.splice(0,l,d),e=n.join("/"))}return getOwn(a.pkgs,e)||e}function v(e){isBrowser&&each(scripts(),function(t){if(t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===r.contextName)return t.parentNode.removeChild(t),!0})}function b(e){var t=getOwn(a.paths,e);if(t&&isArray(t)&&t.length>1)return t.shift(),r.require.undef(e),r.makeRequire(null,{skipMap:!0})([e]),!0}function x(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function E(e,t,i,n){var o,a,s,u,c=null,d=t?t.name:null,p=e,f=!0,v="";return e||(f=!1,e="_@r"+(h+=1)),c=(u=x(e))[0],e=u[1],c&&(c=g(c,d,n),a=getOwn(l,c)),e&&(c?v=i?e:a&&a.normalize?a.normalize(e,function(e){return g(e,d,n)}):-1===e.indexOf("!")?g(e,d,n):e:(c=(u=x(v=g(e,d,n)))[0],v=u[1],i=!0,o=r.nameToUrl(v))),{prefix:c,name:v,parentMap:t,unnormalized:!!(s=!c||a||i?"":"_unnormalized"+(m+=1)),url:o,originalName:p,isDefine:f,id:(c?c+"!"+v:v)+s}}function q(e){var t=e.id,i=getOwn(s,t);return i||(i=s[t]=new r.Module(e)),i}function w(e,t,i){var r=e.id,n=getOwn(s,r);!hasProp(l,r)||n&&!n.defineEmitComplete?(n=q(e)).error&&"error"===t?i(n.error):n.on(t,i):"defined"===t&&i(l[r])}function S(e,t){var i=e.requireModules,r=!1;t?t(e):(each(i,function(t){var i=getOwn(s,t);i&&(i.error=e,i.events.error&&(r=!0,i.emit("error",e)))}),r||req.onError(e))}function y(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(r.defQueueMap[t]=!0),d.push(e)}),globalDefQueue=[])}function k(e){delete s[e],delete u[e]}function M(){var e,i,n=1e3*a.waitSeconds,c=n&&r.startTime+n<(new Date).getTime(),d=[],p=[],f=!1,h=!0;if(!t){if(t=!0,eachProp(u,function(e){var t=e.map,r=t.id;if(e.enabled&&(t.isDefine||p.push(e),!e.error))if(!e.inited&&c)b(r)?(i=!0,f=!0):(d.push(r),v(r));else if(!e.inited&&e.fetched&&t.isDefine&&(f=!0,!t.prefix))return h=!1}),c&&d.length)return(e=makeError("timeout","Load timeout for modules: "+d,null,d)).contextName=r.contextName,S(e);h&&each(p,function(e){!function e(t,i,r){var n=t.map.id;t.error?t.emit("error",t.error):(i[n]=!0,each(t.depMaps,function(n,o){var a=n.id,u=getOwn(s,a);!u||t.depMatched[o]||r[a]||(getOwn(i,a)?(t.defineDep(o,l[a]),t.check()):e(u,i,r))}),r[n]=!0)}(e,{},{})}),c&&!i||!f||!isBrowser&&!isWebWorker||o||(o=setTimeout(function(){o=0,M()},50)),t=!1}}function O(e){hasProp(l,e[0])||q(E(e[0],null,!0)).init(e[1],e[2])}function A(e,t,i,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(i,t,!1)}function R(e){var t=e.currentTarget||e.srcElement;return A(t,r.onScriptLoad,"load","onreadystatechange"),A(t,r.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function j(){var e;for(y();d.length;){if(null===(e=d.shift())[0])return S(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));O(e)}r.defQueueMap={}}return n={require:function(e){return e.require?e.require:e.require=r.makeRequire(e.map)},exports:function(e){if(e.usingExports=!0,e.map.isDefine)return e.exports?l[e.map.id]=e.exports:e.exports=l[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(a.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},(i=function(e){this.events=getOwn(c,e.id)||{},this.map=e,this.shim=getOwn(a.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0}).prototype={init:function(e,t,i,r){r=r||{},this.inited||(this.factory=t,i?this.on("error",i):this.events.error&&(i=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=i,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,r.startTime=(new Date).getTime();var e=this.map;if(!this.shim)return e.prefix?this.callPlugin():this.load();r.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()}))}},load:function(){var e=this.map.url;p[e]||(p[e]=!0,r.load(this.map.id,e))},check:function(){var e,t,i,n,o,a,s;if(this.enabled&&!this.enabling)if(i=this.map.id,n=this.depExports,o=this.exports,a=this.factory,this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(a)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{o=r.execCb(i,a,n,o)}catch(t){e=t}else o=r.execCb(i,a,n,o);if(this.map.isDefine&&void 0===o&&((t=this.module)?o=t.exports:this.usingExports&&(o=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",S(this.error=e)}else o=a;this.exports=o,this.map.isDefine&&!this.ignore&&(l[i]=o,req.onResourceLoad&&(s=[],each(this.depMaps,function(e){s.push(e.normalizedMap||e)}),req.onResourceLoad(r,this.map,s))),k(i),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(r.defQueueMap,i)||this.fetch()},callPlugin:function(){var e=this.map,t=e.id,i=E(e.prefix);this.depMaps.push(i),w(i,"defined",bind(this,function(i){var n,o,u,c=getOwn(f,this.map.id),d=this.map.name,l=this.map.parentMap?this.map.parentMap.name:null,p=r.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(i.normalize&&(d=i.normalize(d,function(e){return g(e,l,!0)})||""),w(o=E(e.prefix+"!"+d,this.map.parentMap,!0),"defined",bind(this,function(e){this.map.normalizedMap=o,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),void((u=getOwn(s,o.id))&&(this.depMaps.push(o),this.events.error&&u.on("error",bind(this,function(e){this.emit("error",e)})),u.enable()))):c?(this.map.url=r.nameToUrl(c),void this.load()):((n=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})})).error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(s,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&k(e.map.id)}),S(e)}),n.fromText=bind(this,function(i,o){var s=e.name,u=E(s),c=useInteractive;o&&(i=o),c&&(useInteractive=!1),q(u),hasProp(a.config,t)&&(a.config[s]=a.config[t]);try{req.exec(i)}catch(e){return S(makeError("fromtexteval","fromText eval for "+t+" failed: "+e,e,[t]))}c&&(useInteractive=!0),this.depMaps.push(u),r.completeLoad(s),p([s],n)}),void i.load(e.name,p,n,a))})),r.enable(i,this),this.pluginMaps[i.id]=i},enable:function(){u[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var i,o,a;if("string"==typeof e){if(e=E(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,a=getOwn(n,e.id))return void(this.depExports[t]=a(this));this.depCount+=1,w(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?w(e,"error",bind(this,this.errback)):this.events.error&&w(e,"error",bind(this,function(e){this.emit("error",e)}))}i=e.id,o=s[i],hasProp(n,i)||!o||o.enabled||r.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(s,e.id);t&&!t.enabled&&r.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var i=this.events[e];i||(i=this.events[e]=[]),i.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},(r={config:a,contextName:e,registry:s,defined:l,urlFetched:p,defQueue:d,defQueueMap:{},Module:i,makeModuleMap:E,nextTick:req.nextTick,onError:S,configure:function(e){var t,i,n;e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/"),"string"==typeof e.urlArgs&&(t=e.urlArgs,e.urlArgs=function(e,i){return(-1===i.indexOf("?")?"?":"&")+t}),i=a.shim,n={paths:!0,bundles:!0,config:!0,map:!0},eachProp(e,function(e,t){n[t]?(a[t]||(a[t]={}),mixin(a[t],e,!0,!0)):a[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(f[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=r.makeShimExports(e)),i[t]=e}),a.shim=i),e.packages&&each(e.packages,function(e){var t;t=(e="string"==typeof e?{name:e}:e).name,e.location&&(a.paths[t]=e.location),a.pkgs[t]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(s,function(e,t){e.inited||e.map.unnormalized||(e.map=E(t,null,!0))}),(e.deps||e.callback)&&r.require(e.deps||[],e.callback)},makeShimExports:function(e){return function(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}},makeRequire:function(t,i){function o(a,u,c){var d,p;return i.enableBuildCallback&&u&&isFunction(u)&&(u.__requireJsBuild=!0),"string"==typeof a?isFunction(u)?S(makeError("requireargs","Invalid require call"),c):t&&hasProp(n,a)?n[a](s[t.id]):req.get?req.get(r,a,t,o):(d=E(a,t,!1,!0).id,hasProp(l,d)?l[d]:S(makeError("notloaded",'Module name "'+d+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(j(),r.nextTick(function(){j(),(p=q(E(null,t))).skipMap=i.skipMap,p.init(a,u,c,{enabled:!0}),M()}),o)}return i=i||{},mixin(o,{isBrowser:isBrowser,toUrl:function(e){var i,n=e.lastIndexOf("."),o=e.split("/")[0];return-1!==n&&(!("."===o||".."===o)||n>1)&&(i=e.substring(n,e.length),e=e.substring(0,n)),r.nameToUrl(g(e,t&&t.id,!0),i,!0)},defined:function(e){return hasProp(l,E(e,t,!1,!0).id)},specified:function(e){return e=E(e,t,!1,!0).id,hasProp(l,e)||hasProp(s,e)}}),t||(o.undef=function(e){y();var i=E(e,t,!0),n=getOwn(s,e);n.undefed=!0,v(e),delete l[e],delete p[i.url],delete c[e],eachReverse(d,function(t,i){t[0]===e&&d.splice(i,1)}),delete r.defQueueMap[e],n&&(n.events.defined&&(c[e]=n.events),k(e))}),o},enable:function(e){getOwn(s,e.id)&&q(e).enable()},completeLoad:function(e){var t,i,n,o=getOwn(a.shim,e)||{},u=o.exports;for(y();d.length;){if(null===(i=d.shift())[0]){if(i[0]=e,t)break;t=!0}else i[0]===e&&(t=!0);O(i)}if(r.defQueueMap={},n=getOwn(s,e),!t&&!hasProp(l,e)&&n&&!n.inited){if(!(!a.enforceDefine||u&&getGlobal(u)))return b(e)?void 0:S(makeError("nodefine","No define call for "+e,null,[e]));O([e,o.deps||[],o.exportsFn])}M()},nameToUrl:function(e,t,i){var n,o,s,u,c,d,l=getOwn(a.pkgs,e);if(l&&(e=l),d=getOwn(f,e))return r.nameToUrl(d,t,i);if(req.jsExtRegExp.test(e))u=e+(t||"");else{for(n=a.paths,s=(o=e.split("/")).length;s>0;s-=1)if(c=getOwn(n,o.slice(0,s).join("/"))){isArray(c)&&(c=c[0]),o.splice(0,s,c);break}u=o.join("/"),u=("/"===(u+=t||(/^data\:|^blob\:|\?/.test(u)||i?"":".js")).charAt(0)||u.match(/^[\w\+\.\-]+:/)?"":a.baseUrl)+u}return a.urlArgs&&!/^blob\:/.test(u)?u+a.urlArgs(e,u):u},load:function(e,t){req.load(r,e,t)},execCb:function(e,t,i,r){return t.apply(r,i)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=R(e);r.completeLoad(t.id)}},onScriptError:function(e){var t,i=R(e);if(!b(i.id))return t=[],eachProp(s,function(e,r){0!==r.indexOf("_@r")&&each(e.depMaps,function(e){if(e.id===i.id)return t.push(r),!0})}),S(makeError("scripterror",'Script error for "'+i.id+(t.length?'", needed by: '+t.join(", "):'"'),e,[i.id]))}}).require=r.makeRequire(),r}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){if("interactive"===e.readyState)return interactiveScript=e}),interactiveScript)}}(this,void 0===setTimeout?void 0:setTimeout),browser=function(){"use strict";var e,t,i,r="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1",n={platform:"unknown",name:"unsupported",version:0};return(t=navigator.userAgent.match(/Macintosh|Windows/))?(n.platform=t[0],(t=navigator.userAgent.match(/(Edge)\/([\d\.]+)/)||navigator.userAgent.match(/(Chrome|Firefox)\/([\d\.]+)/)||navigator.userAgent.match(/(AppleWebKit)\/([\d\.]+)/))&&(n.name=t[1],n.version=t[2])):(t=navigator.userAgent.match(/Android/)||navigator.userAgent.match(/Linux/))?(n.platform=t[0],(t=navigator.userAgent.match(/(Chrome|Firefox)\/([\d\.]+)/)||navigator.userAgent.match(/(AppleWebKit)\/([\d\.]+)/))&&(n.name=t[1],n.version=t[2])):(t=navigator.userAgent.match(/(iPhone|iPad|iPod(?: Touch)?); CPU(?: iPhone)? OS ([\d_\.]+)/))&&(n.platform=t[1],n.name="IOS",n.version=t[2].replace(/_/g,".")),navigator.userAgent.match(/QQ\/[\d\.]+/i)?n.app="QQ":navigator.userAgent.match(/micromessenger\/[\d\.]+/i)?n.app="WeChat":navigator.userAgent.match(/WeiBo/i)&&(n.app="WeiBo"),window.top===window&&((e=document.head.appendChild(document.createElement("meta"))).name="viewport","unsupported"===n.name?e.content=r:(o(),window.addEventListener("resize",o))),n;function o(){var t,n,o,a;i?i=!1:(e.content!==r&&(i=!0,e.content=r),n=Math.min(innerWidth,innerHeight),o=.125,(a=n/320)>1&&(a=Math.floor(Math.sqrt(a)/o)*o),1!==(t=a)&&(i=!0,e.content="user-scalable=no, width="+100/t+"%, initial-scale="+t+", maximum-scale="+t+", minimum-scale="+t))}}(),function(){"use strict";var e,t=document.currentScript.getAttribute("src"),i=t.replace(/framework\/[^\/]+$/,""),r={waitSeconds:0,baseUrl:i+"dev/"},n=document.createElement("link"),o=document.createElement("link");if("dev"!==VERSION){for(e in MODULES)MODULES[e]=i+"dist/"+e+"/"+MODULES[e];r.paths=MODULES}require.config(r),navigator.serviceWorker&&navigator.serviceWorker.register("sw-mobile.js",{scope:"./"}).then(function(e){var i=e.installing||e.waiting||e.active;RES_TO_CACHE.push(t),i.postMessage({framework:RES_TO_CACHE,modules:Object.values(MODULES)})},function(e){console.log("unable to register ServiceWorker: "+e)}),"dev"===VERSION?(n.rel=o.rel="stylesheet/less",n.href=require.toUrl("site/index/index.less"),o.href=require.toUrl("common/kernel/kernel.less"),require([i+"framework/less.js"],function(){less.pageLoadFinished.then(function(){require(["site/index/index"])})})):(n.rel=o.rel="stylesheet",n.href=require.toUrl("site/index/index.css"),o.href=require.toUrl("common/kernel/kernel.css"),window.addEventListener("load",function(){require(["site/index/index"])})),document.head.appendChild(o),document.head.appendChild(n)}();