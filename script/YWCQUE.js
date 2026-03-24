(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "product17064";
    var product17064 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(product17064, {
        "init": init
    })
    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        function go(){
            var time = setTimeout(function(){
                $selector.find('.product17064').css('opacity',1);
            },1000);
        }
        go();
        // 添加图片数量标识
        var length = $selector.find('.swiper-wrapper').children().length;
        for(var i = 0;i < length;i++){
            var $cloneDiv = $selector.find('.swiper-wrapper li:eq(' + i + ')').clone(false);
            $($cloneDiv).appendTo($selector.find('.slick-two-list'));
            var $tr = $("<div class='span_list'></div>").clone(false);
            $($tr).appendTo($selector.find('.odiv_nav'));
        }
        for(var i = 0;i < length;i++){
            if($selector.find('.swiper-slide:eq(' + i + ')').has('a').length){
                var href = $selector.find('.swiper-slide:eq(' + i + ')').find('a').attr('href');
                var $href = $('<a href=' + href + ' style="position: absolute;top: 0px;left: 0px;z-index: 999;width: 100%;height: 100%;display: block;"></a>');
                $href.appendTo($selector.find('.swiper-slide:eq(' + i + ')').find('.masks'));
            }
        }
        $(window).resize(function(){
            $selector.find('.odiv_nav').width(($selector.find('.span_list').width()+2)*length);
            go();
        });
        $($selector.find('.swiper-wrapper li:eq(0)').clone(false)).appendTo($selector.find('.slick-two-list'));
        var lengths;
        var width;
        var bai;
        setInterval(function(){
            lengths = $selector.find('.slick-two-list').children().length;
            width = $selector.find('.slick-two').width();
            $selector.find('.slick-two-list').width(lengths*width);
            bai = width/(lengths*width);
            $selector.find('.slick-two-list li').width(bai*100 + '%');
        },1)
        var num = 0;
        // 为圆点添加颜色
        $(".span_list").eq(0).css("backgroundColor","white");
        //遍历每一个圆点添加点击事件，点击当前圆点则让num值赋为当前圆点的索引
        $(".span_list").each(function (index) {
            $(this).click(function () {
                num=index;
                $(".span_list").css("backgroundColor","transparent");
                $(".span_list").eq(num).css("backgroundColor","white");
                $(".slick-two-list").stop().animate({"marginLeft":-width*num+"px"},580);
            })
        });
        $(".next").click(function(){
            console.log(width);
        //右按钮点击事件，每点击一次num++,这里有很多的判断，是用来消除一些BUG的。
            if(num <= lengths-1){num++;}
            if(num > lengths-1){
                num=1;
                $(".slick-two-list").css("margin-left","0px");
            }
            if(num == lengths-1){
                $(".span_list").css("backgroundColor","transparent");
                $(".span_list").eq(0).css("backgroundColor","white");
            }
            else{
                $(".span_list").css("backgroundColor","transparent");
                $(".span_list").eq(num).css("backgroundColor","white");
            }
            $(".slick-two-list").stop().animate({"marginLeft":-width*num+"px"},580);

        });
        $(".prev").click(function(){//左按钮点击事件
            if(num >= 0){num--;}
            if(num < 0){
                num = lengths-2;
                $(".slick-two-list").css("margin-left",-(lengths-1)*width)
                $(".span_list").css("backgroundColor","transparent");
                $(".span_list").eq(3).css("backgroundColor","white");
            }
            else{
                $(".span_list").css("backgroundColor","transparent");
                $(".span_list").eq(num).css("backgroundColor","white");
            }
            $(".slick-two-list").stop().animate({"marginLeft":-width*num+"px"},580);

        });
        for(var i = 0;i < length;i++){
            //克隆节点
            var $cloneDiv = $('.slick-two-list li:eq(' + i + ') img').clone(false);
            //修改id名
            $cloneDiv.attr('class','min_img');
            //追加节点
            $cloneDiv.appendTo('.span_list:eq(' + i + ')');
        }
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 2, //容器内存在的数量
            spaceBetween: 10,
            speed: 1000,
            centeredSlides: true, //默认居左，true居中
            loop: true, // 产生多个slide
            autoplay: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                1200: {  
                    slidesPerView: 6,
                    spaceBetween: 0
                },
                770: {
                    slidesPerView: 4,
                    spaceBetween: 0
                },
                380: {
                    slidesPerView: 3,
                    spaceBetween: 0
                },
            }
        });
        /*鼠标移入停止轮播*/
        $selector.find('.swiper-wrapper').mouseenter(function(){
            swiper.autoplay.stop();
        });
        $selector.find('.swiper-wrapper').mouseleave(function(){
            swiper.autoplay.start();
        });
        $selector.find('.swiper-pagination').mouseleave(function(){
            swiper.autoplay.start();
        });
        // 移入遮罩层
        $('.swiper-wrapper .swiper-slide').mouseenter(function(){
            var width = $(this).width();
            var $div = $('<div class="smask" style="position: absolute;top: 0px;left: 0px;background-color: #000;width: ' + width + 'px;height: ' + width + 'px;opacity: 0.5;z-index: 997;"></div>');
            $($div).appendTo(this);
            $($div).appendTo($(this).find('.shadow'))
        }) 
        // 清除遮罩层
        $('.swiper-wrapper .swiper-slide').mouseleave(function(){
            $('.smask').remove();
        })
        // 单个轮播图显现
        $selector.find('.masks').click(function(){
            if($(this).next('a').attr('href') != '' && $(this).next('a').attr('href') != null){
                console.log('1');
            }else{
                $selector.find('.slick-two').css({
                    'display': 'block',
                    'z-index':'999'
                });
                $selector.find('.open').css('display','block');
                $selector.find('.cover-layer').css('display','block');
            }
        })
        // 单个轮播图隐藏
        $selector.find('.open').click(function(){
            $selector.find('.slick-two').css({
                'display':'none',
                'z-index':'-1'
            });
            $selector.find('.open').css('display','none');
            $selector.find('.cover-layer').css('display','none');
        })
    }
})(window, jQuery);