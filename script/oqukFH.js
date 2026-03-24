(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "block15994";
    var block15994 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(block15994, {
        "init": innit
    })

    function innit(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');

        var hreff = $selector.find('.right_img').find('.blocks-image').attr('href');
        var point = hreff.lastIndexOf('.')
        var type = hreff.substr(point);
        if (type != '.mp4') {
            $selector.find('.play').css('display', 'none');
            $selector.find('.rightMask').css('display', 'none');
        } else {
            $selector.find('.play').css('display', 'block');
            $selector.find('.rightMask').css('display', 'block');
            $selector.find('.play').attr('href', hreff);
        }


        var otherWidth = $(window).width();
        if (otherWidth < 700) {
            $selector.find('.play').colorbox({
                iframe: true,
                width: "100%",
                innerHeight: 500
            })
        } else if (otherWidth < 1200 && otherWidth >= 700) {
            $selector.find('.play').colorbox({
                iframe: true,
                width: "100%",
                innerHeight: 500
            })
        } else {
            $selector.find('.play').colorbox({
                iframe: true,
                width: "100%",
                height: "100%"
            })
        }

        $(window).resize(function() {
            var winWidth = $(window).width();
            if (winWidth < 700) {
                $selector.find('.play').colorbox({
                    iframe: true,
                    width: "100%",
                    innerHeight: 500
                })
            } else if (winWidth < 1200 && winWidth >= 700) {
                $selector.find('.play').colorbox({
                    iframe: true,
                    width: "100%",
                    innerHeight: 500
                })
            } else {
                $selector.find('.play').colorbox({
                    iframe: true,
                    width: "100%",
                    height: "100%"
                })
            }
        })
    }
})(window, jQuery);