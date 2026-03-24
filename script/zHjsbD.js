/**
 * 前台产品列表js
 */
 (function(window, $, undefined){
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    // 产品分类或者文章分类，缓存的分类ID
    var COOKIE_KEY = "PFCC";
    var fullsite_list = phoenixSite.fullsite_list || (phoenixSite.fullsite_list = {});
    var _options = {};
    var isFrontend = window.$_phoenix == undefined;
    $.extend(fullsite_list, {
        initFront: function(options){
            $.extend(_options, options);
            var renderOnce=$("div[classattr="+_options.widgetClass+"]").attr("renderonce");
            var str='';
            var $li = $('.'+_options.widgetClass+" li.prodlist-encodePk-container")
                $li.each(function(i, data) {
                var pid =$(data).data('pid')
                i===$li.length-1?str+=pid:str+=pid+","
            })          
            if(str.length>0 && renderOnce!='true') {
                var url='/prod/label/get';
                if(isFrontend){
                    url='/phoenix/admin/prod/label/';
                    if (phoenixSite && phoenixSite.page && phoenixSite.page._menu_prefix) {
                        url = phoenixSite.page._menu_prefix + '/phoenix/admin/prod/label/';
                    }
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        ids:str
                    },
                    success: function(res){
                        $li.each(function(){
                            var that=this
                            var pid =$(this).data('pid')
                            if(res&&res[pid]&&res[pid].length>0){
                                res[pid].forEach(function (dataItem,i){
                                    //判断是自定义标签
                                    var longNum=res[pid].length
                                    if(dataItem['labelDivision']==="1"){
                                        if(dataItem['labelType']==='0'){
                                            $(that).find('.prodlist-cell a').css({
                                                'opacity': dataItem['transparency'],
                                                "display":'inline-block'
                                            })
                                        }
                                        //判断是文本
                                        var html=''
                                        if(dataItem['showType']==="0"){
                                            if(dataItem['showPositon']==="0"){
                                                var $tlDom = $(that).find('.img_container.labelfather .prodlistAsync_label_text_tl')
                                                $tlDom.addClass('show')
                                                $tlDom.find('span').css('color',dataItem['fontColor'])
                                                if(dataItem['labelType']==='1'){
                                                    html="<div class='discount'>"
                                                    if(dataItem['discountOff']&&dataItem['discountOff'].length>0){
                                                        html += "<span>" + dataItem['discountOff'] + "</span>"
                                                        html +="<br>"
                                                    }
                                                    if(dataItem['discountContext']&&dataItem['discountContext'].length>0){
                                                        html += "<span class='currencySymbol'>Save "+dataItem['discountSymbol']+"</span>"
                                                        html += "<span class='needExchangeValue' exchangevalue='"+dataItem['discountContext']+"'>"+dataItem['discountContext']+"</span>"
                                                    }
                                                    html+='</div>'
                                                    $tlDom.html(html)
                                                }else{
                                                    $tlDom.find('div').html(dataItem['labelName'])
                                                }
                                             var top=$tlDom.width()/1.414 - 6 +"px"
                                                var left=$tlDom.width()/2.828 - 2
                                                $tlDom.css({
                                                    "left":"-"+left+"px",
                                                    "top":top,
                                                    'font-size': '10px',
                                                    "boxShadow": "0px -100px 0px 100px " + dataItem['backgroundColor'],
                                                    "backgroundColor": dataItem['backgroundColor'],
                                                    "zIndex":longNum-i
                                                });
                                            }else if(dataItem['showPositon']==="1"){
                                                var $trDom = $(that).find('.img_container.labelfather .prodlistAsync_label_text_tr');
                                                $trDom.addClass('show')
                                                $trDom.find('span').css('color',dataItem['fontColor'])
                                                if(dataItem['labelType']==='1'){
                                                    html = "<div class='discount'>"
                                                    if(dataItem['discountOff']&&dataItem['discountOff'].length>0){
                                                        html += "<span>" + dataItem['discountOff'] + "</span>"
                                                        html +="<br>"
                                                    }
                                                    if(dataItem['discountContext']&&dataItem['discountContext'].length>0){
                                                        html += "<span class='currencySymbol'>Save "+dataItem['discountSymbol']+"</span>"
                                                        html += "<span class='needExchangeValue' exchangevalue='"+dataItem['discountContext']+"'>"+dataItem['discountContext']+"</span>"
                                                    }
                                                    html+="</div>"
                                                    $trDom.html(html)
                                                }else{
                                                    $trDom.find('div').html(dataItem['labelName'])
                                                }
                                                $trDom.css({
                                                    "right":'-5px',
                                                    "top":"-5px",
                                                    'font-size': '10px',
                                                    "boxShadow": "0px -100px 0px 100px " + dataItem['backgroundColor'],
                                                    "backgroundColor": dataItem['backgroundColor'],
                                                    "zIndex":longNum-i
                                                });
                                            }else if(dataItem['showPositon']==="2"){
                                                var $tDom = $(that).find('.img_container.labelfather>.prodlistAsync_label_text_t');
                                                $tDom.css('flex-direction','column')
                                                !$tDom.hasClass('show')?$tDom.addClass('show'):null
                                                if(dataItem['labelType']==='1'){
                                                    var $tdivItem = document.createElement('div')
                                                    $tdivItem.setAttribute("class","discount");
                                                    if(dataItem['discountOff']&&dataItem['discountOff'].length>0){
                                                        html += "<span style='padding:0 5px'>" + dataItem['discountOff'] + "</span>"
                                                    }
                                                    if(dataItem['discountContext']&&dataItem['discountContext'].length>0){
                                                        html += "<span class='currencySymbol'>Save "+dataItem['discountSymbol']+"</span>"
                                                        html += "<span class='needExchangeValue' style='padding-right:5px' exchangevalue='"+dataItem['discountContext']+"'>"+dataItem['discountContext']+"</span>"
                                                    }
                                                    $tdivItem.innerHTML=html
                                                    $tdivItem.style.backgroundColor=dataItem['backgroundColor']
                                                    $tdivItem.style.color=dataItem['fontColor']
                                                    $tDom.append($tdivItem)
                                                    $tDom.css("zIndex",longNum-i)
                                                }else{
                                                    var $tspanItem = document.createElement('div')
                                                    $tspanItem.innerHTML = dataItem['labelName'];
                                                    $tspanItem.style.backgroundColor=dataItem['backgroundColor']
                                                    $tspanItem.style.color=dataItem['fontColor']
                                                    $tDom.append($tspanItem)
                                                    $tDom.css("zIndex",longNum-i)
                                                }
                                                $tDom.each(function (index,element) {
                                                    if($(element).children().length>1){
                                                        var widthSon=0
                                                        $(element).children().each(function (i,ele) {
                                                            widthSon+=$(ele).width()+2
                                                            widthSon+=13
                                                        })
                                                        var fatherwidth=$(that).width()
                                                        if(widthSon>fatherwidth){
                                                            $(element).css('flex-direction','column')
                                                            $($(element).children()[0]).css('margin-bottom','3px')
                                                        }else{
                                                            $(element).css('flex-direction','row')
                                                        }
                                                    }else{
                                                        $(element).css('flex-direction','row')
                                                    }
                                                })
                                            }else if(dataItem['showPositon']==="4"){
                                                var $txtDom =$(that).find('.top_title .nameOrTitle .inlineLabel');                                       
                                                !$txtDom.hasClass('show')?$txtDom.addClass('show'):null
                                                $txtDom.addClass('discount')
                                                if(dataItem['labelType']==='1'){
                                                    if(dataItem['discountOff']&&dataItem['discountOff'].length>0){
                                                        html += "<span style='padding: 0 5px'>" + dataItem['discountOff'] + "</span>"
                                                    }
                                                    if(dataItem['discountContext']&&dataItem['discountContext'].length>0){
                                                        html += "<span class='currencySymbol'>Save "+dataItem['discountSymbol']+"</span>"
                                                        html += "<span class='needExchangeValue' style='padding-right: 5px' exchangevalue='"+dataItem['discountContext']+"'>"+dataItem['discountContext']+"</span>"
                                                    }
                                                    $txtDom.html(html)
                                                }else{
                                                    $txtDom.html(dataItem['labelName'])
                                                }
                                                $txtDom.css({
                                                    'backgroundColor': dataItem['backgroundColor'],
                                                    'color': dataItem['fontColor'],
                                                    "zIndex":longNum-i
                                                });
                                            }
                                        }else{
                                            if(dataItem['showPositon']==="0"){
                                                var $itlDom = $(that).find('.img_container.labelfather .prodlistAsync_label_img_tl')
                                                $itlDom.addClass('show')
                                                $itlDom.find('img').attr('src',dataItem['picUrl'])
                                                $itlDom.find('img').attr('alt',dataItem['labelName'])
                                                $itlDom.css("zIndex",longNum-i)
                                            }else if(dataItem['showPositon']==="1"){                                         
                                                var $itrDom = $(that).find('.img_container.labelfather .prodlistAsync_label_img_tr');
                                                $itrDom.addClass('show')
                                                $itrDom.find('img').attr('src',dataItem['picUrl'])
                                                $itrDom.find('img').attr('alt',dataItem['labelName'])
                                                $itrDom.css("zIndex",longNum-i)
                                            }else if(dataItem['showPositon']==="3") {
                                                var $irDom = $(that).find('.img_container.labelfather .prodlistAsync_label_img_r')
                                                !$irDom.hasClass('show')?$irDom.addClass('show'):null
                                                var $imgItem = document.createElement('img')
                                                $imgItem.setAttribute('src',dataItem['picUrl'])
                                                $imgItem.setAttribute('alt',dataItem['labelName'])
                                                $irDom.append($imgItem)
                                                $irDom.css("zIndex",longNum-i)
                                            }
                                        }
                                    }else {
                                        var $irDom = $(that).find('.img_container.labelfather .prodlistAsync_label_img_r')
                                        !$irDom.hasClass('show') ? $irDom.addClass('show') : null
                                        var $imgItem = document.createElement('img')
                                        $imgItem.setAttribute('src', dataItem['picUrl'])
                                        $imgItem.setAttribute('alt',dataItem['labelName'])
                                        $irDom.append($imgItem)
                                        $irDom.css("zIndex",longNum-i)
                                    }
                                })
                            }
                        })

                    }
                });
                //当不选择分页且产品展示方式按分类展示init方法会多次调用，导致标签多次渲染临时处理多次调用问题
                if(_options.prodShowFlag=='1' && _options.paginationFlag=='0'){
                    $("div[classattr="+_options.widgetClass+"]").attr("renderonce","true");
                }
            }

            // 产品列表组件分页，局部刷新跳转页面后，需要定位产品列表上方
            function goTopView(){
                var _href = $(this).attr("href");
                if(_href){
                    if(_href.indexOf("phoenixSite")>0){
                        document.querySelector("."+_options.widgetClass).scrollIntoView();
                    }
                }
            }
            if(options.selectProductListStyle == '0' || options.selectProductListStyle == '8') {
                initAudio(options)
            }
            // 节流
            var flag = true;
            $(window).resize(function(){
                if(flag) {
                    setTimeout(function(){
                        flag = true;
                        initAudio(options)
                    },1000)
                }
                flag = false
            });
            // $(document).on("click","."+_options.widgetClass+" .pagination a",goTopView);
            // $(document).on("click","."+_options.widgetClass+" .paging a",goTopView);
        },
		prodSort:function(options){
			var prodListWrap = null;
			var prodListSortFrom = null;
			var path = location.origin + location.pathname;
			/*
			 * search可能存在场景
			 * 1.  == ''
			 * 2. 包含 当前点击元素的属性
			 * 3. 不包含当前点击元素的属性
			 * */

			if(!options.widgetClass){
				return;
			}
			prodListWrap = $(options.widgetClass)
			prodListSortFrom = prodListWrap.find(".sitewidget-prodlist-sortFrom");
			$('.prodSort',prodListSortFrom).change(function(){
				var url = location.hrft;
				var value = $(this).val()
				location.href="?srot=" + value
				//prodListSortFrom.submit();
			})

			$('input[type="radio"]').change(function(){

			})
		},
        isPropertySupported:function (property){
            return property in document.body.style;
        },
        bindFrontEvent: function(){
            var _this=this;
            // 判断是否有产品
            var _hasProducts = _options.hasProducts;
            var selectProductListStyle = _options.selectProductListStyle;
            var widgetClass = _options.widgetClass;
            var phoenix_product_more_des = _options.phoenix_product_more_des;
            var phoenix_product_closed = _options.phoenix_product_closed;
            var phoenix_shopingcart_notice = _options.phoenix_shopingcart_notice;
            var phoenix_error_buy_prod = _options.phoenix_error_buy_prod;
            var payModuleFlag = _options.payModuleFlag;
            var prodPhotoSize = _options.prodPhotoSize;
            // 用于写产品分类id的cookie
            var categoryIdPagination = _options.phoenix_categoryIdPagination;
            if (!_hasProducts) {
                return;
            }
            // 将当前的分类id，写入cookie，为分页做准备
            if (categoryIdPagination == '-1') {
                $.cookie('PFCC', '', {
                    expires: -1
                });
            }
            else {
                // $.cookie('PFCC', 'productGroupId_' + categoryIdPagination, {
                //     expires: 24 * 60 * 60,
                //     path: '/'
                // });
            }
            if (selectProductListStyle == '0' || selectProductListStyle == '11' || selectProductListStyle == '12' || selectProductListStyle == '14') {
                // 风格一 盒子变小规则
                var setWidthClass = function(obj){
                    var obj = obj;
                    var className = "";



                    obj.each(function(){
                        _that = $(this);
                        var $picbox = _that.find('.prodlist-picbox')
                        var winWidth = parseInt(_that.width());

                        //栅格2 产品列表不重新计算图片高度
                        //if (winWidth <= 225) {
                        //$picbox.height(winWidth - 10);
                        //}else {
                        //$picbox.attr('style', '');
                        //}

                        if (winWidth <= 225) {
                            className = "piclist-all profixlist480";
                        }
                        else if (winWidth <= 280) {
                            className = "piclist140 profixlist480";
                        }
                        else if (winWidth <= 310) {
                            className = "piclist320 profixlist480";
                        }
                        else if (winWidth <= 365) {
                            className = "piclist360 profixlist480";
                        }
                        else if (winWidth <= 415) {
                            className = "piclist180 profixlist480";
                        }
                        else if (winWidth <= 480) {
                            className = "piclist960 profixlist480";
                        }
                        else if (winWidth <= 580) {
                            className = "piclist180 profixlist740";
                        }
                        else if (winWidth <= 680) {
                            className = "piclist480 profixlist740";
                        }
                        else if (winWidth <= 740) {
                            className = "piclist230 profixlist740";
                        }
                        else if (winWidth <= 800) {
                            className = "piclist180 profixlist960";
                        }
                        else if (winWidth <= 960) {
                            className = "piclist900 profixlist960";
                        }
                        else if (winWidth <= 980) {
                            className = "piclist960 profixlist1180";
                        }
                        else if (winWidth <= 1180) {
                            className = "piclist1180 profixlist1180";
                        }
                        else if (winWidth <= 2000) {
                            className = "piclist1180 profixlistfull";
                        }
                        var lastwidthName = _that.attr("widthName");
                        _that.attr("widthName", className).removeClass(lastwidthName).addClass(className);
                        //浏览器不支持aspectRatio，走系统默认的设置宽高
                        var notAspectRatio = false;
                        if (!_this.isPropertySupported('aspectRatio')) {
                            // 浏览器不支持 aspectRatio 属性
                            notAspectRatio=true;
                        }
                        //prodListNew 是老的产品列表不做修改
                        if((selectProductListStyle == '0' && notAspectRatio) || widgetClass.indexOf('prodListNew')>-1){
                            var liwidth = _that.find('.prodlist-fix-num li').width();
                            function ratio(prodPhotoSize){
                                switch (prodPhotoSize) {
                                    case '0':
                                        return liwidth;
                                    case '1':
                                        return liwidth * 2 / 3;
                                    case '2':
                                        return liwidth * 3 / 2;
                                    case '3':
                                        return liwidth * 3 / 4;
                                    case '4':
                                        return liwidth * 4 / 3;
                                    case '5':
                                        return liwidth * 9 / 16;
                                    case '6':
                                        return liwidth * 16 / 9;
                                }
                            }
                        _that.find('.prodlist-fix-num .prodlist-display').width(liwidth - 12).height(ratio(prodPhotoSize) - 12);
                        }

                    })
                    // //按钮外围高度计算
                }
                setWidthClass($('.' + widgetClass));
                onloadHack(function(){
                    setTimeout(function(){
                        setWidthClass($('.' + widgetClass));
                    },200)
                })
                $(window).on('resize.fullsite_list', function(){
                    setTimeout(function() {
                        setWidthClass($('.' + widgetClass));
                    }, 0)
                })
            }
            else if (selectProductListStyle == '4' || selectProductListStyle == '1' || selectProductListStyle == '5') {
                // 第2,3,4种风格
                var setdbWidthClass = function(obj){
                    var obj = obj;
                    var dbclassName = "";
                    obj.each(function(){
                        _that = $(this);
                        var winWidth = parseInt(_that.width());
                        if (winWidth >= 960) {
                            dbclassName = "dbPro960";
                        }
                        else if (winWidth >= 780) {
                            dbclassName = "dbPro780";
                        }
                        else if (winWidth >= 680) {
                            dbclassName = "dbPro680";
                        }
                        else if (winWidth >= 470) {
                            dbclassName = "dbPro470";
                        }
                        else if (winWidth >= 380) {
                            dbclassName = "dbPro380";
                        }
                        else if (winWidth >= 280) {
                            dbclassName = "dbPro280";
                        }
                        else {
                            dbclassName = "dbPro225";
                        }
                        if (!_that.find("li:even").hasClass("even")) {
                            _that.find("li:even").addClass("even");
                        }
                        if (!_that.find("li:odd").hasClass("odd")) {
                            _that.find("li:odd").addClass("odd");
                        }
                        var lastwidthName = _that.attr("dbclassName");
                        _that.attr("dbclassName", dbclassName).removeClass(lastwidthName).addClass(dbclassName);
                    })
                }
                setdbWidthClass($("." + widgetClass));
                $(window).resize(function(){
                    setdbWidthClass($('.' + widgetClass))
                })
            }

            if (selectProductListStyle == '5') {
                // 以文字为主的列表
                $('.prodlist-lists-right .prodDeshow a').click(function(){
                    var $prodDesc = $(this).parents('.prodlist-box-hover').find('.prodDesc');
                    if ($prodDesc.is(':visible')) {
                        $prodDesc.hide();
                        $(this).text(phoenix_product_more_des);
                    }
                    else {
                        $prodDesc.show();
                        $(this).text(phoenix_product_closed);

                        // 产品描述表格及图片处理
                        tableScroll($prodDesc[0]);
                    }
                    return false;
                })
            }


            /*
		     * 2014-08-07
		     * 橱窗列表滚动效果
		     * @param：
		     obj:被调用ul的父级
		     EFFECT:图片间距
		     OPP:反响运动,默认false
		     Marquee:是否无缝滚动，默认为true
		     */
		    phoenixSite.sitewidgets.showcaseScrollEffect = function(obj, EFFECT, OPP, Marquee){
		        //外围宽度除以list宽度，得到每行显示的列数
                var ulW = $(obj).width();
                var autoPlay=true,interTime=2500;
                var radioVal=$(obj).attr("data-radio");
                var time=$(obj).attr("data-time");
                if($(obj).hasClass('prodNamerollingForTwo')){
                    if(radioVal=='1'){
                        interTime=time;
                    }else{
                        autoPlay=false;
                    }
                }
		        var listW = $(obj + " li").width();
		        //每行可以摆下的列数
		        var res = parseInt(ulW / listW) > 1 ? parseInt(ulW / listW) : 1;
		        if (undefined == Marquee || Marquee) {
		            $(obj).slide({
		                mainCell: ">ul",
		                autoPage: true,
		                effect: EFFECT,
		                autoPlay: true,
		                vis: res,
		                interTime: 50,
		                trigger: "click",
		                opp: OPP,
                        switchLoad:'data-original'
		            });
		        }
		        else {
		            $(obj).slide({
		                mainCell: ">ul",
		                autoPage: true,
		                effect: "leftLoop",
		                scroll: res,
		                autoPlay: autoPlay,
		                vis: res,
		                interTime: interTime,
		                trigger: "click",
		                opp: OPP,
                        switchLoad:'data-original'
		            });

		        }
		        //计算外围尺寸
		        $(obj).find(".tempWrap").css("width", "100%");
		        //resize缓冲效果
		        var showcaseScroll = null;
		        $(window).resize(function(){
		            if (showcaseScroll)
		                clearTimeout(showcaseScroll);
		            showcaseScroll = setTimeout(function(){
		                $(obj).find(".tempWrap").css("width", "100%");
		            }, 200)
		        });
		    }


            if (selectProductListStyle == '0') {
                phoenixSite.sitewidgets.prodListMargins("." + widgetClass + " .prodlist-showcase-margindisplay", 5);
            }
            else if (selectProductListStyle == '3') {
                phoenixSite.sitewidgets.showcaseScrollEffect("." + widgetClass + " .prodlist-showcase-loopscroll", "leftMarquee", true, false);
            }
            else if (selectProductListStyle == '2') {
                phoenixSite.sitewidgets.showcaseScrollEffect("." + widgetClass + " .prodlist-showcase-btnscroll", "leftLoop", true, false);
            }
            if ($('.' + widgetClass + ' .prodlist-pro-inquire')[0] != undefined && isFrontend) {
                $('.' + widgetClass + ' .prodlist-pro-inquire').unbind('click').bind('click', function(){
                    var prodId = $(this).attr('prodId');
                    var quantity = $(this).attr('minorderquantity');
                    if (quantity == undefined || quantity == '') {
                        quantity = "1"
                    }
                    var inquireParam = {
                        prodId: prodId,
                        selectParam: '',
                        quantity: quantity
                    };
                    var arrayInquire = new Array();
                    arrayInquire.push(inquireParam);
                    $('.' + widgetClass + ' input[name=inquireParams]').val($.toJSON(arrayInquire));
                    $('.' + widgetClass + ' #prodInquire').submit();
                });
            }
			// 产品排序
   //为url添加?&参数
        //为url添加?&参数
			   (function () {
              function insertParam(key, value) {
                key = encodeURI(key);
                value = encodeURI(value);
                var kvp = document.location.search.substr(1).split('&');
                var i = kvp.length;
                var x;
                while (i--) {
                    x = kvp[i].split('=');
                    if (x[0] == key) {
                        x[1] = value;
                        kvp[i] = x.join('=');
                        break;
                    }
                }
                if (i < 0) {
                    kvp[kvp.length] = [key, value].join('=');
                }
                document.location.search = kvp.join('&');
            }
            //获取url参数的值
            var parseQueryString = function (url) {
                var reg_url = /^[^\?]+\?([\w\W]+)$/,
                    reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
                    arr_url = reg_url.exec(url),
                    ret = {};
                if (arr_url && arr_url[1]) {
                    var str_para = arr_url[1], result;
                    while ((result = reg_para.exec(str_para)) != null) {
                        ret[result[1]] = result[2];
                    }
                }
                return ret;
            }
    //读取url并分析
    var yl_url_init = window.location.href;
    //排序参数获取
    var yl_obj = parseQueryString(yl_url_init);
    var yl_val = yl_obj.prodSort;
    var yl_class = yl_obj.prodLayout;

    $("#prodSortccc option[value]").prop('selected', false)
    $("#prodSortccc option[value=" + yl_val + "]").prop('selected', true)

    //$(".prodLayout a[data-layout=" + yl_class + "] i").addClass("yl_clickstyle").parent().siblings().find().removeClass("yl_clickstyle");

    //风格切换处理
    $('.' + widgetClass +" .prodLayout a").bind("click", function (event) {
        if ($(this).hasClass('disabled') || $(this).find("i").hasClass('yl_clickstyle')) {
            return;
        }
        $(this).addClass('disabled');
        var yl_indexc = $(this).attr("data-layout")
        insertParam("prodLayout", yl_indexc);
        event.stopPropagation();
    })
    //selected选中处理
    $('.' + widgetClass +" #prodSortccc").on("change", function () {
        var indexc = $("#prodSortccc option:selected").attr("value");
        insertParam("prodSort", indexc);
    })

    $('.' + widgetClass +" #prod_sort_12 li").on("click", function (e) {
        var indexc = $(this).attr("value");
        insertParam("prodSort", indexc);
    })

        })()



        $('.' + widgetClass + ' .prodlist-pro-addbasket-btn').unbind('click').bind('click', function(){
            // fbq加入购物车埋点
            if (window.fbq && !window.fbAccessToken) {
                window.fbq('track', 'AddToCart')
            }
            // ttq加入购物车埋点
            if (window.ttq) {
                window.ttq.track('AddToCart')
            }
        })

            // 添加到购物车
            $('.' + widgetClass + ' #prodAddCart').unbind('click').bind('click', function(){
                var that = $(this);

                // fbq加入购物车埋点
                if (window.fbq && !window.fbAccessToken) {
                    window.fbq('track', 'AddToCart')
                }
                // ttq加入购物车埋点
                if (window.ttq) {
                    window.ttq.track('AddToCart')
                }
                //当产品库存为0时。
                if(that.attr('prodstock') && that.attr('prodstock') == 0){
                    var time = null;
                    if(time) return;
                    var tipText = phoenixSite.message(phoenixSite.lanEdition, "phoenix_shopingcart_inventory_null")||'This item is out of stock!';
                    $('body').append("<div class='prodStok0' style='position:fixed;left: 50%;top: 35%;z-index:999;border-radius:2px;transform: translate(-50%,-50%);background: rgba(0,0,0,0.8);text-align: center;font-size: 15px;color: #fff;padding: 20px 25px;'><i style='margin-right: 15px;' class='block-icon'></i>"+tipText+"</div>");
                    setTimeout(function (){
                        $('.prodStok0').remove();
                        clearTimeout(time);
                    },4000);
                    return;
                }
                // 如果有支付系统，则产品价格不能为空
                if (payModuleFlag == '1' && $('.' + widgetClass + ' .prodlist-discountprice')[0] == undefined) {
                    $("<div class='add-cart-msg'>" + phoenix_error_buy_prod + "</div>").appendTo($('body'));
                    var popUpWin = $(".add-cart-msg");
                    $(popUpWin).fadeIn(500);
                    setTimeout(function(){
                        $(popUpWin).fadeOut(500, function(){
                            $(this).remove();
                        });
                    }, 1500);
                    return;
                }
                var _url = "/phoenix/admin/order/addToCart";
                var type = "post";
                // 暂时只设下单为1
                var quantity = $(this).attr('minorderquantity');
                if (quantity == undefined || quantity == '') {
                    quantity = "1"
                }
                var prodId = that.attr('prodId');
                var propertyIds = $.trim(that.attr('skuValueId'));
                var data = {
                    'extendProp': propertyIds,
                    'quantity': quantity,
                    'prodIds': prodId
                };
                var _options = {
                    url: _url,
                    type: type,
                    dataType: 'json',
                    data: data,
                    done: function(xhr){
                        if (xhr.status == 'success') {
                            // 添加动画
                            var msg = phoenix_shopingcart_notice;
                            $("<div class='add-cart-msg'>" + msg + "</div>").appendTo($('body'));
                            var popUpWin = $(".add-cart-msg");
                            $(popUpWin).fadeIn(500);
                            setTimeout(function(){
                                $(popUpWin).fadeOut(500, function(){
                                    $(this).remove();
                                });
                            }, 1500);
                            // 刷新购物车状态
                            if (xhr.addNewFlag != undefined) {
                                $('.sitewidget-shoppingStatus span[data-attr=shoppingcartNum]').each(function(i, n){
                                    // 处理下
                                    var oldNum = $(n).html();
                                    oldNum = oldNum.replace(/\d+/, xhr.cartNum);
                                    $(n).html(oldNum);
                                });
                            }
                            // 购物车浮层
                            showLayerShopcart();
                        }
                        else {
                            // sku产品跳转到详情页处理
                            if (typeof xhr['prodDetail'] != 'undefined' && !!xhr['prodDetail']) {
                                window.location.href = xhr['prodDetail'];
                                return;
                            }
                            // $('.' + widgetClass + ' #addToCartErrorMsg').html(xhr.reason).show().fadeOut(5000);
                            that.next('span#addToCartErrorMsg').html(xhr.reason).show().fadeOut(5000);
                        }
                    }
                };
                phoenixSite.ajax(_options);
            });
        }
    });

    function showLayerShopcart(){
        if (!!phoenixSite.shoppingcartStatus && typeof phoenixSite.shoppingcartStatus.showLayerShopcart == 'function') {
            phoenixSite.shoppingcartStatus.showLayerShopcart();
            $("body.frontend-body-canvas").addClass("body-over-hidden");
        }
    }
     function initAudio(options) {
         var width = $('.'+ options.widgetClass +" .prodlist-picbox").width();
         var audios = $('.'+ options.widgetClass +" .audio-container-box .audio-box audio");
         audios.each(function(){
             new kac($(this).get(0), width, 50,
                 "", true, audios);
         })
     }

})(window, jQuery);