/**
 * 全站列表组件前台js
 */
(function(window, $, undefined){
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var fullsite_list = phoenixSite.fullsite_list || (phoenixSite.fullsite_list = {});
    var _options = {};
    $.extend(fullsite_list, {
       init:function(options){
           $.extend(_options, options);
            fullsite_list.initMasonry(_options.widgetClass);
            fullsite_list.initLoading(_options.widgetClass);
            fullsite_list.InitCommentStar();
            fullsite_list.handle_download(_options.widgetClass);
            //fullsite_list.handle_quickBtn(_options.widgetClass);
              $('.fullsite_list .content').find('.tag').hide()
            if(options.prodLabelMark == 1) {
                // fullsite_list.initLabel(options)
            } else {
               $('.fullsite_list .content').find('.tag').show()
            }
           
       },
       //  风格1初始化
       initMasonry(widgetClass){
           console.log("触发瀑布流")
            //    瀑布流
           var $grid = $('.'+widgetClass+" .prodlist_fullSite_grid").masonry({
                gutter: 20,
                columnWidth:'.prodlist_fullSite_grid_item',
                itemSelector: '.prodlist_fullSite_grid_item',
                percentPosition: true
            });
           $grid.imagesLoaded().progress( function() {
               console.log('图片加载完成');
               $grid.masonry('layout');
            });
            $(window).resize(function(){
                setTimeout(function(){
                     $grid.masonry('layout');
                },500)
            });
       },
       //   loading 动画
       initLoading(widgetClass){
           setTimeout(function(){
               $('.'+widgetClass+" .loding").addClass("notShow");
               $('.'+widgetClass+" .sitewidget-prodlist_fullSite").removeClass("notShow");
           },200);
       },
       //  产品星级评价
       InitCommentStar(){
           console.log("触发星级评价")
           //星级评价
            var commentStar = document.getElementsByClassName("comment-star");
            var commentAssessLength = commentStar.length;

            var imgFull = "//a0.leadongcdn.cn/cloud/ikBqiKimRikSmimijljo/full1.png";
            var imgHalf = "//a0.leadongcdn.cn/cloud/ipBqiKimRikSmimiqljo/half1.png";
            var imgEmpty = "//a0.leadongcdn.cn/cloud/iqBqjKlqRikSmriijnjn/empty1.png";
            for (var i = 0; i < commentAssessLength; i++) {
                var starNum = commentStar[i].innerHTML;
                commentStar[i].innerHTML = " ";
                if (starNum * 2 % 2 == 0) {
                    for (var j = 0; j < starNum; j++) {
                        var pb = document.createElement("b");
                        pb.style.backgroundImage = "url(" + imgFull + ")";
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 15 + "px";
                        commentStar[i].appendChild(pb);
                    }
                    var endStarNum = 5 - starNum;
                    for (var k = 0; k < endStarNum; k++) {
                        var pb = document.createElement("b");
                        pb.style.backgroundImage = "url(" + imgEmpty + ")";
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 15 + "px";
                        commentStar[i].appendChild(pb);
                    }
                } else {
                    var starNums = parseInt(starNum);
                    for (var j = 0; j < starNums; j++) {
                        var pb = document.createElement("b");
                        pb.style.backgroundImage = "url(" + imgFull + ")";
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 15 + "px";
                        commentStar[i].appendChild(pb);
                    }
                    var pb = document.createElement("b");
                    //这里半星改为一星
                    pb.style.backgroundImage = "url(" + imgHalf + ")";
                    pb.style.display = "inline-block";
                    pb.style.width = 15 + "px";
                    pb.style.height = 15 + "px";
                    commentStar[i].appendChild(pb);
                    var endStarNum = 5 - starNums - 1;
                    for (var k = 0; k < endStarNum; k++) {
                        var pb = document.createElement("b");
                        pb.style.backgroundImage = "url(" + imgEmpty + ")";
                        pb.style.display = "inline-block";
                        pb.style.width = 15 + "px";
                        pb.style.height = 15 + "px";
                        commentStar[i].appendChild(pb);
                    }
                }
            }
       },
        //    弹窗详情
       handle_quickBtn(widgetClass){
        $('.'+widgetClass+' .InquireAndBasket').mouseover(function(){
            var that=$(this);
            that.addClass('ing');
            setTimeout(rolling,200);
            function rolling(){
                if(that.hasClass('ing')){
                    that.find('span').show();
                    var _width=that.parent().width()-40+'px';
                    that.addClass("large").animate({'width':_width});
                }
            }
        });
        $('.'+widgetClass+' .InquireAndBasket').mouseout(function(){
            var that=$(this);
            that.removeClass('ing');
            setTimeout(rollingBack,50);
            function rollingBack(){
                if(!that.hasClass('ing')){
                    that.removeClass("large").animate({'width':'40px'});
                    that.find('span').hide();
                }
            };
        });
        $('.'+widgetClass+" .sitewidget-bd .prodlist-picbox").mouseenter(function(){
            if(navigator.userAgent.match(/IEMobile|BlackBerry|Android|iPod|iPhone|iPad/i)) {
                return
            }
            if ($(this).find(".prod_img_t12_p2").length){
                $(this).find(".prod_img_t12_p1").stop().fadeOut(700)
                $(this).find(".prod_img_t12_p2").stop().fadeIn(700);

            }
            $(this).find(".prod_show_icon").stop().fadeIn(250);
         })
                $('.'+widgetClass+" .sitewidget-bd .prodlist-picbox").mouseleave(function(){
                    if(navigator.userAgent.match(/IEMobile|BlackBerry|Android|iPod|iPhone|iPad/i)) {
                        return
                    }
                if ($(this).find(".prod_img_t12_p2").length){
                    $(this).find(".prod_img_t12_p1").stop().fadeIn(700)
                    $(this).find(".prod_img_t12_p2").stop().fadeOut(700);

                }
                $(this).find(".prod_show_icon").stop().fadeOut(250);
                })
        $('.prod_show_button').unbind('click').bind('click',function(){
            if($('.current-dialog-list') && $('.current-dialog-list').length) {
                $('.current-dialog-list').remove()
            }
            $('body').css('height','100vh')
            $('body').css('overflow','hidden')
            var currentDialog = $(this).parent().parent().siblings('.dialog-zzw')

            currentDialog.hide()
            var cloneSource = currentDialog.clone()
            cloneSource.addClass('current-dialog-list')
            $('body').append(cloneSource)
            var selectParent = $('.'+widgetClass)
            var prodSkuDom = $("#thumblist").children().clone();

            $('.current-dialog-list .skuParams .description-btn-wrap a').unbind('click').bind('click',function(){
                    if($(this).hasClass('disable')){
                        event.preventDefault(); // 阻止默认事件
                        event.stopPropagation(); // 阻止冒泡
                        return false;
                    }

                var _this = $(this)
                if (_this.hasClass('alfProdDatail')) {
                    if (_this.hasClass("choosed")) {
                        _this.removeClass("choosed");
                        _this.parent().removeClass('choosed')
                    } else {
                        _this.addClass("choosed")
                        _this.parent().addClass("choosed")
                        _this.parent().siblings().removeClass('choosed')
                        _this.parent().siblings().find('a').removeClass("choosed");
                        _this.parent().parent().parent().find('span.order-error-msg').hide();
                    }
                } else {
                    if (_this.hasClass("choosed")) {
                        _this.removeClass("choosed");
                    } else {
                        _this.addClass("choosed").siblings().removeClass("choosed");
                        _this.parent().parent().find('span.order-error-msg').hide();
                    }
                }

                var skuContainer = $('.current-dialog-list').find('.sku-choose-container')
                var optionMap = skuContainer.find('.this-description-table').attr('skumap') && skuContainer.find('.this-description-table').attr('skumap').length && $.parseJSON(skuContainer.find('.this-description-table').attr('skumap'))
                Array.prototype.indexOf = function (val) {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i] == val)
                            return i;
                    }
                    return -1;
                };
                Array.prototype.remove = function (val) {
                    var index = this.indexOf(val);
                    while (index > -1) {
                        this.splice(index, 1);
                        index = this.indexOf(val);
                    }
                };
                var _changImg = "";
                            if (!optionMap) {
                                _changImg = _this.children('img');
                            } else {
                                var value_key = "";
                                var skuBox = _this.parents(".skuParams");
                                skuContainer.find('.radio-choose-btn').removeClass("disable");
                                skuContainer.find(" [name='skuValueId']").val("");
                                var skuParamsLen =  skuContainer.find(" .skuParams").length;
                                var skuParamsArr = [];
                                var skuParamsArrInner = [];
                                for (var i = 0; i < skuParamsLen; i++) {
                                    skuParamsArrInner = [];
                                    for (var j = 0; j < skuContainer.find(".skuParams").eq(i).find(".description-btn-wrap a").length; j++) {
                                        skuParamsArrInner.push(skuContainer.find(" .skuParams").eq(i).find(".description-btn-wrap a").eq(j).attr("value"));
                                    }
                                    skuParamsArr.push(skuParamsArrInner);
                                }
                                function doExchange(arr) {
                                    var len = arr.length;
                                    // 当数组大于等于2个的时候
                                    if (len >= 2) {
                                        // 第一个数组的长度
                                        var len1 = arr[0].length;
                                        // 第二个数组的长度
                                        var len2 = arr[1].length;
                                        // 2个数组产生的组合数
                                        var lenBoth = len1 * len2;
                                        //  申明一个新数组,做数据暂存
                                        var items = new Array(lenBoth);
                                        // 申明新数组的索引
                                        var index = 0;
                                        // 2层嵌套循环,将组合放到新数组中
                                        for (var i = 0; i < len1; i++) {
                                            for (var j = 0; j < len2; j++) {
                                                items[index] = arr[0][i] + "~!!~" + arr[1][j];
                                                index++;
                                            }
                                        }
                                        // 将新组合的数组并到原数组中
                                        var newArr = new Array(len - 1);
                                        for (var i = 2; i < arr.length; i++) {
                                            newArr[i - 1] = arr[i];
                                        }
                                        newArr[0] = items;
                                        // 执行回调
                                        return doExchange(newArr);
                                    } else {
                                        return arr[0];
                                    }
                                }
                                var skuParamsArrAll = doExchange(skuParamsArr);
                                var skuParamsArrAll2 = skuParamsArrAll;
                                for (var key in optionMap) {
                                    for (var a = 0; a < skuParamsArrAll2.length; a++) {
                                        if (skuParamsArrAll2[a] == key) {
                                            skuParamsArrAll.remove(key);
                                        }
                                    }
                                }
                                //以上是后台没有传过来的sku


                                var chooseSku = [];//已选择的项集合
                                var disableClickSku = [];//库存为零或者没有sku项的集合
                                var disTemp = [];//
                                var ableClickSku = [];//可以点击的
                                var optionMapArr = [];//含当前选中的所有项
                                //便利所有选中的，存入chooseSku
                                skuContainer.find(" .radio-choose-btn.choosed").each(function () {
                                    chooseSku.push($(this).attr("value"));
                                });
                                skuContainer.find(" .radio-choose-btn.choosed").each(function () {
                                    var targetArea = $(this).parents(".skuParams").siblings(".skuParams");
                                    var value = $(this).attr("value");
                                    var denialItem = new Array();//禁止点击
                                    optionMapArr = [];
                                    disableClickSku = [];
                                    ableClickSku = [];
                                    targetArea.find(".radio-choose-btn").each(function () {
                                        denialItem.push($(this).attr("value"));
                                    })
                                    for (var key in optionMap) {
                                        optionMapArr.push(key);
                                    }
                                    for (var key in optionMap) {
                                        for (var i = 0; i < chooseSku.length; i++) {
                                            if (-1 == key.indexOf(chooseSku[i])) {
                                                optionMapArr.remove(key);
                                            }
                                        }
                                    }
                                    //此处只使用indexof方法判断是否为匹配的sku不准确
                                    //key由[pkid]_[index]形式组成，当index足够多时，例如 QRKUAfpAUpiQ_10 和 QRKUAfpAUpiQ_1 就冲突了
                                    //所以此处判断取的下一位字符是否为数字，为数字则并非准确匹配
                                    for (var key in optionMap) {
                                        if (-1 != key.indexOf(value)) {
                                            var index = key.indexOf(value);
                                            var length = value.length;
                                            var reg = /^[0-9]$/;
                                            var nextChar = key.substr(index + length, 1);
                                            if (!reg.test(nextChar)) {

                                                if (optionMap[key].stock != 0) {
                                                    key.split("~!!~").forEach(function (key) {
                                                        denialItem.remove(key);
                                                    })
                                                }
                                            }
                                        }
                                    }
                                    for (var i = 0; i < optionMapArr.length; i++) {
                                        for (var key in optionMap) {
                                            if (key == optionMapArr[i]) {
                                                if (optionMap[key].stock == 0) {
                                                    disableClickSku.push(key);
                                                } else {
                                                    ableClickSku.push(key);
                                                }
                                            }
                                        }
                                    }
                                    //后台没有传过来的sku，一定是禁止点击的，所以给添加到disableClickSku中去
                                    for (var i = 0; i < skuParamsArrAll.length; i++) {
                                        disableClickSku.push(skuParamsArrAll[i]);
                                    }
                                    //遍历所有库存为零的sku，
                                    for (var i = 0; i < disableClickSku.length; i++) {
                                        disTemp = [];
                                        disableClickSku[i].split("~!!~").forEach(function (key) {
                                            disTemp.push(key);
                                        })
                                        //如果这条sku剩下没有选择的属性在其他有库存的sku中不存在，则禁止点击
                                        if (disTemp.length > 2 && chooseSku.length != disTemp.length) {
                                            var isAble = 0;
                                            for (var j = 0; j < ableClickSku.length; j++) {
                                                if (-1 != ableClickSku[j].indexOf(disTemp[chooseSku.length])) {
                                                    isAble = 1;
                                                }
                                            }
                                            if (isAble == 0) {
                                                var flag = 0;
                                                for (var k = 0; k < denialItem.length; k++) {
                                                    if (denialItem[k] == disTemp[chooseSku.length]) {
                                                        flag = 1;
                                                    }
                                                }
                                                if (flag == 0) {
                                                    denialItem.push(disTemp[chooseSku.length]);
                                                }
                                            }
                                        }
                                        //当还剩下最后一个未选则时，找出这一个未选择的，如果这个未选择的在其他有库存的sku中不存在，则禁止点击
                                        if (chooseSku.length + 1 == disTemp.length) {
                                            for (var a = 0; a < chooseSku.length; a++) {
                                                disTemp.remove(chooseSku[a]);
                                            }
                                            var isAble = 0;
                                            for (var j = 0; j < ableClickSku.length; j++) {
                                                if (-1 != ableClickSku[j].indexOf(disTemp[0])) {
                                                    isAble = 1;
                                                }
                                            }
                                            if (isAble == 0) {
                                                var flag = 0;
                                                for (var k = 0; k < denialItem.length; k++) {
                                                    if (denialItem[k] == disTemp[0]) {
                                                        flag = 1;
                                                    }
                                                }
                                                if (flag == 0) {
                                                    denialItem.push(disTemp[0]);
                                                }
                                            }
                                        }
                                    }

                                    /*待注释待注释待注释待注释待注释待注释待注释待注释待注释待注释待注释*/
                                    var disableClickSku2 = [];
                                    for (var key in optionMap) {
                                        if (optionMap[key].stock == 0) {
                                            disableClickSku2.push(key);
                                        }
                                    }
                                    //后台没有传过来的sku，一定是禁止点击的，所以给添加到disableClickSku中去
                                    for (var i = 0; i < skuParamsArrAll.length; i++) {
                                        disableClickSku2.push(skuParamsArrAll[i]);
                                    }
                                    for (var i = 0; i < disableClickSku2.length; i++) {
                                        disTemp = [];
                                        disableClickSku2[i].split("~!!~").forEach(function (key) {
                                            disTemp.push(key);
                                        })
                                        //当选中数与sku个数相同，说明全选，则旁边的项如果sku库存为零，禁止点击
                                        var sameChooseArr = [];
                                        if (chooseSku.length == disTemp.length) {
                                            var sameChoose = 0;
                                            for (var m = 0; m < chooseSku.length; m++) {
                                                for (var n = 0; n < disTemp.length; n++) {
                                                    if (chooseSku[m] == disTemp[n]) {
                                                        sameChoose++;
                                                        sameChooseArr.push(chooseSku[m]);
                                                    }
                                                }
                                            }
                                            if (sameChoose + 1 == chooseSku.length) {
                                                for (var o = 0; o < sameChooseArr.length; o++) {
                                                    if (disTemp.indexOf(sameChooseArr[o]) != -1) {
                                                        disTemp.remove(sameChooseArr[o]);
                                                    }
                                                }
                                                denialItem.push(disTemp[0]);
                                            }
                                        }
                                        if (disTemp.length == 1) {
                                            denialItem.push(disTemp[0]);
                                        }
                                    }
                                    //一条sku没有任何值的时候
                                    denialItem.forEach(function (key) {
                                        skuContainer.find(".radio-choose-btn[value='" + key + "']").addClass("disable");
                                    })
                                })
                                //一条sku没有任何值的时候
                                var disableClickSku3 = [];
                                var denialItem2 = [];
                                for (var key in optionMap) {
                                    if (optionMap[key].stock == 0) {
                                        disableClickSku3.push(key);
                                    }
                                }
                                //后台没有传过来的sku，一定是禁止点击的，所以给添加到disableClickSku中去
                                for (var i = 0; i < skuParamsArrAll.length; i++) {
                                    disableClickSku3.push(skuParamsArrAll[i]);
                                }
                                for (var i = 0; i < disableClickSku3.length; i++) {
                                    disTemp = [];
                                    disableClickSku3[i].split("~!!~").forEach(function (key) {
                                        disTemp.push(key);
                                    })
                                    if (disTemp.length == 1) {
                                        denialItem2.push(disTemp[0]);
                                    }
                                }
                                denialItem2.forEach(function (key) {
                                    skuContainer.find(".radio-choose-btn[value='" + key + "']").addClass("disable").removeClass("choosed");
                                })

                                var choosedSize = skuContainer.find(" .radio-choose-btn.choosed").length;
                                var $discount = skuContainer.find('.labelclass .discount')
                                if (choosedSize < skuContainer.find(" .skuParams").length) {
                                    skuContainer.find('#prodDiscountPriceCurrent').hide();
                                    skuContainer.find(' #prodDiscountPrice').show();
                                    skuContainer.find(' #prodPriceCurrent').hide();
                                    skuContainer.find(' #prodPrice').show();
                                    //prodDiscountPrice show的时候，换原标签中的原值
                                    if ($discount.length) {
                                        $discount.each(function(){
                                            var $this=$(this)
                                            $this.find('.off').html(savePercent)
                                            $this.find('.savediscount').html(savediscount)
                                        })
                                    }
                                } else {
                                    skuContainer.find(".radio-choose-btn.choosed").each(function () {
                                        if (!!value_key) {
                                            value_key += "~!!~";
                                        }
                                        value_key += $(this).attr("value");
                                    })
                                    var option = optionMap[value_key];

                                    if (!!option) {
                                        skuContainer.parent().siblings('.prodlist-money').find('#prodPrice .needExchangeValue').attr("exchangevalue", option.price);
                                        skuContainer.parent().siblings('.prodlist-money').find('#prodPrice .needExchangeValue').text(option.price)
                                        if (!!option.relationImage) {

                                            var picSize = 0;
                                            var picMap = {
                                                0: "-460-460",
                                                1: "-300-300",
                                                2: "-400-400",
                                                3: "-350-350"
                                            }
                                            if (!!picSize && "1" != picSize) {
                                                if (_options.prodDetailShowStyle == '4') {
                                                    option.relationImage300 = option.relationImage;
                                                } else {
                                                    option.relationImage300 = option.relationImage300.replace("-300-300", picMap[picSize]);
                                                }
                                            }
                                            _changImg = $("<img src='" + option.relationImage + "' normalimgurl='" + option.relationImage + "' imgurl='" + option.relationImage300 + "' alt=''>");
                                            skuContainer.find("#skuImgUrl").val(option.relationImage);
                                        }
                                        skuContainer.parent().siblings('#prodPlaceOrder').find("[name='skuValueId']").val(option.skuValueId)
                                        skuContainer.find(' #prodDiscountPriceCurrent').show();
                                        skuContainer.find(' #prodDiscountPrice').hide();
                                        skuContainer.find(' #prodPriceCurrent').show();
                                        skuContainer.find(' #prodPrice').hide();

                                    }
                                }

                            }
                            if(_changImg && _changImg.length) {
                                src = _changImg.get(0).src
                                let url = 'url('+src+')'
                                $('.current-dialog-list').find('.prodetail-slider .owl-wrapper .active a').css("background-image", "url("+src+")")


                            }else{
                            $('.current-dialog-list').find('.prodetail-slider .owl-wrapper .owl-item').each(function(){
                                    var img = $(this).find(".swiper-pic");
                                    var imgSrc = $(this).find(".swiper-pic").css('backgroundImage');

                                    if(img.attr("org-img") != imgSrc) {
                                        let url = 'url('+img.attr("org-img")+')'
                                        img.css("background-image",url);
                                    }
                                })
                            }
            })

            cloneSource.show()
            cloneSource.find('#dialog_close').unbind('click').bind('click',function(){
            $('.current-dialog-list').remove()
                $('body').css('hright','auto')
            $('body').css('overflow','auto')
            })
            setTimeout(function(){
                var height = cloneSource.find('.prodetail-slider .owl-item').get(0).clientWidth
                cloneSource.find('.prodetail-slider .owl-item').each(function(i,n){
                if(height){
                    $(n).height(height)
                }else{
                    $(n).height(330)
                }
                })
            },500)
            cloneSource.find('#black').unbind('click').bind('click',function(){
            $('.current-dialog-list').remove()
                $('body').css('hright','auto')
            $('body').css('overflow','auto')
            })
            var selectParent = $('.'+widgetClass)
            var prodSkuDom = $("#thumblist").children().clone();
            var _that = $(this)
            cloneSource.find(".prodetail-slider").owlCarousel({

            singleItem:true,
            autoHeight: true,
            addClassActive:true,
            beforeMove:function(){
                cloneSource.find('.dialog-container .owl-carousel .owl-item').each(function(){
                    var img = $(this).find(".swiper-pic");
                    var imgSrc = $(this).find(".swiper-pic").css('backgroundImage');

                    if(img.attr("org-img") != imgSrc) {
                        let url = 'url('+img.attr("org-img")+')'
                        img.css("background-image",url);
                    }
                });
            }
            });

            // 默认选中sku
            cloneSource.find('.skuParams').each(function (i, n) {
                if ($(n).find("a.radio-choose-btn")[0] != undefined) {
                    if (!($(n).find("a.radio-choose-btn").eq(0).hasClass('choosed'))) {
                    $($(n).find("a.radio-choose-btn")[0]).trigger("click");
                }
                }
            });
            // var dialog =  _that.parent().parent().siblings('.dialog-zzw')
            // 拿到skumap数据
            var skuValueMap = cloneSource.find('.sku-choose-container .this-description-table').attr('skumap')
            cloneSource.append("<div class='skuvalue-img-wrap' style='height:0; width:0; overflow:hidden;'></div>");

            try {
                if (skuValueMap) {
                    var skuValueMapData = $.parseJSON(skuValueMap);
                    var length = 0;
                    for (var n in skuValueMapData) {
                        length++;
                        if (skuValueMapData.length == 1 && skuValueMapData[n].stock == 0) {
                            cloneSource.find('#placeOrder').addClass("disabled");
                            cloneSource.find('#addToCartList').addClass("disabled");
                        }
                        if (skuValueMapData[n].relationImage) {
                            cloneSource.find(".skuvalue-img-wrap").append("<img style='height:0; width:0; overflow:hidden;' src='" + skuValueMapData[n].relationImage + "' />");
                        }
                    }
                    if (length == 1) {
                        for (var n in skuValueMapData) {
                            if (skuValueMapData[n].stock == 0) {

                                cloneSource.find('#placeOrder').addClass("disabled");
                                cloneSource.find('#addToCartList').addClass("disabled");
                            }
                        }
                    }
                }
            } catch (e) {
                try {
                    console && console.log && console.log(e);
                } catch (e) {
                }
            }

        })
       },
        //   下载
       handle_download(widgetClass){
           $('.'+widgetClass+' .down_load').click(function(e){
               if ( e && e.preventDefault ) {
                    e.preventDefault(); 
               }
               
               var url = $(this).attr("data-url");
                const a = document.createElement('a');
                a.style.display = "none";
                a.target = "_black";
                a.setAttribute('href', url);
                a.setAttribute('download', "1111");
                a.click();
           })
       },
       
       initLabel: function (options) {
            var str = '';
            var $li = $(".prodlist_fullSite_wrap ul li")
            $li.each(function (i, data) {
                var pid = $(data).data('pid')
                i === $li.length - 1 ? str += pid : str += pid + ","
            })

            if (!str.length) {
                return
            }
            var isFrontend = window.$_phoenix == undefined;
            console.log(str)

            var url = '/phoenix/admin/prod/label/getBySettingId'
            if (isFrontend) {
                url = '/prod/label/getBySettingId'
            }
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                data: {
                    ids: str,
                    searchComponentSettingId: options.settingId
                },
                success: function (res) {
                    $li.each(function () {

                        var that = this

                        var pid = $(this).data('pid');

                        if (res && res[pid] && res[pid].length > 0) {
                            res[pid].forEach(function (dataItem, i) {
                                //判断是自定义标签
                                var longNum = res[pid].length;
                                if (dataItem['labelDivision'] === "1") {
                                    console.log(dataItem)
                                    
                                    //判断是文本
                                    var html = ''
                                    console.log(dataItem['showType'])
                                    if (dataItem['showType'] === "0") {
                                          console.log($(that).find('.labelfather .prodlistAsync_label_text_tl'), '44444444444444444')
                                        if (dataItem['showPositon'] === "0") {
                                            var $tlDom = $(that).find('.labelfather .prodlistAsync_label_text_tl');
                                            $tlDom.addClass('show');
                                            $tlDom.find('span').css('color', dataItem['fontColor']);
                                            if (dataItem['labelType'] === '1') {
                                                html = "<div class='discount'>"
                                                if (dataItem['discountOff'] && dataItem['discountOff'].length > 0) {
                                                    html += "<span>" + dataItem['discountOff'] + "</span>"
                                                    html += "<br>"
                                                }
                                                if (dataItem['discountContext'] && dataItem['discountContext'].length > 0) {
                                                    html += "<span class='currencySymbol'>Save " + dataItem['discountSymbol'] + "</span>"
                                                    html += "<span class='needExchangeValue' exchangevalue='" + dataItem['discountContext'] + "'>" + dataItem['discountContext'] + "</span>"
                                                }
                                                html += '</div>'
                                                $tlDom.html(html);
                                            } else {
                                                $tlDom.find('div').html(dataItem['labelName']);
                                            }
                                            var top = $tlDom.width() / 1.414 - 6 + "px";
                                            var left = $tlDom.width() / 2.828 - 2;
                                            $tlDom.css({
                                                "left": "-" + left + "px",
                                                "top": top,
                                                'font-size': '10px',
                                                "boxShadow": "0px -100px 0px 100px " + dataItem['backgroundColor'],
                                                "backgroundColor": dataItem['backgroundColor'],
                                                "zIndex": longNum - i
                                            });
                                        } else if (dataItem['showPositon'] === "1") {
                                            var $trDom = $(that).find('.labelfather .prodlistAsync_label_text_tr');
                                            $trDom.addClass('show');
                                            $trDom.find('span').css('color', dataItem['fontColor']);
                                            if (dataItem['labelType'] === '1') {
                                                html = "<div class='discount'>"
                                                if (dataItem['discountOff'] && dataItem['discountOff'].length > 0) {
                                                    html += "<span>" + dataItem['discountOff'] + "</span>"
                                                    html += "<br>"
                                                }
                                                if (dataItem['discountContext'] && dataItem['discountContext'].length > 0) {
                                                    html += "<span class='currencySymbol'>Save " + dataItem['discountSymbol'] + "</span>"
                                                    html += "<span class='needExchangeValue' exchangevalue='" + dataItem['discountContext'] + "'>" + dataItem['discountContext'] + "</span>"
                                                }
                                                html += "</div>"
                                                $trDom.html(html);
                                            } else {
                                                $trDom.find('div').html(dataItem['labelName']);
                                            }
                                          
                                            $trDom.css({
                                                "right": '-5px',
                                                "top": "-5px",
                                                'font-size': '10px',
                                                "boxShadow": "0px -100px 0px 100px " + dataItem['backgroundColor'],
                                                "backgroundColor": dataItem['backgroundColor'],
                                                "zIndex": longNum - i
                                            });
                                        } else if (dataItem['showPositon'] === "2") {
                                            var $tDom = $(that).find('.labelfather>.prodlistAsync_label_text_t');
                                            $tDom.css('flex-direction', 'column');
                                            !$tDom.hasClass('show') ? $tDom.addClass('show') : null;
                                            if (dataItem['labelType'] === '1') {
                                                var $tdivItem = document.createElement('div')
                                                $tdivItem.setAttribute("class", "discount");
                                                if (dataItem['discountOff'] && dataItem['discountOff'].length > 0) {
                                                    html += "<span style='padding:0 5px'>" + dataItem['discountOff'] + "</span>"
                                                }
                                                if (dataItem['discountContext'] && dataItem['discountContext'].length > 0) {
                                                    html += "<span class='currencySymbol'>Save " + dataItem['discountSymbol'] + "</span>"
                                                    html += "<span class='needExchangeValue' style='padding-right:5px' exchangevalue='" + dataItem['discountContext'] + "'>" + dataItem['discountContext'] + "</span>"
                                                }
                                                $tdivItem.innerHTML = html;
                                                $tdivItem.style.backgroundColor = dataItem['backgroundColor'];
                                                $tdivItem.style.color = dataItem['fontColor'];
                                                $tDom.append($tdivItem);
                                                $tDom.css("zIndex", longNum - i)
                                            } else {
                                                var $tspanItem = document.createElement('div');
                                                $tspanItem.innerHTML = dataItem['labelName'];
                                                $tspanItem.style.backgroundColor = dataItem['backgroundColor']
                                                $tspanItem.style.color = dataItem['fontColor']
                                                $tDom.append($tspanItem)
                                                $tDom.css("zIndex", longNum - i)
                                            }
                                            $tDom.each(function (index, element) {
                                                if ($(element).children().length > 1) {
                                                    var widthSon = 0
                                                    $(element).children().each(function (i, ele) {
                                                        widthSon += $(ele).width() + 2
                                                        widthSon += 13
                                                    })
                                                    var fatherwidth = $(that).width()
                                                    if (widthSon > fatherwidth) {
                                                        $(element).css('flex-direction', 'column')
                                                        $($(element).children()[0]).css('margin-bottom', '3px')
                                                    } else {
                                                        $(element).css('flex-direction', 'row')
                                                    }
                                                } else {
                                                    $(element).css('flex-direction', 'row');
                                                }
                                            })
                                        } else if (dataItem['showPositon'] === "4") {
                                            var $txtDom = $(that).find('.top_title .nameOrTitle .inlineLabel'); 
                                            !$txtDom.hasClass('show') ? $txtDom.addClass('show') : null
                                            $txtDom.addClass('discount')
                                            if (dataItem['labelType'] === '1') {
                                                if (dataItem['discountOff'] && dataItem['discountOff'].length > 0) {
                                                    html += "<span style='padding: 0 5px'>" + dataItem['discountOff'] + "</span>"
                                                }
                                                if (dataItem['discountContext'] && dataItem['discountContext'].length > 0) {
                                                    html += "<span class='currencySymbol'>Save " + dataItem['discountSymbol'] + "</span>"
                                                    html += "<span class='needExchangeValue' style='padding-right: 5px' exchangevalue='" + dataItem['discountContext'] + "'>" + dataItem['discountContext'] + "</span>"
                                                }
                                                $txtDom.html(html)
                                            } else {
                                                $txtDom.html(dataItem['labelName'])
                                            }
                                            $txtDom.css({
                                                'backgroundColor': dataItem['backgroundColor'],
                                                'color': dataItem['fontColor'],
                                                "zIndex": longNum - i
                                            });
                                        } 
                                    }else {
                                        console.log( $(that).find(' .labelfather .prodlistAsync_label_img_tr'),dataItem['showPositon'], '==================================')
                                        if (dataItem['showPositon'] === "0") {
                                            var $itlDom = $(that).find(' .labelfather .prodlistAsync_label_img_tl');
                                            $itlDom.addClass('show');
                                            $itlDom.find('img').attr('src', dataItem['picUrl']);
                                            $itlDom.css("zIndex", longNum - i);
                                        } else if (dataItem['showPositon'] === "1") {
                                            var $itrDom = $(that).find(' .labelfather .prodlistAsync_label_img_tr');
                                            
                                            $itrDom.addClass('show')
                                            $itrDom.find('img').attr('src', dataItem['picUrl'])
                                            $itrDom.css("zIndex", longNum - i)
                                        } else if (dataItem['showPositon'] === "3") {
                                            var $irDom = $(that).find(' .labelfather .prodlistAsync_label_img_r');
                                            !$irDom.hasClass('show') ? $irDom.addClass('show') : null;
                                            var $imgItem = document.createElement('img');
                                            $imgItem.setAttribute('src', dataItem['picUrl']);
                                            $irDom.append($imgItem)
                                            $irDom.css("zIndex", longNum - i);
                                        }
                                    }
                                } else {
                                    var $irDom = $(that).find('.labelfather .prodlistAsync_label_img_r');
                                    !$irDom.hasClass('show') ? $irDom.addClass('show') : null;
                                    var $imgItem = document.createElement('img')
                                    $imgItem.setAttribute('src', dataItem['picUrl'])
                                    $irDom.append($imgItem)
                                    $irDom.css("zIndex", longNum - i)
                                }
                            })
                        }
                    })
                }
            })
        }
    });
})(window, jQuery);