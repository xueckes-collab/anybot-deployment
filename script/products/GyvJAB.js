(function(h,f,c){var d=h.phoenixSite||(h.phoenixSite={});
var b="PFCC";
var a=d.prodList||(d.prodList={});
var j={};
var i=h.$_phoenix==c;
f.extend(a,{init:function(m){f.extend(j,m);
a.bindFrontEvent();
a.prodSort(j);
f("."+j.widgetClass).attr("");
var o=f("div[classattr="+j.widgetClass+"]").attr("renderonce");
var p="";
var q=f("."+j.widgetClass+" .sitewidget-bd .prodlist-wrap ul li");
q.each(function(s,t){var r=f(t).find(".prodlist-parameter-wrap .prodlist-parameter-inner .prodlist-ops-container").data("pid");
s===q.length-1?p+=r:p+=r+","
});
if(p.length>0&&o!="true"){var l="/prod/label/get";
if(i){l="/phoenix/admin/prod/label/";
if(d&&d.page&&d.page._menu_prefix){l=d.page._menu_prefix+"/phoenix/admin/prod/label/"
}}f.ajax({url:l,type:"POST",dataType:"json",data:{ids:p},success:function(r){q.each(function(){var t=this;
var s=f(this).find(".prodlist-parameter-wrap .prodlist-parameter-inner .prodlist-ops-container").data("pid");
if(r&&r[s]&&r[s].length>0){r[s].forEach(function(v,B){var H=r[s].length;
if(v.labelDivision==="1"){if(v.labelType==="0"){f(t).find(".prodlist-cell a").css({opacity:v.transparency,display:"inline-block"})
}var C="";
if(v.showType==="0"){if(v.showPositon==="0"){var w=f(t).find(".prodlist-display .prodlist-inner .labelfather .prodlistAsync_label_text_tl");
w.addClass("show");
w.find("span").css("color",v.fontColor);
if(v.labelType==="1"){C="<div class='discount'>";
if(v.discountOff&&v.discountOff.length>0){C+="<span>"+v.discountOff+"</span>";
C+="<br>"
}if(v.discountContext&&v.discountContext.length>0){C+="<span class='currencySymbol'>Save "+v.discountSymbol+"</span>";
C+="<span class='needExchangeValue' exchangevalue='"+v.discountContext+"'>"+v.discountContext+"</span>"
}C+="</div>";
w.html(C)
}else{w.find("div").html(v.labelName)
}var G=w.width()/1.414-6+"px";
var y=w.width()/2.828-2;
w.css({left:"-"+y+"px",top:G,"font-size":"10px",boxShadow:"0px -100px 0px 100px "+v.backgroundColor,backgroundColor:v.backgroundColor,zIndex:H-B})
}else{if(v.showPositon==="1"){var E=f(t).find(".prodlist-display .prodlist-inner .labelfather .prodlistAsync_label_text_tr");
E.addClass("show");
E.find("span").css("color",v.fontColor);
if(v.labelType==="1"){C="<div class='discount'>";
if(v.discountOff&&v.discountOff.length>0){C+="<span>"+v.discountOff+"</span>";
C+="<br>"
}if(v.discountContext&&v.discountContext.length>0){C+="<span class='currencySymbol'>Save "+v.discountSymbol+"</span>";
C+="<span class='needExchangeValue' exchangevalue='"+v.discountContext+"'>"+v.discountContext+"</span>"
}C+="</div>";
E.html(C)
}else{E.find("div").html(v.labelName)
}E.css({right:"-5px",top:"-5px","font-size":"10px",boxShadow:"0px -100px 0px 100px "+v.backgroundColor,backgroundColor:v.backgroundColor,zIndex:H-B})
}else{if(v.showPositon==="2"){var u=f(t).find(".prodlist-display .prodlist-inner1>.labelfather>.prodlistAsync_label_text_t");
u.css("flex-direction","column");
!u.hasClass("show")?u.addClass("show"):null;
if(v.labelType==="1"){var x=document.createElement("div");
x.setAttribute("class","discount");
if(v.discountOff&&v.discountOff.length>0){C+="<span style='padding:0 5px'>"+v.discountOff+"</span>"
}if(v.discountContext&&v.discountContext.length>0){C+="<span class='currencySymbol'>Save "+v.discountSymbol+"</span>";
C+="<span class='needExchangeValue' style='padding-right:5px' exchangevalue='"+v.discountContext+"'>"+v.discountContext+"</span>"
}x.innerHTML=C;
x.style.backgroundColor=v.backgroundColor;
x.style.color=v.fontColor;
u.append(x);
u.css("zIndex",H-B)
}else{var F=document.createElement("div");
F.innerHTML=v.labelName;
F.style.backgroundColor=v.backgroundColor;
F.style.color=v.fontColor;
u.append(F);
u.css("zIndex",H-B)
}u.each(function(K,L){if(f(L).children().length>1){var N=0;
f(L).children().each(function(O,P){N+=f(P).width()+2;
N+=13
});
var M=f(t).width();
if(N>M){f(L).css("flex-direction","column");
f(f(L).children()[0]).css("margin-bottom","3px")
}else{f(L).css("flex-direction","row")
}}else{f(L).css("flex-direction","row")
}})
}else{if(v.showPositon==="4"){var I=f(t).find(".prodlist-parameter-wrap .prodlist-parameter-inner .prodlist-pro-name .inlineLabel");
!I.hasClass("show")?I.addClass("show"):null;
I.addClass("discount");
if(v.labelType==="1"){if(v.discountOff&&v.discountOff.length>0){C+="<span style='padding: 0 5px'>"+v.discountOff+"</span>"
}if(v.discountContext&&v.discountContext.length>0){C+="<span class='currencySymbol'>Save "+v.discountSymbol+"</span>";
C+="<span class='needExchangeValue' style='padding-right: 5px' exchangevalue='"+v.discountContext+"'>"+v.discountContext+"</span>"
}I.html(C)
}else{I.html(v.labelName)
}I.css({backgroundColor:v.backgroundColor,color:v.fontColor,zIndex:H-B})
}}}}}else{if(v.showPositon==="0"){var J=f(t).find(".prodlist-display .prodlist-inner .labelfather .prodlistAsync_label_img_tl");
J.addClass("show");
J.find("img").attr("src",v.picUrl);
J.find("img").attr("alt",v.labelName);
J.css("zIndex",H-B)
}else{if(v.showPositon==="1"){var A=f(t).find(".prodlist-display .prodlist-inner .labelfather .prodlistAsync_label_img_tr");
A.addClass("show");
A.find("img").attr("src",v.picUrl);
A.find("img").attr("alt",v.labelName);
A.css("zIndex",H-B)
}else{if(v.showPositon==="3"){var D=f(t).find(".prodlist-display .prodlist-inner .labelfather .prodlistAsync_label_img_r");
!D.hasClass("show")?D.addClass("show"):null;
var z=document.createElement("img");
z.setAttribute("src",v.picUrl);
z.setAttribute("alt",v.labelName);
D.append(z);
D.css("zIndex",H-B)
}}}}}else{var D=f(t).find(".prodlist-display .prodlist-inner .labelfather .prodlistAsync_label_img_r");
!D.hasClass("show")?D.addClass("show"):null;
var z=document.createElement("img");
z.setAttribute("src",v.picUrl);
z.setAttribute("alt",v.labelName);
D.append(z);
D.css("zIndex",H-B)
}})
}})
}});
if(j.prodShowFlag=="1"&&j.paginationFlag=="0"){f("div[classattr="+j.widgetClass+"]").attr("renderonce","true")
}}function n(){var r=f(this).attr("href");
if(r){if(r.indexOf("phoenixSite")>0){document.querySelector("."+j.widgetClass).scrollIntoView()
}}}if(m.selectProductListStyle=="0"||m.selectProductListStyle=="8"){e(m)
}var k=true;
f(h).resize(function(){if(k){setTimeout(function(){k=true;
e(m)
},1000)
}k=false
})
},prodSort:function(m){var l=null;
var k=null;
var n=location.origin+location.pathname;
if(!m.widgetClass){return
}l=f(m.widgetClass);
k=l.find(".sitewidget-prodlist-sortFrom");
f(".prodSort",k).change(function(){var o=location.hrft;
var p=f(this).val();
location.href="?srot="+p
});
f('input[type="radio"]').change(function(){})
},isPropertySupported:function(k){return k in document.body.style
},bindFrontEvent:function(){var p=this;
var w=j.hasProducts;
var q=j.selectProductListStyle;
var n=j.widgetClass;
var u=j.phoenix_product_more_des;
var t=j.phoenix_product_closed;
var v=j.phoenix_shopingcart_notice;
var s=j.phoenix_error_buy_prod;
var m=j.payModuleFlag;
var l=j.prodPhotoSize;
var r=j.phoenix_categoryIdPagination;
if(!w){return
}if(r=="-1"){f.cookie("PFCC","",{expires:-1})
}else{f.cookie("PFCC","productGroupId_"+r,{expires:24*60*60,path:"/"})
}if(q=="0"||q=="11"||q=="12"||q=="14"){var k=function(y){var y=y;
var x="";
y.each(function(){_that=f(this);
var A=_that.find(".prodlist-picbox");
var z=parseInt(_that.width());
if(z<=225){x="piclist-all profixlist480"
}else{if(z<=280){x="piclist140 profixlist480"
}else{if(z<=310){x="piclist320 profixlist480"
}else{if(z<=365){x="piclist360 profixlist480"
}else{if(z<=415){x="piclist180 profixlist480"
}else{if(z<=480){x="piclist960 profixlist480"
}else{if(z<=580){x="piclist180 profixlist740"
}else{if(z<=680){x="piclist480 profixlist740"
}else{if(z<=740){x="piclist230 profixlist740"
}else{if(z<=800){x="piclist180 profixlist960"
}else{if(z<=960){x="piclist900 profixlist960"
}else{if(z<=980){x="piclist960 profixlist1180"
}else{if(z<=1180){x="piclist1180 profixlist1180"
}else{if(z<=2000){x="piclist1180 profixlistfull"
}}}}}}}}}}}}}}var E=_that.attr("widthName");
_that.attr("widthName",x).removeClass(E).addClass(x);
var C=false;
if(!p.isPropertySupported("aspectRatio")){C=true
}if((q=="0"&&C)||n.indexOf("prodListNew")>-1){var D=_that.find(".prodlist-fix-num li").width();
function B(F){switch(F){case"0":return D;
case"1":return D*2/3;
case"2":return D*3/2;
case"3":return D*3/4;
case"4":return D*4/3;
case"5":return D*9/16;
case"6":return D*16/9
}}_that.find(".prodlist-fix-num .prodlist-display").width(D-12).height(B(l)-12)
}})
};
k(f("."+n));
onloadHack(function(){setTimeout(function(){k(f("."+n))
},200)
});
f(h).on("resize.prodList",function(){setTimeout(function(){k(f("."+n))
},0)
})
}else{if(q=="4"||q=="1"||q=="5"){var o=function(y){var y=y;
var x="";
y.each(function(){_that=f(this);
var z=parseInt(_that.width());
if(z>=960){x="dbPro960"
}else{if(z>=780){x="dbPro780"
}else{if(z>=680){x="dbPro680"
}else{if(z>=470){x="dbPro470"
}else{if(z>=380){x="dbPro380"
}else{if(z>=280){x="dbPro280"
}else{x="dbPro225"
}}}}}}if(!_that.find("li:even").hasClass("even")){_that.find("li:even").addClass("even")
}if(!_that.find("li:odd").hasClass("odd")){_that.find("li:odd").addClass("odd")
}var A=_that.attr("dbclassName");
_that.attr("dbclassName",x).removeClass(A).addClass(x)
})
};
o(f("."+n));
f(h).resize(function(){o(f("."+n))
})
}}if(q=="5"){f(".prodlist-lists-right .prodDeshow a").click(function(){var x=f(this).parents(".prodlist-box-hover").find(".prodDesc");
if(x.is(":visible")){x.hide();
f(this).text(u)
}else{x.show();
f(this).text(t);
tableScroll(x[0])
}return false
})
}d.sitewidgets.showcaseScrollEffect=function(C,F,H,z){var y=f(C).width();
var D=true,B=2500;
var I=f(C).attr("data-radio");
var A=f(C).attr("data-time");
if(f(C).hasClass("prodNamerollingForTwo")){if(I=="1"){B=A
}else{D=false
}}var x=f(C+" li").width();
var E=parseInt(y/x)>1?parseInt(y/x):1;
if(c==z||z){f(C).slide({mainCell:">ul",autoPage:true,effect:F,autoPlay:true,vis:E,interTime:50,trigger:"click",opp:H,switchLoad:"data-original"})
}else{f(C).slide({mainCell:">ul",autoPage:true,effect:"leftLoop",scroll:E,autoPlay:D,vis:E,interTime:B,trigger:"click",opp:H,switchLoad:"data-original"})
}f(C).find(".tempWrap").css("width","100%");
var G=null;
f(h).resize(function(){if(G){clearTimeout(G)
}G=setTimeout(function(){f(C).find(".tempWrap").css("width","100%")
},200)
})
};
if(q=="0"){d.sitewidgets.prodListMargins("."+n+" .prodlist-showcase-margindisplay",5)
}else{if(q=="3"){d.sitewidgets.showcaseScrollEffect("."+n+" .prodlist-showcase-loopscroll","leftMarquee",true,false)
}else{if(q=="2"){d.sitewidgets.showcaseScrollEffect("."+n+" .prodlist-showcase-btnscroll","leftLoop",true,false)
}}}if(f("."+n+" .prodlist-pro-inquire")[0]!=c&&i){f("."+n+" .prodlist-pro-inquire").unbind("click").bind("click",function(){var y=f(this).attr("prodId");
var z=f(this).attr("minorderquantity");
if(z==c||z==""){z="1"
}var A={prodId:y,selectParam:"",quantity:z};
var x=new Array();
x.push(A);
f("."+n+" input[name=inquireParams]").val(f.toJSON(x));
f("."+n+" #prodInquire").submit()
})
}(function(){function z(G,H){G=encodeURI(G);
H=encodeURI(H);
var E=document.location.search.substr(1).split("&");
var F=E.length;
var D;
while(F--){D=E[F].split("=");
if(D[0]==G){D[1]=H;
E[F]=D.join("=");
break
}}if(F<0){E[E.length]=[G,H].join("=")
}document.location.search=E.join("&")
}var B=function(G){var J=/^[^\?]+\?([\w\W]+)$/,I=/([^&=]+)=([\w\W]*?)(&|$)/g,F=J.exec(G),E={};
if(F&&F[1]){var H=F[1],D;
while((D=I.exec(H))!=null){E[D[1]]=D[2]
}}return E
};
var y=h.location.href;
var C=B(y);
var x=C.prodSort;
var A=C.prodLayout;
f("#prodSortccc option[value]").prop("selected",false);
f("#prodSortccc option[value="+x+"]").prop("selected",true);
f("."+n+" .prodLayout a").bind("click",function(E){if(f(this).hasClass("disabled")||f(this).find("i").hasClass("yl_clickstyle")){return
}f(this).addClass("disabled");
var D=f(this).attr("data-layout");
z("prodLayout",D);
E.stopPropagation()
});
f("."+n+" #prodSortccc").on("change",function(){var D=f("#prodSortccc option:selected").attr("value");
z("prodSort",D)
});
f("."+n+" #prod_sort_12 li").on("click",function(E){var D=f(this).attr("value");
z("prodSort",D)
})
})();
f("."+n+" .prodlist-pro-addbasket-btn").unbind("click").bind("click",function(){if(h.fbq&&!h.fbAccessToken){h.fbq("track","AddToCart")
}if(h.ttq){h.ttq.track("AddToCart")
}});
f("."+n+" #prodAddCart").unbind("click").bind("click",function(){var D=f(this);
if(h.fbq&&!h.fbAccessToken){h.fbq("track","AddToCart")
}if(h.ttq){h.ttq.track("AddToCart")
}if(D.attr("prodstock")&&D.attr("prodstock")==0){var x=null;
if(x){return
}var G=d.message(d.lanEdition,"phoenix_shopingcart_inventory_null")||"This item is out of stock!";
f("body").append("<div class='prodStok0' style='position:fixed;left: 50%;top: 35%;z-index:999;border-radius:2px;transform: translate(-50%,-50%);background: rgba(0,0,0,0.8);text-align: center;font-size: 15px;color: #fff;padding: 20px 25px;'><i style='margin-right: 15px;' class='block-icon'></i>"+G+"</div>");
setTimeout(function(){f(".prodStok0").remove();
clearTimeout(x)
},4000);
return
}if(m=="1"&&f("."+n+" .prodlist-discountprice")[0]==c){f("<div class='add-cart-msg'>"+s+"</div>").appendTo(f("body"));
var C=f(".add-cart-msg");
f(C).fadeIn(500);
setTimeout(function(){f(C).fadeOut(500,function(){f(this).remove()
})
},1500);
return
}var y="/phoenix/admin/order/addToCart";
var F="post";
var z=f(this).attr("minorderquantity");
if(z==c||z==""){z="1"
}var B=D.attr("prodId");
var E=f.trim(D.attr("skuValueId"));
var A={extendProp:E,quantity:z,prodIds:B};
var H={url:y,type:F,dataType:"json",data:A,done:function(J){if(J.status=="success"){var I=v;
f("<div class='add-cart-msg'>"+I+"</div>").appendTo(f("body"));
var K=f(".add-cart-msg");
f(K).fadeIn(500);
setTimeout(function(){f(K).fadeOut(500,function(){f(this).remove()
})
},1500);
if(J.addNewFlag!=c){f(".sitewidget-shoppingStatus span[data-attr=shoppingcartNum]").each(function(L,N){var M=f(N).html();
M=M.replace(/\d+/,J.cartNum);
f(N).html(M)
})
}g()
}else{if(typeof J.prodDetail!="undefined"&&!!J.prodDetail){h.location.href=J.prodDetail;
return
}D.next("span#addToCartErrorMsg").html(J.reason).show().fadeOut(5000)
}}};
d.ajax(H)
})
}});
function g(){if(!!d.shoppingcartStatus&&typeof d.shoppingcartStatus.showLayerShopcart=="function"){d.shoppingcartStatus.showLayerShopcart();
f("body.frontend-body-canvas").addClass("body-over-hidden")
}}function e(k){var m=f("."+k.widgetClass+" .prodlist-picbox").width();
var l=f("."+k.widgetClass+" .audio-container-box .audio-box audio");
l.each(function(){new kac(f(this).get(0),m,50,"",true,l)
})
}})(window,jQuery);