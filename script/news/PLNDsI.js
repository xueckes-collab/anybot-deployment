/*! LAB.js (LABjs :: Loading And Blocking JavaScript)
 v2.0.3 (c) Kyle Simpson
 MIT License
 https://github.com/getify/LABjs/blob/master/LAB.src.js
 */
;
if(typeof $LAB=="undefined"||!!!$LAB){(function(s){var x=s.$LAB,k="UseLocalXHR",r="AlwaysPreserveOrder",o="AllowDuplicates",n="CacheBust",m="Debug",f="BasePath",t=/^[^?#]*\//.exec(location.href)[0],E=/^\w+\:\/\/\/?[^\/]+/.exec(t)[0],g=document.head||document.getElementsByTagName("head"),i=(s.opera&&Object.prototype.toString.call(s.opera)=="[object Opera]")||("MozAppearance" in document.documentElement.style),c=function(){},p=c,C=document.createElement("script"),a=typeof C.preload=="boolean",z=a||(C.readyState&&C.readyState=="uninitialized"),A=!z&&C.async===true,B=!z&&!A&&!i;
if(s.console&&s.console.log){if(!s.console.error){s.console.error=s.console.log
}c=function(F){s.console.log(F)
};
p=function(G,F){s.console.error(G,F)
}
}function v(F){return Object.prototype.toString.call(F)=="[object Function]"
}function D(F){return Object.prototype.toString.call(F)=="[object Array]"
}function h(H,G){var F=/^\w+\:\/\//;
if(/^\/\/\/?/.test(H)){H=location.protocol+H
}else{if(!F.test(H)&&H.charAt(0)!="/"){H=(G||"")+H
}}return F.test(H)?H:((H.charAt(0)=="/"?E:t)+H)
}function j(G,H){for(var F in G){if(G.hasOwnProperty(F)){H[F]=G[F]
}}return H
}function b(G){var H=false;
for(var F=0;
F<G.scripts.length;
F++){if(G.scripts[F].ready&&G.scripts[F].exec_trigger){H=true;
G.scripts[F].exec_trigger();
G.scripts[F].exec_trigger=null
}}return H
}function d(H,G,F,I){H.onload=H.onreadystatechange=function(){if((H.readyState&&H.readyState!="complete"&&H.readyState!="loaded")||G[F]){return
}H.onload=H.onreadystatechange=null;
I()
}
}function y(F){F.ready=F.finished=true;
for(var G=0;
G<F.finished_listeners.length;
G++){F.finished_listeners[G]()
}F.ready_listeners=[];
F.finished_listeners=[]
}function e(F){var G=l(F);
return G.href.replace(G.protocol+"//"+G.host,"")
}function l(F){var G=document.createElement("div"),H=F.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;");
G.innerHTML='<a href="'+H+'">x</a>';
var I=G.firstChild;
return{href:I.href,href:I.href,hostname:I.hostname,host:I.host,protocol:I.protocol}
}function u(H,I,G,J,F){setTimeout(function(){var K,M=I.real_src,L;
if("item" in g){if(!g[0]){setTimeout(arguments.callee,25);
return
}g=g[0]
}K=document.createElement("script");
if(I.type){K.type=I.type
}if(I.charset){K.charset=I.charset
}if(F){if(z){if(H[m]){c("start script preload: "+M)
}G.elem=K;
if(a){K.preload=true;
K.onpreload=J
}else{K.onreadystatechange=function(){if(K.readyState=="loaded"){J()
}}
}K.src=M
}else{if(F&&M.indexOf(E)==0&&H[k]){L=new XMLHttpRequest();
if(H[m]){c("start script preload (xhr): "+M)
}L.onreadystatechange=function(){if(L.readyState==4){L.onreadystatechange=function(){};
G.text=L.responseText+"\n//@ sourceURL="+M;
J()
}};
L.open("GET",M);
L.send()
}else{if(H[m]){c("start script preload (cache): "+M)
}K.type="text/cache-script";
d(K,G,"ready",function(){g.removeChild(K);
J()
});
K.src=M;
g.insertBefore(K,g.firstChild)
}}}else{if(A){if(H[m]){c("start script load (ordered async): "+M)
}K.async=false;
d(K,G,"finished",J);
K.src=M;
g.insertBefore(K,g.firstChild)
}else{if(H[m]){c("start script load: "+M)
}d(K,G,"finished",J);
K.src=M;
g.insertBefore(K,g.firstChild)
}}},0)
}function q(){var H={},M=z||B,F=[],G={},J;
H[k]=true;
H[r]=false;
H[o]=false;
H[n]=false;
H[m]=false;
H[f]="";
function L(P,R,O){var N;
function Q(){if(N!=null){N=null;
y(O)
}}if(G[R.script_uri].finished){return
}if(!P[o]){G[R.script_uri].finished=true
}N=O.elem||document.createElement("script");
if(R.type){N.type=R.type
}if(R.charset){N.charset=R.charset
}d(N,O,"finished",Q);
if(O.elem){O.elem=null
}else{if(O.text){N.onload=N.onreadystatechange=null;
N.text=O.text
}else{N.src=R.real_src
}}g.insertBefore(N,g.firstChild);
if(O.text){Q()
}}function I(P,T,S,N){var O,R,Q=function(){T.ready_cb(T,function(){L(P,T,O)
})
},U=function(){T.finished_cb(T,S)
};
T.src=h(T.src,P[f]);
T.script_uri=e(T.src);
T.real_src=T.src+(P[n]?((/\?.*$/.test(T.src)?"&_":"?_")+~~(Math.random()*1000000000)+"="):"");
if(!G[T.script_uri]){G[T.script_uri]={items:[],finished:false}
}R=G[T.script_uri].items;
if(P[o]||R.length==0){O=R[R.length]={ready:false,finished:false,ready_listeners:[Q],finished_listeners:[U]};
u(P,T,O,((N)?function(){O.ready=true;
for(var V=0;
V<O.ready_listeners.length;
V++){O.ready_listeners[V]()
}O.ready_listeners=[]
}:function(){y(O)
}),N)
}else{O=R[0];
if(O.finished){U()
}else{O.finished_listeners.push(U)
}}}function K(){var Q,U=j(H,{}),N=[],P=0,R=false,T;
function W(Y,X){if(U[m]){c("script preload finished: "+Y.real_src)
}Y.ready=true;
Y.exec_trigger=X;
O()
}function V(Z,Y){if(U[m]){c("script execution finished: "+Z.real_src)
}Z.ready=Z.finished=true;
Z.exec_trigger=null;
for(var X=0;
X<Y.scripts.length;
X++){if(!Y.scripts[X].finished){return
}}Y.finished=true;
O()
}function O(){while(P<N.length){if(v(N[P])){if(U[m]){c("$LAB.wait() executing: "+N[P])
}try{N[P++]()
}catch(X){if(U[m]){p("$LAB.wait() error caught: ",X)
}}continue
}else{if(!N[P].finished){if(b(N[P])){continue
}break
}}P++
}if(P==N.length){R=false;
T=false
}}function S(){if(!T||!T.scripts){N.push(T={scripts:[],finished:true})
}}Q={script:function(){for(var X=0;
X<arguments.length;
X++){(function(ab,Z){var aa;
if(!D(ab)){Z=[ab]
}for(var Y=0;
Y<Z.length;
Y++){S();
ab=Z[Y];
if(v(ab)){ab=ab()
}if(!ab){continue
}if(D(ab)){aa=[].slice.call(ab);
aa.unshift(Y,1);
[].splice.apply(Z,aa);
Y--;
continue
}if(typeof ab=="string"){ab={src:ab}
}ab=j(ab,{ready:false,ready_cb:W,finished:false,finished_cb:V});
T.finished=false;
T.scripts.push(ab);
I(U,ab,T,(M&&R));
R=true;
if(U[r]){Q.wait()
}}})(arguments[X],arguments[X])
}return Q
},wait:function(){if(arguments.length>0){for(var X=0;
X<arguments.length;
X++){N.push(arguments[X])
}T=N[N.length-1]
}else{T=false
}O();
return Q
}};
return{script:Q.script,wait:Q.wait,setOptions:function(X){j(X,U);
return Q
}}
}J={setGlobalDefaults:function(N){j(N,H);
return J
},setOptions:function(){return K().setOptions.apply(null,arguments)
},script:function(){return K().script.apply(null,arguments)
},wait:function(){return K().wait.apply(null,arguments)
},queueScript:function(){F[F.length]={type:"script",args:[].slice.call(arguments)};
return J
},queueWait:function(){F[F.length]={type:"wait",args:[].slice.call(arguments)};
return J
},runQueue:function(){var P=J,N=F.length,O=N,Q;
for(;
--O>=0;
){Q=F.shift();
P=P[Q.type].apply(null,Q.args)
}return P
},noConflict:function(){s.$LAB=x;
return J
},sandbox:function(){return q()
}};
return J
}s.$LAB=q();
(function(H,F,G){if(document.readyState==null&&document[H]){document.readyState="loading";
document[H](F,G=function(){document.removeEventListener(F,G,false);
document.readyState="complete"
},false)
}})("addEventListener","DOMContentLoaded")
})(this)
}(function(a,b){if(!a.onloadHack){a.onloadHack=function(c){if(!!!c||typeof c!=="function"){return
}if(document.readyState==="complete"){c()
}else{if(a.addEventListener){a.addEventListener("load",c,false)
}else{if(w.attachEvent){a.attachEvent("onload",c,false)
}}}}
}})(window);
(function(a,b){onloadHack(function(){$(".ck4_inset_year_container").each(function(){var e=new Date();
var c=e.getFullYear();
$(this).text(c)
})
})
})(window);
(function(h,j,k,d){if(typeof h=="undefined"||!!!h){return
}var c=h(j);
var f={threshold:0,container:j};
function b(n,o){var m;
if(!!!h(n).length){return false
}if(typeof o=="undefined"){o=f
}if(o.container===d||o.container===j){m=(j.innerHeight?j.innerHeight:c.height())+c.scrollTop()
}else{m=h(o.container).offset().top+h(o.container).height()
}return m<=h(n).offset().top-o.threshold
}function l(n,o){var m;
if(!!!h(n).length){return false
}if(typeof o=="undefined"){o=f
}if(o.container===d||o.container===j){m=c.width()+c.scrollLeft()
}else{m=h(o.container).offset().left+h(o.container).width()
}return m<=h(n).offset().left-o.threshold
}function g(n,o){var m;
if(!!!h(n).length){return false
}if(typeof o=="undefined"){o=f
}if(o.container===d||o.container===j){m=c.scrollTop()
}else{m=h(o.container).offset().top
}return m>=h(n).offset().top+o.threshold+h(n).height()
}function a(n,o){var m;
if(!!!h(n).length){return false
}if(typeof o=="undefined"){o=f
}if(o.container===d||o.container===j){m=c.scrollLeft()
}else{m=h(o.container).offset().left
}return m>=h(n).offset().left+o.threshold+h(n).width()
}function e(m,n){return !l(m,n)&&!a(m,n)&&!b(m,n)&&!g(m,n)
}var i=j.LABHelper||{};
h.extend(i,{rightoffold:l,leftofbegin:a,belowthefold:b,abovethetop:g,inviewport:e});
j.LABHelper=i
})(jQuery,window,document);
if(typeof window.LABHelper!="undefined"&&(typeof window.LABHelper.isElementInViewport=="undefined"||!!!window.LABHelper.isElementInViewport)){(function(e,g,i,a){var f=g.LABHelper||{};
var d={threshold:0,container:g};
function b(j){var l;
try{l=j.getBoundingClientRect()
}catch(k){}if(!l){return h()
}if(!(l.width&&l.height)){l={top:l.top,right:l.right,bottom:l.bottom,left:l.left,width:l.right-l.left,height:l.bottom-l.top}
}return l
}function h(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}
}function c(k,l){var n=e(k);
if(!!!n.length){return false
}if(typeof l=="undefined"){l=d
}var j=l.threshold;
var o=e(g).height();
var m=b(n[0]);
if((m.top-j<=o)&&(m.bottom+j>=0)){return true
}}e.extend(f,{isElementInViewport:c})
})(jQuery,window,document)
}if(typeof window.LABHelper!="undefined"&&(typeof window.LABHelper.loadCss=="undefined"||!!!window.LABHelper.loadCss)){(function(d,g,h,b){if(typeof d=="undefined"||!!!d){return
}var e=g.LABHelper||{};
var f=e._lazy_css_||[];
function i(m){if(typeof m=="undefined"){return
}var o=m.url;
if(!!!o){return
}var C=a(o);
if(f[C]){return
}var q=typeof m.callback=="function"?m.callback:function(){};
var p=function(){q()
};
var u=m.id,v=h.createElement("link"),r="onload" in v;
var B=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,"$1")<536;
var t=m.crossorigin;
var s=m.preload;
if(typeof s=="undefined"||B||!r){s=false
}v.rel=s?"preload":"stylesheet";
if(s){v.as="style"
}v.type="text/css";
v.href=o;
if(typeof u!=="undefined"){v.id=u
}if(t!==void 0){v.setAttribute("crossorigin",t)
}var D=m.isBefore;
if(typeof D=="undefined"){D=true
}var l=m.isMobileHead||false;
var k=!l?d("link[href*=\\/theme\\/]"):d("link[href*=cus\\.bootstrap\\.grid\\.system\\.css]"),y,n,j=null,x;
if(!!k.length){for(y=0,n=k.length;
y<n;
y++){j=k[y];
x=d(j).attr("href");
if(!l&&/\/theme\/[^\/]+\/style\/style.css/.test(x)){break
}if(l&&/\assets\/style\/bootstrap\/cus.bootstrap.grid.system.css\?*/.test(x)){break
}j=null
}}if(j==null){j=d("style[emptyrender=true]")[0]||d("link[data-extstyle=true]")[0]||d("style")[0]
}if(j==null){h.getElementsByTagName("head")[0].appendChild(v)
}else{D?d(j).before(v):d(v).insertAfter(j);
j=null
}f[C]={load:true};
if(B||!r){setTimeout(function(){A(v,p,0)
},1);
return
}if(r){v.onload=z;
v.onerror=function(){z()
}
}else{v.onreadystatechange=function(){if(/loaded|complete/.test(v.readyState)){z()
}}
}function z(){v.onload=v.onerror=v.onreadystatechange=null;
if(s){v.rel="stylesheet";
v.setAttribute("data-loadcss",true)
}v=null;
p()
}function A(I,J,H){var G=I.sheet,E;
H+=1;
if(H>protectNum){E=true;
I=null;
J();
return
}if(B){if(G){E=true
}}else{if(G){try{if(G.cssRules){E=true
}}catch(F){if(F.name==="NS_ERROR_DOM_SECURITY_ERR"){E=true
}}}}setTimeout(function(){if(E){J()
}else{A(I,J,H)
}},20)
}}function a(j){var k=c(j);
return k.href.replace(k.protocol+"//"+k.host,"")
}function c(j){var k=h.createElement("div"),l=j.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;");
k.innerHTML='<a href="'+l+'">x</a>';
var m=k.firstChild;
return{href:m.href,href:m.href,hostname:m.hostname,host:m.host,protocol:m.protocol}
}d.extend(e,{loadCss:i});
g.LABHelper=e
})(jQuery,window,document)
}(function(b,d){var c=0;
var e=["ms","moz","webkit","o"];
for(var a=0;
a<e.length&&!b.requestAnimationFrame;
++a){b.requestAnimationFrame=b[e[a]+"RequestAnimationFrame"];
b.cancelAnimationFrame=b[e[a]+"CancelAnimationFrame"]||b[e[a]+"CancelRequestAnimationFrame"]
}if(!b.requestAnimationFrame){b.requestAnimationFrame=function(j,g){var f=new Date().getTime();
var h=Math.max(0,16-(f-c));
var i=b.setTimeout(function(){j(f+h)
},h);
c=f+h;
return i
}
}if(!b.cancelAnimationFrame){b.cancelAnimationFrame=function(f){clearTimeout(f)
}
}})(window);
(function(a,b){if(!a._rIC){a._rIC=function(f,c){var d=c||{};
var e=d.timeout;
if(typeof e===b){e=1
}return setTimeout(f,e)
}
}if(!a._cIC){a._cIC=function(c){clearTimeout(c)
}
}})(window);
/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
;
(function(a){if(!a.preloadCSS){a.preloadCSS=function(){};
var b=preloadCSS.relpreload={};
b.support=(function(){var d;
try{d=a.document.createElement("link").relList.supports("preload")
}catch(f){d=false
}return function(){return d
}
})();
b.supportPreload=b.support();
b.bindMediaToggle=function(e){var f=e.media||"all";
function d(){if(e.addEventListener){e.removeEventListener("load",d)
}else{if(e.attachEvent){e.detachEvent("onload",d)
}}e.setAttribute("onload",null);
e.media=f
}if(e.addEventListener){e.addEventListener("load",d)
}else{if(e.attachEvent){e.attachEvent("onload",d)
}}setTimeout(function(){e.rel="stylesheet";
e.media="only x"
});
setTimeout(d,3000)
};
b.poly=function(){if(b.supportPreload){return
}var d=a.document.getElementsByTagName("link");
if(!!!d.length){return
}for(var e=0;
e<d.length;
e++){var f=d[e];
if(f.rel==="preload"&&f.getAttribute("as")==="style"&&!f.getAttribute("data-loadcss")){f.setAttribute("data-loadcss",true);
b.bindMediaToggle(f)
}}};
if(!b.supportPreload){b.poly();
var c=a.setInterval(b.poly,500);
if(a.addEventListener){a.addEventListener("load",function(){b.poly();
a.clearInterval(c)
})
}else{if(a.attachEvent){a.attachEvent("onload",function(){b.poly();
a.clearInterval(c)
})
}}}if(typeof exports!=="undefined"){exports.preloadCSS=preloadCSS
}else{a.preloadCSS=preloadCSS
}}}(typeof global!=="undefined"?global:this));
if(typeof window.LABHelper!="undefined"){(function(C,I,e,k){if(typeof C=="undefined"||!!!C){return
}var d=function(O){if(!!I.__datalazyload__debug__){console&&console.log&&console.log(O)
}};
var o=I.LABHelper,m=I.requestAnimationFrame,j=I._rIC;
var h={decodeHTML:function(O){if(!!!O){return O
}O=O.replace(/&lt;\/textarea&gt\;/ig,"</textarea>");
return O
}};
var b=[],c=[];
var N=o.datalazyload||{};
var L=function(T){if(!!!T){return
}d("labjsDatalazyload settingId::"+T);
var Q="pDataLazyLoadModule_"+T,P=C("#"+Q);
if(!!!P.length){return
}d("labjsDatalazyload settingId::"+P.data("lazyload-alias"));
var V=P.data("lazyload-from"),O=P.data("uuid");
if(V!=="textarea"||!!!O){return
}var U=P.find("textarea[data-lazyload-textarea=true][data-settingId="+T+"][data-uuid="+O+"]");
if(!!!U.length){return
}var S=U.text();
var R=h.decodeHTML(S);
m(function(){P.replaceWith(R);
d("labjsDatalazyload done! "+Q);
P.removeClass("dataLazyloadLoding")
})
};
C.extend(N,{labjsDatalazyload:function(Q){try{L(Q)
}catch(O){try{console&&console.log&&console.log(O)
}catch(P){}}}});
var y=I.__pDatalazyload__headModules__||(I.__pDatalazyload__headModules__={});
var x=y.lazyHeadModules||(y.lazyHeadModules={});
var H=function(T){if(!!!T){return
}d("bigRenderHeadModule settingId::"+T);
var R="pDataLazyLoadHeadModule_"+T,Y=C("#"+R);
if(!!!Y.length){return
}d("bigRenderHeadModule settingId::"+Y.data("head-lazyload-alias"));
var S=Y.data("head-lazyload-from"),O=Y.data("head-uuid");
if(S!=="textarea"||!!!O){return
}var P=Y.find("textarea[data-head-lazyload-textarea=true][data-head-settingId="+T+"][data-head-uuid="+O+"]");
if(!!!P.length){return
}var V=P.text();
var W=h.decodeHTML(V);
var Q="mobile_"+Y.data("head-lazyload-uuid");
var X=x[Q],U;
if(typeof X!=="undefined"&&!!X){U=typeof X.func=="function"?X.func:function(){}
}m(function(){Y.replaceWith(W);
!!U&&U();
d("bigRenderHeadModule done! "+R);
Y.removeClass("dataLazyHeadloadLoding")
})
};
C.extend(N,{mobielHeadDatalazyload:function(Q){try{H(Q)
}catch(O){try{console&&console.log&&console.log(O)
}catch(P){}}}});
var u={init:function(){var O=C("#backstage-headArea-mobile div.PDataLazyLoad_HeadModule[data-head-lazyload-type]");
if(!!!O.length){return
}O.each(function(){u.load(C(this))
})
},load:function(Q){if(!!!Q.length){return
}var R=Q.data("head-settingid");
d("mobielHeadLazyload settingId::"+Q.data("head-lazyload-uuid"));
var T=Q.data("head-lazyload-from"),O=Q.data("head-uuid");
if(T!=="textarea"||!!!O){return
}var S=Q.find("textarea[data-head-lazyload-textarea=true][data-head-settingId="+R+"][data-head-uuid="+O+"]");
if(!!!S.length){return
}var P="pDataLazyLoadHeadModule_"+R;
m(function(){var X=S.text();
var V=h.decodeHTML(X);
Q.replaceWith(V);
var W=C("script[type=text\\/x-delay-script][data-jsLazyload=true][data-id=mobile_"+R+"]");
if(!!W.length){var U=W.html();
var Y=function(){m(function(){d("mobielHeadLazyload delay callback! "+P);
C.globalEval(U)
})
};
Y()
}d("mobielHeadLazyload done! "+P);
Q.removeClass("dataLazyHeadloadLoding")
})
}};
var M=I.__pDatalazyload__siteModules__||(I.__pDatalazyload__siteModules__={});
var p=M.lazySiteModules||(M.lazySiteModules={});
var K=function(S){if(!!!S){return
}d("siteModuleDatalazyload moduleId::"+S);
var Q=C("div[data-type=outerContainer][data-type-ext=module_outerContainer][moduleid="+S+"]");
if(!!!Q.length){return
}var P=p[S],T;
if(typeof P!=="undefined"&&!!P){T=typeof P.func=="function"?P.func:function(){}
}var R=I.datalazyloadDefaultOptions;
if(typeof R!="undefined"&&(R.isMobileViewer==="true")){var O=setInterval(function(){if(!!!Q.find("div.PDataLazyLoad_Module[data-lazyload-type]").length){clearInterval(O);
d("siteModuleDatalazyload delay callback! moduleId:: "+S);
T()
}},500);
return
}T()
};
C.extend(N,{siteModuleDatalazyload:function(Q){try{K(Q)
}catch(O){try{console&&console.log&&console.log(O)
}catch(P){}}}});
var A={init:function(){var O=C("div[data-type=outerContainer][data-type-ext=module_outerContainer][moduleid]");
if(!!!O.length){return
}O.each(function(){var P=C(this);
A.load(P)
})
},load:function(P){if(!!!P.length){return
}var S=P.attr("moduleId");
d("siteModuleDatalazyload moduleId::"+S);
var T=C("script[type=text\\/x-delay-script][data-jsLazyload=true][data-moduleId="+S+"]"),R="";
if(!!T.length){R=T.html()
}var U=function(){m(function(){C.globalEval(R)
})
};
var Q=I.datalazyloadDefaultOptions;
if(typeof Q!="undefined"&&(Q.isMobileViewer==="true")){var O=setInterval(function(){if(!!!P.find("div.PDataLazyLoad_Module[data-lazyload-type]").length){clearInterval(O);
d("siteModuleDatalazyload delay callback! moduleId:: "+S);
U()
}},1000);
return
}d("siteModuleDatalazyload callback! moduleId:: "+S);
U()
}};
C.extend(o,{datalazyload:N});
C.extend(o,{loadDelayCss:function(R){var P=R.cdn;
var U=R.delayCss;
var O=C.trim(R.argSuffix);
if(!!!P||typeof P==="undefined"||!!!U||typeof U==="undefined"){return
}U=C.trim(U);
try{U=C.parseJSON(U)
}catch(T){U=""
}if(!!!U||!C.isArray(U)){return
}var Q=R.isMobileHead||false;
var S=R.isBefore;
if(typeof S=="undefined"){S=true
}C.each(U,function(X,V){V=C.trim(V);
var W={};
var Y=preloadCSS.relpreload.supportPreload;
W.isMobileHead=Q;
W.isBefore=S;
W.preload=Y;
W.url=P+"/static"+V+O;
W.callback=function(){};
o.loadCss(W)
})
}});
C.extend(o,{loadDelayJs:function(R){var Q=R.cdn;
var O=R.delayJs;
var P=C.trim(R.argSuffix);
if(!!!Q||typeof Q==="undefined"||!!!O||typeof O==="undefined"){return
}O=C.trim(O);
try{O=C.parseJSON(O)
}catch(S){O=""
}if(!!!O||!C.isArray(O)){return
}var T=[];
C.each(O,function(V,U){U=C.trim(U);
!!U&&T.push(Q+"/static"+U+P)
});
$LAB.setOptions({AlwaysPreserveOrder:true}).script(T)
}});
var F=I.__pDatalazyload__modules__||(I.__pDatalazyload__modules__={});
var i=F.lazyModules||(F.lazyModules={});
var D=["scroll","resize"];
var f=false;
var a="pDataLazyload";
var q=true;
var r=[];
var B=null;
var E=0;
var z=true;
var g=null;
var l=0;
var G=6;
var n=false;
var J=true;
var v=false;
var s={};
C.extend(s,{loadAboveTheFold:function(){if(!!!b.length){return
}s.checkAboveTheFoldIds();
if(!!!b.length){v=false;
return
}var O=!v;
d("bigRenderDatalazyload loadAboveTheFold::"+b);
C.each(b,function(P,Q){m(function(){var R=C("div.PDataLazyLoad_Module[data-lazyload-type][data-settingId="+Q+"]");
s.loadModule(R,true,O)
})
})
},checkAboveTheFoldIds:function(){C.each(b,function(P,Q){var O=C("div.PDataLazyLoad_Module[data-lazyload-type][data-settingId="+Q+"]");
if(!!!O.length){d("bigRenderDatalazyload removeAboveTheFoldId::"+Q);
s.removeAboveTheFoldId(Q);
return true
}})
},removeAboveTheFoldId:function(O){b=C.grep(b,function(P,Q){return !(O==P)
})
},checkAboveTheFoldLod:function(O){if(!!!b.length){s.triggerFirstRender();
O();
return
}l++;
if(l>=G){O();
return
}},triggerFirstRender:function(){if(n){return
}if(!n){n=true
}m(function(){d("bigRenderDatalazyload triggerFirstRender!");
C(document).triggerHandler("dataLazyload-first-render");
C("body").data("data-dataLazyload-first-render","true")
})
}});
C.extend(s,{_loadBelowTheFold:function(){var O=function(){d("clearInterval::__aboveTheFold__timer::"+l+", "+b);
clearInterval(g);
s.loadBelowTheFold()
};
g=setInterval(function(){m(function(){s.checkAboveTheFoldLod(O)
})
},500)
},loadBelowTheFold:function(){m(function(){d("bigRenderDatalazyload loadBelowTheFold! isRenderAboveTheFold::"+v);
s.loadBelowTheFoldModule()
});
m(function(){u.init()
});
m(function(){A.init()
})
}});
C.extend(s,{loadBelowTheFoldModule:function(){C.each(D,function(Q,P){var O=P+"."+a;
C(I).unbind(O).bind(O,s.check)
});
s.triggerLoadBelowTheFold((v?3000:2500))
},triggerLoadBelowTheFold:function(O){if(!J){d("bigRenderDatalazyload triggerLoadBelowTheFold waitting!");
return
}if(typeof O==="undefined"){O=1500
}J=false;
setTimeout(function(){d("bigRenderDatalazyload triggerLoadBelowTheFold!");
J=true;
C(I).trigger("scroll.pDataLazyload")
},O)
},unbind:function(){C.each(D,function(Q,P){var O=P+"."+a;
C(I).unbind(O,s.check);
d("bigRenderDatalazyload checkInviewport unbind!")
})
},check:function(){m(function(){if(!q){return
}q=false;
setTimeout(function(){m(function(){q=true;
s.checkInviewport()
})
},500)
})
},checkInviewport:function(){var O=false;
if(!f){O=true
}f=true;
d("bigRenderDatalazyload checkInviewport!");
var P=C("div.PDataLazyLoad_Module[data-lazyload-type][data-settingId]");
if(!!!P.length){s.unbind();
return
}P.each(function(){var Q=C(this);
m(function(){s.loadModule(Q,false,true)
})
});
if(O){}}});
C.extend(s,{loadModule:function(Q,aa,ac){var ai=Q,S=ai.data("lazyload-uuid"),af=ai.data("settingid");
if(!!c.length&&C.inArray(af,c)>-1){d("bigRenderDatalazyload mobile hide component. "+S+", __pDatalazyload__mobileHeadHideIds::"+c);
ai.remove();
return true
}if(!!ai.data("_bigRender_loading")||!!ai.data("_bigRender_loaded")){d("bigRenderDatalazyload loading or loaded. "+S);
return
}d("bigRenderDatalazyload ["+aa+"] loading. "+S);
var ad=ai.data("lazyload-from"),X=ai.data("uuid");
if(ad!=="textarea"||!!!X){return
}ac=(typeof ac=="undefined")?true:ac;
var T={};
if(ac){var U="5",ae=C.trim(T.js_threshold),Y=C.trim(T.css_threshold),W;
if(!!!Y||Y=="-1"){Y="5"
}if(!!!ae||ae=="-1"){ae="5"
}U=parseInt(ae)<=parseInt(Y)?Y:ae;
var O={threshold:U,container:I};
var R=false;
if(!!ai.parents("#backstage-bodyArea").length&&ai.data("lazyload-force-inviewport")==="true"){R=true;
d("bigRenderDatalazyload fullPage isInviewport. "+S)
}else{if(ai.data("lazyload-alias")=="onlineService"||!!ai.data("direct-render")){R=true;
d("bigRenderDatalazyload directRender isInviewport. "+S)
}else{R=o.isElementInViewport(ai,O)
}}if(!R){d("bigRenderDatalazyload is not inviewport. "+S);
if(aa){d("bigRenderDatalazyload is not inviewport. removeAboveTheFoldId::"+S);
s.removeAboveTheFoldId(af)
}return
}}var ag=ai.find("textarea[data-lazyload-textarea=true][data-settingId="+af+"][data-uuid="+X+"]");
if(!!!ag.length){return
}var P=ai.attr("data-component-type")=="2";
var ab="";
if(P){ab=ai.attr("data-settingId")
}else{var Z=ai.parents("div.outerContainer[data-type=outerContainer][data-mobileBg=true]");
ab=!!Z.length&&Z.attr("id")||"";
Z=null
}var V=function(){if(!!ab&&r.indexOf(ab)==-1){r.push(ab);
C(document).triggerHandler("dataLazyload-check-checkOuterContainer")
}};
var ah=function(aj){d("bigRenderDatalazyload delayCallback removeAboveTheFoldId::"+aj);
s.removeAboveTheFoldId(aj)
};
ai.data("_bigRender_loading",true);
if(ai.data("dynamic-js-lazyload")==true){m(function(){s.insertScript(ai,af,S,ag.text());
m(function(){aa&&ah(af);
V();
C(I).triggerHandler("scroll."+af);
C(I).triggerHandler("fullPageReBuild")
})
});
return
}m(function(){s.insertTxt(ai,af,S,ag.text());
var ak=C("script[type=text\\/x-delay-script][data-jsLazyload=true][data-id="+af+"]");
if(!!ak.length){T.js_depand=ak.attr("data-jsdepand");
T.css_depand=ak.attr("data-cssdepand");
T._func_=ak.html()
}var al=T.css_depand,aj=T.js_depand;
m(function(){s.loadCss(S,al);
var am=typeof T._func_!="undefined"?function(){C.globalEval(T._func_)
}:function(){};
W=function(){m(function(){am();
aa&&ah(af);
V();
C(I).triggerHandler("scroll."+af);
C(I).triggerHandler("fullPageReBuild")
})
};
s.loadJs(S,af,aj,W)
})
})
}});
C.extend(s,{loadCss:function(O,Q){Q=C.trim(Q);
try{Q=C.parseJSON(Q)
}catch(P){Q=""
}if(!!!Q||!C.isArray(Q)){return
}d(O+", css_depand::"+Q);
C.each(Q,function(T,R){var S={};
var U=preloadCSS.relpreload.supportPreload;
S.preload=U;
S.url=R;
S.callback=function(){};
o.loadCss(S)
})
},loadJs:function(P,S,O,T){O=C.trim(O);
try{O=C.parseJSON(O)
}catch(R){O=""
}if(!!!O||!C.isArray(O)){d("js_depand empty callback "+P);
T();
return
}d(P+", js_depand::"+O);
var Q={AlwaysPreserveOrder:true};
$LAB.setOptions(Q).script(O).wait(function(){d("callback "+P);
T()
})
}});
C.extend(s,{insertTxt:function(P,S,O,R){P.data("_bigRender_loaded",true);
var Q=h.decodeHTML(R);
P.replaceWith(Q);
d("bigRenderDatalazyload insertTxt! "+O);
P.removeClass("dataLazyloadLoding");
setTimeout(function(){s.triggerEvent(S)
},500)
},insertScript:function(P,S,O,R){P.data("_bigRender_loaded",true);
var Q=h.decodeHTML(R);
P.replaceWith(Q);
d("bigRenderDatalazyload insertScript! "+O);
P.removeClass("dataLazyloadLoding");
setTimeout(function(){s.triggerEvent(S)
},500)
},triggerEvent:function(O){C(document).triggerHandler("dataLazyload-"+O);
d("bigRenderDatalazyload triggerEvent! "+O)
}});
C.extend(s,{monitorOuterContainerBg:function(){C(document).on("dataLazyload-check-checkOuterContainer",function(){if(!!!B){B=setInterval(function(){m(function(){s.startCheckOuterContainer()
})
},1000)
}})
},startCheckOuterContainer:function(){E++;
if(E>=3){s.stopCheckOuterContainer();
return
}if(!z){return
}z=false;
if(!!r&&r.length==0){z=true;
return
}var Q={threshold:"0",container:I};
d("__outerContainer__::"+r);
for(var P=r.length;
P>=0;
P--){var T=r[P];
if(!!!T){continue
}var S=false;
var O=C("div#"+T+"[data-mobileBg=true]");
if(!!!O.length){O=C("div[data-type=siteblocks][data-mobileBg=true][data-settingId="+T+"]");
S=true
}if(!!!O.length){delete r[P];
continue
}var R=false;
if(!!O.parents("#backstage-bodyArea").length&&O.data("lazyload-force-inviewport")==="true"){R=true
}else{R=o.inviewport(O,Q)
}if(R){O.removeAttr("data-mobileBg");
if(!S){O.find(">div.container[data-type='container']").removeAttr("data-mobileBg");
O.find('div[class^="col-"][data-type="columns"]').removeAttr("data-mobileBg")
}delete r[P]
}}z=true
},stopCheckOuterContainer:function(){d("stopCheckOuterContainer");
clearInterval(B);
B=null;
E=0;
C('div[data-type=outerContainer][data-mobileBg="true"]').removeAttr("data-mobileBg");
C('div[data-type=outerContainer][data-mobileBg="true"]>div.container[data-type="container"]').removeAttr("data-mobileBg");
C('div[data-type=outerContainer][data-mobileBg="true"] div[class^="col-"][data-type="columns"]').removeAttr("data-mobileBg")
}});
C.extend(s,{beforeLoad:function(){s.getDelayIds();
s.reGetDelayIds();
s.getMobileHideIds();
s.monitorOuterContainerBg()
},getDelayIds:function(){var Q=C("script[type=text\\/x-delay-ids][data-type=delayIds][data-device=mobile]");
if(!!!Q.length){return
}var P=Q.attr("data-delayIds");
try{P=C.parseJSON(P)
}catch(O){P=""
}if(!!!P||!C.isArray(P)){return
}b=P;
v=true
},reGetDelayIds:function(){if(!!b.length){return
}s.analysisComponents("backstage-headArea");
s.analysisComponents("backstage-bodyArea");
s.analysisComponents("backstage-footArea");
d("bigRenderDatalazyload loadAboveTheFold::reGetDelayIds::"+b)
},analysisComponents:function(R){var O=4;
if(b.length>=O){return
}var Q=C("#"+R);
if(!!!Q.length){return
}var P=Q.find(">div[data-type=outerContainer], > div[data-type=siteblocks]");
if(!!!P.length){return
}P.each(function(){if(b.length>=O){return false
}var V=C(this);
var S=V.attr("data-type");
if(S=="outerContainer"){var U=V.find("div.PDataLazyLoad_Module[data-lazyload-type][data-settingId]");
U.each(function(){if(b.length>=O){return false
}var W=C(this).data("settingid");
!!W&&b.push(W)
})
}else{if(S=="siteblocks"){var T=V.data("settingid");
!!T&&b.push(T)
}}})
}});
C.extend(s,{getMobileHideIds:function(){var Q=C("script[type=text\\/x-mobile-hidden-ids][data-ids]");
if(!!!Q.length){return
}var O=Q.data("ids");
try{O=C.parseJSON(O)
}catch(P){O=""
}if(!!!O||!C.isArray(O)){return
}c=O
}});
function t(){var O=C("script[type=text\\/x-async-script][data-type=x-async]");
if(!!!O.length){return
}O.each(function(){var Q=C(this);
var S=Q.data("until")||"onload";
var R=Q.data("time")||0;
var P=function(){d("delayAsyncScript::"+S+"::"+R);
C.globalEval(Q.html())
};
if(S=="ready"){m(function(){setTimeout(P,R)
});
return
}onloadHack(function(){m(function(){setTimeout(P,R)
})
})
})
}C(function(){var O=I.datalazyloadDefaultOptions;
if(typeof O!="undefined"&&(O.isMobileViewer==="true")){s.beforeLoad();
s.loadAboveTheFold();
s._loadBelowTheFold()
}t()
})
})(jQuery,window,document)
};