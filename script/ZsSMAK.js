(function(window, $, undefined){
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var commentListMy = phoenixSite.commentListMy || (phoenixSite.commentListMy = {});
    var _options = {};
    var isFrontend = window.$_phoenix == undefined;
    $.extend(commentListMy, {
        init: function(option) {
            if (isFrontend) {
                $.extend(_options, option);
            }
			var _this = $('.' + _options.className);
			var commentStar = $(".comment-star-class", _this);
			var starList = $(".comment-star", _this);
            commentListMy.getUserReview();
            

        },
     getUserReview: function (){


     },

     priviewVideo:function(){
     }

    });
})(window, jQuery)