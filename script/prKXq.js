(function(window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "block11494";
    var block11494 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(block11494, {
        "init": init
    })

    function init(nodeObj) {
        if (!!!nodeObj) {
            return;
        }
        var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
        // 后续代码
        $selector.find(".tile").each(function(e) {
            var i = e+1;
            if(i<10){
                $(this).find(".number").html("0"+i+".");
            }else{
                $(this).find(".number").html(i+".");
            }
        })
    }
})(window, jQuery);