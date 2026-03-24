(function(o,h,j){var y=o.phoenixSite||(o.phoenixSite={});
var f=y.payCoinExchange||(y.payCoinExchange={});
var i=y.shoppingcartStatus||(y.shoppingcartStatus={});
i.version="2.0.1";
var A=false;
h.extend(i,{init:function(H){if(typeof H=="undefined"){return
}var G=H.componentId;
if(!!!G){return
}var E=h("#"+G);
if(!E.length){return
}if(h("div.sitewidget-shoppingCart").length||h("div.sitewidget-orderConfirm").length){var F=h("a[data-attr=shoppingcartStatus]"),I=F.attr("data-href")||"/";
F.attr("href",I);
return
}p.click(E)
},countLayerShopcart:function(E){var F=[];
if(typeof E!=="undefined"&&h.isArray(E)){h.merge(F,E)
}else{if(typeof E!=="undefined"&&typeof E==="string"){F.push(E)
}else{F.push("[data-attr=layerShoppingcart]")
}}var G=[];
h.each(F,function(H,I){h.merge(G,h(I))
});
if(!G.length){return
}h.each(G,function(){var H=h(this);
q(H)
})
},showLayerShopcart:t,renderLayerShopcart:c,showShopcartCartStatus:x});
var p={};
h.extend(p,{isProdQuantity:function(E){if(!!!E||isNaN(E)){return false
}if(/^[1-9]\d*$/.test(E)){return true
}}});
h.extend(p,{click:function(E){var F=E.find("[data-attr=shoppingcartStatus]");
if(!F.length){return
}F.unbind("click").bind("click",function(G){t()
})
}});
function t(){var E={url:"/phoenix/admin/order/layerShoppingcart",type:"post",beforeSend:function(){var F=h('<div class="cart-wrap-fixedr-mark"><div class="double-bounce-wrap"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>Loading...</div>');
h("body").append(F);
F.animate({right:"0"},"fast")
},done:function(F,I,G){if(h("#cart-dialog")&&h("#cart-dialog").length&&h("#cart-dialog").css("right")=="0px"){h(".cart-wrap-fixedr-mark").remove()
}if(h("#prodInquireBasket").length){h("#prodInquireBasket").slideUp()
}try{F=h.parseJSON(F)
}catch(H){F={}
}c(F);
x(F.orderProds)
},fail:function(F,H,G){}};
y.ajax(E)
}showShopcartCartDetail=function(F){var E={url:"/phoenix/admin/prod/getShopCartRecommendProdDetail",type:"get",data:{prodId:F,sourceType:1},beforeSend:function(){},done:function(G,J,H){h(".recommend_cart").remove();
var I=[];
I.push(G);
h("body").append(I.join(""))
},fail:function(G,I,H){}};
y.ajax(E)
};
showShopcartCartDetail_x=function(F){var E={url:"/phoenix/admin/prod/getShopCartRecommendProdDetail",type:"get",data:{prodId:F,sourceType:1},beforeSend:function(){},done:function(G,J,H){h(".recommend_cart").remove();
var I=[];
I.push(G);
h("body").append(I.join(""))
},fail:function(G,I,H){}};
y.ajax(E)
};
function x(F){var H="";
for(var E=0;
E<F.length;
E++){H+=F[E].prodId+","
}H=H.substring(0,H.lastIndexOf(","));
var G={url:"/phoenix/admin/prod/getShopCartRecommendProd",type:"get",data:{prodIds:H},beforeSend:function(){},done:function(J,I,P){var N={};
try{N=h.parseJSON(J)
}catch(M){N={}
}if(J!="{}"&&J!=""){h(".current-dialog-list").remove();
h(".recommend_cart_detail_zzw_script").remove();
h(".recommend_cart_detail_zzw").remove();
var Q=[];
var K=h("#recommend_cart");
if(!K.length){if(!h(".recommend_cart_mc").length){Q.push('<div class="recommend_cart_mc" id="shop_mc"></div>')
}Q.push('<div class="recommend_cart" id="recommend_cart">');
Q.push('<div class="recommend_title">'+N.title+"</div>");
Q.push("<div >");
Q.push('<ul class=" recommend_cart_slick recommend_cart_slick_pc">');
if(N.prodList.length>0){for(var L=0;
L<N.prodList.length;
L++){Q.push('<li encodePkId="'+N.prodList[L].encodePkId+'" id="'+N.prodList[L].encodePkId+'"><div class="recommend_cart_img_box"><div class="recommend_cart_btn" onclick="showShopcartCartDetail(\''+N.prodList[L].encodePkId+"')\"> "+N.phoenix_quick_Buy+'</div><img data-lazy="'+N.prodList[L].photoUrlNormal+'"/></div><div class="recommend_cart_title">'+N.prodList[L].prodName+"</div>");
Q.push('<div class="recommend_cart_unint"><span class="shopProdPrice">'+N.currencySymbol+'</span><span class="shopProdPrice">'+N.prodList[L].shopProdPrice+'</span><span class="shopProdPriceMax">'+N.currencySymbol+N.prodList[L].shopProdPriceMax+"</span></div>");
Q.push('<div class = "prodlistAsync_label prodlistAsync_label_text_tl"><div></div> </div>');
Q.push('<div class="prodlistAsync_label prodlistAsync_label_text_tr"> <div></div></div>');
Q.push('<div class="prodlistAsync_label prodlistAsync_label_text_t"></div>');
Q.push('<div class="prodlistAsync_label_img_tl"><img src="" /></div>');
Q.push('<div class="prodlistAsync_label_img_tr"><img src="" /> </div>');
Q.push('<div class="prodlistAsync_label_img_r"></div>');
Q.push("</li>")
}}else{Q.push('<div class="recommend_cart_tip">'+N.shop_cart_recommend_prod_empty+"</div>")
}Q.push("</ul>");
Q.push("</div>");
Q.push("</div>");
h("body").append(Q.join(""));
var O=[];
O.push('<div class=" recommend_cart recommend_cart_x" id="recommend_cart">');
O.push('<div class="recommend_title">'+N.title+"</div>");
O.push("<div >");
O.push('<ul class=" recommend_cart_slick">');
if(N.prodList.length>0){for(var L=0;
L<N.prodList.length;
L++){O.push('<li encodePkId="'+N.prodList[L].encodePkId+'" id="'+N.prodList[L].encodePkId+'"><div class="recommend_cart_img_box"><img src="'+N.prodList[L].photoUrlNormal+'"/></div><div class="recommend_cart_right"><div class="recommend_cart_title">'+N.prodList[L].prodName+"</div>");
O.push('<div class="recommend_cart_unint"><span class="shopProdPrice">'+N.currencySymbol+'</span><span class="shopProdPrice">'+N.prodList[L].shopProdPrice+'</span><span class="shopProdPriceMax">'+N.currencySymbol+N.prodList[L].shopProdPriceMax+'</span><div class="recommend_cart_btn_x"  onClick="showShopcartCartDetail_x(\''+N.prodList[L].encodePkId+"')\">"+N.phoenix_quick_Buy+"</div> </div></div>");
O.push("</li>");
O.push('<div class="recommend_cart_line"></div>')
}}else{O.push('<div class="recommend_cart_tip">'+N.shop_cart_recommend_prod_empty+"</div>")
}O.push("</ul>");
O.push("</div>");
O.push("</div>");
h("#cart-dialog .phone_recommend_cart").append(O.join(""));
h(document).ready(function(){h(".recommend_cart_slick_pc").slick({slidesToShow:3,arrows:true,infinite:false,lazyLoad:"ondemand",prevArrow:'<svg   class="recommend_cart-next slick-arrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4395" width="64" height="64"><path d="M503.466667 490.666667l174.933333 174.933333-59.733333 59.733333L384 490.666667 618.666667 256l59.733333 59.733333-174.933333 174.933334z" fill="#FFFFFF" p-id="4396"></path></svg>',nextArrow:'<svg class="recommend_cart-prev slick-arrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4395" width="64" height="64"><path d="M503.466667 490.666667l174.933333 174.933333-59.733333 59.733333L384 490.666667 618.666667 256l59.733333 59.733333-174.933333 174.933334z" fill="#FFFFFF" p-id="4396"></path></svg>',responsive:[{breakpoint:1600,settings:{slidesToShow:2}},{breakpoint:1200,settings:{slidesToShow:1}}]});
h(".recommend_cart_slick_pc .recommend_cart-next").attr("class","recommend_cart-next slick-arrow recommend_cart_slick_disabled");
h(".recommend_cart_slick_pc").on("afterChange",function(W,T,Y,X){var U=h(".recommend_cart_slick_pc .recommend_cart-next").attr("aria-disabled");
var V=h(".recommend_cart_slick_pc .recommend_cart-prev").attr("aria-disabled");
if(U=="true"){h(".recommend_cart_slick_pc .recommend_cart-next").attr("class","recommend_cart-next slick-arrow recommend_cart_slick_disabled")
}else{h(".recommend_cart_slick_pc .recommend_cart-next").attr("class","recommend_cart-next slick-arrow")
}if(V=="true"){h(".recommend_cart_slick_pc .recommend_cart-prev").attr("class","recommend_cart-prev slick-arrow recommend_cart_slick_disabled")
}else{h(".recommend_cart_slick_pc .recommend_cart-prev").attr("class","recommend_cart-prev slick-arrow")
}});
for(var R=0;
R<N.prodList.length;
R++){var S="#"+N.prodList[R].encodePkId;
N.prodList[R].prodLabelEntityList.forEach(function(U,ad){var ag=N.prodList[R].prodLabelEntityList.length;
if(U.labelDivision==="1"){if(U.labelType==="0"){h(".recommend_cart "+S).find(".recommend_cart_img_box").css({opacity:U.transparency,display:"inline-block"})
}var aa="";
if(U.showType==="0"){if(U.showPositon==="0"){var V=h(".recommend_cart "+S).find(".prodlistAsync_label_text_tl");
V.addClass("show");
V.find("span").css("color",U.fontColor);
if(U.labelType==="1"){aa="<div class='discount'>";
if(U.discountOff&&U.discountOff.length>0){aa+="<span>"+U.discountOff+"</span>";
aa+="<br>"
}if(U.discountContext&&U.discountContext.length>0){aa+="<span class='currencySymbol'>Save "+U.discountSymbol+"</span>";
aa+="<span class='needExchangeValue' exchangevalue='"+U.discountContext+"'>"+U.discountContext+"</span>"
}aa+="</div>";
V.html(aa)
}else{V.find("div").html(U.labelName)
}var af=V.width()/1.414-6+"px";
var X=V.width()/2.828-2;
V.css({left:"-"+X+"px",top:af,"font-size":"10px",boxShadow:"0px -100px 0px 100px "+U.backgroundColor,backgroundColor:U.backgroundColor,zIndex:ag-R})
}else{if(U.showPositon==="1"){var ac=h(".recommend_cart "+S).find(".prodlistAsync_label_text_tr");
ac.addClass("show");
ac.find("span").css("color",U.fontColor);
if(U.labelType==="1"){aa="<div class='discount'>";
if(U.discountOff&&U.discountOff.length>0){aa+="<span>"+U.discountOff+"</span>";
aa+="<br>"
}if(U.discountContext&&U.discountContext.length>0){aa+="<span class='currencySymbol'>Save "+U.discountSymbol+"</span>";
aa+="<span class='needExchangeValue' exchangevalue='"+U.discountContext+"'>"+U.discountContext+"</span>"
}aa+="</div>";
ac.html(aa)
}else{ac.find("div").html(U.labelName)
}ac.css({right:"-5px",top:"-5px","font-size":"10px",boxShadow:"0px -100px 0px 100px "+U.backgroundColor,backgroundColor:U.backgroundColor,zIndex:ag-R})
}else{if(U.showPositon==="2"){var T=h(".recommend_cart "+S).find(".prodlistAsync_label_text_t");
T.css("flex-direction","column");
!T.hasClass("show")?T.addClass("show"):null;
if(U.labelType==="1"){var W=document.createElement("div");
W.setAttribute("class","discount");
if(U.discountOff&&U.discountOff.length>0){aa+="<span style='padding:0 5px'>"+U.discountOff+"</span>"
}if(U.discountContext&&U.discountContext.length>0){aa+="<span class='currencySymbol'>Save "+U.discountSymbol+"</span>";
aa+="<span class='needExchangeValue' style='padding-right:5px' exchangevalue='"+U.discountContext+"'>"+U.discountContext+"</span>"
}W.innerHTML=aa;
W.style.backgroundColor=U.backgroundColor;
W.style.color=U.fontColor;
T.append(W);
T.css("zIndex",ag-R)
}else{var ae=document.createElement("div");
ae.innerHTML=U.labelName;
ae.style.backgroundColor=U.backgroundColor;
ae.style.color=U.fontColor;
T.append(ae);
T.css("zIndex",ag-R)
}T.each(function(aj,ak){if(h(ak).children().length>1){var am=0;
h(ak).children().each(function(an,ao){am+=h(ao).width()+2;
am+=13
});
var al=h(S).width();
if(am>al){h(ak).css("flex-direction","column");
h(h(ak).children()[0]).css("margin-bottom","3px")
}else{h(ak).css("flex-direction","row")
}}else{h(ak).css("flex-direction","row")
}})
}else{if(U.showPositon==="4"){var ah=h(".recommend_cart "+S).find(".recommend_cart_title");
!ah.hasClass("show")?ah.addClass("show"):null;
ah.addClass("discount");
if(U.labelType==="1"){if(U.discountOff&&U.discountOff.length>0){aa+="<span style='padding: 0 5px'>"+U.discountOff+"</span>"
}if(U.discountContext&&U.discountContext.length>0){aa+="<span class='currencySymbol'>Save "+U.discountSymbol+"</span>";
aa+="<span class='needExchangeValue' style='padding-right: 5px' exchangevalue='"+U.discountContext+"'>"+U.discountContext+"</span>"
}ah.prepend(aa)
}else{aa+="<span style='padding: 0 5px'>"+U.labelName+"</span>";
ah.prepend(aa)
}ah.find("span").css({backgroundColor:U.backgroundColor,color:U.fontColor,zIndex:ag-R})
}}}}}else{if(U.showPositon==="0"){var ai=h(".recommend_cart "+S).find(".prodlistAsync_label_img_tl");
ai.addClass("show");
ai.find("img").attr("src",U.picUrl);
ai.find("img").attr("alt",U.labelName);
ai.css("zIndex",ag-R)
}else{if(U.showPositon==="1"){var Z=h(".recommend_cart "+S).find(".prodlistAsync_label_img_tr");
Z.addClass("show");
Z.find("img").attr("src",U.picUrl);
Z.find("img").attr("alt",U.labelName);
Z.css("zIndex",ag-R)
}else{if(U.showPositon==="3"){var ab=h(".recommend_cart "+S).find(".prodlistAsync_label_img_r");
!ab.hasClass("show")?ab.addClass("show"):null;
var Y=document.createElement("img");
Y.setAttribute("src",U.picUrl);
Y.setAttribute("alt",U.labelName);
ab.append(Y);
ab.css("zIndex",ag-R)
}}}}}else{var ab=h(".recommend_cart "+S).find(".prodlistAsync_label_img_r");
!ab.hasClass("show")?ab.addClass("show"):null;
var Y=document.createElement("img");
Y.setAttribute("src",U.picUrl);
Y.setAttribute("alt",U.labelName);
ab.append(Y);
ab.css("zIndex",ag-R)
}})
}})
}}},fail:function(I,K,J){}};
y.ajax(G)
}function c(H){var G=h("div[data-attr=layerShoppingcart]");
var I=[],K=H.shopcartPageUrl||"",E=H.auth_isShowPrice||false;
var M=H.orderProds||[];
var F=y.message(y.lanEdition,"phoenix_view_cart");
p.phoenix_shopingcart_subtotal=H.phoenix_shopingcart_subtotal;
p.phoenix_view_cart=H.phoenix_view_cart;
p.phoenix_shopingcart_shopping=H.phoenix_shopingcart_shopping;
p.phoenix_shopingcart_selectAll=H.phoenix_shopingcart_selectAll;
p.phoenix_shopingcart_delGood=H.phoenix_shopingcart_delGood;
p.phoenix_shopingcart_submit=H.phoenix_shopingcart_submit;
p.phoenix_shopingcart_confirmDel=H.phoenix_shopingcart_confirmDel;
p.phoenix_shopingcart_frequency=H.phoenix_shopingcart_frequency;
p.phoenix_shopingcart_viewCart=H.phoenix_shopingcart_viewCart;
p.currencySymbol=H.currencySymbol;
p.imgDownload=H.phoneix_download_pop_imgdownload;
p.fileDownload=H.phoenix_download_pop_title;
p.phoenix_shopingcart_empty=H.phoenix_shopingcart_empty;
var J=h("#cart-dialog");
if(!J.length){I.push('<div class="cart-wrap cart-wrap-fixedr" id="cart-dialog" data-attr="layerShoppingcart" data-type="layerShoppingcart">')
}var L="";
if(y.page!=j&&y.page._menu_prefix!=j){L=y.page._menu_prefix
}I.push('<form action="'+L+'/phoenix/admin/order/confirm" method="post" data-attr="form">');
I.push('<p class="close"><span>'+p.phoenix_shopingcart_viewCart+'</span><i class="fa fa-times" aria-hidden="true"></i></p>');
if(h.inArray(M)&&M.length){I.push('<ul class="cart-ul" data-attr="shoppingcartLayerSub">');
I.push(a(H,M,E));
I.push("</ul>");
I.push('<div class="total-price">');
I.push('<span class="selectAll"><input type="checkbox" />'+p.phoenix_shopingcart_selectAll+"</span>");
I.push('<span class="view-cart" style="position: absolute;right: 0;top: 50%;transform: translateY(-50%);"><a href="'+L+K+'">'+p.phoenix_view_cart+"</a></span>");
I.push('<span class="title"><a href="'+L+K+'">'+p.phoenix_shopingcart_subtotal+"</a></span>");
if(E){I.push('<div class="price-contain">');
I.push('<span class="fl price-all currencySymbol"></span>');
I.push('<span class="fl price-all needExchangeValue" data-attr="layerShoppingCartTotal" data-type="layerShopcart"></span></div>')
}I.push("</div>");
I.push('<div class="menu-btn">');
I.push('<span class="checkout" data-attr="submit" title="'+p.phoenix_shopingcart_submit+'">'+p.phoenix_shopingcart_submit+"</span>");
I.push('<span id="quickcart_paypal"></span>');
I.push("</div>")
}else{I.push('<p class="empty-cart">'+p.phoenix_shopingcart_empty+"</p>")
}I.push('<input type="hidden" name="extendProp" value="">');
I.push('<input type="hidden" name="confirmType" value="0">');
I.push("</form>");
I.push('<div class="phone_recommend_cart"></div>');
if(!J.length){I.push("</div>");
G.unbind("close").remove();
h("body").unbind("click.shopcartstatus");
h("body").append(I.join(""))
}else{J.empty();
J.append(I.join(""))
}h(".cart-ul .cart-list").each(function(P,O){var N=h(O).find(".cart-skuState").height();
var Q=h(O).get(0).offsetHeight;
console.log(Q,N);
h(O).css("min-height",Q+N+"px");
var R=parseInt(h(O).find(".input-wrap").css("top"))+N+6+"px";
h(O).find(".input-wrap").css("top",R);
h(O).find(".cart-skuState").attr("style","position:absolute;top:90px")
});
h(".cart-wrap-fixedr").animate({right:"0"},"fast",function(){setTimeout(function(){h(".cart-wrap-fixedr-mark").fadeOut(function(){h(this).remove()
})
},1000)
});
D();
if(!!H.paypalClientId){w(H.paypalClientId,H.phoenix_default_currency)
}h("body.frontend-body-canvas").addClass("body-over-hidden");
h(document).find("html").css("cssText","overflow-y:hidden !important")
}function w(F,E){if("undefined"!=typeof paypal){d()
}else{h.ajaxSetup({cache:true});
h.getScript("https://www.paypal.com/sdk/js?client-id="+F+"&disable-funding=card&commit=false&currency="+E,function(){d()
})
}}function d(){var E;
paypal.Buttons({style:{layout:"horizontal",height:48,label:"paypal",tagline:false},createOrder:function(){var G=h("div[data-attr=layerShoppingcart]");
var F=p.prepareParam(G);
if(!!!F){return
}return fetch("/phoenix/admin/orderv2/smartPayment/cart",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"confirmType=0&extendProp="+F}).then(function(H){return H.json()
}).then(function(H){E=H.checkoutUUID;
return H.id
})
},onApprove:function(F,G){o.open("/phoenix/admin/checkout/smartPayment/confirm?checkoutId="+E,"_self")
}}).render("#quickcart_paypal")
}function a(E,H,G){var Q=[];
var M=E.currencySymbol||"";
var ad,ac,N;
var I,J,S,aa,ah,O;
var T=f.getCurrencyCookie();
I=T.defaultRate,J=T.type,S=T.unit,aa=T.symbol,ah=T.rate;
for(ad=0,ac=H.length;
ad<ac;
ad++){var N=H[ad];
var K=N.orderProdIsProdTradeEnabled||false;
var L="";
if(N.pluginType==1){L="threed-list"
}Q.push('<li class="cart-list '+L+'" data-attr="prod" data-id="'+N.orderProdId+'">');
Q.push('<input type="checkbox" class="cart-ipt" />');
Q.push('<img src="'+N.orderProdImgUrl+'" alt="'+N.orderProdName+'" title="'+N.orderProdName+'"/>');
var W='<div class="cart-list-wrap">';
if(!!N.sellingPlanName){W='<div class="cart-list-wrap has-planName">'
}Q.push(W);
Q.push('<p><a href="'+N.prodUrl+'">'+N.orderProdName+"</a></p>");
if(G&&K){Q.push('<p style="position:absolute;top:70px;left: 0;"><span class="price currencySymbol">'+M+"</span>");
var ag=parseFloat(N.orderProdDiscount)*ah;
var af=parseFloat(N.orderProdUnitPrice)*ah;
if(N.orderProdIsShowDiscountPrice){Q.push('<span class="price needExchangeValue real"');
Q.push(' exchangevalue="'+N.orderProdDiscount+'"');
Q.push(' exchangeValueUnitPrice="'+N.orderProdUnitPrice+'"');
Q.push(' exchangeValueDiscountPrice="'+N.orderProdDiscount+'"');
Q.push(ag);
Q.push("></span>")
}else{Q.push('<span class="price needExchangeValue real"');
Q.push(' exchangevalue="'+N.orderProdUnitPrice+'"');
Q.push(' exchangeValueUnitPrice="'+N.orderProdUnitPrice+'"');
Q.push(">");
Q.push(af);
Q.push("</span>")
}Q.push("</p>")
}var X=N.orderProdAttrs||[],ab;
if(h.inArray(X)||!X.length){var V=Q.length;
Q.push('<div class="detail-sku">');
var R="";
for(ab=0,attrLength=X.length;
ab<attrLength;
ab++){var Y=X[ab];
Q.push("<span>");
if(N.pluginType&&N.pluginType=="1"){if(Y.propTypeName!=""){Q.push(Y.propTypeName);
Q.push(":");
R+=Y.propTypeName;
R+=":"
}else{Q.push(Y.propTypeName);
R+=Y.propTypeName
}}Q.push(Y.propValue);
if(N.pluginType&&N.pluginType=="1"){R+=Y.propValue
}if(ab!=attrLength-1){Q.push(",&nbsp;");
if(N.pluginType&&N.pluginType=="1"){R+=",&nbsp;"
}}Q.push("</span>")
}if(R!=""){Q[V]='<div class="detail-sku" title="'+R+'">'
}if(!!N.sellingPlanName){Q.push('<div class="plan_name">');
Q.push(N.sellingPlanName);
Q.push("</div>")
}Q.push("</div>")
}if(N.hasState==="1"){var ae="";
if(N.stateConfigMap&&N.stateConfigMap.label&&N.stateConfigMap.label.bold==="1"){ae+="font-weight:700;"
}if(N.stateConfigMap&&N.stateConfigMap.label&&N.stateConfigMap.label.italic==="1"){ae+="font-style:oblique;"
}if(N.stateConfigMap&&N.stateConfigMap.label&&N.stateConfigMap.label.underLine==="1"){ae+="text-decoration:underline;"
}if(N.stateConfigMap&&N.stateConfigMap.label&&N.stateConfigMap.label.color.length>0){ae+="color:"+N.stateConfigMap.label.color+";"
}var P="<div class='cart-skuState'><span style='"+ae+"'>"+N.stateLabel+"</span></div>";
Q.push(P)
}if(N.attachImgUrl&&N.attachImgUrl!=""){var Z=N.attachImgUrl.split(".").pop().toLowerCase();
var F=["jpg","jpeg","png","gif","bmp"];
if(F.includes(Z)){Q.push('<a class="downImg" href="'+N.attachImgUrl+'" download>'+p.imgDownload+"</a>")
}else{Q.push('<a class="downImg" href="'+N.attachImgUrl+'" download>'+p.fileDownload+"</a>")
}}Q.push('<div class="input-wrap">');
Q.push('<span class="reduce" data-attr="minus">-</span>');
Q.push('<input type="number" data-attr="prodQuantity" prodId="'+N.prodId+'" skuValueId="'+N.skuValueId+'" value="'+N.orderProdQuantity+'" data-id="'+N.orderProdId+'">');
Q.push('<span class="add" data-attr="plus">+</span>');
Q.push('<div class="hide  low-stocks-error" data-attr="layerProdQuantityTip" data-id="'+N.orderProdId+'"></div>');
Q.push("</div>");
Q.push("</div>");
if(G&&K){var U=N.orderProdWholeSaleResult||"";
if(!!U){Q.push('<script dataId="'+N.orderProdId+'" type="text/wholeSale">');
Q.push(h.toJSON(N.orderProdWholeSaleResult));
Q.push("<\/script>")
}}Q.push("</li>")
}return Q.join("")
}function b(E,F){h.ajax({url:"/phoenix/admin/order/addToCart",type:"post",dataType:"json",data:{extendProp:E,quantity:1,prodIds:F},success:function(G){}})
}function e(F,G,H){var J=F.find("script[type=text\\/wholeSale][dataId="+G+"]");
if(!!!J.length){return true
}var L=h.trim(J.html());
if(!J.length||!!!L){return true
}try{L=h.parseJSON(L)
}catch(K){L={}
}if(!h.isEmptyObject(L)){var I=L.min||1;
var E=L.max||"";
if(H<I){F.find("div[data-attr=prodQuantityTip][data-id="+G+"]").html(minTipStr.replace("{0}",I)).addClass("weidget-low-stocks-error").show();
return false
}if(!!E&&H>E){F.find("div[data-attr=prodQuantityTip][data-id="+G+"]").html(maxTipStr.replace("{0}",E)).addClass("weidget-low-stocks-error").show();
return false
}}return true
}function n(F,E){A=true;
u();
h.ajax({url:"/phoenix/admin/order/updateShoppingcartItemQuantity",type:"post",dataType:"json",data:{quantity:F,orderProdId:E},success:function(G){A=false;
u()
}})
}function u(){if(A){h(".cart-ul").find(".cart-list").each(function(){h(this).find(".input-wrap").find('input[type="number"]').prop("readonly",true);
h(this).find(".input-wrap").find(".reduce").css("cursor","not-allowed");
h(this).find(".input-wrap").find(".add").css("cursor","not-allowed");
h(this).find(".input-wrap").find(".reduce").addClass("waitting")
})
}else{h(".cart-ul").find(".cart-list").each(function(){h(this).find(".input-wrap").find('input[type="number"]').prop("readonly",false);
h(this).find(".input-wrap").find(".reduce").css("cursor","pointer");
h(this).find(".input-wrap").find(".add").css("cursor","pointer");
h(this).find(".input-wrap").find(".reduce").removeClass("waitting")
})
}}function m(F,E){var G={url:"/phoenix/admin/order/deleteShoppingcartItem",dataType:"json",type:"post",data:{deleteProdIds:F},done:function(H,J,I){p.afterRemoveShoppingcartProd(E)
},fail:function(H,J,I){}};
y.ajax(G)
}function D(){var E=h("div[data-attr=layerShoppingcart]");
if(!E.length){return
}p.close(E);
p.minus(E);
p.plus(E);
p.prodQuantity(E);
y.payCoinExchange.handleElement(h("div[data-attr=layerShoppingcart][data-type=layerShoppingcart]"));
p.countPrice(E);
p.countTotalNum(E);
p.submitOrder(E);
k("init");
h(".total-price").find(".selectAll").children("input").click(function(){k("")
});
h(".cart-ul").find(".cart-ipt").click(function(){setTimeout(function(){var G=h(".cart-ul").find(".cart-ipt").length;
var F=0;
h(".cart-ul").find(".cart-ipt").each(function(){if(h(this).is(":checked")){F++;
h(".cart-wrap-fixedr .menu-btn .delBtn").removeClass("btn-del-no")
}});
if(F===0){h(".cart-wrap-fixedr .menu-btn .delBtn").addClass("btn-del-no")
}if(F==G){h(".total-price").find(".selectAll").children("input").prop("checked",true)
}else{h(".total-price").find(".selectAll").children("input").prop("checked",false)
}p.countPrice(h(".cart-wrap"));
p.countTotalNum(h(".cart-wrap"));
z(h(".cart-wrap"))
},100)
})
}function l(){h("#shoppingCartDiscountPrice").val(0);
h("[data-attr=layerShoppingCartDiscount]").html(0);
h("[data-attr=layerShoppingCartTotalPrice]").html(0);
h("#cart-dialog").find(".discount-active-title").remove();
h(".discount-content span.currencySymbol").html("")
}function k(F){var E=h(".total-price").find(".selectAll").children("input");
if("init"==F){E.prop("checked",true)
}if(E.is(":checked")){h(".cart-wrap-fixedr .menu-btn .delBtn").removeClass("btn-del-no");
h(".cart-ul").find(".cart-ipt").each(function(){h(this).prop("checked",true)
})
}else{h(".cart-ul").find(".cart-ipt").each(function(){h(this).prop("checked",false)
});
h(".cart-wrap-fixedr .menu-btn .delBtn").addClass("btn-del-no")
}l();
p.countPrice(h(".cart-wrap"));
p.countTotalNum(h(".cart-wrap"));
z(h(".cart-wrap"))
}h.extend(p,{close:function(E){h("body").unbind("click.shopcartstatus").bind("click.shopcartstatus",function(G){var F=h(G.target);
var H=F.attr("id");
if(h("#shop_mc").length!==0){if(F.closest("div[data-attr=layerShoppingcart][data-type=layerShoppingcart]").length==0&&H!="addToCart"&&H!="addToCartList"&&H=="shop_mc"){E.triggerHandler("close")
}}else{if(F.closest("div[data-attr=layerShoppingcart][data-type=layerShoppingcart]").length==0&&H!="addToCart"&&H!="addToCartList"){E.triggerHandler("close")
}}});
E.unbind("close").bind("close",function(F){E.css({right:"-100%"},function(){E.remove()
});
h("body").css("overflow","auto");
h("body.frontend-body-canvas").removeClass("body-over-hidden");
h(document).find("html").css("overflow-y","auto");
h(".recommend_cart_mc").remove();
h(".recommend_cart_detail_zzw_script").remove();
h(".recommend_cart").remove();
h(".recommend_cart_detail_zzw").remove()
});
E.find(".close").unbind("click").bind("click",function(){E.triggerHandler("close")
});
E.find(".continue").click(function(){E.triggerHandler("close")
});
E.find(".delBtn").click(function(){var F=false;
h(".cart-ul .cart-list input.cart-ipt").each(function(I){if(h(this).prop("checked")){F=true
}});
if(!F){return false
}var H=o.confirm(p.phoenix_shopingcart_confirmDel);
if(H){var G=[];
h(".cart-ul").find(".cart-list").each(function(){if(h(this).find(".cart-ipt").is(":checked")){G.push(h(this).find('input[type="number"]').attr("data-id"));
h(this).remove();
p.countPrice(E);
p.countTotalNum(E);
z(E)
}m(G.join(","),E)
})
}})
}});
h.extend(p,{minus:function(E){var G=E.find("[data-attr=minus]"),F=h("[data-attr=shoppingcartLayerSub]");
G.unbind("click").bind("click",function(){var L=h(this);
if(A){return
}if(h(this).hasClass("waitting")){return
}var J=L.next("[data-attr=prodQuantity]");
if(!J.length){return
}var H=J.attr("data-id");
var I=h.trim(J.val());
if(!p.isProdQuantity(I)){I="1"
}if(e(E,H,I)){z(E)
}I=parseInt(I)-1;
if(I<=0){C(E,L.parents('[data-attr="prod"]'));
return
}if(!p.isProdQuantity(I)){I="1"
}var K=h(this).parent().parent().parent().find(".cart-ipt").is(":checked");
J.val(I);
var N=h(this).parent().find('input[type="number"]').val();
var M=h(this).parent().find('input[type="number"]').attr("data-id");
n(N,M);
if(K){p.countPrice(E);
p.countTotalNum(E)
}else{}})
},plus:function(E){var G=E.find("[data-attr=plus]"),F=h("[data-attr=shoppingcartLayerSub]");
G.unbind("click").bind("click",function(){if(A){return
}if(h(this).hasClass("waitting")){return
}var J=h(this).prev("[data-attr=prodQuantity]");
if(!J.length){return
}var H=J.attr("data-id");
var I=h.trim(J.val());
if(!p.isProdQuantity(I)){I="1"
}I=parseInt(I)+1;
if(!p.isProdQuantity(I)){I="1"
}if(e(E,H,I)){z(E)
}var K=h(this).parent().parent().parent().find(".cart-ipt").is(":checked");
J.val(I);
var M=h(this).parent().find('input[type="number"]').val();
var L=h(this).parent().find('input[type="number"]').attr("data-id");
n(M,L);
if(K){p.countPrice(E);
p.countTotalNum(E)
}else{}})
},prodQuantity:function(E){var F=E.find("[data-attr=prodQuantity]"),G=h("[data-attr=shoppingcartLayerSub]");
F.unbind("blur").bind("blur",function(){if(A){alert(p.phoenix_shopingcart_frequency);
return
}var H=h(this).attr("data-id");
var J=h(this);
var I=h.trim(J.val());
if(!p.isProdQuantity(I)){I="1"
}if(e(E,H,I)){z(E)
}J.val(I);
n(I,J.attr("data-id"));
p.countPrice(E);
p.countTotalNum(E);
z(E)
})
},afterRemoveShoppingcartProd:function(E){var F=E.find("[data-attr=prod]").length;
if(!F){if(h(".empty-cart").length==0){E.find("form .close").after(h('<p class="empty-cart">'+p.phoenix_shopingcart_empty+"</p>"))
}h(".cart-wrap form .total-price").remove();
h(".cart-wrap form .menu-btn").remove()
}},countPrice:q});
h.extend(p,{countTotalNum:function(E){var F=E.find("[data-attr=prod]");
var H=0;
F.each(function(){if(!h(this).find(".cart-ipt").is(":checked")){return true
}var K=h(this).find("input[data-attr=prodQuantity]"),J=0;
if(!K.length){return
}J=h.trim(K.val());
if(!!!J||isNaN(J)){return
}if(!p.isProdQuantity(J)){return
}H=H+parseInt(J)
});
var G=h("span[data-attr=shoppingcartNum]");
if(!G.length){return
}var I=G.html();
I=I.replace(/\d+/,F.length);
G.html(I)
},calFullDiscount:function(E,H,I){if(!!!E){return
}var F=[];
var G={url:"/phoenix/admin/order/calFullDiscount",dataType:"json",type:"post",data:{prodConf:JSON.stringify(E)},done:function(J,L,K){if(L=="success"){if(J&&J.discountPrice!=null&&J.discountPrice!=j&&J.discountPrice!=""&&!isNaN(J.discountPrice)){J.discountPrice=(Math.abs(Number(J.discountPrice).toFixed(2))*H).toFixed(2)
}h("#cart-dialog").find(".total-price").find(".discount-content").remove();
h("#cart-dialog").find(".discount-active-title").remove();
if(J.hasFullDiscount==="1"){if(J.schemeType!="2"){F.push('<div class="discount-content"><div class="discount-content-item"><p class="discount-title">'+y.message(y.lanEdition,"phoenix_shopingcart_discount")+"</p>");
F.push('<p><span class="fl price-all discount-all currencySymbol">-'+p.currencySymbol+"</span>");
F.push('<span class="fl price-all discount-all needExchangeValue" data-attr="layerShoppingCartDiscount">'+J.discountPrice+'</span><input type="hidden" id="shoppingCartDiscountPrice" class="hide" value='+J.discountPrice+" > </p></div>");
F.push('<div class="discount-content-item"><p class="discount-title bold">'+y.message(y.lanEdition,"phoenix_orderList_total")+"</p>");
F.push('<p><span class="fl price-all discount-all currencySymbol">'+p.currencySymbol+"</span>");
F.push('<span class="fl price-all discount-all needExchangeValue" data-attr="layerShoppingCartTotalPrice"></span></p></div></div>');
h("#cart-dialog").find(".total-price").append(F.join(""))
}h('ul[data-attr="shoppingcartLayerSub"]').before("<p class='discount-active-title'><span class='discount-active-desc'>"+J.schemeDesc+"</span><a class='read-more-btn' target='_blank' href='"+J.schemeUrl+"'><i class='fa fa-angle-right' aria-hidden='true'></i></a></p>");
I(J.discountPrice)
}}},fail:function(J,L,K){}};
y.ajax(G)
}});
function C(E,H){var F=H.attr("data-id");
H.fadeOut(function(){h(this).remove();
p.afterRemoveShoppingcartProd(E);
p.countPrice(E);
p.countTotalNum(E);
z(E)
});
if(!!!F){return
}var G={url:"/phoenix/admin/order/deleteShoppingcartItem",dataType:"json",type:"post",data:{deleteProdIds:F},done:function(I,K,J){},fail:function(I,K,J){}};
y.ajax(G)
}function q(L){var P=0;
var I,M,O,H,K,G;
var N=f.getCurrencyCookie();
if(!h.isEmptyObject(N)){I=N.defaultRate,M=N.type,O=N.unit,H=N.symbol,K=N.rate;
var G;
try{G=K/I
}catch(J){}}var F=[];
L.find("[data-attr=prod]").each(function(aj,ag){if(!h(this).find(".cart-ipt").is(":checked")){return true
}var ae={};
var W=h(this);
var ai=W.attr("data-id");
var X=h.trim(h(ag).find("input[data-attr=prodQuantity]").val());
var V=W.find("span.needExchangeValue.real");
var T=W.find("[data-attr=prodQuantity]").attr("skuvalueid");
var ac=W.find("[data-attr=prodQuantity]").attr("prodid");
var af=L.find("script[type=text\\/wholeSale][dataId="+ai+"]");
var U=!!af.length;
var an,al,ak,Z;
al=h.trim(V.attr("exchangeValueUnitPrice"));
ak=h.trim(V.attr("exchangeValueDiscountPrice"));
var R=ak||al;
if(U){al=h.trim(V.attr("exchangeValueUnitPrice"));
ak=h.trim(V.attr("exchangeValueDiscountPrice"));
Z=g(L,af,ai,X,ac);
if(typeof Z!="undefined"){if(!!al&&!isNaN(al)){R=s.add(al,Z)
}else{if(!!ak&&!isNaN(ak)){}else{}}}else{if(!!ak&&!isNaN(ak)){R=s.add(ak,0)
}}var Q,S,ab,ah,am,Y;
var aa=f.getCurrencyCookie();
Q=aa.defaultRate,S=aa.type,ab=aa.unit,ah=aa.symbol,am=aa.rate;
R=s.add(R,0);
an=R.toFixed(2);
var ad=(an*am).toFixed(2);
V.attr("exchangeValue",an).html(ad)
}else{if(!U){}}ae.id=ac;
ae.skuValueId=T;
ae.quantity=X;
F.push(ae);
P=s.add(P,s.multiply(R,X))
});
var E=v(P,G,O,H);
if(h.isPlainObject(E)){P=E.newPrice
}P=f.toEurPrice(P,O,H);
r(L,P,H,"layerShoppingCartTotal");
if(F&&F.length){p.calFullDiscount(F,K,function(Q){if(Q&&!isNaN(Q)){var R=s.subtract(P,Q).toFixed(2);
if(Number(Q)>Number(P)){R=0
}r(L,R,H,"layerShoppingCartTotalPrice")
}else{h("[data-attr=layerShoppingCartDiscount]").html(0);
r(L,P,H,"layerShoppingCartTotalPrice")
}})
}else{l()
}}function g(O,J,K,H,I){var P=0;
var G=h.trim(J.html());
if(!J.length||!!!G){return
}try{G=h.parseJSON(G)
}catch(N){G={}
}if(h.isEmptyObject(G)){return
}var Q=G.wholeSaleGradient;
var R=G.wholeSaleJson;
var F=Q;
if(!h.isArray(Q)||!F){return
}var L=G.wholeSaleSumBySku;
var E=O.find("input[prodid="+I+"]");
var M;
if(L==0){var T=0;
E.each(function(){T=Number(h.trim(h(this).val()))+Number(T)
});
M=B(Q,T)
}else{M=B(Q,H)
}if(M==-1){return
}var S=Q[M];
if(typeof S=="undefined"){return
}P=R[S];
if(typeof S=="undefined"){return
}return P
}function B(H,G){var E=-1,F;
for(F=H.length-1;
F>=0;
F--){if(G>=H[F]){E=F;
break
}}return E
}function v(G,E,F,I){if(!!!E||isNaN(E)){return G
}G=f.fixEurNum(G);
if(!!!G||isNaN(G)){return G
}var H=E*G;
if(!!!H||isNaN(H)){return
}H=H.toFixed(2);
return{newPrice:H,symbol:I,unit:F}
}function r(F,G,J,E){var I=F.find("span[data-attr="+E+"]");
if(!I.length){return
}I.html(G);
if(!!!J){return
}var H=I.prev(".currencySymbol");
if(!H.length){return
}H.html(J)
}h.extend(p,{prepareParam:function(E){var F=E.find("[data-attr=prod]");
if(!F.length){p.afterRemoveShoppingcartProd(E);
return
}var G=[];
F.each(function(){if(!h(this).find(".cart-ipt").is(":checked")){return true
}var H=h(this).attr("data-id");
if(!H){return
}var I=h.trim(E.find("input[data-attr=prodQuantity][data-id="+H+"]").val());
if(!p.isProdQuantity(I)){return
}G.push(H+"_"+I)
});
return G.join()
},submitOrder:function(E){E.find("[data-attr=submit]").unbind("click").bind("click",function(){var F=p.prepareParam(E);
if(!!!F){return
}E.find("input[name=extendProp]").val(F);
if(o.fbq&&!o.fbAccessToken){o.fbq("track","InitiateCheckout")
}if(o.ttq){o.ttq.track("InitiateCheckout")
}var G={url:"/phoenix/admin/order/check4Shopcart",type:"post",data:{extendProp:F},done:function(K,I,P){try{K=h.parseJSON(K)
}catch(N){K={}
}if(K.code=="true"){E.find("[data-attr=form]").submit();
return
}if(K.code=="false"){var J=K.msg;
if(J=="phoenix_shopcart_empty"){p.afterRemoveShoppingcartProd(E);
return
}var O=K.msgs,M,H;
if(h.isArray(O)&&O.length){for(M=0,H=O.length;
M<H;
M++){var L=O[M];
E.find("[data-attr=layerProdQuantityTip][data-id="+L.id+"]").html(L.msg).show();
E.find("[data-attr=layerProdQuantityTip][data-id="+L.id+"]").parent(".input-wrap").addClass("div-low-stocks-error");
E.find("[data-attr=layerProdQuantityTip][data-id="+L.id+"]").parent(".input-wrap").find("span").addClass("span-low-stocks-error");
E.find("[data-attr=layerProdQuantityTip][data-id="+L.id+"]").parent(".input-wrap").find("input").addClass("input-low-stocks-error")
}}}},fail:function(H,J,I){}};
y.ajax(G)
})
}});
function z(E){E.find('[data-attr="layerProdQuantityTip"]').hide().html("");
E.find('[data-attr="layerProdQuantityTip"]').parent(".input-wrap").removeClass("div-low-stocks-error");
E.find('[data-attr="layerProdQuantityTip"]').parent(".input-wrap").find("span").removeClass("span-low-stocks-error");
E.find('[data-attr="layerProdQuantityTip"]').parent(".input-wrap").find("input").removeClass("input-low-stocks-error")
}var s=function(){function H(L){return Math.floor(L)===L
}function G(O){var N={times:1,num:0};
var M=O<0;
if(H(O)){N.num=O;
return N
}var Q=O+"";
var P=Q.indexOf(".");
var L=Q.substr(P+1).length;
var R=Math.pow(10,L);
var S=parseInt(Math.abs(O)*R+0.5,10);
N.times=R;
if(M){S=-S
}N.num=S;
return N
}function F(V,U,L,Q){V=f.fixEurNum(V);
U=f.fixEurNum(U);
var N=G(V);
var M=G(U);
var S=N.num;
var R=M.num;
var P=N.times;
var O=M.times;
var T=P>O?P:O;
var W=null;
switch(Q){case"add":if(P===O){W=S+R
}else{if(P>O){W=S+R*(P/O)
}else{W=S*(O/P)+R
}}return W/T;
case"subtract":if(P===O){W=S-R
}else{if(P>O){W=S-R*(P/O)
}else{W=S*(O/P)-R
}}return W/T;
case"multiply":W=(S*R)/(P*O);
return W;
case"divide":W=(S/R)*(O/P);
return W
}}function J(M,L,N){return F(M,L,N,"add")
}function I(M,L,N){return F(M,L,N,"subtract")
}function E(M,L,N){return F(M,L,N,"multiply")
}function K(M,L,N){return F(M,L,N,"divide")
}return{add:J,subtract:I,multiply:E,divide:K}
}()
})(this,jQuery);