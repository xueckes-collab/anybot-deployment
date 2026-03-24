(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "block11184";
    var block11184 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(block11184, {
        "init": init
    })

    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        // 后续代码

        $selector.find(".wrapper").slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        })

        var length = $selector.find(".slick-dots li").length;
        if (length == 1) {
            $selector.find(".slick-dots").hide();
        } else {
            $selector.find(".slick-dots").show();
        }
        $(window).resize(function() {
            setTimeout(function() {
                length = $selector.find(".slick-dots li").length;
                if (length == 1) {
                    $selector.find(".slick-dots").hide();
                } else {
                    $selector.find(".slick-dots").show();
                }
            },300)
        })
    }
})(window, jQuery);