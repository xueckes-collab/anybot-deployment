(function (window, $, undefined) {
    var _block_namespaces_ = window._block_namespaces_ || (window._block_namespaces_ = {});
    var name = "bookmark18444";
    var bookmark18444 = _block_namespaces_[name] || (_block_namespaces_[name] = {});
    $.extend(bookmark18444, {
    "init": init
    })
 
    function init(nodeObj) {
    if (!!!nodeObj) {
        return;
    }
    var $selector = $('div[data-settingid=' + nodeObj.settingId + ']');
    $(function(){
        setInterval(function(){
            if($selector.find('.bookmark18444 li:last .cont').css('display') == 'block'){
                $selector.find('.bookmark18444').css('border-bottom','none');
            }else{
                $selector.find('.bookmark18444').css('border-bottom','1px solid #cccccc');
            }
        },1)
        $(this).find('.icon-jiahao').css('display','block');
        $(this).find('.icon-jianhao').css('display','none');
        $selector.find('.title').click(function(){
            if($(this).siblings('.cont').css('display') == 'none'){
                $(this).addClass('title_color');
                $(this).find('.icon-jiahao').css('display','none');
                $(this).find('.icon-jianhao').css('display','block');
                $(this).siblings('.cont').css('display','block');
            }else{
                $(this).removeClass('title_color');
                $(this).find('.icon-jiahao').css('display','block');
                $(this).find('.icon-jianhao').css('display','none');
                $(this).siblings('.cont').css('display','none');
            }
        })
    })
    }
})(window, jQuery);