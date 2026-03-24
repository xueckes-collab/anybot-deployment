/*!
 * Viewer.js v1.10.0
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2021-06-12T07:57:10.970Z
 */
;
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):(a="undefined"!=typeof globalThis?globalThis:a||self).Viewer=b()
}(this,function(){function aJ(c,b){var a,d=Object.keys(c);
return Object.getOwnPropertySymbols&&(a=Object.getOwnPropertySymbols(c),b&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(c,e).enumerable
})),d.push.apply(d,a)),d
}function aC(c){for(var a=1;
a<arguments.length;
a++){var b=null!=arguments[a]?arguments[a]:{};
a%2?aJ(Object(b),!0).forEach(function(f){var g,d;
g=c,f=b[d=f],d in g?Object.defineProperty(g,d,{value:f,enumerable:!0,configurable:!0,writable:!0}):g[d]=f
}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(b)):aJ(Object(b)).forEach(function(d){Object.defineProperty(c,d,Object.getOwnPropertyDescriptor(b,d))
})
}return c
}function aF(a){return(aF="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(b){return typeof b
}:function(b){return b&&"function"==typeof Symbol&&b.constructor===Symbol&&b!==Symbol.prototype?"symbol":typeof b
})(a)
}function az(b,c){for(var a=0;
a<c.length;
a++){var d=c[a];
d.enumerable=d.enumerable||!1,d.configurable=!0,"value" in d&&(d.writable=!0),Object.defineProperty(b,d.key,d)
}}var au={backdrop:!0,button:!0,navbar:!0,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,inheritedAttributes:["crossOrigin","decoding","isMap","loading","referrerPolicy","sizes","srcset","useMap"],initialViewIndex:0,inline:!1,interval:5000,keyboard:!0,focus:!0,loading:!0,loop:!0,minWidth:200,minHeight:100,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,slideOnTouch:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:0.1,minZoomRatio:0.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,move:null,moved:null,rotate:null,rotated:null,scale:null,scaled:null,zoom:null,zoomed:null,play:null,stop:null},ar="undefined"!=typeof window&&void 0!==window.document,aA=ar?window:{},aO=!(!ar||!aA.document.documentElement)&&"ontouchstart" in aA.document.documentElement,av=ar&&"PointerEvent" in aA,aH="viewer",aL="move",aq="switch",aK="zoom",aB="".concat(aH,"-active"),aI="".concat(aH,"-close"),ap="".concat(aH,"-fade"),ay="".concat(aH,"-fixed"),aN="".concat(aH,"-fullscreen"),aG="".concat(aH,"-fullscreen-exit"),an="".concat(aH,"-hide"),al="".concat(aH,"-hide-md-down"),am="".concat(aH,"-hide-sm-down"),aD="".concat(aH,"-hide-xs-down"),ak="".concat(aH,"-in"),bj="".concat(aH,"-invisible"),a0="".concat(aH,"-loading"),bi="".concat(aH,"-move"),bn="".concat(aH,"-open"),be="".concat(aH,"-show"),a2="".concat(aH,"-transition"),a7="click",bk="dblclick",a4="dragstart",bb="focusin",bh="keydown",a9="load",aT=av?"pointerdown":aO?"touchstart":"mousedown",aV=av?"pointermove":aO?"touchmove":"mousemove",ba=av?"pointerup pointercancel":aO?"touchend touchcancel":"mouseup",ax="resize",a6="transitionend",aX="wheel",aE="ready",bf="show",bm="shown",aY="viewed",aZ="rotated",bc="".concat(aH,"Action"),aS=/\s\s*/,bu=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];
function aP(a){return"string"==typeof a
}var bg=Number.isNaN||aA.isNaN;
function bd(a){return"number"==typeof a&&!bg(a)
}function a5(a){return void 0===a
}function a1(a){return"object"===aF(a)&&null!==a
}var bB=Object.prototype.hasOwnProperty;
function ai(b){if(!a1(b)){return !1
}try{var c=b.constructor,a=c.prototype;
return c&&a&&bB.call(a,"isPrototypeOf")
}catch(b){return !1
}}function aU(a){return"function"==typeof a
}function ao(c,b){if(c&&aU(b)){if(Array.isArray(c)||bd(c.length)){for(var a=c.length,d=0;
d<a&&!1!==b.call(c,c[d],d,c);
d+=1){}}else{a1(c)&&Object.keys(c).forEach(function(e){b.call(c,c[e],e,c)
})
}}return c
}var bq=Object.assign||function(b){for(var a=arguments.length,c=new Array(1<a?a-1:0),d=1;
d<a;
d++){c[d-1]=arguments[d]
}return a1(b)&&0<c.length&&c.forEach(function(f){a1(f)&&Object.keys(f).forEach(function(e){b[e]=f[e]
})
}),b
},bl=/^(?:width|height|left|top|marginLeft|marginTop)$/;
function by(b,c){var a=b.style;
ao(c,function(d,f){bl.test(f)&&bd(d)&&(d+="px"),a[f]=d
})
}function aQ(a,b){return a&&b&&(a.classList?a.classList.contains(b):-1<a.className.indexOf(b))
}function bx(b,c){var a;
b&&c&&(bd(b.length)?ao(b,function(d){bx(d,c)
}):b.classList?b.classList.add(c):(a=b.className.trim())?a.indexOf(c)<0&&(b.className="".concat(a," ").concat(c)):b.className=c)
}function ah(a,b){a&&b&&(bd(a.length)?ao(a,function(c){ah(c,b)
}):a.classList?a.classList.remove(b):0<=a.className.indexOf(b)&&(a.className=a.className.replace(b,"")))
}function aw(b,c,a){c&&(bd(b.length)?ao(b,function(d){aw(d,c,a)
}):(a?bx:ah)(b,c))
}var ad=/([a-z\d])([A-Z])/g;
function bp(a){return a.replace(ad,"$1-$2").toLowerCase()
}function bo(a,b){return a1(a[b])?a[b]:a.dataset?a.dataset[b]:a.getAttribute("data-".concat(bp(b)))
}function bv(b,c,a){a1(a)?b[c]=a:b.dataset?b.dataset[c]=a:b.setAttribute("data-".concat(bp(c)),a)
}var ag,af,aM=(af=!1,ar&&(ag=!1,bA=function(){},a3=Object.defineProperty({},"once",{get:function(){return af=!0,ag
},set:function(a){ag=a
}}),aA.addEventListener("test",bA,a3),aA.removeEventListener("test",bA,a3)),af);
function ab(b,a,g,d){var f=3<arguments.length&&void 0!==d?d:{},c=g;
a.trim().split(aS).forEach(function(h){var i;
aM||(i=b.listeners)&&i[h]&&i[h][g]&&(c=i[h][g],delete i[h][g],0===Object.keys(i[h]).length&&delete i[h],0===Object.keys(i).length&&delete b.listeners),b.removeEventListener(h,c,f)
})
}function br(f,c,b,i){var g=3<arguments.length&&void 0!==i?i:{},d=b;
c.trim().split(aS).forEach(function(h){var a,e;
g.once&&!aM&&(a=f.listeners,d=function(){delete e[h][b],f.removeEventListener(h,d,g);
for(var k=arguments.length,l=new Array(k),j=0;
j<k;
j++){l[j]=arguments[j]
}b.apply(f,l)
},(e=void 0===a?{}:a)[h]||(e[h]={}),e[h][b]&&f.removeEventListener(h,e[h][b],g),e[h][b]=d,f.listeners=e),f.addEventListener(h,d,g)
})
}function bz(b,c,a,f){var d;
return aU(Event)&&aU(CustomEvent)?d=new CustomEvent(c,aC({bubbles:!0,cancelable:!0,detail:a},f)):(d=document.createEvent("CustomEvent")).initCustomEvent(c,!0,!0,a),b.dispatchEvent(d)
}function aa(b){var d=b.rotate,a=b.scaleX,g=b.scaleY,f=b.translateX,c=b.translateY,b=[];
bd(f)&&0!==f&&b.push("translateX(".concat(f,"px)")),bd(c)&&0!==c&&b.push("translateY(".concat(c,"px)")),bd(d)&&0!==d&&b.push("rotate(".concat(d,"deg)")),bd(a)&&1!==a&&b.push("scaleX(".concat(a,")")),bd(g)&&1!==g&&b.push("scaleY(".concat(g,")"));
b=b.length?b.join(" "):"none";
return{WebkitTransform:b,msTransform:b,transform:b}
}var a8=aA.navigator&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(aA.navigator.userAgent);
function aj(b,a,c){var f=document.createElement("img");
if(b.naturalWidth&&!a8){return c(b.naturalWidth,b.naturalHeight),f
}var d=document.body||document.documentElement;
return f.onload=function(){c(f.width,f.height),a8||d.removeChild(f)
},ao(a.inheritedAttributes,function(g){var h=b.getAttribute(g);
null!==h&&f.setAttribute(g,h)
}),f.src=b.src,a8||(f.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",d.appendChild(f)),f
}function bs(a){switch(a){case 2:return aD;
case 3:return am;
case 4:return al;
default:return""
}}function ae(b,c){var a=b.pageX,d=b.pageY,b={endX:a,endY:d};
return c?b:aC({timeStamp:Date.now(),startX:a,startY:d},b)
}var bw,aW={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()
},initBody:function(){var a=this.element.ownerDocument,b=a.body||a.documentElement;
this.body=b,this.scrollbarWidth=window.innerWidth-a.documentElement.clientWidth,this.initialBodyPaddingRight=b.style.paddingRight,this.initialBodyComputedPaddingRight=window.getComputedStyle(b).paddingRight
},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}
},initViewer:function(){var b,c=this.options,a=this.parent;
c.inline&&(b={width:Math.max(a.offsetWidth,c.minWidth),height:Math.max(a.offsetHeight,c.minHeight)},this.parentData=b),!this.fulled&&b||(b=this.containerData),this.viewerData=bq({},b)
},renderViewer:function(){this.options.inline&&!this.fulled&&by(this.viewer,this.viewerData)
},initList:function(){var e=this,b=this.element,d=this.options,a=this.list,f=[];
a.innerHTML="",ao(this.images,function(h,g){var k,m,l=h.src,j=h.alt||(aP(k=l)?decodeURIComponent(k.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""),c=e.getImageURL(h);
(l||c)&&(k=document.createElement("li"),m=document.createElement("img"),ao(d.inheritedAttributes,function(i){var n=h.getAttribute(i);
null!==n&&m.setAttribute(i,n)
}),m.src=l||c,m.alt=j,m.setAttribute("data-original-url",c||l),k.setAttribute("data-index",g),k.setAttribute("data-viewer-action","view"),k.setAttribute("role","button"),d.keyboard&&k.setAttribute("tabindex",0),k.appendChild(m),a.appendChild(k),f.push(k))
}),ao(this.items=f,function(g){var c=g.firstElementChild;
bv(c,"filled",!0),d.loading&&bx(g,a0),br(c,a9,function(h){d.loading&&ah(g,a0),e.loadImage(h)
},{once:!0})
}),d.transition&&br(b,aY,function(){bx(a,a2)
},{once:!0})
},renderList:function(b){var c=b||this.index,a=this.items[c].offsetWidth||30,b=a+1;
by(this.list,bq({width:b*this.length},aa({translateX:(this.viewerData.width-a)/2-b*c})))
},resetList:function(){var a=this.list;
a.innerHTML="",ah(a,a2),by(a,aa({translateX:0}))
},initImage:function(a){var q,j=this,f=this.options,k=this.image,g=this.viewerData,b=this.footer.offsetHeight,o=g.width,p=Math.max(g.height-b,b),m=this.imageData||{};
this.imageInitializing={abort:function(){q.onload=null
}},q=aj(k,f,function(h,r){var d=h/r,v=o,u=p;
j.imageInitializing=!1,o<p*d?u=o/d:v=p*d;
var v=Math.min(0.9*v,h),u=Math.min(0.9*u,r),l=(o-v)/2,c=(p-u)/2,h={left:l,top:c,x:l,y:c,width:v,height:u,oldRatio:1,ratio:v/h,aspectRatio:d,naturalWidth:h,naturalHeight:r},r=bq({},h);
f.rotatable&&(h.rotate=m.rotate||0,r.rotate=0),f.scalable&&(h.scaleX=m.scaleX||1,h.scaleY=m.scaleY||1,r.scaleX=1,r.scaleY=1),j.imageData=h,j.initialImageData=r,a&&a()
})
},renderImage:function(b){var c,a=this,f=this.image,d=this.imageData;
by(f,bq({width:d.width,height:d.height,marginLeft:d.x,marginTop:d.y},aa(d))),b&&((this.viewing||this.moving||this.rotating||this.scaling||this.zooming)&&this.options.transition&&aQ(f,a2)?(c=function(){a.imageRendering=!1,b()
},this.imageRendering={abort:function(){ab(f,a6,c)
}},br(f,a6,c,{once:!0})):b())
},resetImage:function(){var a;
(this.viewing||this.viewed)&&(a=this.image,this.viewing&&this.viewing.abort(),a.parentNode.removeChild(a),this.image=null)
}},av={bind:function(){var b=this.options,c=this.viewer,a=this.canvas,d=this.element.ownerDocument;
br(c,a7,this.onClick=this.click.bind(this)),br(c,a4,this.onDragStart=this.dragstart.bind(this)),br(a,aT,this.onPointerDown=this.pointerdown.bind(this)),br(d,aV,this.onPointerMove=this.pointermove.bind(this)),br(d,ba,this.onPointerUp=this.pointerup.bind(this)),br(d,bh,this.onKeyDown=this.keydown.bind(this)),br(window,ax,this.onResize=this.resize.bind(this)),b.zoomable&&b.zoomOnWheel&&br(c,aX,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),b.toggleOnDblclick&&br(a,bk,this.onDblclick=this.dblclick.bind(this))
},unbind:function(){var b=this.options,c=this.viewer,a=this.canvas,d=this.element.ownerDocument;
ab(c,a7,this.onClick),ab(c,a4,this.onDragStart),ab(a,aT,this.onPointerDown),ab(d,aV,this.onPointerMove),ab(d,ba,this.onPointerUp),ab(d,bh,this.onKeyDown),ab(window,ax,this.onResize),b.zoomable&&b.zoomOnWheel&&ab(c,aX,this.onWheel,{passive:!1,capture:!0}),b.toggleOnDblclick&&ab(a,bk,this.onDblclick)
}},ar={click:function(b){var c=this.options,a=this.imageData,f=b.target,d=bo(f,bc);
switch(d||"img"!==f.localName||"li"!==f.parentElement.localName||(d=bo(f=f.parentElement,bc)),aO&&b.isTrusted&&f===this.canvas&&clearTimeout(this.clickCanvasTimeout),d){case"mix":this.played?this.stop():c.inline?this.fulled?this.exit():this.full():this.hide();
break;
case"hide":this.hide();
break;
case"view":this.view(bo(f,"index"));
break;
case"zoom-in":this.zoom(0.1,!0);
break;
case"zoom-out":this.zoom(-0.1,!0);
break;
case"one-to-one":this.toggle();
break;
case"reset":this.reset();
break;
case"prev":this.prev(c.loop);
break;
case"play":this.play(c.fullscreen);
break;
case"next":this.next(c.loop);
break;
case"rotate-left":this.rotate(-90);
break;
case"rotate-right":this.rotate(90);
break;
case"flip-horizontal":this.scaleX(-a.scaleX||-1);
break;
case"flip-vertical":this.scaleY(-a.scaleY||-1);
break;
default:this.played&&this.stop()
}},dblclick:function(a){a.preventDefault(),this.viewed&&a.target===this.image&&(aO&&a.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.toggle(a))
},load:function(){var b=this;
this.timeout&&(clearTimeout(this.timeout),this.timeout=!1);
var d=this.element,a=this.options,g=this.image,f=this.index,c=this.viewerData;
ah(g,bj),a.loading&&ah(this.canvas,a0),g.style.cssText="height:0;"+"margin-left:".concat(c.width/2,"px;")+"margin-top:".concat(c.height/2,"px;")+"max-width:none!important;position:absolute;width:0;",this.initImage(function(){aw(g,bi,a.movable),aw(g,a2,a.transition),b.renderImage(function(){b.viewed=!0,b.viewing=!1,aU(a.viewed)&&br(d,aY,a.viewed,{once:!0}),bz(d,aY,{originalImage:b.images[f],index:f,image:g},{cancelable:!1})
})
})
},loadImage:function(c){var f=c.target,c=f.parentNode,e=c.offsetWidth||30,d=c.offsetHeight||50,b=!!bo(f,"filled");
aj(f,this.options,function(g,h){var a=g/h,g=e,h=d;
e<d*a?b?g=d*a:h=e/a:b?h=e/a:g=d*a,by(f,bq({width:g,height:h},aa({translateX:(e-g)/2,translateY:(d-h)/2})))
})
},keydown:function(b){var c=this.options;
if(c.keyboard){var a=b.keyCode||b.which||b.charCode;
if(13===a&&this.viewer.contains(b.target)&&this.click(b),this.fulled){switch(a){case 27:this.played?this.stop():c.inline?this.fulled&&this.exit():this.hide();
break;
case 32:this.played&&this.stop();
break;
case 37:this.prev(c.loop);
break;
case 38:b.preventDefault(),this.zoom(c.zoomRatio,!0);
break;
case 39:this.next(c.loop);
break;
case 40:b.preventDefault(),this.zoom(-c.zoomRatio,!0);
break;
case 48:case 49:b.ctrlKey&&(b.preventDefault(),this.toggle())
}}}},dragstart:function(a){"img"===a.target.localName&&a.preventDefault()
},pointerdown:function(b){var c=this.options,a=this.pointers,f=b.buttons,d=b.button;
!this.viewed||this.showing||this.viewing||this.hiding||("mousedown"===b.type||"pointerdown"===b.type&&"mouse"===b.pointerType)&&(bd(f)&&1!==f||bd(d)&&0!==d||b.ctrlKey)||(b.preventDefault(),b.changedTouches?ao(b.changedTouches,function(e){a[e.identifier]=ae(e)
}):a[b.pointerId||0]=ae(b),d=!!c.movable&&aL,c.zoomOnTouch&&c.zoomable&&1<Object.keys(a).length?d=aK:c.slideOnTouch&&("touch"===b.pointerType||"touchstart"===b.type)&&this.isSwitchable()&&(d=aq),!c.transition||d!==aL&&d!==aK||ah(this.image,a2),this.action=d)
},pointermove:function(b){var c=this.pointers,a=this.action;
this.viewed&&a&&(b.preventDefault(),b.changedTouches?ao(b.changedTouches,function(d){bq(c[d.identifier]||{},ae(d,!0))
}):bq(c[b.pointerId||0]||{},ae(b,!0)),this.change(b))
},pointerup:function(b){var d,a=this,g=this.options,f=this.action,c=this.pointers;
b.changedTouches?ao(b.changedTouches,function(e){d=c[e.identifier],delete c[e.identifier]
}):(d=c[b.pointerId||0],delete c[b.pointerId||0]),f&&(b.preventDefault(),!g.transition||f!==aL&&f!==aK||bx(this.image,a2),this.action=!1,aO&&f!==aK&&d&&Date.now()-d.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),g.toggleOnDblclick&&this.viewed&&b.target===this.image?this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout(function(){bz(a.image,bk)
},50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout(function(){a.imageClicked=!1
},500)):(this.imageClicked=!1,g.backdrop&&"static"!==g.backdrop&&b.target===this.canvas&&(this.clickCanvasTimeout=setTimeout(function(){bz(a.canvas,a7)
},50)))))
},resize:function(){var a=this;
this.isShown&&!this.hiding&&(this.fulled&&(this.close(),this.initBody(),this.open()),this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){a.renderImage()
}),this.played&&(!this.options.fullscreen||!this.fulled||document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?ao(this.player.getElementsByTagName("img"),function(b){br(b,a9,a.loadImage.bind(a),{once:!0}),bz(b,a9)
}):this.stop()))
},wheel:function(b){var c,a,d=this;
this.viewed&&(b.preventDefault(),this.wheeling||(this.wheeling=!0,setTimeout(function(){d.wheeling=!1
},50),c=Number(this.options.zoomRatio)||0.1,a=1,b.deltaY?a=0<b.deltaY?1:-1:b.wheelDelta?a=-b.wheelDelta/120:b.detail&&(a=0<b.detail?1:-1),this.zoom(-a*c,!0,b)))
}},bA={show:function(){var b=0<arguments.length&&void 0!==arguments[0]&&arguments[0],c=this.element,a=this.options;
if(a.inline||this.showing||this.isShown||this.showing){return this
}if(!this.ready){return this.build(),this.ready&&this.show(b),this
}if(aU(a.show)&&br(c,bf,a.show,{once:!0}),!1===bz(c,bf)||!this.ready){return this
}this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();
var f,d=this.viewer;
return ah(d,an),d.setAttribute("role","dialog"),d.setAttribute("aria-labelledby",this.title.id),d.setAttribute("aria-modal",!0),d.removeAttribute("aria-hidden"),a.transition&&!b?(f=this.shown.bind(this),this.transitioning={abort:function(){ab(d,a6,f),ah(d,ak)
}},bx(d,a2),d.initialOffsetWidth=d.offsetWidth,br(d,a6,f,{once:!0}),bx(d,ak)):(bx(d,ak),this.shown()),this
},hide:function(){var f=this,l=0<arguments.length&&void 0!==arguments[0]&&arguments[0],j=this.element,d=this.options;
if(d.inline||this.hiding||!this.isShown&&!this.showing){return this
}if(aU(d.hide)&&br(j,"hide",d.hide,{once:!0}),!1===bz(j,"hide")){return this
}this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();
function c(){ah(b,ak),f.hidden()
}var m,k,b=this.viewer,g=this.image;
return d.transition&&!l?(m=function l(a){a&&a.target===b&&(ab(b,a6,l),f.hidden())
},k=function(){aQ(b,a2)?(br(b,a6,m),ah(b,ak)):c()
},this.transitioning={abort:function(){f.viewed&&aQ(g,a2)?ab(g,a6,k):aQ(b,a2)&&ab(b,a6,m)
}},this.viewed&&aQ(g,a2)?(br(g,a6,k,{once:!0}),this.zoomTo(0,!1,null,!0)):k()):c(),this
},view:function(){var k=this,y=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this.options.initialViewIndex,y=Number(y)||0;
if(this.hiding||this.played||y<0||y>=this.length||this.viewed&&y===this.index){return this
}if(!this.isShown){return this.index=y,this.show()
}this.viewing&&this.viewing.abort();
var p=this.element,g=this.options,f=this.title,z=this.canvas,w=this.items[y],b=w.querySelector("img"),m=bo(b,"originalUrl"),j=b.getAttribute("alt"),v=document.createElement("img");
if(ao(g.inheritedAttributes,function(a){var c=b.getAttribute(a);
null!==c&&v.setAttribute(a,c)
}),v.src=m,v.alt=j,aU(g.view)&&br(p,"view",g.view,{once:!0}),!1===bz(p,"view",{originalImage:this.images[y],index:y,image:v})||!this.isShown||this.hiding||this.played){return this
}m=this.items[this.index];
ah(m,aB),m.removeAttribute("aria-selected"),bx(w,aB),w.setAttribute("aria-selected",!0),g.focus&&w.focus(),this.image=v,this.viewed=!1,this.index=y,this.imageData={},bx(v,bj),g.loading&&bx(z,a0),z.innerHTML="",z.appendChild(v),this.renderList(),f.innerHTML="";
function x(){var a=k.imageData,c=Array.isArray(g.title)?g.title[1]:g.title;
f.innerHTML=aP(a=aU(c)?c.call(k,v,a):"".concat(j," (").concat(a.naturalWidth," × ").concat(a.naturalHeight,")"))?a.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):a
}var q;
return br(p,aY,x,{once:!0}),this.viewing={abort:function(){ab(p,aY,x),v.complete?k.imageRendering?k.imageRendering.abort():k.imageInitializing&&k.imageInitializing.abort():(v.src="",ab(v,a9,q),k.timeout&&clearTimeout(k.timeout))
}},v.complete?this.load():(br(v,a9,q=this.load.bind(this),{once:!0}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){ah(v,bj),k.timeout=!1
},1000)),this
},prev:function(){var a=this.index-1;
return a<0&&(a=0<arguments.length&&void 0!==arguments[0]&&arguments[0]?this.length-1:0),this.view(a),this
},next:function(){var a=this.length-1,b=this.index+1;
return this.view(b=a<b?0<arguments.length&&void 0!==arguments[0]&&arguments[0]?0:a:b),this
},move:function(b){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:b,a=this.imageData;
return this.moveTo(a5(b)?b:a.x+Number(b),a5(c)?c:a.y+Number(c)),this
},moveTo:function(p){var k=this,g=1<arguments.length&&void 0!==arguments[1]?arguments[1]:p,d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,c=this.element,q=this.options,m=this.imageData;
if(p=Number(p),g=Number(g),this.viewed&&!this.played&&q.movable){var b=m.x,j=m.y,f=!1;
if(bd(p)?f=!0:p=b,bd(g)?f=!0:g=j,f){if(aU(q.move)&&br(c,"move",q.move,{once:!0}),!1===bz(c,"move",{x:p,y:g,oldX:b,oldY:j,originalEvent:d})){return this
}m.x=p,m.y=g,m.left=p,m.top=g,this.moving=!0,this.renderImage(function(){k.moving=!1,aU(q.moved)&&br(c,"moved",q.moved,{once:!0}),bz(c,"moved",{x:p,y:g,oldX:b,oldY:j,originalEvent:d},{cancelable:!1})
})
}}return this
},rotate:function(a){return this.rotateTo((this.imageData.rotate||0)+Number(a)),this
},rotateTo:function(b){var d=this,a=this.element,g=this.options,f=this.imageData;
if(bd(b=Number(b))&&this.viewed&&!this.played&&g.rotatable){var c=f.rotate;
if(aU(g.rotate)&&br(a,"rotate",g.rotate,{once:!0}),!1===bz(a,"rotate",{degree:b,oldDegree:c})){return this
}f.rotate=b,this.rotating=!0,this.renderImage(function(){d.rotating=!1,aU(g.rotated)&&br(a,aZ,g.rotated,{once:!0}),bz(a,aZ,{degree:b,oldDegree:c},{cancelable:!1})
})
}return this
},scaleX:function(a){return this.scale(a,this.imageData.scaleY),this
},scaleY:function(a){return this.scale(this.imageData.scaleX,a),this
},scale:function(l){var j=this,f=1<arguments.length&&void 0!==arguments[1]?arguments[1]:l,d=this.element,c=this.options,m=this.imageData;
if(l=Number(l),f=Number(f),this.viewed&&!this.played&&c.scalable){var k=m.scaleX,b=m.scaleY,g=!1;
if(bd(l)?g=!0:l=k,bd(f)?g=!0:f=b,g){if(aU(c.scale)&&br(d,"scale",c.scale,{once:!0}),!1===bz(d,"scale",{scaleX:l,scaleY:f,oldScaleX:k,oldScaleY:b})){return this
}m.scaleX=l,m.scaleY=f,this.scaling=!0,this.renderImage(function(){j.scaling=!1,aU(c.scaled)&&br(d,"scaled",c.scaled,{once:!0}),bz(d,"scaled",{scaleX:l,scaleY:f,oldScaleX:k,oldScaleY:b},{cancelable:!1})
})
}}return this
},zoom:function(b){var c=1<arguments.length&&void 0!==arguments[1]&&arguments[1],a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,d=this.imageData;
return b=Number(b),this.zoomTo(d.width*(b=b<0?1/(1-b):1+b)/d.naturalWidth,c,a),this
},zoomTo:function(z){var H,E,D,L=this,A=1<arguments.length&&void 0!==arguments[1]&&arguments[1],P=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,B=3<arguments.length&&void 0!==arguments[3]&&arguments[3],I=this.element,G=this.options,N=this.pointers,x=this.imageData,M=x.x,F=x.y,J=x.width,K=x.height,q=x.naturalWidth,C=x.naturalHeight;
if(bd(z=Math.max(0,z))&&this.viewed&&!this.played&&(B||G.zoomable)){B||(O=Math.max(0.01,G.minZoomRatio),k=Math.min(100,G.maxZoomRatio),z=Math.min(Math.max(z,O),k));
var B=q*(z=P&&0.055<=G.zoomRatio&&0.95<z&&z<1.05?1:z),O=C*z,k=B-J,q=O-K,j=x.ratio;
if(aU(G.zoom)&&br(I,"zoom",G.zoom,{once:!0}),!1===bz(I,"zoom",{ratio:z,oldRatio:j,originalEvent:P})){return this
}this.zooming=!0,P?(C={left:(C=(C=this.viewer).getBoundingClientRect()).left+(window.pageXOffset-document.documentElement.clientLeft),top:C.top+(window.pageYOffset-document.documentElement.clientTop)},N=N&&Object.keys(N).length?(D=E=H=0,ao(N,function(a){var b=a.startX,a=a.startY;
H+=b,E+=a,D+=1
}),{pageX:H/=D,pageY:E/=D}):{pageX:P.pageX,pageY:P.pageY},x.x-=(N.pageX-C.left-M)/J*k,x.y-=(N.pageY-C.top-F)/K*q):(x.x-=k/2,x.y-=q/2),x.left=x.x,x.top=x.y,x.width=B,x.height=O,x.oldRatio=j,x.ratio=z,this.renderImage(function(){L.zooming=!1,aU(G.zoomed)&&br(I,"zoomed",G.zoomed,{once:!0}),bz(I,"zoomed",{ratio:z,oldRatio:j,originalEvent:P},{cancelable:!1})
}),A&&this.tooltip()
}return this
},play:function(){var j=this,m=0<arguments.length&&void 0!==arguments[0]&&arguments[0];
if(!this.isShown||this.played){return this
}var f=this.element,c=this.options;
if(aU(c.play)&&br(f,"play",c.play,{once:!0}),!1===bz(f,"play")){return this
}var n=this.player,k=this.loadImage.bind(this),b=[],g=0,d=0;
return this.played=!0,this.onLoadWhenPlay=k,m&&this.requestFullscreen(m),bx(n,be),ao(this.items,function(h,l){var a=h.querySelector("img"),o=document.createElement("img");
o.src=bo(a,"originalUrl"),o.alt=a.getAttribute("alt"),o.referrerPolicy=a.referrerPolicy,g+=1,bx(o,ap),aw(o,a2,c.transition),aQ(h,aB)&&(bx(o,ak),d=l),b.push(o),br(o,a9,k,{once:!0}),n.appendChild(o)
}),bd(c.interval)&&0<c.interval&&1<g&&function m(){j.playing=setTimeout(function(){ah(b[d],ak),bx(b[d=(d+=1)<g?d:0],ak),m()
},c.interval)
}(),this
},stop:function(){var c=this;
if(!this.played){return this
}var b=this.element,a=this.options;
if(aU(a.stop)&&br(b,"stop",a.stop,{once:!0}),!1===bz(b,"stop")){return this
}b=this.player;
return this.played=!1,clearTimeout(this.playing),ao(b.getElementsByTagName("img"),function(d){ab(d,a9,c.onLoadWhenPlay)
}),ah(b,be),b.innerHTML="",this.exitFullscreen(),this
},full:function(){var b=this,c=this.options,a=this.viewer,f=this.image,d=this.list;
return !this.isShown||this.played||this.fulled||!c.inline||(this.fulled=!0,this.open(),bx(this.button,aG),c.transition&&(ah(d,a2),this.viewed&&ah(f,a2)),bx(a,ay),a.setAttribute("role","dialog"),a.setAttribute("aria-labelledby",this.title.id),a.setAttribute("aria-modal",!0),a.removeAttribute("style"),by(a,{zIndex:c.zIndex}),c.focus&&this.enforceFocus(),this.initContainer(),this.viewerData=bq({},this.containerData),this.renderList(),this.viewed&&this.initImage(function(){b.renderImage(function(){c.transition&&setTimeout(function(){bx(f,a2),bx(d,a2)
},0)
})
})),this
},exit:function(){var b=this,c=this.options,a=this.viewer,f=this.image,d=this.list;
return this.isShown&&!this.played&&this.fulled&&c.inline&&(this.fulled=!1,this.close(),ah(this.button,aG),c.transition&&(ah(d,a2),this.viewed&&ah(f,a2)),c.focus&&this.clearEnforceFocus(),a.removeAttribute("role"),a.removeAttribute("aria-labelledby"),a.removeAttribute("aria-modal"),ah(a,ay),by(a,{zIndex:c.zIndexInline}),this.viewerData=bq({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){b.renderImage(function(){c.transition&&setTimeout(function(){bx(f,a2),bx(d,a2)
},0)
})
})),this
},tooltip:function(){var b=this,c=this.options,a=this.tooltipBox,d=this.imageData;
return this.viewed&&!this.played&&c.tooltip&&(a.textContent="".concat(Math.round(100*d.ratio),"%"),this.tooltipping?clearTimeout(this.tooltipping):c.transition?(this.fading&&bz(a,a6),bx(a,be),bx(a,ap),bx(a,a2),a.removeAttribute("aria-hidden"),a.initialOffsetWidth=a.offsetWidth,bx(a,ak)):(bx(a,be),a.removeAttribute("aria-hidden")),this.tooltipping=setTimeout(function(){c.transition?(br(a,a6,function(){ah(a,be),ah(a,ap),ah(a,a2),a.setAttribute("aria-hidden",!0),b.fading=!1
},{once:!0}),ah(a,ak),b.fading=!0):(ah(a,be),a.setAttribute("aria-hidden",!0)),b.tooltipping=!1
},1000)),this
},toggle:function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;
return 1===this.imageData.ratio?this.zoomTo(this.imageData.oldRatio,!0,a):this.zoomTo(1,!0,a),this
},reset:function(){return this.viewed&&!this.played&&(this.imageData=bq({},this.initialImageData),this.renderImage()),this
},update:function(){var d=this,b=this.element,a=this.options,g=this.isImg;
if(g&&!b.parentNode){return this.destroy()
}var f,c=[];
return ao(g?[b]:b.querySelectorAll("img"),function(e){aU(a.filter)?a.filter.call(d,e)&&c.push(e):d.getImageURL(e)&&c.push(e)
}),c.length&&(this.images=c,this.length=c.length,this.ready?(f=[],ao(this.items,function(j,k){var h=j.querySelector("img"),j=c[k];
j&&h&&j.src===h.src&&j.alt===h.alt||f.push(k)
}),by(this.list,{width:"auto"}),this.initList(),this.isShown&&(this.length?this.viewed&&(0<=(b=f.indexOf(this.index))?(this.viewed=!1,this.view(Math.max(Math.min(this.index-b,this.length-1),0))):(bx(b=this.items[this.index],aB),b.setAttribute("aria-selected",!0))):(this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""))):this.build()),this
},destroy:function(){var a=this.element,b=this.options;
return a[aH]&&(this.destroyed=!0,this.ready?(this.played&&this.stop(),b.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):b.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),b.inline||ab(a,a7,this.onStart),a[aH]=void 0),this
}},a3={getImageURL:function(a){var b=this.options.url;
return b=aP(b)?a.getAttribute(b):aU(b)?b.call(this,a):""
},enforceFocus:function(){var a=this;
this.clearEnforceFocus(),br(document,bb,this.onFocusin=function(b){var c=a.viewer,b=b.target;
b===document||b===c||c.contains(b)||null!==b.getAttribute("tabindex")&&"true"===b.getAttribute("aria-modal")||c.focus()
})
},clearEnforceFocus:function(){this.onFocusin&&(ab(document,bb,this.onFocusin),this.onFocusin=null)
},open:function(){var a=this.body;
bx(a,bn),a.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyComputedPaddingRight)||0),"px")
},close:function(){var a=this.body;
ah(a,bn),a.style.paddingRight=this.initialBodyPaddingRight
},shown:function(){var b=this.element,c=this.options,a=this.viewer;
this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,c.focus&&(a.focus(),this.enforceFocus()),aU(c.shown)&&br(b,bm,c.shown,{once:!0}),!1!==bz(b,bm)&&this.ready&&this.isShown&&!this.hiding&&this.view(this.index)
},hidden:function(){var b=this.element,c=this.options,a=this.viewer;
c.fucus&&this.clearEnforceFocus(),this.fulled=!1,this.viewed=!1,this.isShown=!1,this.close(),this.unbind(),bx(a,an),a.removeAttribute("role"),a.removeAttribute("aria-labelledby"),a.removeAttribute("aria-modal"),a.setAttribute("aria-hidden",!0),this.resetList(),this.resetImage(),this.hiding=!1,this.destroyed||(aU(c.hidden)&&br(b,"hidden",c.hidden,{once:!0}),bz(b,"hidden",null,{cancelable:!1}))
},requestFullscreen:function(a){var b=this.element.ownerDocument;
this.fulled&&!(b.fullscreenElement||b.webkitFullscreenElement||b.mozFullScreenElement||b.msFullscreenElement)&&((b=b.documentElement).requestFullscreen?ai(a)?b.requestFullscreen(a):b.requestFullscreen():b.webkitRequestFullscreen?b.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):b.mozRequestFullScreen?b.mozRequestFullScreen():b.msRequestFullscreen&&b.msRequestFullscreen())
},exitFullscreen:function(){var a=this.element.ownerDocument;
this.fulled&&(a.fullscreenElement||a.webkitFullscreenElement||a.mozFullScreenElement||a.msFullscreenElement)&&(a.exitFullscreen?a.exitFullscreen():a.webkitExitFullscreen?a.webkitExitFullscreen():a.mozCancelFullScreen?a.mozCancelFullScreen():a.msExitFullscreen&&a.msExitFullscreen())
},change:function(l){var j=this.options,f=this.pointers,d=f[Object.keys(f)[0]];
if(d){var m,k,c=d.endX-d.startX,b=d.endY-d.startY;
switch(this.action){case aL:this.move(c,b,l);
break;
case aK:this.zoom((m=aC({},g=f),k=[],ao(g,function(e,a){delete m[a],ao(m,function(o){var p=Math.abs(e.startX-o.startX),h=Math.abs(e.startY-o.startY),q=Math.abs(e.endX-o.endX),o=Math.abs(e.endY-o.endY),h=Math.sqrt(p*p+h*h),o=Math.sqrt(q*q+o*o);
k.push((o-h)/h)
})
}),k.sort(function(a,h){return Math.abs(a)<Math.abs(h)
}),k[0]),!1,l);
break;
case aq:this.action="switched";
var g=Math.abs(c);
1<g&&g>Math.abs(b)&&(this.pointers={},1<c?this.prev(j.loop):c<-1&&this.next(j.loop))
}ao(f,function(a){a.startX=a.endX,a.startY=a.endY
})
}},isSwitchable:function(){var a=this.imageData,b=this.viewerData;
return 1<this.length&&0<=a.x&&0<=a.y&&a.width<=b.width&&a.height<=b.height
}},aR=aA.Viewer,ac=(bw=-1,function(){return bw+=1
}),aA=function(){function b(f){var g=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};
if(!function(h,i){if(!(h instanceof i)){throw new TypeError("Cannot call a class as a function")
}}(this,b),!f||1!==f.nodeType){throw new Error("The first argument is required and must be an element.")
}this.element=f,this.options=bq({},au,ai(g)&&g),this.action=!1,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.moving=!1,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.rotating=!1,this.scaling=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zooming=!1,this.id=ac(),this.init()
}var a,c,d;
return a=b,d=[{key:"noConflict",value:function(){return window.Viewer=aR,b
}},{key:"setDefaults",value:function(e){bq(au,ai(e)&&e)
}}],(c=[{key:"init",value:function(){var h,k,g,m,l=this,j=this.element,f=this.options;
j[aH]||(j[aH]=this,f.focus&&!f.keyboard&&(f.focus=!1),h="img"===j.localName,k=[],ao(h?[j]:j.querySelectorAll("img"),function(e){aU(f.filter)?f.filter.call(l,e)&&k.push(e):l.getImageURL(e)&&k.push(e)
}),this.isImg=h,this.length=k.length,this.images=k,this.initBody(),a5(document.createElement(aH).style.transition)&&(f.transition=!1),f.inline?(g=0,m=function(){var e;
(g+=1)===l.length&&(l.initializing=!1,l.delaying={abort:function(){clearTimeout(e)
}},e=setTimeout(function(){l.delaying=!1,l.build()
},0))
},this.initializing={abort:function(){ao(k,function(e){e.complete||ab(e,a9,m)
})
}},ao(k,function(e){e.complete?m():br(e,a9,m,{once:!0})
})):br(j,a7,this.onStart=function(e){e=e.target;
l.view(l.images.indexOf(e));
"img"!==e.localName||aU(f.filter)&&!f.filter.call(l,e)
}))
}},{key:"build",value:function(){var B,C,w,q,j,g,z,f,v,p,y,A,x,k;
this.ready||(B=this.element,C=this.options,w=B.parentNode,(x=document.createElement("div")).innerHTML='<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>',j=(q=x.querySelector(".".concat(aH,"-container"))).querySelector(".".concat(aH,"-title")),g=q.querySelector(".".concat(aH,"-toolbar")),z=q.querySelector(".".concat(aH,"-navbar")),k=q.querySelector(".".concat(aH,"-button")),x=q.querySelector(".".concat(aH,"-canvas")),this.parent=w,this.viewer=q,this.title=j,this.toolbar=g,this.navbar=z,this.button=k,this.canvas=x,this.footer=q.querySelector(".".concat(aH,"-footer")),this.tooltipBox=q.querySelector(".".concat(aH,"-tooltip")),this.player=q.querySelector(".".concat(aH,"-player")),this.list=q.querySelector(".".concat(aH,"-list")),q.id="".concat(aH).concat(this.id),j.id="".concat(aH,"Title").concat(this.id),bx(j,C.title?bs(Array.isArray(C.title)?C.title[0]:C.title):an),bx(z,C.navbar?bs(C.navbar):an),aw(k,an,!C.button),C.keyboard&&k.setAttribute("tabindex",0),C.backdrop&&(bx(q,"".concat(aH,"-backdrop")),C.inline||"static"===C.backdrop||bv(x,bc,"hide")),aP(C.className)&&C.className&&C.className.split(aS).forEach(function(e){bx(q,e)
}),C.toolbar?(f=document.createElement("ul"),v=ai(C.toolbar),p=bu.slice(0,3),y=bu.slice(7,9),A=bu.slice(9),v||bx(g,bs(C.toolbar)),ao(v?C.toolbar:bu,function(l,m){var h=v&&ai(l),s=v?bp(m):l,r=h&&!a5(l.show)?l.show:l;
!r||!C.zoomable&&-1!==p.indexOf(s)||!C.rotatable&&-1!==y.indexOf(s)||!C.scalable&&-1!==A.indexOf(s)||(m=h&&!a5(l.size)?l.size:l,h=h&&!a5(l.click)?l.click:l,l=document.createElement("li"),C.keyboard&&l.setAttribute("tabindex",0),l.setAttribute("role","button"),bx(l,"".concat(aH,"-").concat(s)),aU(h)||bv(l,bc,s),bd(r)&&bx(l,bs(r)),-1!==["small","large"].indexOf(m)?bx(l,"".concat(aH,"-").concat(m)):"play"===s&&bx(l,"".concat(aH,"-large")),aU(h)&&br(l,a7,h),f.appendChild(l))
}),g.appendChild(f)):bx(g,an),C.rotatable||(bx(x=g.querySelectorAll('li[class*="rotate"]'),bj),ao(x,function(e){g.appendChild(e)
})),C.inline?(bx(k,aN),by(q,{zIndex:C.zIndexInline}),"static"===window.getComputedStyle(w).position&&by(w,{position:"relative"}),w.insertBefore(q,B.nextSibling)):(bx(k,aI),bx(q,ay),bx(q,ap),bx(q,an),by(q,{zIndex:C.zIndex}),(k=(k=aP(k=C.container)?B.ownerDocument.querySelector(k):k)||this.body).appendChild(q)),C.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,aU(C.ready)&&br(B,aE,C.ready,{once:!0}),!1!==bz(B,aE)?this.ready&&C.inline&&this.view(this.index):this.ready=!1)
}}])&&az(a.prototype,c),d&&az(a,d),b
}();
return bq(aA.prototype,aW,av,ar,bA,a3),aA
});