(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "QX-118240602";
    var QX118240602 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(QX118240602, {
        "init": init
    })

    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        // 后续代码
        $selector.find(".kites .kite").css("transform", "matrix3d(-0.494975, 0.494975, 0, 0, -0.494975, -0.494975, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)");
        $selector.find(".kites .kite .slideKiteImg").addClass("slideKiteImg0");
        $selector.find(".kites .kite").each(function() {
            $(this).hover(function() {
                $(this).find(".slideKiteImg").css("opacity", "0");
                $(this).find(".slideKiteImg").css("transform: scale(1.5) rotate(-135deg) translate3d(-40%, 0, 0)");
                $(this).find(".slideKiteImg").removeClass("slideKiteImg0");
                $(this).find(".slideKiteImg").addClass("slideKiteImg1");


            }, function() {
                $(this).find(".slideKiteImg").removeClass("slideKiteImg1")
                $(this).find(".slideKiteImg").css("transform", "scale(1.5) rotate(-135deg) translate3d(0, 0, 0)")
                $(this).find(".slideKiteImg").css("opacity", "1");
            })
        })

    }
})(window, jQuery);