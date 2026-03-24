if(typeof Object.create!=="function"){Object.create=function(b){function a(){}a.prototype=b;
return new a()
}
}(function(d,c,a){var e={init:function(f,g){var h=this;
h.$elem=d(g);
h.options=d.extend({},d.fn.owlCarousel.options,h.$elem.data(),f);
h.userOptions=f;
h.loadContent()
},loadContent:function(){var h=this,g;
function f(l){var j,k="";
if(typeof h.options.jsonSuccess==="function"){h.options.jsonSuccess.apply(this,[l])
}else{for(j in l.owl){if(l.owl.hasOwnProperty(j)){k+=l.owl[j].item
}}h.$elem.html(k)
}h.logIn()
}if(typeof h.options.beforeInit==="function"){h.options.beforeInit.apply(this,[h.$elem])
}if(typeof h.options.jsonPath==="string"){g=h.options.jsonPath;
d.getJSON(g,f)
}else{h.logIn()
}},logIn:function(){var f=this;
f.$elem.data("owl-originalStyles",f.$elem.attr("style"));
f.$elem.data("owl-originalClasses",f.$elem.attr("class"));
f.$elem.css({opacity:0});
f.orignalItems=f.options.items;
f.checkBrowser();
f.wrapperWidth=0;
f.checkVisible=null;
f.setVars()
},setVars:function(){var f=this;
if(f.$elem.children().length===0){return false
}f.baseClass();
f.eventTypes();
f.$userItems=f.$elem.children();
f.itemsAmount=f.$userItems.length;
f.wrapItems();
f.$owlItems=f.$elem.find(".owl-item");
f.$owlWrapper=f.$elem.find(".owl-wrapper");
f.playDirection="next";
f.prevItem=0;
f.prevArr=[0];
f.currentItem=0;
f.customEvents();
f.onStartup()
},onStartup:function(){var f=this;
f.updateItems();
f.calculateAll();
f.buildControls();
f.updateControls();
f.response();
f.moveEvents();
f.stopOnHover();
f.owlStatus();
if(f.options.transitionStyle!==false){f.transitionTypes(f.options.transitionStyle)
}if(f.options.autoPlay===true){f.options.autoPlay=5000
}f.play();
f.$elem.find(".owl-wrapper").css("display","block");
if(!f.$elem.is(":visible")){f.watchVisibility()
}else{f.$elem.css("opacity",1)
}f.onstartup=false;
f.eachMoveUpdate();
if(typeof f.options.afterInit==="function"){f.options.afterInit.apply(this,[f.$elem])
}},eachMoveUpdate:function(){var f=this;
if(f.options.lazyLoad===true){f.lazyLoad()
}if(f.options.autoHeight===true){f.autoHeight()
}f.onVisibleItems();
if(typeof f.options.afterAction==="function"){f.options.afterAction.apply(this,[f.$elem])
}},updateVars:function(){var f=this;
if(typeof f.options.beforeUpdate==="function"){f.options.beforeUpdate.apply(this,[f.$elem])
}f.watchVisibility();
f.updateItems();
f.calculateAll();
f.updatePosition();
f.updateControls();
f.eachMoveUpdate();
if(typeof f.options.afterUpdate==="function"){f.options.afterUpdate.apply(this,[f.$elem])
}},reload:function(){var f=this;
c.setTimeout(function(){f.updateVars()
},0)
},watchVisibility:function(){var f=this;
if(f.$elem.is(":visible")===false){f.$elem.css({opacity:0});
c.clearInterval(f.autoPlayInterval);
c.clearInterval(f.checkVisible)
}else{return false
}f.checkVisible=c.setInterval(function(){if(f.$elem.is(":visible")){f.reload();
f.$elem.animate({opacity:1},200);
c.clearInterval(f.checkVisible)
}},500)
},wrapItems:function(){var f=this;
if(f.$userItems.hasClass("hasTop")){f.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item gbBgColor0"></div>')
}else{f.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>')
}f.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
f.wrapperOuter=f.$elem.find(".owl-wrapper-outer");
f.$elem.css("display","block")
},baseClass:function(){var h=this,f=h.$elem.hasClass(h.options.baseClass),g=h.$elem.hasClass(h.options.theme);
if(!f){h.$elem.addClass(h.options.baseClass)
}if(!g){h.$elem.addClass(h.options.theme)
}},updateItems:function(){var h=this,g,f;
if(h.options.responsive===false){return false
}if(h.options.singleItem===true){h.options.items=h.orignalItems=1;
h.options.itemsCustom=false;
h.options.itemsDesktop=false;
h.options.itemsDesktopSmall=false;
h.options.itemsTablet=false;
h.options.itemsTabletSmall=false;
h.options.itemsMobile=false;
return false
}g=d(h.options.responsiveBaseWidth).width();
if(g>(h.options.itemsDesktop[0]||h.orignalItems)){h.options.items=h.orignalItems
}if(h.options.itemsCustom!==false){h.options.itemsCustom.sort(function(j,i){return j[0]-i[0]
});
for(f=0;
f<h.options.itemsCustom.length;
f+=1){if(h.options.itemsCustom[f][0]<=g){h.options.items=h.options.itemsCustom[f][1]
}}}else{if(g<=h.options.itemsDesktop[0]&&h.options.itemsDesktop!==false){h.options.items=h.options.itemsDesktop[1]
}if(g<=h.options.itemsDesktopSmall[0]&&h.options.itemsDesktopSmall!==false){h.options.items=h.options.itemsDesktopSmall[1]
}if(g<=h.options.itemsTablet[0]&&h.options.itemsTablet!==false){h.options.items=h.options.itemsTablet[1]
}if(g<=h.options.itemsTabletSmall[0]&&h.options.itemsTabletSmall!==false){h.options.items=h.options.itemsTabletSmall[1]
}if(g<=h.options.itemsMobile[0]&&h.options.itemsMobile!==false){h.options.items=h.options.itemsMobile[1]
}}if(h.options.items>h.itemsAmount&&h.options.itemsScaleUp===true){h.options.items=h.itemsAmount
}},response:function(){var h=this,g,f;
if(h.options.responsive!==true){return false
}f=d(c).width();
h.resizer=function(){if(d(c).width()!==f){if(h.options.autoPlay!==false){c.clearInterval(h.autoPlayInterval)
}c.clearTimeout(g);
g=c.setTimeout(function(){f=d(c).width();
h.updateVars()
},h.options.responsiveRefreshRate)
}};
d(c).resize(h.resizer)
},updatePosition:function(){var f=this;
f.jumpTo(f.currentItem);
if(f.options.autoPlay!==false){f.checkAp()
}},appendItemsSizes:function(){var h=this,f=0,g=h.itemsAmount-h.options.items;
h.$owlItems.each(function(i){var j=d(this);
j.css({width:h.itemWidth}).data("owl-item",Number(i));
if(i%h.options.items===0||i===g){if(!(i>g)){f+=1
}}j.data("owl-roundPages",f)
})
},appendWrapperSizes:function(){var g=this,f=g.$owlItems.length*g.itemWidth;
g.$owlWrapper.css({width:f*2,left:0});
g.appendItemsSizes()
},calculateAll:function(){var f=this;
f.calculateWidth();
f.appendWrapperSizes();
f.loops();
f.max()
},calculateWidth:function(){var f=this;
f.itemWidth=Math.round(f.$elem.width()/f.options.items)
},max:function(){var f=this,g=((f.itemsAmount*f.itemWidth)-f.options.items*f.itemWidth)*-1;
if(f.options.items>f.itemsAmount){f.maximumItem=0;
g=0;
f.maximumPixels=0
}else{f.maximumItem=f.itemsAmount-f.options.items;
f.maximumPixels=g
}return g
},min:function(){return 0
},loops:function(){var l=this,k=0,h=0,g,j,f;
l.positionsInArray=[0];
l.pagesInArray=[];
for(g=0;
g<l.itemsAmount;
g+=1){h+=l.itemWidth;
l.positionsInArray.push(-h);
if(l.options.scrollPerPage===true){j=d(l.$owlItems[g]);
f=j.data("owl-roundPages");
if(f!==k){l.pagesInArray[k]=l.positionsInArray[g];
k=f
}}}},buildControls:function(){var f=this;
if(f.options.navigation===true||f.options.pagination===true){f.owlControls=d('<div class="owl-controls"/>').toggleClass("clickable",!f.browser.isTouch).appendTo(f.$elem)
}if(f.options.pagination===true){f.buildPagination()
}if(f.options.navigation===true){f.buildButtons()
}},buildButtons:function(){var g=this,f=d('<div class="owl-buttons"/>');
g.owlControls.append(f);
g.buttonPrev=d("<div/>",{"class":"owl-prev",html:g.options.navigationText[0]||""});
g.buttonNext=d("<div/>",{"class":"owl-next",html:g.options.navigationText[1]||""});
f.append(g.buttonPrev).append(g.buttonNext);
f.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(h){h.preventDefault()
});
f.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(h){h.preventDefault();
if(d(this).hasClass("owl-next")){g.next()
}else{g.prev()
}})
},buildPagination:function(){var f=this;
f.paginationWrapper=d('<div class="owl-pagination"/>');
f.owlControls.append(f.paginationWrapper);
f.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(g){g.preventDefault();
if(Number(d(this).data("owl-page"))!==f.currentItem){f.goTo(Number(d(this).data("owl-page")),true)
}})
},updatePagination:function(){var m=this,g,l,k,j,h,f;
if(m.options.pagination===false){return false
}m.paginationWrapper.html("");
g=0;
l=m.itemsAmount-m.itemsAmount%m.options.items;
for(j=0;
j<m.itemsAmount;
j+=1){if(j%m.options.items===0){g+=1;
if(l===j){k=m.itemsAmount-m.options.items
}h=d("<div/>",{"class":"owl-page"});
f=d("<span></span>",{text:m.options.paginationNumbers===true?g:"","class":m.options.paginationNumbers===true?"owl-numbers":""});
h.append(f);
h.data("owl-page",l===j?k:j);
h.data("owl-roundPages",g);
m.paginationWrapper.append(h)
}}m.checkPagination()
},checkPagination:function(){var f=this;
if(f.options.pagination===false){return false
}f.paginationWrapper.find(".owl-page").each(function(){if(d(this).data("owl-roundPages")===d(f.$owlItems[f.currentItem]).data("owl-roundPages")){f.paginationWrapper.find(".owl-page").removeClass("active");
d(this).addClass("active")
}})
},checkNavigation:function(){var f=this;
if(f.options.navigation===false){return false
}if(f.options.rewindNav===false){if(f.currentItem===0&&f.maximumItem===0){f.buttonPrev.addClass("disabled");
f.buttonNext.addClass("disabled")
}else{if(f.currentItem===0&&f.maximumItem!==0){f.buttonPrev.addClass("disabled");
f.buttonNext.removeClass("disabled")
}else{if(f.currentItem===f.maximumItem){f.buttonPrev.removeClass("disabled");
f.buttonNext.addClass("disabled")
}else{if(f.currentItem!==0&&f.currentItem!==f.maximumItem){f.buttonPrev.removeClass("disabled");
f.buttonNext.removeClass("disabled")
}}}}}},updateControls:function(){var f=this;
f.updatePagination();
f.checkNavigation();
if(f.owlControls){if(f.options.items>=f.itemsAmount){f.owlControls.hide()
}else{f.owlControls.show()
}}},destroyControls:function(){var f=this;
if(f.owlControls){f.owlControls.remove()
}},next:function(g){var f=this;
if(f.isTransition){return false
}f.currentItem+=f.options.scrollPerPage===true?f.options.items:1;
if(f.currentItem>f.maximumItem+(f.options.scrollPerPage===true?(f.options.items-1):0)){if(f.options.rewindNav===true){f.currentItem=0;
g="rewind"
}else{f.currentItem=f.maximumItem;
return false
}}f.goTo(f.currentItem,g)
},prev:function(g){var f=this;
if(f.isTransition){return false
}if(f.options.scrollPerPage===true&&f.currentItem>0&&f.currentItem<f.options.items){f.currentItem=0
}else{f.currentItem-=f.options.scrollPerPage===true?f.options.items:1
}if(f.currentItem<0){if(f.options.rewindNav===true){f.currentItem=f.maximumItem;
g="rewind"
}else{f.currentItem=0;
return false
}}f.goTo(f.currentItem,g)
},goTo:function(f,j,h){var i=this,g;
if(i.isTransition){return false
}if(typeof i.options.beforeMove==="function"){i.options.beforeMove.apply(this,[i.$elem])
}if(f>=i.maximumItem){f=i.maximumItem
}else{if(f<=0){f=0
}}i.currentItem=i.owl.currentItem=f;
if(i.options.transitionStyle!==false&&h!=="drag"&&i.options.items===1&&i.browser.support3d===true){i.swapSpeed(0);
if(i.browser.support3d===true){i.transition3d(i.positionsInArray[f])
}else{i.css2slide(i.positionsInArray[f],1)
}i.afterGo();
i.singleItemTransition();
return false
}g=i.positionsInArray[f];
if(i.browser.support3d===true){i.isCss3Finish=false;
if(j===true){i.swapSpeed("paginationSpeed");
c.setTimeout(function(){i.isCss3Finish=true
},i.options.paginationSpeed)
}else{if(j==="rewind"){i.swapSpeed(i.options.rewindSpeed);
c.setTimeout(function(){i.isCss3Finish=true
},i.options.rewindSpeed)
}else{i.swapSpeed("slideSpeed");
c.setTimeout(function(){i.isCss3Finish=true
},i.options.slideSpeed)
}}i.transition3d(g)
}else{if(j===true){i.css2slide(g,i.options.paginationSpeed)
}else{if(j==="rewind"){i.css2slide(g,i.options.rewindSpeed)
}else{i.css2slide(g,i.options.slideSpeed)
}}}i.afterGo()
},jumpTo:function(f){var g=this;
if(typeof g.options.beforeMove==="function"){g.options.beforeMove.apply(this,[g.$elem])
}if(f>=g.maximumItem||f===-1){f=g.maximumItem
}else{if(f<=0){f=0
}}g.swapSpeed(0);
if(g.browser.support3d===true){g.transition3d(g.positionsInArray[f])
}else{g.css2slide(g.positionsInArray[f],1)
}g.currentItem=g.owl.currentItem=f;
g.afterGo()
},afterGo:function(){var f=this;
f.prevArr.push(f.currentItem);
f.prevItem=f.owl.prevItem=f.prevArr[f.prevArr.length-2];
f.prevArr.shift(0);
if(f.prevItem!==f.currentItem){f.checkPagination();
f.checkNavigation();
f.eachMoveUpdate();
if(f.options.autoPlay!==false){f.checkAp()
}}if(typeof f.options.afterMove==="function"&&f.prevItem!==f.currentItem){f.options.afterMove.apply(this,[f.$elem])
}},stop:function(){var f=this;
f.apStatus="stop";
c.clearInterval(f.autoPlayInterval)
},checkAp:function(){var f=this;
if(f.apStatus!=="stop"){f.play()
}},play:function(){var f=this;
f.apStatus="play";
if(f.options.autoPlay===false){return false
}c.clearInterval(f.autoPlayInterval);
f.autoPlayInterval=c.setInterval(function(){f.next(true)
},f.options.autoPlay)
},swapSpeed:function(g){var f=this;
if(g==="slideSpeed"){f.$owlWrapper.css(f.addCssSpeed(f.options.slideSpeed))
}else{if(g==="paginationSpeed"){f.$owlWrapper.css(f.addCssSpeed(f.options.paginationSpeed))
}else{if(typeof g!=="string"){f.$owlWrapper.css(f.addCssSpeed(g))
}}}},addCssSpeed:function(f){return{"-webkit-transition":"all "+f+"ms ease","-moz-transition":"all "+f+"ms ease","-o-transition":"all "+f+"ms ease",transition:"all "+f+"ms ease"}
},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}
},doTranslate:function(f){return{"-webkit-transform":"translate3d("+f+"px, 0px, 0px)","-moz-transform":"translate3d("+f+"px, 0px, 0px)","-o-transform":"translate3d("+f+"px, 0px, 0px)","-ms-transform":"translate3d("+f+"px, 0px, 0px)",transform:"translate3d("+f+"px, 0px,0px)"}
},transition3d:function(g){var f=this;
f.$owlWrapper.css(f.doTranslate(g))
},css2move:function(g){var f=this;
f.$owlWrapper.css({left:g})
},css2slide:function(h,g){var f=this;
f.isCssFinish=false;
f.$owlWrapper.stop(true,true).animate({left:h},{duration:g||f.options.slideSpeed,complete:function(){f.isCssFinish=true
}})
},checkBrowser:function(){var k=this,h="translate3d(0px, 0px, 0px)",j=a.createElement("div"),i,g,l,f;
j.style.cssText="  -moz-transform:"+h+"; -ms-transform:"+h+"; -o-transform:"+h+"; -webkit-transform:"+h+"; transform:"+h;
i=/translate3d\(0px, 0px, 0px\)/g;
g=j.style.cssText.match(i);
l=(g!==null&&g.length===1);
f="ontouchstart" in c||c.navigator.msMaxTouchPoints;
k.browser={support3d:l,isTouch:f}
},moveEvents:function(){var f=this;
if(f.options.mouseDrag!==false||f.options.touchDrag!==false){f.gestures();
f.disabledEvents()
}},eventTypes:function(){var g=this,f=["s","e","x"];
g.ev_types={};
if(g.options.mouseDrag===true&&g.options.touchDrag===true){f=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]
}else{if(g.options.mouseDrag===false&&g.options.touchDrag===true){f=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]
}else{if(g.options.mouseDrag===true&&g.options.touchDrag===false){f=["mousedown.owl","mousemove.owl","mouseup.owl"]
}}}g.ev_types.start=f[0];
g.ev_types.move=f[1];
g.ev_types.end=f[2]
},disabledEvents:function(){var f=this;
f.$elem.on("dragstart.owl",function(g){g.preventDefault()
});
f.$elem.on("mousedown.disableTextSelect",function(g){return d(g.target).is("input, textarea, select, option")
})
},gestures:function(){var i=this,j={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};
i.isCssFinish=true;
function l(m){if(m.touches!==undefined){return{x:m.touches[0].pageX,y:m.touches[0].pageY}
}if(m.touches===undefined){if(m.pageX!==undefined){return{x:m.pageX,y:m.pageY}
}if(m.pageX===undefined){return{x:m.clientX,y:m.clientY}
}}}function k(m){if(m==="on"){d(a).on(i.ev_types.move,h);
d(a).on(i.ev_types.end,f)
}else{if(m==="off"){d(a).off(i.ev_types.move);
d(a).off(i.ev_types.end)
}}}function g(o){var n=o.originalEvent||o||c.event,m;
if(n.which===3){return false
}if(i.itemsAmount<=i.options.items){return
}if(i.isCssFinish===false&&!i.options.dragBeforeAnimFinish){return false
}if(i.isCss3Finish===false&&!i.options.dragBeforeAnimFinish){return false
}if(i.options.autoPlay!==false){c.clearInterval(i.autoPlayInterval)
}if(i.browser.isTouch!==true&&!i.$owlWrapper.hasClass("grabbing")){i.$owlWrapper.addClass("grabbing")
}i.newPosX=0;
i.newRelativeX=0;
d(this).css(i.removeTransition());
m=d(this).position();
j.relativePos=m.left;
j.offsetX=l(n).x-m.left;
j.offsetY=l(n).y-m.top;
k("on");
j.sliding=false;
j.targetElement=n.target||n.srcElement
}function h(p){var o=p.originalEvent||p||c.event,m,n;
i.newPosX=l(o).x-j.offsetX;
i.newPosY=l(o).y-j.offsetY;
i.newRelativeX=i.newPosX-j.relativePos;
if(typeof i.options.startDragging==="function"&&j.dragging!==true&&i.newRelativeX!==0){j.dragging=true;
i.options.startDragging.apply(i,[i.$elem])
}if((i.newRelativeX>8||i.newRelativeX<-8)&&(i.browser.isTouch===true)){if(o.preventDefault!==undefined){o.preventDefault()
}else{o.returnValue=false
}j.sliding=true
}if((i.newPosY>10||i.newPosY<-10)&&j.sliding===false){d(a).off("touchmove.owl")
}m=function(){return i.newRelativeX/5
};
n=function(){return i.maximumPixels+i.newRelativeX/5
};
i.newPosX=Math.max(Math.min(i.newPosX,m()),n());
if(i.browser.support3d===true){i.transition3d(i.newPosX)
}else{i.css2move(i.newPosX)
}}function f(q){var p=q.originalEvent||q||c.event,o,n,m;
p.target=p.target||p.srcElement;
j.dragging=false;
if(i.browser.isTouch!==true){i.$owlWrapper.removeClass("grabbing")
}if(i.newRelativeX<0){i.dragDirection=i.owl.dragDirection="left"
}else{i.dragDirection=i.owl.dragDirection="right"
}if(i.newRelativeX!==0){o=i.getNewPosition();
i.goTo(o,false,"drag");
if(j.targetElement===p.target&&i.browser.isTouch!==true){d(p.target).on("click.disable",function(r){r.stopImmediatePropagation();
r.stopPropagation();
r.preventDefault();
d(r.target).off("click.disable")
});
n=d._data(p.target,"events").click;
m=n.pop();
n.splice(0,0,m)
}}k("off")
}i.$elem.on(i.ev_types.start,".owl-wrapper",g)
},getNewPosition:function(){var g=this,f=g.closestItem();
if(f>g.maximumItem){g.currentItem=g.maximumItem;
f=g.maximumItem
}else{if(g.newPosX>=0){f=0;
g.currentItem=0
}}return f
},closestItem:function(){var h=this,i=h.options.scrollPerPage===true?h.pagesInArray:h.positionsInArray,f=h.newPosX,g=null;
d.each(i,function(k,j){if(f-(h.itemWidth/20)>i[k+1]&&f-(h.itemWidth/20)<j&&h.moveDirection()==="left"){g=j;
if(h.options.scrollPerPage===true){h.currentItem=d.inArray(g,h.positionsInArray)
}else{h.currentItem=k
}}else{if(f+(h.itemWidth/20)<j&&f+(h.itemWidth/20)>(i[k+1]||i[k]-h.itemWidth)&&h.moveDirection()==="right"){if(h.options.scrollPerPage===true){g=i[k+1]||i[i.length-1];
h.currentItem=d.inArray(g,h.positionsInArray)
}else{g=i[k+1];
h.currentItem=k+1
}}}});
return h.currentItem
},moveDirection:function(){var f=this,g;
if(f.newRelativeX<0){g="right";
f.playDirection="next"
}else{g="left";
f.playDirection="prev"
}return g
},customEvents:function(){var f=this;
f.$elem.on("owl.next",function(){f.next()
});
f.$elem.on("owl.prev",function(){f.prev()
});
f.$elem.on("owl.play",function(g,h){f.options.autoPlay=h;
f.play();
f.hoverStatus="play"
});
f.$elem.on("owl.stop",function(){f.stop();
f.hoverStatus="stop"
});
f.$elem.on("owl.goTo",function(h,g){f.goTo(g)
});
f.$elem.on("owl.jumpTo",function(h,g){f.jumpTo(g)
})
},stopOnHover:function(){var f=this;
if(f.options.stopOnHover===true&&f.browser.isTouch!==true&&f.options.autoPlay!==false){f.$elem.on("mouseover",function(){f.stop()
});
f.$elem.on("mouseout",function(){if(f.hoverStatus!=="stop"){f.play()
}})
}},lazyLoad:function(){var l=this,j,g,k,h,f;
if(l.options.lazyLoad===false){return false
}for(j=0;
j<l.itemsAmount;
j+=1){g=d(l.$owlItems[j]);
if(g.data("owl-loaded")==="loaded"){continue
}k=g.data("owl-item");
h=g.find(".lazyOwl");
if(typeof h.data("src")!=="string"){g.data("owl-loaded","loaded");
continue
}if(g.data("owl-loaded")===undefined){h.hide();
g.addClass("loading").data("owl-loaded","checked")
}if(l.options.lazyFollow===true){f=k>=l.currentItem
}else{f=true
}if(f&&k<l.currentItem+l.options.items&&h.length){l.lazyPreload(g,h)
}}},lazyPreload:function(f,g){var j=this,i=0,k;
if(g.prop("tagName")==="DIV"){g.css("background-image","url("+g.data("src")+")");
k=true
}else{g[0].src=g.data("src")
}function h(){f.data("owl-loaded","loaded").removeClass("loading");
g.removeAttr("data-src");
if(j.options.lazyEffect==="fade"){g.fadeIn(400)
}else{g.show()
}if(typeof j.options.afterLazyLoad==="function"){j.options.afterLazyLoad.apply(this,[j.$elem])
}}function l(){i+=1;
if(j.completeImg(g.get(0))||k===true){h()
}else{if(i<=100){c.setTimeout(l,100)
}else{h()
}}}l()
},autoHeight:function(){var i=this,j=d(i.$owlItems[i.currentItem]).find("img"),h;
function f(){var k=d(i.$owlItems[i.currentItem]).height();
i.wrapperOuter.css("height",k+"px");
if(!i.wrapperOuter.hasClass("autoHeight")){c.setTimeout(function(){i.wrapperOuter.addClass("autoHeight")
},0)
}}function g(){h+=1;
if(i.completeImg(j.get(0))){f()
}else{if(h<=100){c.setTimeout(g,100)
}else{i.wrapperOuter.css("height","")
}}}if(j.get(0)!==undefined){h=0;
g()
}else{f()
}},completeImg:function(f){var g;
if(!f.complete){return false
}g=typeof f.naturalWidth;
if(g!=="undefined"&&f.naturalWidth===0){return false
}return true
},onVisibleItems:function(){var g=this,f;
if(g.options.addClassActive===true){g.$owlItems.removeClass("active")
}g.visibleItems=[];
for(f=g.currentItem;
f<g.currentItem+g.options.items;
f+=1){g.visibleItems.push(f);
if(g.options.addClassActive===true){d(g.$owlItems[f]).addClass("active");
if(g.$elem.parents(".pro_pic_small").find(".video_play_icon").length){if(d(g.$owlItems[f]).index()===0){g.$elem.parents(".pro_pic_small").find(".video_play_icon").show()
}else{g.$elem.parents(".pro_pic_small").find(".video_play_icon").hide()
}}}}g.owl.visibleItems=g.visibleItems
},transitionTypes:function(f){var g=this;
g.outClass="owl-"+f+"-out";
g.inClass="owl-"+f+"-in"
},singleItemTransition:function(){var g=this,i=g.outClass,l=g.inClass,k=g.$owlItems.eq(g.currentItem),j=g.$owlItems.eq(g.prevItem),n=Math.abs(g.positionsInArray[g.currentItem])+g.positionsInArray[g.prevItem],m=Math.abs(g.positionsInArray[g.currentItem])+g.itemWidth/2,h="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
g.isTransition=true;
g.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":m+"px","-moz-perspective-origin":m+"px","perspective-origin":m+"px"});
function f(o){return{position:"relative",left:o+"px"}
}j.css(f(n,10)).addClass(i).on(h,function(){g.endPrev=true;
j.off(h);
g.clearTransStyle(j,i)
});
k.addClass(l).on(h,function(){g.endCurrent=true;
k.off(h);
g.clearTransStyle(k,l)
})
},clearTransStyle:function(g,f){var h=this;
g.css({position:"",left:""}).removeClass(f);
if(h.endPrev&&h.endCurrent){h.$owlWrapper.removeClass("owl-origin");
h.endPrev=false;
h.endCurrent=false;
h.isTransition=false
}},owlStatus:function(){var f=this;
f.owl={userOptions:f.userOptions,baseElement:f.$elem,userItems:f.$userItems,owlItems:f.$owlItems,currentItem:f.currentItem,prevItem:f.prevItem,visibleItems:f.visibleItems,isTouch:f.browser.isTouch,browser:f.browser,dragDirection:f.dragDirection}
},clearEvents:function(){var f=this;
f.$elem.off(".owl owl mousedown.disableTextSelect");
d(a).off(".owl owl");
d(c).off("resize",f.resizer)
},unWrap:function(){var f=this;
if(f.$elem.children().length!==0){f.$owlWrapper.unwrap();
f.$userItems.unwrap().unwrap();
if(f.owlControls){f.owlControls.remove()
}}f.clearEvents();
f.$elem.attr("style",f.$elem.data("owl-originalStyles")||"").attr("class",f.$elem.data("owl-originalClasses"))
},destroy:function(){var f=this;
f.stop();
c.clearInterval(f.checkVisible);
f.unWrap();
f.$elem.removeData()
},reinit:function(h){var g=this,f=d.extend({},g.userOptions,h);
g.unWrap();
g.init(f,g.$elem)
},addItem:function(i,g){var h=this,f;
if(!i){return false
}if(h.$elem.children().length===0){h.$elem.append(i);
h.setVars();
return false
}h.unWrap();
if(g===undefined||g===-1){f=-1
}else{f=g
}if(f>=h.$userItems.length||f===-1){h.$userItems.eq(-1).after(i)
}else{h.$userItems.eq(f).before(i)
}h.setVars()
},removeItem:function(g){var h=this,f;
if(h.$elem.children().length===0){return false
}if(g===undefined||g===-1){f=-1
}else{f=g
}h.unWrap();
h.$userItems.eq(f).remove();
h.setVars()
}};
function b(g,f){console.log(g,f);
console.log(13213)
}d.fn.owlCarousel=function(f){return this.each(function(){if(d(this).data("owl-init")===true){return false
}d(this).data("owl-init",true);
var g=Object.create(e);
g.init(f,this);
d.data(this,"owlCarousel",g)
})
};
d.fn.owlCarousel.options={items:5,itemsCustom:false,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:false,itemsMobile:[479,1],singleItem:false,itemsScaleUp:false,slideSpeed:200,paginationSpeed:800,rewindSpeed:1000,autoPlay:false,stopOnHover:false,navigation:false,navigationText:["prev","next"],rewindNav:true,scrollPerPage:false,pagination:true,paginationNumbers:false,responsive:true,responsiveRefreshRate:200,responsiveBaseWidth:c,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:false,lazyFollow:true,lazyEffect:"fade",autoHeight:false,jsonPath:false,jsonSuccess:false,dragBeforeAnimFinish:true,mouseDrag:true,touchDrag:true,addClassActive:false,transitionStyle:false,beforeUpdate:false,afterUpdate:false,beforeInit:false,afterInit:false,beforeMove:false,afterMove:false,afterAction:false,startDragging:false,afterLazyLoad:false}
}(jQuery,window,document));