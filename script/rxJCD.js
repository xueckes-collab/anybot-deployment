(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "block8269";
    var block8269 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(block8269, {
        "init": init
    })

    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        // 后续代码

        $selector.find('.imgBox').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            autoHeight: true,
            animateOut: 'fadeOut'
        });
    }
})(window, jQuery);