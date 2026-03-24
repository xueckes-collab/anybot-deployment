(function(window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var videoDetail = phoenixSite.videoDetail || (phoenixSite.videoDetail = {});
    var _options = {};
    var isFrontend = window.$_phoenix == undefined;
    $.extend(videoDetail, {
        init: function(option) {
            if (isFrontend) {
                $.extend(_options, option);
            }
            var _this = $('.' + _options.className);
        },
        videoUrl: function(videoId, type) {
            if (type == 'other') {
                $('.video_detail_palying').find(".video_detail_palying_src").each(function() {
                    console.log($(this), 'video_detail_palying_src')
                    $(this).hide()
                })

                $(".iframe_detail_palying_src").each(function() {
                    console.log($(this), 'iframe_detail_palying_src')
                    console.log('iframevideoId', videoId)
                    $(this).attr('src', videoId);
                })
                $(".iframe_detail_palying_src").css('max-width', '960px')
                $(".iframe_detail_palying_src").css('max-height', '540px')
                $(".iframe_detail_palying_src").css('min-height', '400px')
                $(".iframe_detail_palying_src").css('width', '100%')
                $(".iframe_detail_palying_src").css('height', '100%')
                $(".iframe_detail_palying_src").show()

            } else {
                var photoId = videoId;

                $(".iframe_detail_palying_src").hide()
                var url = ' /phoenix/admin/video/url?photoId=' + photoId;
                $.ajax({
                    url: url,
                    type: 'get',
                    success: function(xhr) {
                        var data = JSON.parse(xhr);
                        $(".video_detail_palying_src").each(function() {
                            console.log(data.video_url, 'local')
                            if (data.video_url) {
                                var httpU1 = data.video_url.substring(0, 2);
                                var httpU2 = data.video_url.substring(0, 4);
                                var httpU3 = data.video_url.substring(0, 5);
                                if (httpU1 == '//' || 'http' == httpU2 || 'https' == httpU3) {
                                    $(this).attr('src', data.video_url);
                                } else {
                                    $(this).attr('src', '//' + data.video_url);
                                }
                            }
                        });
                    }
                });
            }

        }
    });
})(window, jQuery)