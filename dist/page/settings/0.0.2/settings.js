"use strict";define("page/settings/settings",["module","common/kernel/kernel"],function(t,q){var l=t.id.replace(/^[^\/]+\/|\/[^\/]+/g,""),h=document.querySelector("#page>.content>."+l),v=0;h.querySelector("a").addEventListener("click",function(){q.openPopup("samplePopup",++v)},!1)});