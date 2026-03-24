/**
 * disableSelection,enableSelection
 *
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    if ($ === undefined) {
        throw new Error("require jQuery");
    }

    try {
        var EsN1 = '\x23\x61\x70\x66';
        var EMqDfT2 = $(EsN1) && $(EsN1)['\x76\x61\x6c']();
        if (EMqDfT2 && window['\x6c\x6f\x63\x61\x74\x69\x6f\x6e']['\x68\x6f\x73\x74\x6e\x61\x6d\x65'] !== '\x6a\x69\x61\x6e\x7a\x68\x61\x6e\x2e\x6c\x65\x61\x64\x6f\x6e\x67\x2e\x63\x6f\x6d') {
            function getMainContent(word) {
                var yRrjE3 = leadongDec['\x65\x6e\x63']['\x55\x74\x66\x38']['\x70\x61\x72\x73\x65']("\x6c\x64\x63\x64\x65\x66\x74\x62\x65\x73\x74\x66\x67\x36\x31\x36");
                var cJvuE_4 = leadongDec['\x41\x45\x53']['\x64\x65\x63\x72\x79\x70\x74'](word, yRrjE3, {
                    mode: leadongDec['\x6d\x6f\x64\x65']['\x45\x43\x42'],
                    padding: leadongDec['\x70\x61\x64']['\x50\x6b\x63\x73\x37']
                });
                return leadongDec['\x65\x6e\x63']['\x55\x74\x66\x38']['\x73\x74\x72\x69\x6e\x67\x69\x66\x79'](cJvuE_4)['\x74\x6f\x53\x74\x72\x69\x6e\x67']()
            }
            if ((!window['\x6c\x6f\x63\x61\x74\x69\x6f\x6e']['\x68\x6f\x73\x74\x6e\x61\x6d\x65'] || (getMainContent(EMqDfT2)['\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65']()['\x69\x6e\x64\x65\x78\x4f\x66'](window['\x6c\x6f\x63\x61\x74\x69\x6f\x6e']['\x68\x6f\x73\x74\x6e\x61\x6d\x65']) === -1) && getMainContent(EMqDfT2))) {
                window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x71\x75\x65\x72\x79\x53\x65\x6c\x65\x63\x74\x6f\x72']('\x68\x74\x6d\x6c')['\x69\x6e\x6e\x65\x72\x48\x54\x4d\x4c'] = ''
            }
        }
    } catch (e) {

    }
    // var ids = '#a' + 'p' + 'f';
    // var isCheckSe = $(ids) && $(ids).val();
    //
    // if(isCheckSe && window.location.hostname !== 'jianzhan.leadong.com'){
    //     function getMainContent(word){
    //         var key = leadongDec.enc.Utf8.parse("ldcdeftbestfg616");
    //         var decrypt = leadongDec.AES.decrypt(word, key, {mode:leadongDec.mode.ECB,padding: leadongDec.pad.Pkcs7});
    //         return leadongDec.enc.Utf8.stringify(decrypt).toString();
    //     }
    //     if((!window.location.hostname || (getMainContent(isCheckSe).toLowerCase().indexOf(window.location.hostname) === -1) && getMainContent(isCheckSe))){
    //         document.querySelector('html').innerHTML = '';
    //     }
    // }

    var selectstart = "onselectstart" in document.createElement("div");
    $.fn.extend({
        disableSelection: function () {
            return this.bind((selectstart ? "selectstart" : "mousedown"), function (event) {
                event.preventDefault();
            });
        },
        enableSelection: function () {
            return this.unbind((selectstart ? "selectstart" : "mousedown"));
        }
    });
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);
// (function(window, $, undefined){
//     if ($ === undefined) {
//         throw new Error("require jQuery");
//     }
//     var selectstart = "onselectstart" in document.createElement("div");
//     $.fn.extend({
//         disableSelection: function(){
//             return this.bind((selectstart ? "selectstart" : "mousedown"), function(event){
//                 event.preventDefault();
//             });
//         },
//         enableSelection: function(){
//             return this.unbind((selectstart ? "selectstart" : "mousedown"));
//         }
//     });
// })(this, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * 前台命名空间
 *
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    // 前台全局命名空间
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    // 常量
    phoenixSite.constants = {
        ajax_response_key: "requestSuccess4Ajax",
        ajax_response_error: '请求出错.'
    }
    //在线客服
    phoenixSite.openChart = function () {
        var url = "http://kefu.trademessenger.com/chat?domain=leadong&businessType=CQrZsSwiESg&referrer=" + encodeURIComponent(window.location.href);
        top.open(url, "kefu", "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,width=800,height=600,left=50,top=50");
    };
    //refer收集
    try {
        var refer = document.referrer;
        var curDomain = document.location.host;
        var domainPart = curDomain.split(".");
        domainPart = domainPart.reverse();
        // 获取当前裸域
        var nakedDomain = domainPart[1] + "." + domainPart[0];
        // 不包含当前域时处理
        if (-1 == refer.indexOf(nakedDomain)) {
            document.cookie = "RFU=" + refer;
        }
    } catch (error) {
        console.log(error);
    }
})(this, jQuery);

/**
 * ajax
 */
(function (window, $, undefined) {
    // 前台全局命名空间
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    // options参数参照ajax,只是将原有的done,fail,always也作为options属性
    phoenixSite.ajax = function (options) {
        if (typeof options === 'undefined' || typeof options['url'] === 'undefined') {
            return;
        }
        var url = options['url'];
        var page = phoenixSite.page || (phoenixSite.page = {});
        var reg = new RegExp("^/");
        if (page._menu_prefix != undefined && reg.test(url)) {
            url = page._menu_prefix + url;
        }
        $.ajax({
            url: url,
            type: options['type'] || 'post',
            cache: false,
            traditional: options['traditional'] || false,
            dataType: options['dataType'] || 'html',
            data: options['data'] || {},
            beforeSend: options['beforeSend'] || $.noop()
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // ajax出错
            var failReturn;
            if (typeof options.fail !== 'undefined' && $.isFunction(options.fail)) {
                failReturn = options.fail.call(window, jqXHR, textStatus, errorThrown);
            }
            if (typeof failReturn === 'undefined') {
                // 暂时不做处理
                return;
            }
        }).done(function (response, textStatus, jqXHR) {
            // ajax请求成功
            var needLogon = typeof options['needLogon'] === 'undefined' ? false : options['needLogon'];
            var successHeader;
            if (needLogon === true) {
                successHeader = jqXHR.getResponseHeader(phoenixSite.constants.ajax_response_key);
                if (successHeader == '0') {
                    // 暂时不做处理
                    return;
                }
            }
            if (typeof options.done !== 'undefined' && $.isFunction(options.done)) {
                options.done.call(window, response, textStatus, jqXHR, successHeader);
            }
        }).always(function (response, textStatus, jqXHR) {
            // ajax完成
            if (typeof options.always !== 'undefined' && $.isFunction(options.always)) {
                options.always.call(window, response, textStatus, jqXHR);
            }
        });
    };
})(window, jQuery);

/**
 * userAgent
 */
(function (window, $, undefined) {
    // 前台台全局命名空间
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    phoenixSite.browser = {
        engine: {}
    };
    // 浏览器用户代理,处理userAgent.engine浏览器引擎
    (function () {
        var b = phoenixSite.browser,
            e = b.engine,
            u = navigator.userAgent,
            opera = window.opera;
        if (opera) {
            e.ver = b.ver = opera.version();
            e.opera = b.opera = parseFloat(e.ver);
        }
        // chrome ,safari ,Maxthon
        else
        if (/AppleWebKit\/(\S+)/.test(u)) {
            e.ver = RegExp['$1'];
            e.webkit = parseFloat(e.ver);
            // Maxthon
            if (/Maxthon\/(\S+)/.test(u)) {
                b.ver = RegExp['$1'];
                b.maxthon = parseFloat(b.ver);
            } else
            if (/Chrome\/(\S+)/.test(u)) {
                b.ver = RegExp['$1'];
                b.chrome = parseFloat(b.ver);
            } else
            if (/Version\/(\S+)/.test(u)) {
                b.ver = RegExp['$1'];
                b.safari = parseFloat(b.ver);
            } else {
                // 不处理
                b.safari = '1';
                b.ver = "1";
            }
        } else
        if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(u)) {
            e.ver = RegExp['$1'];
            e.gecko = parseFloat(e.ver);
            if (/Firefox\/(\S+)/.test(u)) {
                b.ver = RegExp['$1'];
                b.firefox = parseFloat(b.ver)
            }
        } else
        if (/MSIE ([^;]+)/.test(u)) {
            e.ver = b.ver = RegExp['$1'];
            b.ie = e.ie = parseFloat(e.ver);
        }
        // IE 11
        else
        if (/rv:([^\)]+)\) like Gecko/.test(u)) {
            e.ver = b.ver = RegExp['$1'];
            b.ie = e.ie = parseFloat(e.ver);
        }
    })();
})(this, jQuery);


/**
 * 验证码
 */
(function (window, $, undefined) {
    // 前台全局命名空间
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var faptcha = phoenixSite.faptcha || (phoenixSite.faptcha = {});
    $.extend(faptcha, {
        $: function (a) {
            return 'string' == typeof a ? document.getElementById(a) : a;
        },
        init: function () {
            //全局方法，暂不使用
            $("input[name='faptcha_response_field']").each(function () {
                var this_ = $(this)
                var i = 0;
                $(this).on("focus", function () {
                    if (i == 0) {
                        var length = $(this).parentsUntil('.backstage-stwidgets-settingwrap').length
                        var id = $($(this).parentsUntil('.backstage-stwidgets-settingwrap')[length - 1]).parent().attr("id");
                        phoenixSite.faptcha.reload(id);
                        i++;
                    }
                })

            })
        },
        reload: function (id) {
            if (arguments.length == 0 || typeof id === 'undefined' || !!!id) {
                var b = document.createElement('script');
                b.type = 'text/javascript';
                var url = this.$('faptcha_server').value + '?action=reload&c=' + this.$('faptcha_challenge_field').value;
                b.src = encodeURI(url);
                var a = document.getElementsByTagName('head');
                a = !a || 1 > a.length ? document.body : a[0];
                a.appendChild(b);
                return;
            }
            var b = document.createElement('script');
            b.type = 'text/javascript';
            var url = $('#' + id + ' #faptcha_server').val() + '?action=reload&c=' + $('#' + id + ' #faptcha_challenge_field').val() + "&i=" + id;
            b.src = encodeURI(url);
            var a = document.getElementsByTagName('head');
            a = !a || 1 > a.length ? document.body : a[0];
            a.appendChild(b);
        },
        finish_reload: function (c, id) {
            if (arguments.length !== 2 || typeof id === 'undefined' || !!!id) {
                var server = this.$('faptcha_server').value;
                this.$('faptcha_challenge_field').value = c;
                var imageUrl = server + '?action=image&c=' + c;
                this.$('faptcha_image_img').height = 30;
                this.$('faptcha_image_img').width = 100;
                this.$('faptcha_image_img').src = encodeURI(imageUrl);
                return;
            }
            var server = $('#' + id + ' #faptcha_server').val();
            $('#' + id + ' #faptcha_challenge_field').val(c);
            var imageUrl = server + '?action=image&c=' + c;
            $('#' + id + ' #faptcha_image_img').height(30);
            $('#' + id + ' #faptcha_image_img').width(100);
            $('#' + id + ' #faptcha_image_img').attr('src', encodeURI(imageUrl));
        }
    })
    // phoenixSite.faptcha.init();
    var handleFaptcha = function (img) {
        // http://stackoverflow.com/questions/92720/jquery-javascript-to-replace-broken-images
        // http://segmentfault.com/q/1010000000120137
        if (arguments.length == 0 || typeof img === 'undefined' || !!!img || !img.length) {
            return;
        }
        var interval = setInterval(function () {
            var that = img,
                _this = img[0],
                src = img.attr('src'),
                cacheSrc = that.data('src');
            if (!_this.complete) {
                // console.log("uncomplete " + src);
                // return;
            }
            var error = false;
            if (!_this.complete || (typeof _this.naturalWidth !== "undefined" && _this.naturalWidth == 0)) {
                //console.log("error " + src);
                error = true;
            }
            if (!error) {
                //console.log("clearInterval " + src);
                clearInterval(interval);
                return;
            }
            if (!!!cacheSrc) {
                that.data('src', src);
            } else
            if (cacheSrc === src) {
                // console.log("handler " + src);
                return;
            }
            // console.log("reload " + src);
            img.click().show();
            // console.log("reload clearInterval " + src);
            // clearInterval(interval);
            // phoenixSite.faptcha.handleFaptcha(img);
        }, 500);
    }
    // 新验证码,不用id,使用dataUuid属性
    var faptcha2 = phoenixSite.faptcha2 || (phoenixSite.faptcha2 = {});
    $.extend(faptcha2, {
        reload: function (dataUuid) {
            if (!!!dataUuid) {
                return;
            }
            var b = document.createElement('script');
            b.type = 'text/javascript';
            var server = $('[data-faptchaUuid=' + dataUuid + '][data-faptchaType=faptchaServer]').val();
            var faptchaChallengeField = $('[data-faptchaUuid=' + dataUuid + '][data-faptchaType=faptchaChallengeField]').val();
            var url = server + '?action=reload&c=' + faptchaChallengeField + "&dataUuid=" + dataUuid + "&v=2";
            b.src = encodeURI(url);
            var a = document.getElementsByTagName('head');
            a = !a || 1 > a.length ? document.body : a[0];
            a.appendChild(b);
        },
        /**
         * @param {Object} dataUuid html标签uuid
         * @param {Object} faptchaChallengeField 返回的faptchaChallengeField
         */
        finish_reload: function (dataUuid, faptchaChallengeField) {
            if (!!!dataUuid || !!!faptchaChallengeField) {
                return;
            }
            var server = $('[data-faptchaUuid=' + dataUuid + '][data-faptchaType=faptchaServer]').val();
            $('[data-faptchaUuid=' + dataUuid + '][data-faptchaType=faptchaChallengeField]').val(faptchaChallengeField);
            var imageUrl = server + '?action=image&c=' + faptchaChallengeField + "&v=2";
            var faptchaImage = $('[data-faptchaUuid=' + dataUuid + '][data-faptchaType=faptchaImg]');
            if (!faptchaImage.length) {
                return;
            }
            // 验证码图片尺寸类型.默认高30,宽100
            var faptchaImgSizeType = faptchaImage.attr('faptchaImgSizeType');
            if (!!!faptchaImgSizeType) {
                faptchaImgSizeType = '0';
            }
            var sizeObject = faptchaImgSizeTypeObject[faptchaImgSizeType];
            if ($.isEmptyObject(sizeObject)) {
                sizeObject = faptchaImgSizeTypeObject['0'];
            }
            faptchaImage.height(sizeObject['h']).width(sizeObject['w']).attr('src', encodeURI(imageUrl));
        }
    })
    // 新验证码,支持一个组件中两个验证码的刷新
    var faptcha3 = phoenixSite.faptcha3 || (phoenixSite.faptcha3 = {});
    $.extend(faptcha3, {
        $: function (a) {
            return 'string' == typeof a ? document.getElementById(a) : a;
        },
        reload: function (id, selector) {
            if (arguments.length == 0 || typeof id === 'undefined' || !!!id) {
                var b = document.createElement('script');
                b.type = 'text/javascript';
                var url = this.$('faptcha_server').value + '?action=reload&c=' + this.$('faptcha_challenge_field').value;
                b.src = encodeURI(url);
                var a = document.getElementsByTagName('head');
                a = !a || 1 > a.length ? document.body : a[0];
                a.appendChild(b);
                return;
            }
            var b = document.createElement('script');
            b.type = 'text/javascript';
            var url = $('#' + id + " " + selector + ' #faptcha_server').val() + '?action=reload&v=3&c=' + $('#' + id + " " + selector + ' #faptcha_challenge_field').val() + "&i=" + id + "&s=" + encodeURIComponent(selector);
            b.src = encodeURI(url);
            var a = document.getElementsByTagName('head');
            a = !a || 1 > a.length ? document.body : a[0];
            a.appendChild(b);
        },
        finish_reload: function (c, id, selector) {
            if (typeof id === 'undefined' || !!!id) {
                var server = this.$('faptcha_server').value;
                this.$('faptcha_challenge_field').value = c;
                var imageUrl = server + '?action=image&c=' + c;
                this.$('faptcha_image_img').height = 30;
                this.$('faptcha_image_img').width = 100;
                this.$('faptcha_image_img').src = encodeURI(imageUrl);
                return;
            }
            var server = $('#' + id + " " + selector + ' #faptcha_server').val();
            $('#' + id + " " + selector + ' #faptcha_challenge_field').val(c);
            var imageUrl = server + '?action=image&c=' + c;
            $('#' + id + " " + selector + ' #faptcha_image_img').height(30);
            $('#' + id + " " + selector + ' #faptcha_image_img').width(100);
            $('#' + id + " " + selector + ' #faptcha_image_img').attr('src', encodeURI(imageUrl));
        }
    })
    // 验证码高宽
    var faptchaImgSizeTypeObject = {
        "0": {
            'h': 30,
            'w': 100
        }
    }
})(this, jQuery);

/**
 * sitewidgets
 *
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    // 前台全局命名空间
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    // 组件效果sitewidgets
    var sitewidgets = phoenixSite.sitewidgets = {};

    //产品目录样式2收缩效果
    sitewidgets.prodToggle = function (obj) {
        $(obj + ' .sitewidget-bd ul.slight-submenu-wrap>li span').bind('click', function () {
            $(this).parent(".slight-submenu-pstRe").siblings('ul').slideToggle();
            $(this).toggleClass("noShow")
        });
    }
    sitewidgets.langBarShowStyleChange = function (obj) {
        var _langBarShowStyleDelay = null;
        var _langBarHideStyleDelay = null;
        $(obj).hover(function () {
            if ($(window).width() >= 990) {
                var _this = $(this);
                clearTimeout(_langBarHideStyleDelay);
                _langBarShowStyleDelay = setTimeout(function () {
                    var _subMenu = _this.find(".langBar-easystyle-sub");
                    if (_this.find(".lang-bar").hasClass("lang-bar-center")) {
                        _subMenu.css("left", (_this.find(".lang-bar").width() - _subMenu.width()) / 2)
                    }
                    _subMenu.css("top", _this.find(".langBar-easystyle-thumb").height()).slideDown(300);
                }, 300);
            }
        }, function () {
            if ($(window).width() >= 990) {
                var _this = $(this);
                clearTimeout(_langBarShowStyleDelay);
                _langBarHideStyleDelay = setTimeout(function () {
                    _this.find(".langBar-easystyle-sub").slideUp(300);
                    setTimeout(function () {
                        _this.find(".langBar-easystyle-sub").removeAttr("style");
                    }, 800);
                }, 300);
            }
        });
        $(obj).find(".langBar-easystyle-thumb").off('click').on('click', function () {
            if ($(window).width() < 990) {
                $(this).next(".langBar-easystyle-sub").slideToggle(200);
            }
        })
    }
    //产品分类折叠效果
    sitewidgets.prodGroupCategoryThumbToggle = function (_obj) {
        $(_obj + " .sitewidget-hd").unbind("click").bind("click", function () {
            if ($(_obj + " .sitewidget-bd").css("display") == "none" || $(_obj + " .sitewidget-bd").hasClass("displayed")) {
                if ($(_obj + " .sitewidget-bd").is(":hidden")) {
                    $(this).find(".sitewidget-thumb").removeClass("todown").addClass("toup");
                } else {
                    $(this).find(".sitewidget-thumb").removeClass("toup").addClass("todown");
                }
                $(_obj + " .sitewidget-bd").slideToggle().toggleClass("displayed");
                // $(this).find(".sitewidget-thumb").toggleClass("closed");
            }
        });
        //        var prodcatalogToggleDelay = null;
        //        $(window).resize(function(){
        //            if (prodcatalogToggleDelay) {
        //                clearTimeout(prodcatalogToggleDelay);
        //            }
        //            prodcatalogToggleDelay = setTimeout(function(){
        //                $(".sitewidget-prodGroupCategory .sitewidget-bd").removeAttr("style").removeClass("displayed");
        //                $(".sitewidget-prodGroupCategory .sitewidget-thumb").removeClass("closed");
        //            }, 200)
        //        })
    }

    /*
     * 图片集水平堆叠效果
     * @param：图片div、高度、图片间距
     */
    sitewidgets.imgJustifiedGallery = function (imgObj, height, margin) {
        $(imgObj).justifiedGallery({
            sizeRangeSuffixes: {
                lt100: '',
                lt240: '',
                lt320: '',
                lt500: '',
                lt640: '',
                lt1024: ''
            },
            rowHeight: height,
            margins: margin
        });
    }

    //锚点链接点击 页面滚动动画效果
    sitewidgets.anchorLinkPageScroll = function () {
        if (!!$('a[anchor-link="true"]').length) {
            $('.backstage-stwidgets-settingwrap a[anchor-link="true"]').off('click');
            $(".backstage-stwidgets-settingwrap").on('click', 'a[anchor-link="true"]', function (e) {
                var anchorLink = $(this).attr("href");
                var offsetTop = ($(anchorLink).offset()).top;
                var timer = 200 * (offsetTop / 768 + 1);
                $('html,body').animate({
                    scrollTop: offsetTop
                }, parseInt(timer));
                e.preventDefault();
            })
        }
    }

    //faq分类折叠效果
    sitewidgets.faqcategoryThumbToggle = function (_obj) {
        $(_obj + " .sitewidget-hd").unbind("click").bind("click", function () {
            if ($(_obj + " .sitewidget-bd").css("display") == "none" || $(_obj + " .sitewidget-bd").hasClass("displayed")) {
                if ($(_obj + " .sitewidget-bd").is(":hidden")) {
                    $(this).find(".sitewidget-thumb").removeClass("todown").addClass("toup");
                } else {
                    $(this).find(".sitewidget-thumb").removeClass("toup").addClass("todown");
                }
                $(_obj + " .sitewidget-bd").slideToggle().toggleClass("displayed");
                // $(this).find(".sitewidget-thumb").toggleClass("closed");
            }
        });
        //        var prodcatalogToggleDelay = null;
        //        $(window).resize(function(){
        //            if (prodcatalogToggleDelay) {
        //                clearTimeout(prodcatalogToggleDelay);
        //            }
        //            prodcatalogToggleDelay = setTimeout(function(){
        //                $(".sitewidget-faqcategory .sitewidget-bd").removeAttr("style").removeClass("displayed");
        //                $(".sitewidget-faqcategory .sitewidget-thumb").removeClass("closed");
        //            }, 200)
        //        })
    }

    sitewidgets.showqrcode = function (obj) {
        $(obj + " .follow-a.hasCode," + obj + " .follow-a.hasLink").bind("mouseover", function () {
            var iconWidth = $(this).width();
            var iconHeight = $(this).height();
            var wrap = $(this).children(".codeWrap");
            var span = wrap.children(".triangle");
            var distanceTop = $(this).offset().top - $(window).scrollTop();
            var height = wrap.outerHeight();
            var width = wrap.outerWidth();
            var wrapLeft = $(this).offset().left - (width - iconWidth + 28) / 2;
            var maxWidth = $(window).width() - width - 28;
            if (wrapLeft < 1) {
                wrapLeft = 1;
            }
            if (wrapLeft > maxWidth) {
                wrapLeft = maxWidth;
            }
            var spanLeft = (width + 8) / 2;
            var spanTop = (height + 8) / 2;

            wrap.removeAttr("style");
            if ($(this).closest(".sitewidget-follow").hasClass("icons-float-left")) {

                if (!$(this).closest(".sitewidget-follow").hasClass("icons-float-right")) {
                    wrap.css({
                        'top': '50%',
                        "left": iconWidth + 15 + "px",
                        "right": "auto",
                        "margin-top": -(height / 2)
                    });
                    span.addClass("float_left");

                } else
                if ($(this).closest(".sitewidget-follow").hasClass("icons-float-right")) {
                    wrap.css({
                        'top': '50%',
                        "right": iconWidth + 15 + "px",
                        "left": "auto",
                        "margin-top": -(height / 2)
                    });
                    span.addClass("float_right");
                }


            } else {

                span.removeClass("float_left float_right");
                if (height < $(window).height() - $(this).offset().top - iconHeight) {
                    span.removeClass("open_bottom");
                    span.addClass("open_top");
                    wrap.css({
                        "top": 10 + iconHeight + "px",
                        "left": "50%",
                        "margin-left": -(width / 2)
                    });

                } else {
                    span.removeClass("open_top");
                    span.addClass("open_bottom");
                    wrap.css({
                        "bottom": 10 + iconHeight + "px",
                        "left": "50%",
                        "margin-left": -(width / 2)
                    });

                }
            }
            wrap.show();
        }).bind("mouseleave", function () {
            $(this).children(".codeWrap").hide();
        })
    }
    //纵向导航风格7折叠风格
    sitewidgets.verticalNavigationThumbToggle = function (obj) {
        $(obj + " .vertical-navigation-thumbs i.fa").off("click").on("click", function () {
            if ($(this).hasClass("fa-angle-down")) {
                $(this).removeClass("fa-angle-down").addClass("fa-angle-up");
                $(this).parent(".vertical-navigation-thumbs").next().slideDown('200');
            } else
            if ($(this).hasClass("fa-angle-up")) {
                $(this).removeClass("fa-angle-up").addClass("fa-angle-down");
                $(this).parent(".vertical-navigation-thumbs").next().slideUp('200', function () {
                    $(this).removeAttr("style");
                });
            }
        });
        $(obj + " .navnew-thumb").off("click").on("click", function () {
            var _navnewThumb = $(this).find(".navnew-thumb-fix");
            if (!_navnewThumb.hasClass("open")) {
                _navnewThumb.addClass("open");
                $(this).next(".vertical-navigationstyle-wrap").slideDown();
            } else {
                _navnewThumb.removeClass("open");
                $(this).next(".vertical-navigationstyle-wrap").slideUp('200', function () {
                    $(this).removeAttr("style");
                });
            }
        });
    }

    //文章分类折叠效果
    sitewidgets.articlecategoryThumbToggle = function (_obj) {
        $(_obj + " .sitewidget-hd").unbind("click").bind("click", function () {
            if ($(_obj + " .sitewidget-bd").css("display") == "none" || $(_obj + " .sitewidget-bd").hasClass("displayed")) {
                if ($(_obj + " .sitewidget-bd").is(":hidden")) {
                    $(this).find(".sitewidget-thumb").removeClass("todown").addClass("toup");
                } else {
                    $(this).find(".sitewidget-thumb").removeClass("toup").addClass("todown");
                }
                $(_obj + " .sitewidget-bd").slideToggle().toggleClass("displayed");
                // $(this).find(".sitewidget-thumb").toggleClass("closed");
            }
        });
        //        var prodcatalogToggleDelay = null;
        //        $(window).resize(function(){
        //            if (prodcatalogToggleDelay) {
        //                clearTimeout(prodcatalogToggleDelay);
        //            }
        //            prodcatalogToggleDelay = setTimeout(function(){
        //                $(".sitewidget-articlecategory .sitewidget-bd").removeAttr("style").removeClass("displayed");
        //                $(".sitewidget-articlecategory .sitewidget-thumb").removeClass("closed");
        //            }, 200)
        //        })
    }
    //文章摘要截取多余部分
    sitewidgets.articleListInterception = function (_obj) {
        $(_obj + " .article-summary-para").each(function (i) {
            var cutHeight = parseFloat($(this).css("line-height")) ? Math.ceil(parseFloat($(this).css("line-height")) * 3) : Math.ceil(parseFloat($(this).css("font-size")) * 1.7 * 3);
            $(this).dotdotdot({
                height: cutHeight,
                wrap: 'letter'
            });
        });
    }
    //下载分类折叠效果
    sitewidgets.downloadCategoryThumbToggle = function (_obj) {
        $(_obj + " .sitewidget-hd").unbind("click").bind("click", function () {
            if ($(_obj + " .sitewidget-bd").css("display") == "none" || $(_obj + " .sitewidget-bd").hasClass("displayed")) {
                $(_obj + " .sitewidget-bd").slideToggle().toggleClass("displayed");
                $(this).find(".sitewidget-thumb").toggleClass("closed");
            }
        });
        //        var downloadcatalogToggleDelay = null;
        //        $(window).resize(function(){
        //            if (downloadcatalogToggleDelay) {
        //                clearTimeout(downloadcatalogToggleDelay);
        //            }
        //            downloadcatalogToggleDelay = setTimeout(function(){
        //                $(".sitewidget-downloadcategory .sitewidget-bd").removeAttr("style").removeClass("displayed");
        //                $(".sitewidget-downloadcategory .sitewidget-thumb").removeClass("closed");
        //            }, 200)
        //        })
    }

    //下载分类折叠效果
    sitewidgets.downloadCategoryThumbToggle = function (_obj) {
        $(_obj + " .sitewidget-hd").unbind("click").bind("click", function () {
            if ($(_obj + " .sitewidget-bd").css("display") == "none" || $(_obj + " .sitewidget-bd").hasClass("displayed")) {
                if ($(_obj + " .sitewidget-bd").is(":hidden")) {
                    $(this).find(".sitewidget-thumb").removeClass("todown").addClass("toup");
                } else {
                    $(this).find(".sitewidget-thumb").removeClass("toup").addClass("todown");
                }
                $(_obj + " .sitewidget-bd").slideToggle().toggleClass("displayed");
                // $(this).find(".sitewidget-thumb").toggleClass("closed");
            }
        });
        //        var downloadcatalogToggleDelay = null;
        //        $(window).resize(function(){
        //            if (downloadcatalogToggleDelay) {
        //                clearTimeout(downloadcatalogToggleDelay);
        //            }
        //            downloadcatalogToggleDelay = setTimeout(function(){
        //                $(".sitewidget-downloadcategory .sitewidget-bd").removeAttr("style").removeClass("displayed");
        //                $(".sitewidget-downloadcategory .sitewidget-thumb").removeClass("closed");
        //            }, 200)
        //        })
    }

    /*
     * 2014-07-30
     * 产品关键词点击赋值给input
     */
    sitewidgets.searchKeywords = function (quote, button) {
        $(quote).unbind().bind('click', function () {
            var keyword = $(this).text();
            $(this).parent().siblings("form").find('input[type="text"]').val(keyword);
            $(this).parent().siblings("form").find('button[type="submit"]').trigger('click');
        })
    }

    /*
     * 2016-02-14
     * 产品关键词点击赋值给input, 新版
     */
    sitewidgets.searchKeywordsNew = function (quote, input, button) {
        $(quote).unbind().bind('click', function () {
            var keyword = $(this).text();
            $(input).val(keyword);
            $(button).trigger('click');
        })
    }

    /*
     * 2014-08-04
     * 产品列表间距匹配
     */
    sitewidgets.prodListMargins = function (prodList, minMargin) {
        if ($(prodList).length) {
            sitewidgets.pageOrgLoad(prodList, minMargin);

            //resize缓冲效果
            var prodListResize = null;
            $(window).resize(function () {
                if (prodListResize) {
                    clearTimeout(prodListResize);
                }
                prodListResize = setTimeout(function () {
                    sitewidgets.pageOrgLoad(prodList, minMargin);
                }, 200)
            });

        }
    }
    sitewidgets.pageOrgLoad = function (prodList, minMargin) {
        if($(prodList).length <= 0 ||  $(prodList + " li").length <= 0){
            return;
        }
        //外围宽度除以list宽度，得到每行显示的列数
        var ulW = $(prodList).width();
        var listW = $(prodList + " li").width();
        //每行可以摆下的列数
        var res = parseInt(ulW / listW);
        //列表项之间的间距
        var outer = ulW - listW * res;

        //写入css-margin
        if (ulW > listW) {
            //平均间隔大于minMargin（默认15），小于15则换行显示
            if (parseInt(outer / (res - 1)) >= minMargin) {
                $(prodList + " li").css('margin-left', parseInt(outer / (res - 1)) - 1);
                $(prodList + " li" + ":nth-child(" + res + "n+1)").css('margin-left', 0);
            } else {
                res -= 1;
                outer = ulW - listW * res;

                $(prodList + " li").css('margin-left', parseInt(outer / (res - 1)) - 1);
                $(prodList + " li" + ":nth-child(" + res + "n+1)").css('margin-left', 0);
            }
        };

        //单列显示效果
        if (ulW < (listW * 2)) {
            $(prodList).addClass('prolist-one-colum');
        } else {
            $(prodList).removeClass('prolist-one-colum');
        }
    }

    //快速导航折叠效果
    sitewidgets.quicknavigationThumbToggle = function (_obj) {
        $(_obj + " .sitewidget-hd").unbind("click").bind("click", function () {
            if ($(_obj + " .sitewidget-bd").css("display") == "none" || $(_obj + " .sitewidget-bd").hasClass("displayed")) {
                $(_obj + " .sitewidget-bd").slideToggle().toggleClass("displayed");
                var _thumb = $(this).find(".sitewidget-thumb");
                _thumb.toggleClass("closed");
                if (_thumb.hasClass("closed")) {
                    _thumb.addClass("toup").removeClass("todown");
                } else {
                    _thumb.addClass("todown").removeClass("toup");
                }
                //                if (_thumb.hasClass("fa-angle-down")) {
                //                    _thumb.addClass("fa-angle-up").removeClass("fa-angle-down");
                //                }
                //                else if (_thumb.hasClass("fa-angle-up")) {
                //                    _thumb.removeClass("fa-angle-up").addClass("fa-angle-down");
                //                }
            }
        });
        //        var prodcatalogToggleDelay = null;
        //        $(window).resize(function(){
        //            if (prodcatalogToggleDelay) {
        //                clearTimeout(prodcatalogToggleDelay);
        //            }
        //            prodcatalogToggleDelay = setTimeout(function(){
        //                $(".sitewidget-quicknavigation .sitewidget-bd").removeAttr("style").removeClass("displayed");
        //                $(".sitewidget-hd-toggleTitle .sitewidget-thumb").removeClass("closed");
        //            }, 200)
        //        })
    }

    //
    sitewidgets.addMarkWithUrl = function (itemClass) {
        var currentUrl = window.location.href;
        var URI = currentUrl.substring(currentUrl.lastIndexOf("/"), currentUrl.length);
        var URILevelNews = "/news" + URI
        var URILevelProducts = "/products" + URI
        $(itemClass).each(function () {
            var href = $(this).attr("href");
            if (URI == href) {
                /*
                 * 如果 currentUrl 不包含 URILevelNews 且不包含 URILevelProducts，就添加 "on" 类
                 * !!!此为为关键词聚合页特殊处理，关键词聚合页规则为：域名/产品或者文章/关键词.html
                 */
                if (!currentUrl.includes(URILevelNews) && !currentUrl.includes(URILevelProducts)) {
                    $(this).addClass("on");
                }
                var _vale = $(this).hasClass("style_peise");
                if (_vale) {
                    $(this).addClass("gbBgColor0");
                }

            }
        })
    }
    sitewidgets.addMarkWithUrlPathname = function (itemClass) {
        var URI = window.location.pathname;
        $(itemClass).each(function () {
            var href = $(this).attr("href");
            if (URI == href) {
                $(this).addClass("on");
                var _vale = $(this).hasClass("style_peise");
                if (_vale) {
                    $(this).addClass("gbBgColor0");
                }

            }
        })
    }
    sitewidgets.addMarkWithUrlForLi = function (itemClass) {
        var currentUrl = window.location.href;
        var URI = currentUrl.substring(currentUrl.lastIndexOf("/"), currentUrl.length);
        $(itemClass).each(function () {
            var href = $(this).attr("href");
            if (URI == href || currentUrl == href) {
                $(this).parent("li").addClass("on");
                var _vale = $(this).parent("li").hasClass("style_peise");
                if (_vale) {
                    $(this).addClass("gbBgColor1");
                }
            }
        })
    }

    //询盘模块折叠效果
    sitewidgets.basketThumbToggle = function () {
        $(".basket-title").delegate(".basket-title-thumb", "click", function () {
            $('#prodInquireBasket').slideUp();
            $('.shoppingBasketIcon').removeClass('on');
            //            if ($(window).width() < 450) {
            //                $('#prodInquireBasket').slideUp();
            //            }
            //            else {
            //                $(".inquire-basket-listwrap .basket-lists-animatewrap").slideToggle();
            //                $(this).toggleClass("closed");
            //            }
        });
        $(".basket-title").delegate(".basket-title-clickshow", "click", function () {
            $('#prodInquireBasket').slideUp();
            $('.shoppingBasketIcon').removeClass('on');
            //            if ($(window).width() < 450) {
            //                $('#prodInquireBasket').slideUp();
            //
            //            }
            //            else {
            //                $(".inquire-basket-listwrap .basket-lists-animatewrap").slideToggle();
            //                $(this).siblings(".basket-title-thumb").toggleClass("closed");
            //            }
        });
    }

    //产品目录折叠效果
    sitewidgets.prodcatalogThumbToggle = function (_obj) {
        $(_obj + " .sitewidget-hd").unbind("click").bind("click", function () {
            if ($(_obj + " .sitewidget-bd").css("display") == "none" || $(_obj + " .sitewidget-bd").hasClass("displayed")) {
                $(_obj + " .sitewidget-bd").slideToggle().toggleClass("displayed");
                $(this).find(".sitewidget-thumb").toggleClass("closed");
            }
        });
        //        var prodcatalogToggleDelay = null;
        //        $(window).resize(function(){
        //            if (prodcatalogToggleDelay) {
        //                clearTimeout(prodcatalogToggleDelay);
        //            }
        //            prodcatalogToggleDelay = setTimeout(function(){
        //                $(".sitewidget-prodCatalog .sitewidget-bd").removeAttr("style").removeClass("displayed");
        //                $(".sitewidget-prodcatalog-thumb .sitewidget-thumb").removeClass("closed");
        //            }, 200)
        //        })
    }

    //产品目录产品列表折叠展开效果
    sitewidgets.prodcatalogListToggle = function (_obj) {
        $(_obj + " .slight-submenu-wrap > li").each(function () {
            if ($(this).find('.with-submenu').length) {
                $(this).find(".prodCatalog-submenu-icon").removeClass("hide");
                $(this).find(".prodCatalog-submenu-title").addClass("hasSub");
            }
        });
        $(_obj + " .prodCatalog-submenu-title .prodCatalog-submenu-icon").unbind("click").bind("click", function () {
            var that = $(this);
            that.toggleClass('iocn-change');
            that.parent('.prodCatalog-submenu-title').next('.with-submenu').slideToggle();
        });
    }

    sitewidgets.back2topbtn = function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $(".sitewidget-backtop").show();
            } else {
                $(".sitewidget-backtop").hide();
            }
        })
        $(".sitewidget-backtop").unbind('click').bind('click', function () {
            $('html,body').animate({
                scrollTop: 0
            }, 300)
        })
    }

    //批量处理，colorbox插件放大图片预览后可使用esc按键关闭图片
    sitewidgets.closePicturePreview = function(){
        var _dialogTimer;
        document.addEventListener('keydown',function (e) {
            if(e.which == 27){
                if($.colorbox.close){
                    $.colorbox.close();
                }
            }
        });
    }

    //ie浏览器下设置模块间距
    sitewidgets.layoutColmdNamed = function () {
        $(".row").each(function () {
            $(this).find(">div[class^='col-']").removeClass("col-md-first col-md-last")
            $(this).find(">div[class^='col-']").first().addClass("col-md-first");
            $(this).find(">div[class^='col-']").last().addClass("col-md-last");
        })
    };
    /**
     * 刷新列的高度.缓加载 TODO
     */
    sitewidgets.refreshColumnsHeight = function () {
        $("div.row[data-type=rows]").each(function () {
            var $_this = $(this);
            var childrenColumns = $_this.find(">div[class*=col-md-][data-type=columns]");
            childrenColumns.removeClass("col-md-first col-md-last");
            childrenColumns.first().addClass("col-md-first");
            childrenColumns.last().addClass("col-md-last");
            /*var thisColsMaxHeight = 0;
             childrenColumns.each(function() {
             $(this).css("min-height", "0");
             if ($(this).height() >= thisColsMaxHeight) {
             thisColsMaxHeight = $(this).height();
             }
             });
             // if (parseInt(thisColsMaxHeight) > 10) {
             // childrenColumns.css("min-height", thisColsMaxHeight - 10);
             // }
             // else {
             // childrenColumns.css("min-height", thisColsMaxHeight);
             // }
             if(!childrenColumns.hasClass("col-md-first col-md-last")){
             childrenColumns.css("min-height", thisColsMaxHeight);
             }*/
        })
    };
    //组件分页ajax
    sitewidgets.pagination = function (settingId, pageNum, ajaxParam) {
        var componentWrap = $('#component_' + settingId);
        if (!componentWrap.length) {
            return;
        }
        var relationCommonId = componentWrap.attr('relationCommonId');
        if (!!!relationCommonId) {
            return;
        }
        var componentName = componentWrap.attr('name');
        if (!!!componentName) {
            return;
        }
        // 单页面发布模式
        var isSinglePublishMode = false;
        if (typeof window.phoenixSite != 'undefined' && typeof window.phoenixSite._sViewMode != 'undefined' && window.phoenixSite._sViewMode == 'true' && typeof window.phoenixSite._singlePublish != 'undefined') {
            isSinglePublishMode = window.phoenixSite._singlePublish;
        }
        if(ajaxParam == ''){
            ajaxParam = "?singlePublishMode=" + isSinglePublishMode;
        }else {
            ajaxParam = ajaxParam + "&singlePublishMode=" + isSinglePublishMode;
        }
        var url = '/phoenix/admin/component/pagination/' + componentName + '/' + relationCommonId + '/' + settingId + '/' + pageNum + ajaxParam;
        phoenixSite.ajax({
            url: url,
            type: 'get',
            done: function (response) {

                $('#component_' + settingId).html(response);
                if (['prodListAsync','articleListNew'].indexOf(componentWrap.attr('name')) > -1) {
                    // 滚动条滚动到产品列表文章列表顶部
                    $('html,body').animate({scrollTop: componentWrap.offset().top }, 300);
                }
            }
        });
    }
    //输入框跳转页面 -start
    sitewidgets.jumpToPage = function (pageClass, settingId, herf) {
        var jumpPageNum = $('#jumpPageNum' + settingId).val();
        if (sitewidgets.page_count(jumpPageNum, pageClass, settingId)) {
            return;
        }
        if (jumpPageNum == 1) {
            herf = herf.replace('PAGE_NUM', jumpPageNum + "");
            if (herf.endsWith("-p1.html")) {
                herf = herf.replace(/-p1.html/g, ".html");
            } else if (herf.endsWith("-p1")) {
                herf = herf.replace(/-p1/g, "");
            } else if (herf.endsWith("page-1")) {
                herf = herf.replace(/page-1/g, "");
            }
        } else {
            herf = herf.replace('PAGE_NUM', parseInt(jumpPageNum));
        }
        window.location.href = herf
    }
    sitewidgets.ajaxJumpToPage = function (pageClass, ajaxFunctionName, settingId, ajaxParam) {
        var jumpPageNum = $('#jumpPageNum' + settingId).val();
        if (sitewidgets.page_count(jumpPageNum, pageClass, settingId)) {
            return;
        }
        eval(ajaxFunctionName + "('" + settingId + "','" + jumpPageNum + "','" + ajaxParam + "')");
    }
    sitewidgets.userDomainAjaxJumpToPage = function (pageClass, settingId, ajaxFunctionName) {
        var jumpPageNum = $('#jumpPageNum' + settingId).val();
        if (sitewidgets.page_count(jumpPageNum, pageClass, settingId)) {
            return;
        }
        eval(ajaxFunctionName + "('" + jumpPageNum + "')");
    }
    //跳转页数是否正确方法
    sitewidgets.page_count = function (jumpPageNum, pageClass, settingId) {
        if (jumpPageNum == '') {
            return true;
        }
        if (isNaN(parseInt(jumpPageNum))) {
            return true;
        }
        if (parseInt(jumpPageNum) < 1) {
            return true;
        }
        var lastNum = $('.' + pageClass + '[data-mark="' + settingId + '"] a:not(#nextPage):last').html();
        if (parseInt(jumpPageNum) > parseInt(lastNum)) {
            return true;
        }
    }
    //输入框跳转页面 -end
    //區塊內節點分頁ajax
    sitewidgets.node_pagination = function (settingId, nodeId, pageNum, ajaxParam) {
        var modelWrap = $('#siteblocks-setting-wrap-' + settingId);
        var moduleNodeWrap = $('#siteblocks-setting-wrap-' + settingId + 'div[data-auto_uuid=' + nodeId + ']');
        if (!modelWrap.length) {
            return;
        }
        if (!moduleNodeWrap.length) {
            return;
        }
        var appIsDev = '0';
        if (modelWrap.find('input[name=appIsDev]')[0] != undefined) {
            appIsDev = modelWrap.find('input[name=appIsDev]').val();
        }
        var url = '/phoenix/admin/component/node/pagination/' + appIsDev + '/' + settingId + '/' + nodeId + '/' + pageNum + ajaxParam;
        phoenixSite.ajax({
            url: url,
            type: 'get',
            done: function (response) {
                $('#siteblocks-setting-wrap-' + settingId + 'div[data-auto_uuid=' + nodeId + ']').html(response);
            }
        });
    }

    //select2 plugin
    sitewidgets.prodFilterSelectDom = function (selectObj) {
        //手机端不执行此方法
        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i) ? true : false;
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i) ? true : false;
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i) ? true : false;
            },
            Linux: function () {
                return navigator.userAgent.match(/Linux/i) ? true : false;
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows() || isMobile.Linux());
            }
        };

        if (!isMobile.any()) {
            $(selectObj).select2({
                minimumResultsForSearch: Infinity
            });
        }
    }

    sitewidgets.rowFlow = function () {
        headerArray = new Array();
        footArray = new Array();

        $("#backstage-headArea .outerContainer[autoHold]").add("#backstage-bodyArea .outerContainer[autoHold]").each(function (index, _rowObj) {
            var _offset = $(_rowObj).offset().top + $(_rowObj).height();
            if ($(_rowObj).hasClass("holding")) {
                try {
                    _offset = $(_rowObj).next(".placeHold").offset().top;
                } catch (e) {
                    console.log(e);
                }

            }
            headerArray[index] = {
                "offset": _offset,
                "rowObj": _rowObj
            };
        });
        $("#backstage-footArea .outerContainer[autoHold]").each(function (index, _rowObj) {
            var _offset = $(_rowObj).offset().top;
            if ($(_rowObj).hasClass("holding")) {
                try {
                    _offset = $(_rowObj).next(".placeHold").offset().top;
                } catch (e) {
                    console.log(e);
                }
            }
            footArray[index] = {
                "offset": _offset,
                "rowObj": _rowObj
            };
        });
        footArray.reverse();


        $(window).scroll(function () {
            var topOffset = $(this).scrollTop();
            var bottomOffset = 0;
            var windowHeight = $(window).height();
            var pageHeight = $(document).height();

            $.each(headerArray, function (index, item) {
                var _rowObj = item.rowObj;
                var _offset = item.offset;
                if ($(_rowObj).attr('mtop') == undefined) {
                    $(_rowObj).attr('mtop', $(_rowObj).offset().top)
                }
                var offset_top = Number($(_rowObj).attr('mtop'));
                if (topOffset > offset_top && $(_rowObj).attr("autoHold") != undefined) {
                    var offsetTop = 0;
                    if ($(_rowObj).next(".placeHold").length == 0) {
                        $(_rowObj).after("<div class='placeHold' style='height:" + $(_rowObj).height() + "px;'></div>")
                    }
                    if ($(_rowObj).attr("styleBack") == undefined) {
                        $(_rowObj).addClass("holding");
                        var style = $(_rowObj).attr("style") == undefined ? " " : $(_rowObj).attr("style");
                        $(_rowObj).attr("styleBack", style);
                        if (index > 0) {
                            var pinTopArea = $("#backstage-headArea").add("#backstage-bodyArea");
                            for (var i = index - 1; i >= 0; i--) {
                                offsetTop += $(".outerContainer[autoHold]", pinTopArea).eq(i).height();
                            }
                        }
                        //悬浮对移动端页头,加上高度
                        var screenWidth = $(window).width();
                        if((screenWidth < 989) && $('#backstage-headArea-mobile')){
                            offsetTop += $('#backstage-headArea-mobile').height();
                        }
                        $(_rowObj).css("margin-top", offsetTop + "px");
                        if (window.$_phoenix != undefined) {
                            $(window).resize(function () {
                                var bgWidth = $(".backstage-inner-frontendpreview").width();
                                var offLeft = $(".backstage-inner-frontendpreview").offset().left;
                                if ($(_rowObj).hasClass("holding")) {
                                    $(_rowObj).css("width", bgWidth + "px");
                                    $(_rowObj).css("left", offLeft + "px");
                                    $(_rowObj).css("margin-top", offsetTop + "px");
                                }
                            });
                            var bgWidth = $(".backstage-inner-frontendpreview").width();
                            var offLeft = $(".backstage-inner-frontendpreview").offset().left;
                            $(_rowObj).css("width", bgWidth + "px");
                            $(_rowObj).css("left", offLeft + "px");
                            $(_rowObj).css("margin-top", offsetTop + "px");
                        }
                    }
                } else
                if ((topOffset < offset_top) || offset_top == 0) {
                    $(_rowObj).next(".placeHold").remove();
                    $(_rowObj).removeClass("holding");
                    $(_rowObj).attr("style", $(_rowObj).attr("styleBack"));
                    $(_rowObj).removeAttr("styleBack");
                }
            })

            $.each(footArray, function (index, item) {
                var _rowObj = item.rowObj;
                var _offset = item.offset;


                if (_offset > topOffset + windowHeight && $(_rowObj).attr("autoHold") != undefined) {
                    var bottomOffset = 0;
                    if ($(_rowObj).next(".placeHold").length == 0) {
                        $(_rowObj).after("<div class='placeHold' style='height:" + $(_rowObj).height() + "px;'></div>")
                    }
                    if ($(_rowObj).attr("styleBack") == undefined) {
                        $(_rowObj).addClass("holding");
                        var style = $(_rowObj).attr("style") == undefined ? " " : $(_rowObj).attr("style");
                        $(_rowObj).attr("styleBack", style);
                        if (index > 0) {
                            for (var i = index - 1; i >= 0; i--) {
                                var listNum = $(".outerContainer[autoHold]", "#backstage-footArea").length - 1;
                                bottomOffset += $(".outerContainer[autoHold]", "#backstage-footArea").eq(listNum - i).height();
                            }
                        }
                        $(_rowObj).css("margin-bottom", bottomOffset + "px");
                        if (window.$_phoenix != undefined) {
                            $(window).resize(function () {
                                var bgWidth = $(".backstage-inner-frontendpreview").width();
                                var offLeft = $(".backstage-inner-frontendpreview").offset().left;
                                if ($(_rowObj).hasClass("holding")) {
                                    $(_rowObj).css("width", bgWidth + "px");
                                    $(_rowObj).css("left", offLeft + "px");
                                    $(_rowObj).css("margin-bottom", bottomOffset + "px");
                                }
                            });
                            var bgWidth = $(".backstage-inner-frontendpreview").width();
                            var offLeft = $(".backstage-inner-frontendpreview").offset().left;
                            $(_rowObj).css("width", bgWidth + "px");
                            $(_rowObj).css("left", offLeft + "px");
                            $(_rowObj).css("margin-bottom", bottomOffset + "px");
                        }
                    }
                } else
                if (topOffset < _offset) {
                    $(_rowObj).next(".placeHold").remove();
                    $(_rowObj).removeClass("holding");
                    $(_rowObj).attr("style", $(_rowObj).attr("styleBack"));
                    $(_rowObj).removeAttr("styleBack");
                }
            })
        })
    }

    //相关产品推荐第二种风格，删选模块宽度
    sitewidgets.detectDevice = function () {
        var width = $(window).width();
        if (width < 750) {
            return 1;
        } else
        if (width < 990) {
            return 2;
        } else
        if (width < 1220) {
            return 3;
        } else {
            return 0;
        }
    }

    sitewidgets.changeStyle2 = function (col) {
        if (!col) {
            $(".carousel-wrap").removeClass("carouselSmall");
        } else {
            var list = $(".sitewidget-relatedProducts-wrap2>li").length;
            var carouselSmall = $(".carouselSmall");
            if (carouselSmall.length <= 0)
                $(".carousel-wrap").addClass("carouselSmall");
            if (col != 1 && col != 2)
                $(".carousel-wrap").removeClass("carouselSmall");
        }
    }

})(this, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * 询盘
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var basket = phoenixSite.basket || (phoenixSite.basket = {});
    var prodIdArray = basket.prodIdArray || (basket.prodIdArray = []);
    $.extend(basket, {
        init: function () {
            // 某些页面可能不需要
            var ignoreShowBasketValue = $.trim($('input[data-attr=ignoreShowBasket]:hidden').val());
            if (!!ignoreShowBasketValue) {
                return;
            }
            if (!!!localStorage) {
                return;
            }
            var baksetProdArray = localStorage.getItem("baksetProdArray"); //字符串
            var prodIdArray_l = ''; //询盘数量
            var inquire_LiAll = '';
            if (!!baksetProdArray) {
                prodIdArray = JSON.parse(baksetProdArray); //数组对象
                basket.prodIdArray = prodIdArray;
                prodIdArray_l = prodIdArray.length;
            } else {
                prodIdArray_l = 0;
            }
            var _ask_delete = phoenixSite.message(phoenixSite.lanEdition, "phoenix_common_delete");
            for (var i = 0; i < prodIdArray_l; i++) {
                inquire_LiAll += '<li prodId=' + prodIdArray[i]["prodId"] + '>' +
                    '<a class="basket-list-img" href="javaScript:;" title=""><img src="' + prodIdArray[i]["prodPhotoUrl"] + '" height="45"></a>' +
                    '<a href="javaScript:;" title="" class="basket-list-name">' + prodIdArray[i]["prodName"] + '</a>' +
                    '<input type="hidden" name="selectParam" value=\'' + (prodIdArray[i]["selectParam"] || '') + '\' />' +
                    '<input type="hidden" name="skuParam" value="' + (prodIdArray[i]["skuParam"] || '') + '" />' +
                    '<input type="hidden" name="quantity" value="' + (prodIdArray[i]["quantity"] || '') + '" />' +
                    '<a href="javaScript:;" title="" class="basket-list-delate">' + _ask_delete + '</a></li>';
            }
            var _ask_value = phoenixSite.message(phoenixSite.lanEdition, "phoenix_inquire_basket");
            var _ask_value_button = phoenixSite.message(phoenixSite.lanEdition, "phoenix_inquire_button");
            var _ask_value_empty = phoenixSite.message(phoenixSite.lanEdition, "phoenix_empty");
            //处理前缀
            var page = phoenixSite.page || (phoenixSite.page = {});
            var menu_prefix = "";
            if (page._menu_prefix != undefined) {
                menu_prefix = page._menu_prefix;
            }
            var _html = '<div id="prodInquireBasket" class="inquire-basket-listwrap" style="display:none;">' +
                '<form id="basketForm" action="' + menu_prefix + '/phoenix/admin/prod/inquire" method="post">' +
                '<div class="basket-title">' +
                '<span class="basket-title-clickshow">' +
                '<span class="basket-title-fonts">' + _ask_value + ' (<span id="selectInquireCount" class="basket-title-pronum">' + prodIdArray_l + '</span>)</span>' +
                '</span>' +
                '<i class="basket-title-thumb"></i>' +
                '</div>' +
                '<div class="basket-lists-animatewrap">' +
                '<div class="basket-lists">' +
                '<ul class="fix">' + inquire_LiAll + '</ul>' +
                '</div>' +
                '<div class="basket-btns fix"><button id="basketEmpty">' + _ask_value_empty + '</button><button id="basketInquire" class="flr" type="submit">' + _ask_value_button + '</button></div>' +
                '</div>' +
                '<input type="hidden" name="inquireParams" />' +
                '</form>' +
                '</div>' +
                '<script>$(function(){phoenixSite.sitewidgets.basketThumbToggle();})</script>';
            //结账页不要出现询盘蓝
            if(window.location.href.indexOf("/phoenix/admin/orderv2") == -1 && window.location.href.indexOf("/phoenix/admin/checkout") == -1){
                $('body').append(_html);
            }
            if (!!baksetProdArray) {
                $('#prodInquireBasket').removeAttr('style');
            }
            var selectInquireCount = $('#selectInquireCount').html();
            var shoppingIcon = $('<div class="shoppingBasketIcon"><i class="fa fa-shopping-cart" aria-hidden="true"></i><span id="shoppingIconNum"></span></div>');
            //结账页不要出现询盘蓝
            if(window.location.href.indexOf("/phoenix/admin/orderv2") == -1 && window.location.href.indexOf("/phoenix/admin/checkout") == -1){
                $('body').append(shoppingIcon);
            }
            if (!isNaN(parseInt(selectInquireCount)) && parseInt(selectInquireCount) > 0) {
                $('.shoppingBasketIcon span').addClass('shoppingIconNum');
                $('#shoppingIconNum').html(parseInt(selectInquireCount));
            } else {
                shoppingIcon.hide();
            }
            $('body').on('click', '#basketEmpty', function () {
                $('.remove-basket-data').triggerHandler('click');
                return false;
            });
            shoppingIcon.on('click', function () {
                if (!$(this).hasClass('on')) {
                    $('#prodInquireBasket').slideDown();
                    $(this).addClass('on');
                } else {
                    $(this).removeClass('on');
                    $('#prodInquireBasket').slideUp();
                }
            });
            if (!isNaN(parseInt(selectInquireCount)) && parseInt(selectInquireCount) == 0) {
                $('#prodInquireBasket').slideUp();
                $('.shoppingBasketIcon').removeClass('on');
            }
            $('#basketInquire').unbind('click').bind('click', function () {
                basket.submitInquireBasket();
                $('#basketForm').submit();
            });
            $(".inquire-basket-listwrap .basket-title").append('<span class="remove-basket-data hide"><i class="fa fa-trash"></i></span>');
            basket.bindDeleteInquireProd();
            //点击加入询盘栏事件.移动端优化支持$('.pro-detail-basket').unbind('click').bind('click', function(){
            $('body').off('click', '.pro-detail-basket').on('click', '.pro-detail-basket', function () {
                if (!!!localStorage) {
                    return;
                }
                var prodId = $(this).attr('prodId');
                var skuValueIdGet = $("#skuValueId").val();
                // 判断产品列表12标识
                var isIncludeListFlag = $(".current-dialog-list") && $(".current-dialog-list").length;

                var prodPhotoUrl = !!$("img[bigimgonly=attr_BigImgOnly_leadong]").attr("src") ? $("img[bigimgonly=attr_BigImgOnly_leadong]").attr("src") : $(this).attr('prodPhotoUrl');
                var prodName = $(this).attr('prodName');
                // 判断是否为产品详情
                var prodSelectParam = "";
                var prodDetailDiv = $('.pro-detail-basket').parents(".sitewidget-proddetail");
                var selectParamStr = '';
                var skuParamStr = '';
                var quantityStr = "";
                var quantity = "";
                var price = '';
                var sku = '';

                if(isIncludeListFlag) {
                    skuValueIdGet =  $(".current-dialog-list").find("#skuValueId").val();
                    prodDetailDiv = $(".current-dialog-list");
                    // 根据产品sku，找出对应价格
                    $(".current-dialog-list .skuParams").each(function() {
                        if($(this).find('.description-choose-btns').hasClass('choosed')){
                            sku += $(this).find('.description-choose-btns.choosed').attr('title') + ' ';
                        }
                    })
                    if($('.current-dialog-list .prodlist-discountprice').length > 0){
                        price = $('.current-dialog-list .prodlist-discountprice .needExchangeValue').attr("exchangevalue");
                    }else{
                        price = $('.current-dialog-list .prodlist-price .needExchangeValue').attr("exchangevalue");
                    }
                }
                if (prodDetailDiv[0] != undefined && !$(this).hasClass("proasynclist-add-basket-btn")) {
                    // 产品列表风格11页面sku
                    if($(".current-dialog-list").length > 0){
                        sku = '';
                        $('.current-dialog-list .this-description-table .skuParams').each(function(){
                            if($(this).find('.description-choose-btns').hasClass('choosed')){
                                sku += $(this).find('.description-choose-btns.choosed').attr('title') + ' ';
                            }
                        })
                    }else{
                        // 产品详情
                        $('.this-description-table .skuParams').each(function(){
                            if($(this).find('.description-choose-btns').hasClass('choosed')){
                                sku += $(this).find('.description-choose-btns.choosed').attr('title') + ' ';
                            }
                        })
                    }
                    // price
                    if($('#prodDiscountPriceCurrent').css('display') != 'none'){
                        price = $('#prodDiscountPriceCurrent .needExchangeValue').attr("exchangevalue");
                    }
                    if($('#prodDiscountPrice').css('display') != 'none'){
                        price = $('#prodDiscountPrice .needExchangeValue:eq(0)').attr("exchangevalue");
                    }
                    var isNewProd = "1" == $("#isSkuProd").val();
                    if(isIncludeListFlag) {
                        isNewProd = "1" == $(".current-dialog-list").find("#isSkuProd").val();
                    }
                    //新产品
                    if (isNewProd) {
                        var aChoosed = prodDetailDiv.find("a.choosed");
                        var proLength = prodDetailDiv.find(".skuParams")
                        if(proLength.length != aChoosed.length){
                            if (aChoosed[0] != undefined) {
                                var selectParam = {};
                                aChoosed.each(function (i, n) {
                                    var name = $(n).parentsUntil('.this-description-table').children('th').html();
                                    var selectValue = $(n).attr('title');
                                    selectParam[name] = selectValue;
                                });
                                selectParamStr = $.toJSON(selectParam);
                                prodSelectParam = '<input type="hidden" name="skuParam" value="" /><input type="hidden" name="selectParam" value=\'' + selectParamStr + '\' />';
                                skuParamStr = "";
                            }
                        }else{
                            var skuValueId = $("#skuValueId").val() || '';
                            if(isIncludeListFlag) {
                                skuValueId = skuValueIdGet;
                            }
                            skuParamStr = skuValueId;
                            prodSelectParam = '<input type="hidden" name="skuParam" value=\'' + skuValueId + '\' /><input type="hidden" name="selectParam" value="" />'
                            prodPhotoUrl = !!$("img[bigimgonly=attr_BigImgOnly_leadong]").attr("src") ? $("img[bigimgonly=attr_BigImgOnly_leadong]").attr("src") : !!$("#skuImgUrl").val() ? $("#skuImgUrl").val() : prodPhotoUrl;

                        }

                    }
                    //旧sku产品需要拼接sku信息ku产品需要拼接sku信息
                    else {
                        var aChoosed = prodDetailDiv.find("a.choosed");
                        if (aChoosed[0] != undefined) {
                            var selectParam = {};
                            aChoosed.each(function (i, n) {
                                var name = $(n).parentsUntil('.this-description-table').children('th').html();
                                var selectValue = $(n).attr('title');
                                selectParam[name] = selectValue;
                            });
                            selectParamStr = $.toJSON(selectParam);
                            prodSelectParam = '<input type="hidden" name="skuParam" value="" /><input type="hidden" name="selectParam" value=\'' + selectParamStr + '\' />';
                            skuParamStr = "";
                        }
                    }
                    // quantity
                    quantity = $("input.order-quan-input").val() || '';
                    if(isIncludeListFlag) {
                        quantity =  $(".current-dialog-list").find("input.order-quan-input").val() || '';
                    }
                    quantityStr = '<input type="hidden" name="quantity" value=\'' + quantity + '\' />';
                } else {
                    //从产品列表加入询盘篮的，默认数量都是1
                    prodSelectParam = '<input type="hidden" name="skuParam" value="" /><input type="hidden" name="selectParam" value="" />';
                    if ($(this).attr('minorderquantity') != undefined) {
                        quantity = $(this).attr('minorderquantity');
                    } else {
                        if ($(this).hasClass('InquireAndBasket-11')) {
                            quantity = $(".current-dialog-list").find("input.order-quan-input").val() || '';
                        } else {
                            quantity = 1;
                        }
                    }
                    quantityStr = '<input type="hidden" name="quantity" value=\'' + quantity + '\' />';
                    if($(this).parents('.slick-slide').find('.prodlist-discountprice').length > 0){
                        price = $(this).parents('.slick-slide').find('.prodlist-discountprice .needExchangeValue').attr('exchangevalue');
                    }else{
                        price = $(this).parents('.slick-slide').find('.prodlist-price .needExchangeValue').attr('exchangevalue');
                    }
                }
                var baksetProdArray = localStorage.getItem("baksetProdArray"); //字符串
                if (!!baksetProdArray) {
                    prodIdArray = JSON.parse(baksetProdArray); //数组对象
                    basket.prodIdArray = prodIdArray;
                }
                var prodArray = basket.prodIdArray;
                var isNewBakset = false
                if (prodId && prodArray && prodArray.length) {
                    prodArray.forEach(function (ele) {
                        if (ele.prodId == prodId) {
                            if (ele.skuParam == skuValueIdGet) {
                                isNewBakset = true
                            }
                        }
                    })

                }
                var tips = isNewBakset ? phoenixSite.message(phoenixSite.lanEdition, "phoenix_inquire_existed_msg") : phoenixSite.message(phoenixSite.lanEdition, "phoenix_inquire_unexisted_msg")
                $("<div class='add-cart-msg'>" + tips + "</div>").appendTo($('body'));
                var popUpWin = $(".add-cart-msg");
                $(popUpWin).fadeIn(500);
                setTimeout(function () {
                    $(popUpWin).fadeOut(500, function () {
                        $(this).remove();
                    });
                }, 1500);
                if (prodArray.length == 0) {
                    $('#prodInquireBasket ul').append('<li prodId=' + prodId + '><a class="basket-list-img" href="javaScript:;" title=""><img src="' + prodPhotoUrl + '" height="45"></a><a href="javaScript:;" title="" class="basket-list-name">' + prodName + '</a>' + prodSelectParam + quantityStr + '<a href="javaScript:;" class="basket-list-delate">' + phoenixSite.message(phoenixSite.lanEdition, "phoenix_common_delete") + '</a></li>');
                    var selectInquireCount = $('#selectInquireCount').html();
                    $('#selectInquireCount').html((parseInt(selectInquireCount) + 1));
                    $('#shoppingIconNum').html((parseInt(selectInquireCount) + 1));
                    $('#shoppingIconNum').removeClass('shoppingIconNum').addClass('shoppingIconNum');
                    $(".shoppingBasketIcon").show();
                    //if ($(window).width() >= 450) {
                    $('#prodInquireBasket').show();
                    //}
                    prodArray.push({
                        'prodId': prodId,
                        'prodPhotoUrl': prodPhotoUrl,
                        'skuParam': skuParamStr,
                        'selectParam': selectParamStr,
                        'prodName': prodName,
                        'quantity': quantity,
                        'price': price,
                        'sku': sku
                    });
                } else {
                    var isSimilar = false;
                    prodArray.forEach(function (n) {
                        var item = n;
                        var itemJson = item;
                        if (itemJson.prodId == prodId) {
                            if (selectParamStr == itemJson.selectParam && skuParamStr == itemJson.skuParam) {
                                itemJson.quantity = quantity;
                                isSimilar = true;
                                return;
                            }
                        }
                    })
                    // 处理更新询盘篮的quantity值
                    if ($('#basketForm .basket-lists ul>li').length > 0) {
                        $('#basketForm .basket-lists ul>li').each(function() {
                            var curSelectParam = $(this).find('input[name=selectParam]').val();
                            var curSkuParam = $(this).find('input[name=skuParam]').val();
                            if ($(this).attr('prodid') == prodId && curSkuParam == skuParamStr && curSelectParam == selectParamStr) {
                                $(this).find('input[name=quantity]').val(quantity);
                            }
                        })
                    }
                    if (!isSimilar) {
                        $('#prodInquireBasket ul').append('<li prodId=' + prodId + '><a href="javaScript:;" title=""><img src="' + prodPhotoUrl + '" height="45"></a><a href="javaScript:;" title="" class="basket-list-name">' + prodName + '</a>' + prodSelectParam + quantityStr + '<a href="javaScript:;" class="basket-list-delate">' + phoenixSite.message(phoenixSite.lanEdition, "phoenix_common_delete") + '</a></li>');
                        var selectInquireCount = $('#selectInquireCount').html();
                        $('#selectInquireCount').html((parseInt(selectInquireCount) + 1));
                        $('#shoppingIconNum').html((parseInt(selectInquireCount) + 1));
                        prodArray.push({
                            'prodId': prodId,
                            'prodPhotoUrl': prodPhotoUrl,
                            'skuParam': skuParamStr,
                            'selectParam': selectParamStr,
                            'prodName': prodName,
                            'quantity': quantity,
                            'price': price,
                            'sku': sku
                        });
                    }

                }

                //$.cookie('baksetProdArray', prodArray.join('&&'), {
                //    expires: 1,
                //   path: '/'
                //});
                // 合并数量：以历史缓存为基准，仅对本次点击的 prodId+skuParam 做增量累加
                // 说明：prodArray 是从 localStorage 读出的“整篮子数据”，点击同款/同 sku 时上面会把该条目的 quantity 覆写成“本次新增量”。
                // 如果直接把 prodArray 全量与 history 相加，会把未变更条目重复累加；如果全量过滤，又会把需要累加的条目过滤掉。
                // 因此这里只对当前点击的 key 做累加，其他条目保持历史值不变。
                var historyProdStr = localStorage.getItem("baksetProdArray");
                var historyProdArray = [];
                if (historyProdStr) {
                    try {
                        historyProdArray = JSON.parse(historyProdStr) || [];
                        if (!Array.isArray(historyProdArray)) {
                            historyProdArray = [];
                        }
                    } catch (e) {
                        historyProdArray = [];
                    }
                }

                function buildMergeKey(pId, sParam) {
                    return (pId || '') + '_' + (sParam || '');
                }

                // 先把历史数据放入 map（作为基准总量）
                var mergedProdMap = {};
                var mergedKeysInOrder = [];
                historyProdArray.forEach(function (item) {
                    var hProdId = item.prodId || '';
                    var hSkuParam = item.skuParam || '';
                    var key = buildMergeKey(hProdId, hSkuParam);
                    if (!mergedProdMap[key]) {
                        mergedProdMap[key] = {
                            'prodId': hProdId,
                            'prodPhotoUrl': item.prodPhotoUrl,
                            'skuParam': hSkuParam,
                            'selectParam': item.selectParam,
                            'prodName': item.prodName,
                            'quantity': parseInt(item.quantity, 10) || 0,
                            'sku': item.sku
                        };
                        mergedKeysInOrder.push(key);
                    } else {
                        // 历史数据本身如果异常重复，这里做兜底累加
                        mergedProdMap[key].quantity = (mergedProdMap[key].quantity || 0) + (parseInt(item.quantity, 10) || 0);
                    }
                });

                // 对本次点击的条目做增量累加（同 prodId + skuParam 视为同一条）
                var currentMergeKey = buildMergeKey(prodId, skuParamStr);
                var addedQty = parseInt(quantity, 10) || 0;
                if (addedQty > 0) {
                    if (!mergedProdMap[currentMergeKey]) {
                        mergedProdMap[currentMergeKey] = {
                            'prodId': prodId || '',
                            'prodPhotoUrl': prodPhotoUrl,
                            'skuParam': skuParamStr || '',
                            'selectParam': selectParamStr,
                            'prodName': prodName,
                            'quantity': addedQty,
                            'sku': sku
                        };
                        mergedKeysInOrder.push(currentMergeKey);
                    } else {
                        mergedProdMap[currentMergeKey].quantity = (mergedProdMap[currentMergeKey].quantity || 0) + addedQty;
                        
                        mergedProdMap[currentMergeKey].prodPhotoUrl = prodPhotoUrl || mergedProdMap[currentMergeKey].prodPhotoUrl;
                        mergedProdMap[currentMergeKey].selectParam = selectParamStr != undefined ? selectParamStr : mergedProdMap[currentMergeKey].selectParam;
                        mergedProdMap[currentMergeKey].prodName = prodName || mergedProdMap[currentMergeKey].prodName;
                        mergedProdMap[currentMergeKey].sku = sku || mergedProdMap[currentMergeKey].sku;
                    }
                }

                
                var mergedProdArray = [];
                mergedKeysInOrder.forEach(function (key) {
                    if (mergedProdMap[key]) {
                        mergedProdMap[key].quantity = String(mergedProdMap[key].quantity || 0);
                        mergedProdArray.push(mergedProdMap[key]);
                    }
                });

                // 更新询盘篮 DOM
                prodArray = mergedProdArray;
                basket.prodIdArray = mergedProdArray;
                prodArray.forEach(function (mergedItem) {
                    var mergedSkuParam = mergedItem.skuParam || '';
                    var mergedProdId = mergedItem.prodId || '';

                    var targetLi = $('#prodInquireBasket li').filter(function () {
                        var domSkuParam = $(this).find('input[name="skuParam"]').val() || '';
                        var domProdId = $(this).attr('prodid') || '';

                        if (domProdId !== mergedProdId) {
                            return false;
                        }

                        var mergedHasSku = !!mergedSkuParam;
                        var domHasSku = !!domSkuParam;

                        if (mergedHasSku && domHasSku) {
                            return domSkuParam === mergedSkuParam;
                        } else if (!mergedHasSku && !domHasSku) {
                            return true;
                        }
                        return false;
                    });

                    if (targetLi.length > 0) {
                        targetLi.find('input[name="quantity"]').val(mergedItem.quantity);
                    }
                });

                localStorage.setItem("baksetProdArray", JSON.stringify(prodArray));
                basket.bindDeleteInquireProd();
                $('#prodInquireBasket').slideDown();
            });
            basket.bindDeleteInquireProd();
            $(document).on("click", ".basket-list-img,.basket-list-name", function () {
                var prodId = $(this).parent().attr("prodId");
                var _prod_options = {
                    url: '/phoenix/admin/prod/getProdUrl',
                    data: {
                        'prodId': prodId
                    },
                    done: function (result) {
                        if ("error" == result) {
                            return;
                        }
                        var page = phoenixSite.page || (phoenixSite.page = {});
                        var reg = new RegExp("^/");
                        if (page._menu_prefix != undefined && reg.test(result)) {
                            result = page._menu_prefix + result;
                        }
                        location.href = result;
                    }
                };
                phoenixSite.ajax(_prod_options);
            });
        },
        bindDeleteInquireProd: function () {
            // 配合在线表单组件询盘页使用
            $('.sitewidget-inquire .sitewidget-bd .sitewidget-inquire-table tbody tr .optipn .del-btn').click(function(){
                var newProdIdArray = [];
                for (var i = 0; i < JSON.parse(localStorage.getItem("baksetProdArray")).length; i++) {
                    newProdIdArray.push(JSON.parse(localStorage.getItem("baksetProdArray"))[i].prodId);
                }
                $('#prodInquireBasket .basket-lists li').each(function(){
                    if (newProdIdArray.indexOf($(this).attr('prodid')) == -1) {
                        $(this).remove();
                    }
                })
                $('#prodInquireBasket .basket-title .basket-title-pronum').text($('#prodInquireBasket .basket-lists li').length);
                $('.shoppingBasketIcon #shoppingIconNum').text($('#prodInquireBasket .basket-lists li').length);
            })

            $('.basket-list-delate').unbind('click').bind('click', function () {
                if (!!!localStorage) {
                    return;
                }
                var prodId = $(this).parent().attr('prodId');
                var selectParam = $(this).parent().find('input[name=selectParam]').val() || '';
                var selectSku = $(this).parent().find('input[name=skuParam]').val() || '';
                $(this).parent().remove();
                prodIdArray = prodIdArray.filter(function (item) {
                    var itemJson = item;
                    if (itemJson.prodId != prodId) {
                        return true;
                    } else {
                        if ((itemJson.selectParam || '') == selectParam && (itemJson.skuParam || '') == selectSku) {
                            return false;
                        }
                        return true;
                    }
                });
                if (prodIdArray.length == 0) {
                    $('#prodInquireBasket').slideUp();
                    $('.shoppingBasketIcon').removeClass('on');
                    $('#shoppingIconNum').html('');
                    $('#shoppingIconNum').removeClass('shoppingIconNum');
                    $(".shoppingBasketIcon").hide();
                    localStorage.setItem("baksetProdArray", '');
                    //$.cookie('baksetProdArray', null, {
                    //    path: "/"
                    //});
                } else {
                    localStorage.setItem("baksetProdArray", JSON.stringify(prodIdArray));
                    //$.cookie('baksetProdArray', prodIdArray.join('&&'), {
                    //    expires: 1,
                    //    path: '/'
                    //});
                }
                $('#selectInquireCount').html(prodIdArray.length);
                $('#shoppingIconNum').html(prodIdArray.length);
                if (!prodIdArray.length) {
                    $('#shoppingIconNum').html('');
                }
                phoenixSite.basket.prodIdArray = prodIdArray;
            });

            $(".inquire-basket-listwrap .basket-title .remove-basket-data").unbind('click').bind('click', function () {
                if (!!!localStorage) {
                    return;
                }
                $(".basket-lists li").each(function () {
                    $(this).find(".basket-list-delate").trigger("click");
                })
                $('#selectInquireCount').text('0');
                $('#shoppingIconNum').html('');
                $('#shoppingIconNum span').removeClass('shoppingIconNum');
                //$.cookie('baksetProdArray', null, {
                //    path: "/"
                //});
                localStorage.setItem("baksetProdArray", '');
                $('#prodInquireBasket').slideUp();
                $('.shoppingBasketIcon').removeClass('on');
            })
        },
        submitInquireBasket: function () {
            var arrayInquire = new Array();
            $('#prodInquireBasket li').each(function (i, n) {
                var selectParam = $("input[name=selectParam]", this).val();
                var skuParam = $("input[name=skuParam]", this).val();

                var quantity = $("input[name=quantity]", this).val();
                if (!quantity) {
                    quantity = "";
                }
                var inquireParam = {};
                if (!!skuParam) {
                    inquireParam = {
                        'prodId': $(n).attr('prodId'),
                        'skuParam': skuParam,
                        'quantity': quantity
                    };
                } else {
                    inquireParam = {
                        'prodId': $(n).attr('prodId'),
                        'selectParam': selectParam,
                        'quantity': quantity
                    };
                }
                arrayInquire.push(inquireParam);
            });
            $('#basketForm input[name=inquireParams]').val($.toJSON(arrayInquire));
        }
    });
})(window, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * demo账号
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var demo = phoenixSite.demo || (phoenixSite.demo = {});
    $.extend(demo, {
        init: function () {
            var options = {
                url: '/phoenix/admin/demo',
                type: 'get',
                done: function (result) {
                    try {
                        result = $.parseJSON(result);
                        return;
                    } catch (e) {
                        $('body').append(result);
                    }
                }
            };
            phoenixSite.ajax(options);
        }
    });
})(window, typeof jQuery === 'undefined' ? undefined : jQuery);
/**
 * 历史预览
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var previewHistory = phoenixSite.previewHistory || (phoenixSite.previewHistory = {});
    $.extend(previewHistory, {
        init: function () {
            try {
                const prodPreviewHistory =
                    JSON.parse(localStorage.getItem("prodPreviewHistory")) || [];
                var prodInfo = {};

                prodInfo.prodName = $(
                    ".sitewidget-proddetail .this-description-name"
                )
                    .text()
                    .trim();
                prodInfo.prodId = $(".sitewidget-proddetail #productInfo").find("input[name=id]").val();
                var isRepeat =  prodPreviewHistory.findIndex(function(item) {
                    return item.prodId == prodInfo.prodId;
                });
                if(isRepeat != -1) {
                    prodPreviewHistory.splice(isRepeat, 1);
                };
                const currentMoneys = $(".sitewidget-proddetail .prod-desc-money").filter(function(index, item){
                    return $(item).css('display') !='none' })
                var money = currentMoneys.children().filter(function(index, item){
                    console.log($(item).css('display'))
                    return $(item).css('display') !='none'
                })
                var images = $(".sitewidget-proddetail .history-point-image");
                try{
                    var imagesAlt = $(".sitewidget-proddetail .history-point-image").eq(0).attr("alt");
                    var imagesTitle = $(".sitewidget-proddetail .history-point-image").eq(0).attr("title");
                } catch (e) {
                    var imagesAlt = ""
                    var imagesTitle = ""
                }

                prodInfo.prodPrice =
                    money.find(".currencySymbol").last().text() +
                    $(".sitewidget-proddetail #productInfo").find("input[name=price]").val();

                prodInfo.href = window.location.pathname;
                prodInfo.prodImage =
                    images && images.length && images.eq(0).attr("src").replace(/\-[0-9]+\-[0-9]+/g, "");
                prodInfo.prodImageAlt = imagesAlt
                prodInfo.prodImageTitle = imagesTitle
                if (prodPreviewHistory.length >= 100) {
                    prodPreviewHistory.shift();
                }
                prodPreviewHistory.push(prodInfo);
                localStorage.setItem(
                    "prodPreviewHistory",
                    JSON.stringify(prodPreviewHistory)
                );
            } catch (e) {
                console.log(e);
            }
        }
    });
})(window, typeof jQuery === 'undefined' ? undefined : jQuery);
/**
 * 对比色
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var opColor = phoenixSite.opColor || (phoenixSite.opColor = {});

    $.extend(opColor, {
        getOppositeColor: function (colorVal) {
            //处理六位的颜色值
            var sColorChange = [];

            //十六进制颜色值的正则表达式
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            if (undefined == colorVal) {
                return;
            }

            if (/^(rgba|RGBA|rgb|RGB)/.test(colorVal)) {
                var aColor = colorVal.replace(/(?:\(|\)|rgba|RGBA|rgb|RGB)*/g, "").split(",");
                for (var i = 0; i < 3; i++) {
                    sColorChange.push(aColor[i]);
                }

            } else
            if (reg.test(colorVal)) {
                var sColor = colorVal.toLowerCase();
                if (sColor.length === 4) {
                    var sColorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }

                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }

            }

            var rgb = {
                r: sColorChange[0],
                g: sColorChange[1],
                b: sColorChange[2]
            };
            var fontColor = (0.213 * rgb.r + 0.715 * rgb.g + 0.072 * rgb.b) < 100 ? '#FFF' : '#000';
            return fontColor;

        }
    });
})(window, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * 货币切换
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    var COOKIE_KEY = 'FSPC',
        DELIMITER = '_';
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var payCoinExchange = phoenixSite.payCoinExchange || (phoenixSite.payCoinExchange = {});
    $.extend(payCoinExchange, {
        fixEurNum: fixEurNum,
        toEurNum: toEurNum,
        toEurPrice: toEurPrice,
        toEurPriceWithDefault: toEurPriceWithDefault,
        /**
         * 获取cookie信息
         */
        getCurrencyCookie: function () {
            var cookie = {};
            // 找到当前币种,进行计算
            var cookieValue = $.cookie(COOKIE_KEY);
            if (!!!cookieValue) {
                return cookie;
            }
            var array = cookieValue.split(DELIMITER);
            if (array.length != 6) {
                return cookie;
            }
            var rate = fixEurNum(array[3]),
                defaultRate = fixEurNum(array[5]);
            $.extend(cookie, {
                type: array[0],
                unit: array[1],
                symbol: array[2],
                rate: rate,
                defaultType: array[4],
                defaultRate: defaultRate
            });
            return cookie;
        },
        /**
         * 处理某个组件范围内的价格
         * @param {Object} $element 父级元素
         * @param {Object} selector 需要查找的选择器:可以是数组,也可是string
         */
        handleElement: function ($element, selector) {
            if (!$element.length) {
                return;
            }
            // cookie
            var cookieObject = payCoinExchange.getCurrencyCookie();
            if ($.isEmptyObject(cookieObject)) {
                // console && console.log && console.log("cookieObject is error!");
                return;
            }
            var defaultRate = cookieObject['defaultRate'],
                type = cookieObject['type'],
                unit = cookieObject['unit'],
                symbol = cookieObject['symbol'],
                rate = cookieObject['rate'];
            var newRate;
            try {
                newRate = rate / defaultRate;
            } catch (e) {
                console && console.log && console.log("parse rate error!");
                return;
            }
            if (!!!newRate || isNaN(newRate)) {
                console && console.log && console.log("rate " + rate + " . defaultRate " + defaultRate);
                return;
            }
            var _selectors = [];
            if (typeof selector !== 'undefined' && $.isArray(selector)) {
                $.merge(_selectors, selector);
            } else {
                if (typeof selector !== 'undefined' && typeof selector === 'string') {
                    _selectors.push(selector)
                } else {
                    _selectors.push('.needExchangeValue')
                }
            }
            // 元素集合
            var elements = [];
            $.each(_selectors, function (key, value) {
                $.merge(elements, $element.find(value));
            })
            if (!elements.length) {
                return;
            }
            $.each(elements, function () {
                var that = $(this);
                // 价格类型,可能会对某些价格特殊处理
                var priceType = $.trim(that.attr('data-type'));
                if (!!!priceType) {
                    // 生成新的价格格式
                    _innerHelper.handlePriceByType(that, priceType, unit, symbol, rate, defaultRate, newRate);
                } else
                if (priceType == 'shopcart') {
                    // 主要是处理切换汇率后购物车总价处理.在处理购物车产品价格时,购物车总价也会被处理,有点重复.
                    // 购物车总价计算方式：1单个价格处理汇率后再计算总和，2：单个价格计算总和后再处理汇率.目前为了和订单确认保持一致选择方法2
                    // 订单确认那里是单独处理总价的.
                    _innerHelper.handlePrice4Shopcart(that, priceType, unit, symbol, rate, defaultRate, newRate);
                } else
                if (priceType == 'layerShopcart') {
                    // 浮层购物车
                    _innerHelper.handlePrice4LayerShopcart(that, priceType, unit, symbol, rate, defaultRate, newRate);
                } else {
                    //针对付款方式处理价格
                    _innerHelper.handlePrice4PayStyle(that, priceType, unit, symbol, rate, defaultRate, newRate);
                }
            })

            setNewPrice();
            //    更新批发价
            function setNewPrice() {
                $($element).find("table.this-description-table span.offer").each(function () {
                    var _beforePrice = $(this).find(".salePrice").attr("exchangevalue");
                    var _newPrice = parseFloat(_beforePrice) * parseFloat(rate);

                    if ($(this).find(".salePrice")) {
                        var _html = $(this).find(".salePrice")[0].outerHTML;
                        $(this).html(symbol + _html);
                        $(this).find(".salePrice").text(_newPrice.toFixed(2));
                    }
                });
            }

        }
    });

    var _innerHelper = {};

    $.extend(_innerHelper, {
        // 生成新的价格格式
        handlePriceByType: function (element, priceType, unit, symbol, currentRate, defaultRate, newRate) {
            // 暂时都是默认处理
            var price = fixEurNum($.trim(element.attr('exchangeValue')));
            // 如果为0，则从html中查找原始值，然后设置到dom节点属性上，切换币种的时候直接获取使用
            if (price == 0) {
                var initValue = fixEurNum($.trim(element.attr('initValue')));
                if (!!!initValue) {
                    // 获取原始值，并设置到dom节点上
                    initValue = fixEurNum($.trim(element.html()).replace(',', ''));
                    element.attr('initValue', initValue);
                }
                price = initValue;
            }
            if ((!!!price && price != 0) || isNaN(price)) {
                return;
            }
            var newPrice = newRate * price;
            if (price && price != 0) {
                if ((!!!newPrice && newPrice != 0) || isNaN(newPrice)) {
                    return;
                }
            }
            // newPrice = newPrice.toFixed(2);
            newPrice = newNum(newPrice)
            element.html(toEurPrice(newPrice, unit, symbol));

            var symbolElement = element.prev('.currencySymbol');
            if (!symbolElement.length) {
                return;
            }
            symbolElement.html(symbol);

        },
        // 针对付款方式处理价格
        handlePrice4PayStyle: function (element, priceType, unit, symbol, currentRate, defaultRate, newRate) {
            // 暂时都是默认处理
            var price = fixEurNum($.trim(element.attr('exchangeValue')));
            if (!!!price || isNaN(price)) {
                return;
            }
            var orderExchangeRate = fixEurNum($.trim(element.attr('orderExchangeRate')));
            if (!!!orderExchangeRate || isNaN(orderExchangeRate)) {
                return;
            }
            var newPrice = defaultRate * price / orderExchangeRate * currentRate
            if (!!!newPrice || isNaN(newPrice)) {
                return;
            }
            // newPrice = newPrice.toFixed(2);
            newPrice = newNum(newPrice)
            element.html(toEurPrice(newPrice, unit, symbol));
            var symbolElement = element.prev('.currencySymbol');
            if (!symbolElement.length) {
                return;
            }
            symbolElement.html(symbol);
        }
    })

    $.extend(_innerHelper, {
        handlePrice4Shopcart: function (element, priceType, unit, symbol, currentRate, defaultRate, newRate) {
            // 购物车总价处理,初始化时可能会和计算价格会有重复
            var shoppingcart = phoenixSite.shoppingcart;
            if (!!!shoppingcart) {
                return;
            }
            shoppingcart.countShopcart(undefined);
        },
        handlePrice4LayerShopcart: function (element, priceType, unit, symbol, currentRate, defaultRate, newRate) {
            // 购物车总价处理,初始化时可能会和计算价格会有重复
            var shoppingcartStatus = phoenixSite.shoppingcartStatus;
            if (!!!shoppingcartStatus) {
                return;
            }
            shoppingcartStatus.countLayerShopcart(undefined);
        }
    })

    function fixEurNum(num) {
        if (typeof num == 'undefined') {
            return num;
        }
        if (isNaN(num)) {
            return ''.replace.call(num, /,/g, ".");
        }
        return num;
    }

    function newNum(value) {
        if (!value) return 0;
        var str = '';
        value = value.toFixed(2);
        str = String(value).split('.')[1];
        var intPart = String(value).split('.')[0];
        var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
        if (str == '') {
            return intPartFormat
        } else {
            var num = intPartFormat + '.' + str;
            return num
        }

    }

    function toEurNum(num) {
        if (typeof num == 'undefined') {
            return num;
        }
        return ''.replace.call(num, /\./g, ",");
    }

    function toEurPrice(price, unit, symbol) {
        if (typeof price == 'undefined' || unit != 'EUR') {
            return price;
        }
        return toEurNum(price);
    }

    function toEurPriceWithDefault(price) {
        var cookieObject = payCoinExchange.getCurrencyCookie();
        if ($.isEmptyObject(cookieObject)) {
            console && console.log && console.log("cookieObject is error!");
            return;
        }
        var unit = cookieObject['unit'],
            symbol = cookieObject['symbol'];
        return toEurPrice(price, unit, symbol);
    }
})(window, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * 页头设置处理
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var sitewidgets = phoenixSite.sitewidgets || (phoenixSite.sitewidgets = {});
    var headSetting = sitewidgets.headSetting || (sitewidgets.headSetting = {});
    var resizebgcolor = '';
    var resizebnt = false;
    $(window).resize(function () { //当浏览器大小变化时
        if (window.innerWidth >= 481) {
            $("#backstage-headArea").css({
                "background": "none"
            })
        } else {
            $("#backstage-headArea").css({
                "background-color": resizebgcolor.mobilenHeadBgcolor
            })
            if ($('script[attr="mobileHeadArea"]').length > 0) {
                var mobilebgcolor = $.parseJSON($('script[attr="mobileHeadArea"]').html())  
                if (mobilebgcolor.mobileHeadIsUpdate == undefined || mobilebgcolor.mobileHeadIsUpdate == '0') {
                    if (resizebnt) {
                        $("#backstage-headArea").find(".sitewidget-button").parents(".backstage-stwidgets-settingwrap").show()
                    } else {
                        $("#backstage-headArea").find(".sitewidget-button").parents(".backstage-stwidgets-settingwrap").hide()
                    }                    
                }
            }
        }
    });
    $.extend(headSetting, {
        init: function () {
            var timer = null;
            window.addEventListener('resize', function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    var $quickNavTitleMobile =  $('.quickNav-title-mobile')
                    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                    if($(window).width() <= 989 - scrollbarWidth && $quickNavTitleMobile.length){
                        $quickNavTitleMobile.each(function(){
                            if($(this).attr('data-title')){
                                $(this).hide()
                                $(this).prev().show()
                            }else{
                                $(this).show()
                                $(this).prev().hide()
                            }
                        })
                    }else{
                        $quickNavTitleMobile.each(function(){
                            $(this).hide()
                            $(this).prev().show()
                        })
                    }
                }, 100)
            })
            dispatchEvent(new Event('resize'));
            var headArea = $('#backstage-headArea'),
                mobileHeadStyle = $('#backstage-headArea-mobile'),
                headflag, headSettingParams, headSettingScript, headDisplayStyle, picAlignStyle;
            // 如果有页头风格,不执行
            if (mobileHeadStyle.length) {
                return;
            }
            if ($('script[attr="mobileHeadArea"]').length > 0) {
                var mobilebgcolor = $.parseJSON($('script[attr="mobileHeadArea"]').html())
                resizebgcolor = mobilebgcolor
                if (window.innerWidth <= 481) {
                    $("#backstage-headArea").css({
                        "background-color": mobilebgcolor.mobilenHeadBgcolor
                    })
                }
                if (mobilebgcolor.mobileHeadIsUpdate == undefined || mobilebgcolor.mobileHeadIsUpdate == '0') {
                    if (mobilebgcolor.mobilenHeadBtnFlage != 'false') {
                        $("#backstage-headArea").find(".sitewidget-button").parents(".backstage-stwidgets-settingwrap").show()
                    } else {
                        $("#backstage-headArea").find(".sitewidget-button").parents(".backstage-stwidgets-settingwrap").hide()
                    }
                }
            }
            if (!headArea.length) {
                return;
            }
            headflag = headArea.attr('headArea');
            if (!!!headArea || headArea === '0') {
                return;
            }
            headSettingScript = headArea.find('script[type=text][attr=headArea]');
            if (!!!headSettingScript.length) {
                return;
            }
            headSettingParams = $.trim(headSettingScript.text());
            try {
                headSettingParams = $.parseJSON(headSettingParams);
            } catch (e) {
                return;
            }
            headDisplayStyle = headSettingParams['headDisplayStyle'];
            // 处理页头
            if (headDisplayStyle === '0') {
                return;
            }
            picAlignStyle = headSettingParams['picAlignStyle'];
            if (headDisplayStyle === '1') {
                if (picAlignStyle === '0') {
                    btnleftLeft();
                } else
                if (picAlignStyle === '1') {
                    btnleftDown();
                }
            } else
            if (headDisplayStyle === '2') {
                if (picAlignStyle === '0') {
                    btnrightRight();
                } else
                if (picAlignStyle === '1') {
                    btnrightDown();
                }
            }
        }
    });

    function btnleftDown() {
        $("body").append('<a href="javascript:;" class="head-icon-menu" style="display: none;"><span class="menu-icon"></span></a>');
        var headArea = $("#backstage-headArea"),
            headMenu = $(".head-icon-menu");
        headMenu.unbind('click.headSetting').bind('click.headSetting', function () {
            var _this = $(this);
            if (_this.hasClass("open")) {
                _this.removeClass("open");
                $("html, body").removeClass("ofh");
                headArea.slideUp();
                $(window).unbind("click.headSetting");
                return;
            }
            _this.addClass("open");
            $("html, body").addClass("ofh");
            headArea.slideDown();
            $(window).unbind('click.headSetting').bind("click.headSetting", function (e) {
                if ($("#backstage-headArea").has($(e.target)).length < 1 && $('.head-icon-menu').has($(e.target)).length < 1 && !$("#backstage-headArea").is($(e.target)) && !$('.head-icon-menu').is($(e.target))) {
                    _this.removeClass("open");
                    headArea.slideUp();
                    $("html, body").removeClass("ofh");
                }
            });
        });
        var notAdd = true;
        if ($(window).width() < 990) {
            if (notAdd) {
                headArea.hide();
                headMenu.addClass("icon-pos-left icon-drop-down");
                headMenu.show(); //显示按钮
                headArea.addClass("mobile-head mhStyle-simple drop-down"); //修改头部样式
                notAdd = false;
            }
        }
        //监听窗口大小改变
        $(window).unbind('resize.headSetting').bind('resize.headSetting', function () {
            if ($(window).width() < 990) {
                //从大屏变成小屏
                if (notAdd) {
                    headArea.hide();
                    headMenu.addClass("icon-pos-left icon-drop-down");
                    headMenu.show(); //显示按钮
                    headArea.addClass("mobile-head mhStyle-simple drop-down"); //修改头部样式
                    notAdd = false;
                }
            } else {
                if (!notAdd) {
                    headArea.show();
                    headMenu.hide(); //显示按钮
                    headMenu.removeClass("icon-pos-left icon-drop-down");
                    headArea.removeClass("mobile-head mhStyle-simple drop-down"); //修改头部样式
                    notAdd = true;
                }
            }
        })
    }

    function btnleftLeft() {
        $("body").append('<a href="javascript:;" class="head-icon-menu" style="display: none;"><span class="menu-icon"></span></a>'); //插入按钮
        var headArea = $("#backstage-headArea"),
            headMenu = $(".head-icon-menu");
        headMenu.unbind('click.headSetting').bind('click.headSetting', function () {
            var _this = $(this);
            headArea.removeClass("head-hide");
            if (_this.hasClass("open")) {
                _this.removeClass("open");
                $("html, body").removeClass("ofh");
                headArea.removeClass("open");
                $(window).off("click.headSetting");
            } else {
                _this.addClass("open");
                headArea.addClass("open");
                $("html, body").addClass("ofh");
                $(window).unbind('click.headSetting').bind(".headSetting", function (e) {
                    if ($('#backstage-headArea').has($(e.target)).length < 1 && $('.head-icon-menu').has($(e.target)).length < 1 && !$('#backstage-headArea').is($(e.target)) && !$('.head-icon-menu').is($(e.target))) {
                        _this.removeClass("open");
                        headArea.removeClass("open");
                        $("html, body").removeClass("ofh");
                    }
                });
            }
        });
        var notAdd = true;
        if ($(window).width() < 990) {
            if (notAdd) {
                headArea.addClass("head-hide");
                headMenu.addClass("icon-pos-left icon-drop-left");
                headMenu.show(); //显示按钮
                headArea.addClass("mobile-head mhStyle-simple drop-left"); //修改头部样式
                notAdd = false;
            }
        }
        //监听窗口大小改变
        $(window).unbind('resize.headSetting').bind('resize.headSetting', function () {
            if ($(window).width() < 990) {
                //从大屏变成小屏
                if (notAdd) {
                    headArea.addClass("head-hide");
                    headMenu.addClass("icon-pos-left icon-drop-left");
                    headMenu.show(); //显示按钮
                    headArea.addClass("mobile-head mhStyle-simple drop-left"); //修改头部样式
                    notAdd = false;
                }
            } else {
                if (!notAdd) {
                    headArea.removeClass("head-hide");
                    headMenu.hide(); //显示按钮
                    headMenu.removeClass("icon-pos-left icon-drop-left");
                    headArea.removeClass("mobile-head mhStyle-simple drop-left"); //修改头部样式
                    notAdd = true;
                }
            }
        });
    }

    function btnrightDown() {
        $("body").append('<a href="javascript:;" class="head-icon-menu" style="display: none;"><span class="menu-icon"></span></a>'); //插入按钮
        var headArea = $("#backstage-headArea"),
            headMenu = $(".head-icon-menu");
        headMenu.unbind('click.headSetting').bind('click.headSetting', function () {
            var _this = $(this);
            if (_this.hasClass("open")) {
                _this.removeClass("open");
                $("html, body").removeClass("ofh");
                headArea.slideUp();
                $(window).unbind("click");
            } else {
                _this.addClass("open");
                $("html, body").addClass("ofh");
                headArea.slideDown();
                $(window).unbind('click.headSetting').bind("click.headSetting", function (e) {
                    if ($('#backstage-headArea').has($(e.target)).length < 1 && $('.head-icon-menu').has($(e.target)).length < 1 && !$('#backstage-headArea').is($(e.target)) && !$('.head-icon-menu').is($(e.target))) {
                        _this.removeClass("open");
                        headArea.slideUp();
                        $("html, body").removeClass("ofh");
                    }
                });
            }
        });
        var notAdd = true;
        if ($(window).width() < 990) {
            if (notAdd) {
                headArea.hide();
                headMenu.addClass("icon-pos-right icon-drop-down");
                headMenu.show(); //显示按钮
                headArea.addClass("mobile-head mhStyle-simple drop-down"); //修改头部样式
                notAdd = false;
            }
        }
        //监听窗口大小改变
        $(window).unbind('resize.headSetting').bind('resize.headSetting', function () {
            if ($(window).width() < 990) {
                //从大屏变成小屏
                if (notAdd) {
                    headArea.hide();
                    headMenu.addClass("icon-pos-right icon-drop-down");
                    headMenu.show(); //显示按钮
                    headArea.addClass("mobile-head mhStyle-simple drop-down"); //修改头部样式
                    notAdd = false;
                }
            } else {
                if (!notAdd) {
                    headArea.show();
                    headMenu.hide(); //显示按钮
                    headMenu.removeClass("icon-pos-right icon-drop-down");
                    headArea.removeClass("mobile-head mhStyle-simple drop-down"); //修改头部样式
                    notAdd = true;
                }
            }
        });
    }

    function btnrightRight() {
        $("body").append('<a href="javascript:;" class="head-icon-menu" style="display: none;"><span class="menu-icon"></span></a>'); //插入按钮
        var headArea = $("#backstage-headArea"),
            headMenu = $(".head-icon-menu");
        $("html, body").addClass("ofxh"); //right overflow-x hidden
        headMenu.unbind('click.headSetting').bind('click.headSetting', function () {
            var _this = $(this);
            headArea.removeClass("head-hide");
            if (_this.hasClass("open")) {
                _this.removeClass("open");
                $("html, body").removeClass("ofh");
                headArea.removeClass("open");
                $(window).unbind("click");
            } else {
                _this.addClass("open");
                $("html, body").addClass("ofh");
                headArea.addClass("open");
                $(window).unbind('click.headSetting').bind("click.headSetting", function (e) {
                    if ($('#backstage-headArea').has($(e.target)).length < 1 && $('.head-icon-menu').has($(e.target)).length < 1 && !$('#backstage-headArea').is($(e.target)) && !$('.head-icon-menu').is($(e.target))) {
                        _this.removeClass("open");
                        headArea.removeClass("open");
                        $("html, body").removeClass("ofh");
                    }
                });
            }
        });
        var notAdd = true;
        if ($(window).width() < 990) {
            if (notAdd) {
                headArea.addClass("head-hide");
                headMenu.addClass("icon-pos-right icon-drop-right");
                headMenu.show(); //显示按钮
                headArea.addClass("mobile-head mhStyle-simple drop-right"); //修改头部样式
                notAdd = false;
            }
        }
        //监听窗口大小改变
        $(window).unbind('resize.headSetting').bind('resize.headSetting', function () {
            if ($(window).width() < 990) {
                //从大屏变成小屏
                if (notAdd) {
                    headArea.addClass("head-hide");
                    headMenu.addClass("icon-pos-right icon-drop-right");
                    headMenu.show(); //显示按钮
                    headArea.addClass("mobile-head mhStyle-simple drop-right"); //修改头部样式
                    notAdd = false;
                }
            } else {
                if (!notAdd) {
                    headArea.removeClass("head-hide");
                    headMenu.hide(); //显示按钮
                    headMenu.removeClass("icon-pos-right icon-drop-right");
                    headArea.removeClass("mobile-head mhStyle-simple drop-right"); //修改头部样式
                    notAdd = true;
                }
            }
        });
    }
})(window, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * init
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    var isFrontend = window.$_phoenix == undefined;
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var sitewidgets = phoenixSite.sitewidgets;
    $(function () {
        //搜素关键词
        var developFlag = $('#developFlag').val();
        // 是否展示询盘蓝 在\main\webapp\WEB-INF\freemarker\phoenix\form\index.html 埋点<input hidden id="notShowInquirePop" value="true"/> 不让其执行询盘蓝弹框
        var isShowBasket = $('#notShowInquirePop').val()
        if (isFrontend && developFlag == undefined && isShowBasket == undefined) {
            setTimeout(function () {
                // 延迟加载
                phoenixSite.basket.init();
            }, 1500);
        }
        //关联浮动行
        phoenixSite.sitewidgets.rowFlow();
        $(window).scroll();
        // 页头处理
        sitewidgets.headSetting.init();
        // 锚点链接点击 页面滚动动画效果
        sitewidgets.anchorLinkPageScroll();
    });
    // 等图片完全加载完成
    var refreshColumnsHeightDelay = null;
    $(window).load(function () {
        if (isFrontend) {
            sitewidgets.refreshColumnsHeight();
        }
    }).resize(function () {
        if (refreshColumnsHeightDelay) {
            clearTimeout(refreshColumnsHeightDelay);
        }
        refreshColumnsHeightDelay = setTimeout(function () {
            if (isFrontend) {
                sitewidgets.refreshColumnsHeight();
            }
        }, 50)
    })
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * 隐私策略声明
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});

    function privacyStatement() {
        var privacyObj = $('div[data-attr=privacyCookie]');
        if (!!!privacyObj.length) {
            return;
        }
        var cookieName = "privacyCookieConfirmed";
        var cookieValue = $.cookie(cookieName);
        if (!!cookieValue && 'true' == cookieValue) {
            return;
        }
        privacyObj.show();
        privacyObj.find('[data-attr=okButton]').unbind('click').bind('click', function () {
            privacyObj.hide();
            $.cookie(cookieName, 'true', {
                expires: 365,
                path: '/'
            })
        })
    }
    $(function () {
        privacyStatement();
    })
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * 页面特效
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    function initPageEffect() {
        var pageEffectScript = $('script[type=text][attr=pageEffect]'),
            paramJson, enable, navStyle, navContent;
        if (!pageEffectScript.length) {
            return;
        }
        paramJson = $.trim(pageEffectScript.html());
        if (!!!paramJson) {
            return;
        }
        try {
            paramJson = $.parseJSON(paramJson);
        } catch (e) {
            return;
        }
        enable = paramJson['enable'] === undefined ? false : paramJson['enable'];
        if (enable === false) {
            return;
        }
        // 多屏滚动效果/全屏背景图轮换
        var effectType = paramJson['effectType'] === undefined ? '2' : paramJson['effectType'];
        if (effectType === '2') {
            // 多屏滚动效果
            pageEffectFullPage(paramJson);
        }
        if (effectType === '3') {
            // 全屏背景图轮换
            pageEffectFullBg(paramJson);
        }
        if (effectType === '4') {
            // 视频背景播放
            pageEffectFullVideo(paramJson);
        }
        if (effectType === '5') {
            // 全屏粒子背景
            pageEffectFullParticle(paramJson);
        }
        if (effectType === '6') {
            // 滚动图文上浮
            rollingPageEffect(paramJson);
        }
    }
    //滚动图文上浮
    function rollingPageEffect(paramJson) {
        var _effect = paramJson['rollingEffect'];
        if (_effect == '0') {
            var _time = paramJson['rollingEffectTime']
            if (!_time) {
                _time = 1000
            }
            var _style = $('<style></style>');
            _style.html('.opacity-no-show{transform: translateY(50px);opacity: 0;}.transition1{transition: transform ' + _time + 'ms,opacity ' + _time + 'ms;}.transition2{transition: transform ' + _time + 'ms,opacity ' + _time + 'ms;transition-delay: 0.5s;-moz-transition-delay: 0.5s;-webkit-transition-delay: 0.5s;}' +
                '.transition3{transition: transform ' + _time + 'ms,opacity ' + _time + 'ms;transition-delay: 1s;-moz-transition-delay: 1s;-webkit-transition-delay: 1s;}.transition4{transition: transform ' + _time + 'ms,opacity ' + _time + 'ms;transition-delay: 1.5s;-moz-transition-delay: 1.5s;-webkit-transition-delay: 1.5s;}' +
                '.transition5{transition: transform ' + _time + 'ms,opacity ' + _time + 'ms;transition-delay: 2s;-moz-transition-delay: 2s;-webkit-transition-delay: 2s;}.transition6{transition: transform ' + _time + 'ms,opacity ' + _time + 'ms;transition-delay: 2.5s;-moz-transition-delay: 2.5s;-webkit-transition-delay: 2.5s;}' +
                '.transition7{transition: transform ' + _time + 'ms,opacity ' + _time + 'ms;transition-delay: 3s;-moz-transition-delay: 3s;-webkit-transition-delay: 3s;}');
            $(function () {
                $('body').append(_style);
                var topArr = [];
                var prevHeight = 0;
                var sameRowFlag = 1;
                var windowHeight = $(window).height();
                $('.sitewidget-pictureNew img.lazy').each(function () {
                    var _srcValue = $(this).attr('phoenix-lazyload');
                    $(this).attr('src', _srcValue).css({
                        'visibility': 'visible'
                    });
                });
                var ableStwidgets = ['sitewidget-text', 'sitewidget-graphic', 'sitewidget-button', 'sitewidget-pictureNew', 'sitewidget-fontIcon', 'sitewidget-graphicNew'];
                setTimeout(function () {
                    $('#backstage-bodyArea .outerContainer .backstage-stwidgets-settingwrap').each(function () {
                        var _className = $(this).attr('classattr').split('-').slice(0, -1).join('-');
                        if (ableStwidgets.join('').indexOf(_className) == '-1') {
                            return true;
                        }
                        var domTop = $(this).offset().top;
                        if (domTop > windowHeight) {
                            topArr.push(domTop);
                            //同行高度处理,累加sameRowFlag
                            if (domTop == prevHeight) {
                                ++sameRowFlag;
                                $(this).addClass('transition' + sameRowFlag).addClass('opacity-no-show').addClass('needToTransition');
                            }
                            //非同行，将sameRowFlag置1
                            else {
                                $(this).addClass('transition1').addClass('opacity-no-show').addClass('needToTransition');
                                sameRowFlag = 1;
                            }
                            prevHeight = domTop;

                        }
                    });
                }, 300);

                function resizeDiv(scrollTop) {
                    if ($('.opacity-no-show').length) {
                        $('#backstage-bodyArea .outerContainer .backstage-stwidgets-settingwrap.needToTransition').each(function (i) {
                            topArr[i] = $(this).offset().top;
                        });
                        for (var i = 0; i < topArr.length; i++) {
                            if (scrollTop > (topArr[i] - 3 * windowHeight / 4)) {
                                $('#backstage-bodyArea .outerContainer .backstage-stwidgets-settingwrap.needToTransition').eq(i).removeClass('opacity-no-show');
                            }
                        }
                    }
                }
                var timerDelay = null;
                $(window).scroll(function () {
                    var $scrollTop = $(this).scrollTop();
                    if (timerDelay) {
                        clearTimeout(timerDelay)
                    }
                    timerDelay = setTimeout(function () {
                        resizeDiv($scrollTop);
                    }, 100);
                });

            });
        } else {
            console.log('新逻辑2');
        }
    }
    //视频背景播放
    function pageEffectFullVideo(paramJson) {
        var videoMp4 = paramJson['videoMp4'] === undefined ? '' : paramJson['videoMp4'];
        var videoOgg = paramJson['videoOgg'] === undefined ? '' : paramJson['videoOgg'];
        var fullVideoColorSet = paramJson['fullVideoColorSet'] === undefined ? '' : paramJson['fullVideoColorSet'];
        var fullVideoPicUrl = paramJson['fullVideoPicUrl'] === undefined ? '' : paramJson['fullVideoPicUrl'];
        var swiperWrapper = $('div.fullVideo');
        if (videoMp4 || fullVideoPicUrl)
            swiperWrapper.vide({
                'mp4': videoMp4,
                'ogv': videoOgg,
                'poster': fullVideoPicUrl
            });
        if (fullVideoColorSet) {
            swiperWrapper.css('background', fullVideoColorSet);
        }
    }
    // 全屏背景图轮换
    function pageEffectFullBg(paramJson) {
        var swiperWrapper = $('div.swiper-wrapper[attr=pageEffect]'),
            slideTime = 5000,
            speed = 3,
            userAgent = navigator.userAgent;
        if (!swiperWrapper.length) {
            return;
        }
        var swiperWrapperSlide = $('.swiper-wrapper .swiper-slide');
        if (!swiperWrapperSlide.length) {
            return;
        }
        // 首屏居中处理
        var firstScreenCenter = paramJson['firstScreenCenter'] === undefined ? true : paramJson['firstScreenCenter'];
        var ifRoll = paramJson['ifRoll'] === undefined ? false : paramJson['ifRoll'];
        if (ifRoll) {
            $(".swiper-wrapper").css('position', 'fixed');
        } else {
            $(".swiper-wrapper").css('position', 'absolute');
        }
        if (firstScreenCenter === true) {
            var _outerContainer = $("#backstage-bodyArea div.outerContainer[data-type=outerContainer]").first();
            if (_outerContainer.length) {
                _outerContainer.addClass("container-vertical-middle").css({
                    "height": "calc(100vh - " + $("#backstage-headArea").outerHeight(true) + "px)"
                });
                if (userAgent.indexOf('MSIE') >= 0) {
                    _outerContainer.height($(window).height());
                    if (userAgent.indexOf('MSIE 7.0') >= 0 || userAgent.indexOf('MSIE 8.0') >= 0 || userAgent.indexOf('MSIE 9.0') >= 0) {
                        _outerContainer.removeAttr("style");
                    }
                }
            }
        }
        swiperWrapperSlide.css('transition', "all " + speed + 's')
        swiperWrapperSlide.each(function () {
            $(this).css('background-image', 'url(' + $(this).attr('slide-bg-url') + ')')
        })
        if (swiperWrapperSlide.length === 1) {
            swiperWrapperSlide.css("opacity", 1);
            return;
        }
        slideTime = paramJson['slideTime'];
        if (isNaN(slideTime)) {
            slideTime = 5000;
        }
        swiperWrapperSlide.eq(0).addClass('swiper-slide-active');
        swiperWrapperSlide.eq(1).addClass('swiper-slide-next');
        var nextIndex;
        setInterval(function () {
            nextIndex = $('.swiper-wrapper .swiper-slide-next').index();
            $('.swiper-wrapper .swiper-slide-active').removeClass('swiper-slide-active');
            $('.swiper-wrapper .swiper-slide-next').addClass('swiper-slide-active').removeClass('swiper-slide-next');
            if (nextIndex == swiperWrapperSlide.length - 1) {
                swiperWrapperSlide.eq(0).addClass('swiper-slide-next');
            } else {
                swiperWrapperSlide.eq(nextIndex + 1).addClass('swiper-slide-next');
            }
        }, slideTime)
    }

    // 多屏滚动效果
    function pageEffectFullPage(paramJson) {
        var outerContainer = $('#backstage-bodyArea > div[data-type=outerContainer],#backstage-bodyArea > div[data-type=siteblocks],#backstage-bodyArea > div.PDataLazyLoad_Module'),
            outerContainerLength = outerContainer.length;
        if (!outerContainerLength) {
            return;
        }
        // console.log(paramJson);
        outerContainer.addClass('section');
        var navContent = paramJson['navContent'],
            guideArrow = paramJson['guideArrow'],
            navStyle = paramJson['navStyle'],
            navContentLength = navContent.length;
        if (navContent === undefined) {
            navContent = [];
        }
        var navToolTipsArr = [],
            navContentItem;
        outerContainer.each(function (index) {
            if (index > (navContentLength + 1)) {
                navToolTipsArr.push("");
                return;
            }
            navContentItem = navContent[index];
            if (!!!navContentItem) {
                navToolTipsArr.push("");
                return;
            }
            if (navStyle == '0') {
                navContentItem['tipText'] !== undefined ? navToolTipsArr.push(navContentItem['tipText']) : navToolTipsArr.push("");
            }
        })

        $('#backstage-bodyArea').fullpage({
            // Navigation
            anchors: [],
            navigation: true,
            navigationTooltips: navToolTipsArr,

            //Scrolling
            scrollingSpeed: 1000,
            css3: true,
            easing: 'easeInOutExpo',
            easingcss3: 'cubic-bezier(0.86,0,0.07,1)',
            scrollOverflow: true,
            animateAnchor: false,
            touchSensitivity: 15,
            normalScrollElementTouchThreshold: 10,

            // scrollBar: true,
            afterLoad: function (anchorLink, index) {
                // console.log("afterLoad");
                // 如果scrollBar: true不需要处理logo,pictureNew的动画处理
                var self = $(this);
                var preLoadImgs = self.find('img[phoenix-lazyload]');
                if (!preLoadImgs.length) {
                    preLoadImgs = self.find("img[phoenixLazyload = 'true']");
                }
                if (!preLoadImgs.length) {
                    return;
                }
                // 当前借助slimScroll来实现当前屏的滚动条
                if (!$.isFunction($.fn.phoenixLogo) || !$.isFunction($.fn.slimScroll)) {
                    preLoadImgs.trigger("pApear");
                    preLoadImgs.trigger("pAnim");
                    return;
                }
                // 当前屏出现滚动条,借助slimScroll的slimscrolling事件来处理可能不可视的图片
                // 但与预期有差距.动画效果有时可能不能实现 TODO. fullPage与动画效果无法太好兼容,可以继续研究
                var options = {
                    events: ['slimscrolling'],
                    isFullPage: true,
                    container: self[0]
                };
                preLoadImgs.phoenixLogo(options);
            },
            //event
            afterRender: function () {
                // 添加导航风格
                $("#fp-nav").addClass("fp-nav-skin-" + navStyle);
                // 第一屏导航颜色设置
                changeNavStyle(0, 1);
            },
            onLeave: function (index, nextIndex, direction) {
                try {
                    changeNavStyle(index, nextIndex);
                } catch (e) {}
                if (guideArrow && guideArrow != '0') {
                    if ($("#fp-nav li").length == nextIndex) {
                        arrowDivDown.removeClass('arrowDivDown' + guideArrow).addClass('arrowDivUp' + guideArrow);
                        arrowDivDown.off('click').on('click', function () {
                            $('#backstage-bodyArea').fullpage.moveTo(1);
                        });
                    };
                    if (index == $("#fp-nav li").length) {
                        arrowDivDown.removeClass('arrowDivUp' + guideArrow).addClass('arrowDivDown' + guideArrow);
                        arrowDivDown.off('click').on('click', function () {
                            $('#backstage-bodyArea').fullpage.moveSectionDown();
                        });
                    };
                };
                //fullPage 插件运行时 解决图片缓加载触发的问题
                var currentContainerGly = $('#backstage-bodyArea').find(".outerContainer").eq(index).find(".sitewidget-gallery");
                if (currentContainerGly.length) {
                    setTimeout(function () {
                        currentContainerGly.find("img.lazy").each(function () {
                            $(this).attr("src", $(this).attr("data-original"));
                        })
                    }, 400);
                }

                //解决图片在手机端的全屏滚动展示兼容
                var currentPictures = $('#backstage-bodyArea .outerContainer').eq(index).find(".sitewidget-pictureNew");
                if (currentPictures.length) {
                    setTimeout(function () {
                        currentPictures.find("img.lazy").each(function () {
                            if (!!$(this).attr("phoenix-lazyload") && ($(this).attr("src") != $(this).attr("phoenix-lazyload"))) {
                                $(this).attr("src", $(this).attr("phoenix-lazyload"));
                            }
                            $(this).css({
                                "visibility": "visible"
                            });
                        })
                    }, 200)
                }

                //fullPage 插件运行时 解决地图组件数据 加载触发的问题
                var baiDuMap = $('#backstage-bodyArea').find(".outerContainer").eq(index).find(".sitewidget-map");
                var baiDuMapScript = baiDuMap.next("script").text();

                if (baiDuMap.length && !baiDuMap.find("iframe").contents().find(".mapBody").length) {
                    eval(baiDuMapScript);
                }

                var GoogleMap = $('#backstage-bodyArea').find(".outerContainer").eq(index).find(".sitewidget-googleMap");
                var GoogleMapScript = GoogleMap.next("script").text();
                if (GoogleMap.length && !GoogleMap.find("iframe").contents().find(".mapBody").length) {
                    eval(GoogleMapScript);
                }
            }
        });
        if (guideArrow && guideArrow != '0') {
            var arrowDivDown = $('<div class="part"></div>');
            arrowDivDown.addClass('arrowDivDown' + guideArrow);
            $('body').append(arrowDivDown);
            arrowDivDown.on('click', function () {
                $('#backstage-bodyArea').fullpage.moveSectionDown();
            });
        };



        var rightDot = $("#fp-nav ul li a span"),
            rightText = $("#fp-nav ul li .fp-tooltip");
        var defaultColorParams = {
            '0': {
                "tipTextColor": "#999",
                "tipDotColor": "#333"
            },
            '1': {
                "tipDotColor": "#000"
            },
            '2': {
                "tipDotColor": "#000"
            }
        }

        /**
         * 改变导航颜色
         * @param {Object} index
         * @param {Object} nextIndex
         */
        function changeNavStyle(index, nextIndex) {
            if (nextIndex > (navContentLength + 1)) {
                return;
            }
            navContentItem = navContent[nextIndex - 1];
            if (!!!navContentItem) {
                return;
            }
            var tipDotColor, tipTextColor;
            tipDotColor = navContentItem['tipDotColor'] ? navContentItem['tipDotColor'] : defaultColorParams[navStyle]['tipDotColor'];

            if (navStyle == '0') {
                tipTextColor = navContentItem['tipTextColor'] ? navContentItem['tipTextColor'] : defaultColorParams[navStyle]['tipTextColor'];
                rightDot.css("background-color", tipDotColor);
                rightText.css("color", navContentItem['tipTextColor']);
            } else
            if (navStyle == '1') {
                if (index == 0) {
                    rightDot.css({
                        "background-color": "transparent",
                        "border-color": tipDotColor,
                        "border": '1px solid ' + tipDotColor,
                        "height": "10px",
                        "width": "10px",
                        "margin": '-6px 0 0 -6px'
                    })
                    $("#fp-nav ul li").first().find("span").css({
                        "background-color": tipDotColor
                    });
                    return;
                } else {
                    rightDot.css({
                        "border-color": tipDotColor,
                        "background-color": "transparent"
                    });
                    $("#fp-nav ul li:eq(" + (nextIndex - 1) + ")").find("a span").css({
                        "background-color": tipDotColor
                    });
                }
            } else
            if (navStyle == '2') {
                if (index == 0) {
                    rightDot.css({
                        "background-color": tipDotColor,
                        "border-color": tipDotColor,
                        "border": '3px solid ' + tipDotColor,
                        "height": "6px",
                        "width": "6px",
                        "margin": '-6px 0 0 -6px'
                    })
                    $("#fp-nav ul li").first().find("span").css({
                        "background-color": "transparent"
                    });
                    return;
                } else {
                    rightDot.css({
                        "border-color": tipDotColor,
                        "background-color": tipDotColor
                    });
                    $("#fp-nav ul li:eq(" + (nextIndex - 1) + ")").find("a span").css({
                        "background-color": "transparent"
                    });
                }
            }
        }
    }

    // 全屏粒子背景
    function pageEffectFullParticle(paramJson) {
        var ua = navigator.userAgent.toLowerCase();
        if (!!window.ActiveXObject) {
            var version = Math.floor(ua.match(/msie ([\d.]+)/)[1]);
            if (version <= 8) {
                return;
            }
        }

        if ($("body").children("#bgCanvas").length == 0) {
            $("body").append('<canvas id="bgCanvas" style="position: fixed;top: 0;left: 0;z-index: -2;"></canvas>');
        }
        var defaultColor = {
            "dot": "#22445d",
            "line": "rgba(255, 255, 255, .2)",
            "bg": "#002744"
        };
        // canvas setup //
        var bgCanvas = document.getElementById('bgCanvas');

        var w = bgCanvas.width = window.innerWidth,
            h = bgCanvas.height = window.innerHeight,
            ctx = bgCanvas.getContext('2d'), // parameters
            dotDistance = 93,
            dotRadius = 3,
            minProximity = dotDistance * 4,
            repaintAlpha = 1, // other values
            mouse = new Dot(w / 2, h / 2),
            dots = [],
            prevDD = 0, //dotDistance,
            //prevDR = dotRadius,
            prevMP = 0, //minProximity,
            minProxSquared, hue = 1,
            templateColor = (!!paramJson.particleColor && !!paramJson.particleColor.line) ? paramJson.particleColor.line : defaultColor.line, // gui stuff
            params = ['dotDistance', 'dotRadius', 'minProximity', 'repaintAlpha'],
            boundaries = [
                [20, 200],
                [2, 9],
                [40, 600],
                [0, 1]
            ],
            gui = new dat.GUI({
                autoPlace: false
            });

        // main functions
        function init() {
            for (var i = 0; i < params.length; ++i)
                ;
            considerParameters();
        }

        function considerParameters() {
            if (dotDistance !== prevDD) {
                prevDD = dotDistance;
                createDots();
            }
            if (minProximity !== prevMP) {
                prevMP = minProximity;
                minProxSquared = minProximity * minProximity;
            }
            render();
        }

        function createDots() {
            dots.length = 0;
            for (var x = 0; x < w; x += dotDistance) {
                for (var y = 0; y < h; y += dotDistance) {
                    dots.push(new Dot(x, y));
                }
            }
        }

        function updateMouse(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            render();
        }

        function render() {
            var bgColor = (!!paramJson.particleColor && !!paramJson.particleColor.bg) ? paramJson.particleColor.bg : defaultColor.bg;
            ctx.fillStyle = bgColor.replace('alp', repaintAlpha);
            ctx.fillRect(0, 0, w, h);
            dots.map(function (dot) {
                dot.render();
            });
        }

        // dot constructor
        function Dot(x, y) {
            this.x = x;
            this.y = y;
        }
        Dot.prototype.render = function () {
            var dX = this.x - mouse.x, // distance X
                dY = this.y - mouse.y, // distance Y
                distSquared = dX * dX + dY * dY;

            if (distSquared <= minProxSquared) {
                var brightness = 50 - distSquared / minProxSquared * 40;
                ctx.fillStyle = ctx.strokeStyle = templateColor.replace('brightness', brightness);
                ctx.beginPath();
                ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            } else {
                ctx.fillStyle = (!!paramJson.particleColor && !!paramJson.particleColor.dot) ? paramJson.particleColor.dot : defaultColor.dot;
                ctx.beginPath();
                ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // document handlers
        window.addEventListener('mousemove', updateMouse);
        window.addEventListener('resize', function () {
            w = bgCanvas.width = window.innerWidth;
            h = bgCanvas.height = window.innerHeight;
            createDots();
            render();
        })
        // blast off
        init();
    }

    $(function () {
        initPageEffect();
    })
})(window, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * 行特效
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
 (function (window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var rowEffectFunc = phoenixSite.rowEffectFunc || (phoenixSite.rowEffectFunc = {});
    $.extend(rowEffectFunc, {
        initRowEffectFunc: function(_rowDom, _isOpen, _strokeColor, _linkedColor, _effectType) {
            if (typeof phoenixSite == 'undefined' || typeof phoenixSite.page == 'undefined' || typeof phoenixSite.page.cdnUrl == 'undefined' || !!!phoenixSite.page.cdnUrl) {
                return;
            };
            var cdnUrl = phoenixSite.page.cdnUrl;
            var resourceUrl = cdnUrl + "/static/assets/script/plugins/particles/particles.js";
            if (_rowDom && _isOpen == '1' && _strokeColor && _linkedColor) {
                if (_effectType == "2") {
                    resourceUrl = cdnUrl + "/static/assets/widget/script/plugins/datgui/js/dat.gui.js";
                }
                if (phoenixSite.cachedScript) {
                    phoenixSite.cachedScript(resourceUrl, phoenixSite.rowEffectFunc.callback(_rowDom, _isOpen, _strokeColor, _linkedColor, _effectType));
                } else {
                    $.getScript(resourceUrl, phoenixSite.rowEffectFunc.callback(_rowDom, _isOpen, _strokeColor, _linkedColor, _effectType));
                }
            } else {
                $('.outerContainer').each(function () {
                    var containerId= $(this).attr("id");
                    var isOpenRowEffect = $(this).attr('data-is-open-row-effect');
                    var strokeColor = $(this).attr('data-stroke-color');
                    var linkedColor = $(this).attr('data-linked-color');
                    var rowEffectType = $(this).attr('data-row-effect-type');
                    if (isOpenRowEffect == "1") {
                        if (rowEffectType == "2") {
                            resourceUrl = cdnUrl + "/static/assets/widget/script/plugins/datgui/js/dat.gui.js";
                        }
                        if (rowEffectType == "1") {
                            resourceUrl = cdnUrl + "/static/assets/script/plugins/particles/particles.js";
                        }
                        if (phoenixSite.cachedScript) {
                            phoenixSite.cachedScript(resourceUrl, phoenixSite.rowEffectFunc.callback($(this), isOpenRowEffect, strokeColor, linkedColor, rowEffectType));
                        } else {
                            $.getScript(resourceUrl, phoenixSite.rowEffectFunc.callback($(this), isOpenRowEffect, strokeColor, linkedColor, rowEffectType));
                        }
                    }
                });
            }
        },
        callback: function(obj, isOpenRowEffect, strokeColor, linkedColor, rowEffectType) {
            var timercount = 0;
            var timer_effect = setInterval(function() {
              timercount += 200;
              if (timercount >= 15 * 1000) {
                clearInterval(timer_effect)
              };
              if (rowEffectType == "1" && typeof particlesJS != 'undefined' && $(obj).length > 0 && $(obj).find("template").length == 0) {
                phoenixSite.rowEffectFunc.startEffect(obj, isOpenRowEffect, strokeColor, linkedColor, rowEffectType);
                clearInterval(timer_effect)
              }
              if (rowEffectType == "2" && $(obj).length > 0 && $(obj).find("template").length == 0 ) {
                phoenixSite.rowEffectFunc.startEffect(obj, isOpenRowEffect, strokeColor, linkedColor, rowEffectType);
                clearInterval(timer_effect)
              }
            }, 200);
        },
        startEffect: function(obj, isOpenRowEffect, strokeColor, linkedColor, rowEffectType) {
            try {
                if (isOpenRowEffect == "1") {
                    onloadHack(function(){
                        var objId = obj.attr("id");
                        var containerHeight = obj.find(">.container").height();
                        // 粒子颜色
                        var strokecolor = strokeColor;
                        // 线条颜色
                        var line_linked_color = linkedColor;
                        // 背景颜色
                        var rowBgColor = obj.css("background-color");
                        if (rowBgColor == "rgba(0, 0, 0, 0)") {
                            rowBgColor = "rgba(255, 255, 255)"
                        }
                        if (typeof particlesJS != 'undefined' && rowEffectType == "1") {
                            obj.find(".rowCanvas").remove();
                            particlesJS(objId,
                                {
                                    "particles": {
                                    "number": {
                                        "value": 80,
                                        "density": {
                                        "enable": true,
                                        "value_area": 800
                                        }
                                    },
                                    "color": {
                                        "value": strokecolor
                                    },
                                    "shape": {
                                        "type": "circle",
                                        "stroke": {
                                        "width": 0,
                                        "color": strokecolor
                                        },
                                        "polygon": {
                                        "nb_sides": 5
                                        },
                                        "image": {
                                        "src": "img/github.svg",
                                        "width": 100,
                                        "height": 100
                                        }
                                    },
                                    "opacity": {
                                        "value": 1,
                                        "random": false,
                                        "anim": {
                                        "enable": false,
                                        "speed": 1,
                                        "opacity_min": 0.1,
                                        "sync": false
                                        }
                                    },
                                    "size": {
                                        "value": 5,
                                        "random": true,
                                        "anim": {
                                        "enable": false,
                                        "speed": 40,
                                        "size_min": 0.1,
                                        "sync": false
                                        }
                                    },
                                    "line_linked": {
                                        "enable": true,
                                        "distance": 150,
                                        "color": line_linked_color,
                                        "opacity": 1,
                                        "width": 1
                                    },
                                    "move": {
                                        "enable": true,
                                        "speed": 6,
                                        "direction": "none",
                                        "random": false,
                                        "straight": false,
                                        "out_mode": "out",
                                        "attract": {
                                        "enable": false,
                                        "rotateX": 600,
                                        "rotateY": 1200
                                        }
                                    }
                                    },
                                    "interactivity": {
                                    "detect_on": "canvas",
                                    "events": {
                                        "onhover": {
                                        "enable": true,
                                        "mode": "repulse"
                                        },
                                        "onclick": {
                                        "enable": true,
                                        "mode": "push"
                                        },
                                        "resize": true
                                    },
                                    "modes": {
                                        "grab": {
                                        "distance": 400,
                                        "line_linked": {
                                            "opacity": 1
                                        }
                                        },
                                        "bubble": {
                                        "distance": 400,
                                        "size": 40,
                                        "duration": 2,
                                        "opacity": 8,
                                        "speed": 3
                                        },
                                        "repulse": {
                                        "distance": 200
                                        },
                                        "push": {
                                        "particles_nb": 4
                                        },
                                        "remove": {
                                        "particles_nb": 2
                                        }
                                    }
                                    },
                                    "retina_detect": true,
                                    "config_demo": {
                                    "hide_card": false,
                                    "background_color": "#b61924",
                                    "background_image": "",
                                    "background_position": "50% 50%",
                                    "background_repeat": "no-repeat",
                                    "background_size": "cover"
                                    }
                                }
                            );
                        } else if (rowEffectType == "2") {
                            obj.find(".particles-js-canvas-el").remove();
                            rowEffectFullParticle(objId, {
                                "particleColor": {
                                    "line": linkedColor,
                                    "dot": strokeColor,
                                    "bg": rowBgColor
                                }
                            })
                        }
                        obj.find(".particles-js-canvas-el").css({
                            "position": "absolute",
                            "top": 0,
                            "left": 0,
                            "z-index": 0
                        });
                        obj.css("position", "relative");
                        obj.find(">.container").css({"z-index": 1, "position": "inherit"});
                    })
                } else {
                    obj.find(".rowCanvas").remove();
                }
            } catch (error) {
                console && console.log && console.log("initRowEffectFunc callback is error!");
                return;
            }
        }
    });
    $(function () {
        phoenixSite.rowEffectFunc.initRowEffectFunc();
    })
    // 行背景粒子特效
    function rowEffectFullParticle(containerID, paramJson) {
        var ua = navigator.userAgent.toLowerCase();
        if (!!window.ActiveXObject) {
            var version = Math.floor(ua.match(/msie ([\d.]+)/)[1]);
            if (version <= 8) {
                return;
            }
        }

        if ($("#"+containerID).children(".rowCanvas").length == 0) {
            $("#"+containerID).append('<canvas class="rowCanvas" style="position: absolute;top: 0;left: 0;z-index: 0;"></canvas>');
        }
        var defaultColor = {
            "dot": "#22445d",
            "line": "rgba(255, 255, 255, .2)",
            "bg": "#ffffff"
        };
        // canvas setup //
        var bgCanvas = $("#"+containerID).find(".rowCanvas")[0];

        var w = bgCanvas.width = $("#"+containerID).width(),
            h = bgCanvas.height = $("#"+containerID).height(),
            ctx = bgCanvas.getContext('2d'), // parameters
            dotDistance = 93,
            dotRadius = 3,
            minProximity = dotDistance * 4,
            repaintAlpha = 1, // other values
            mouse = new Dot(w / 2, h / 2),
            dots = [],
            prevDD = 0, //dotDistance,
            //prevDR = dotRadius,
            prevMP = 0, //minProximity,
            minProxSquared, hue = 1,
            templateColor = (!!paramJson.particleColor && !!paramJson.particleColor.line) ? paramJson.particleColor.line : defaultColor.line, // gui stuff
            params = ['dotDistance', 'dotRadius', 'minProximity', 'repaintAlpha'],
            boundaries = [
                [20, 200],
                [2, 9],
                [40, 600],
                [0, 1]
            ],
            gui = new dat.GUI({
                autoPlace: false
            });

        // main functions
        function init() {
            for (var i = 0; i < params.length; ++i)
            ;
            considerParameters();
        }

        function considerParameters() {
            if (dotDistance !== prevDD) {
                prevDD = dotDistance;
                createDots();
            }
            if (minProximity !== prevMP) {
                prevMP = minProximity;
                minProxSquared = minProximity * minProximity;
            }
            render();
        }

        function createDots() {
            dots.length = 0;
            for (var x = 0; x < w; x += dotDistance) {
                for (var y = 0; y < h; y += dotDistance) {
                    dots.push(new Dot(x, y));
                }
            }
        }

        function updateMouse(e) {
            var _position = rPosition(containerID, e.pageX, e.pageY);
            if (_position.x < 5 || _position.y < 5) {
                return;
            } else {
                mouse.x = _position.x;
                mouse.y = _position.y;
                render();
            }
        }

        function render() {
            var bgColor = (!!paramJson.particleColor && !!paramJson.particleColor.bg) ? paramJson.particleColor.bg : defaultColor.bg;
            ctx.fillStyle = bgColor.replace('alp', repaintAlpha);
            ctx.fillRect(0, 0, w, h);
            dots.map(function (dot) {
                dot.render();
            });
        }
        function getOpacityColor(thisColor, thisOpacity) {
            var theColor = thisColor.toLowerCase();
            //十六进制颜色值的正则表达式
            var r = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            // 如果是16进制颜色
            if (theColor && r.test(theColor)) {
                if (theColor.length === 4) {
                    var sColorNew = '#';
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += theColor.slice(i, i + 1).concat(theColor.slice(i, i + 1));
                    }
                    theColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for (var j = 1; j < 7; j += 2) {
                    sColorChange.push(parseInt('0x' + theColor.slice(j, j + 2)));
                }
                return 'rgba(' + sColorChange.join(',') + ',' + thisOpacity + ')';
            }
            // 如果是rgba或者rgb
            if (theColor.startsWith('rgb')) {
                let numbers = theColor.match(/(\d(\.\d+)?)+/g);
                numbers = numbers.slice(0, 3).concat(thisOpacity);
                return 'rgba(' + numbers.join(',') + ')';
            }

            return theColor;
        }
        // dot constructor
        function Dot(x, y) {
            this.x = x;
            this.y = y;
        }
        Dot.prototype.render = function () {
            var dX = this.x - mouse.x, // distance X
                dY = this.y - mouse.y, // distance Y
                distSquared = dX * dX + dY * dY;

            if (distSquared <= minProxSquared) {
                var brightness = 50 - distSquared / minProxSquared * 40;
                ctx.fillStyle = ctx.strokeStyle = templateColor.replace('brightness', brightness);
                ctx.beginPath();
                ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            } else {
                ctx.fillStyle = (!!paramJson.particleColor && !!paramJson.particleColor.dot) ? paramJson.particleColor.dot : defaultColor.dot;
                ctx.beginPath();
                ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function rPosition(eleId, mouseX, mouseY) {
            var offset = $("#"+eleId).offset();
            var x = mouseX - offset.left;
            var y = mouseY - offset.top;
            return {"x": x, "y": y}
        }
        // document handlers
        $("#"+containerID)[0].addEventListener('mousemove', updateMouse);
        window.addEventListener('resize', function () {
            w = bgCanvas.width = $("#"+containerID).width();
            h = bgCanvas.height = $("#"+containerID).height();
            createDots();
            render();
        })
        // blast off
        init();
    }
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * enter agent edit
 *
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    // 前台全局命名空间
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var browsrCheck = function () {
        var browsers = ['chrome', 'safari', 'firefox'];
        var flag = false;
        for (var key in browsers) {
            if (!!phoenixSite.browser[browsers[key]]) {
                flag = true;
            }
        }
        return flag;
    };
    var browserUpdatePop = function () {
        var _url = "/phoenix/admin/user/browerupdate/pop";
        var options = {
            url: _url,
            type: "post",
            done: function (xhr) {
                var browerupdateDiv = $('#browerupdate-popup');
                if (browerupdateDiv.length == 1) {
                    browerupdateDiv.remove();
                }
                browerupdateDiv = $(xhr);
                $(document.body).append(browerupdateDiv);
                $("#browerupdate-popup").show();
                $("#browerupdate-popup .member-popup-close").unbind().bind('click', function () {
                    var _this = $("#browerupdate-popup");
                    $(this).parents(".member-popup-wrap").hide();
                });
            }
        };
        phoenixSite.ajax(options);
    };
    //代理商管理
    var agentManage = function (sid, cid) {
        if (!browsrCheck()) {
            browserUpdatePop();
            return;
        }
        if (!!!sid || !!!cid) {
            return;
        }
        var _url = "/phoenix/admin/third/weixin/checkInsurance";
        var options = {
            url: _url,
            type: "post",
            done: function (xhr) {
                if (xhr == 'need_login') {
                    top.location = '/login.html';
                    return;
                }
                if (xhr == 'no_need_scan') {
                    top.location = '/phoenix/admin/user/editSite?s=' + sid + '&c=' + cid + '&d=func_agent&l=1';
                    return;
                }
                var weixinScanDiv = $('#qrcode-popup');
                if (weixinScanDiv.length == 1) {
                    weixinScanDiv.remove();
                }
                weixinScanDiv = $(xhr);
                $(document.body).append(weixinScanDiv);
                $('#qrcode-popup img').attr("src", "/phoenix/admin/third/weixin/qrcode?scene_id=ldpfKAUEiDTJ");
                $("#qrcode-popup").show(0, function () {
                    $(this).children(".member-popup-box").addClass("is-shown");
                });
                $("#qrcode-popup .member-popup-close").click(function () {
                    var _this = $("#qrcode-popup");
                    $(this).parents(".member-popup-wrap").hide();
                    clearInterval(timeout);
                });
                var timeout = setInterval(function () {
                    var _url = "/phoenix/admin/third/weixin/bindCallback";
                    var options = {
                        url: _url,
                        type: "post",
                        data: {
                            'sceneId': 'ldpfKAUEiDTJ'
                        },
                        done: function (xhr) {
                            var result = new Function("return " + xhr)();
                            if (result.status == 'error') {
                                clearInterval(timeout);
                                return;
                            }
                            if (result.isExpired) {
                                clearInterval(timeout);
                                return;
                            }
                            var bindStatus = result.bindStatus;
                            if (bindStatus == '4') {
                                return;
                            }
                            if (bindStatus == '0' || bindStatus == '1') {
                                phoenixSite.popBox.warnPopup("扫描的微信账号和绑定的微信账号不符！");
                                return;
                            }
                            if (bindStatus == '2' || bindStatus == '3') {
                                clearInterval(timeout);
                                top.location = '/phoenix/admin/user/editSite?s=' + sid + '&c=' + cid + '&d=func_agent&l=1';
                            }
                        }
                    };
                    phoenixSite.ajax(options);
                }, 1000);
                $("#weixinBindPop .pop-up-close-btn").click(function () {
                    $('#weixinBindPop').hide();
                    clearInterval(timeout);
                });
            }
        };
        phoenixSite.ajax(options);
    };
    // 服务商管理初始化
    phoenixSite.initAgentManage = function () {
        $('.func_my_agent a').bind("click", function () {
            var sid = $(this).attr('sid');
            var cid = $(this).attr('cid');
            agentManage(sid, cid);
        });
    }
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);

(function (window, $, undefined) {
    $(function () {
        if (typeof phoenixSite == 'undefined' || typeof phoenixSite.page == 'undefined' || typeof phoenixSite.page.cdnUrl == 'undefined' || !!!phoenixSite.page.cdnUrl) {
            return;
        }
        var cdnUrl = phoenixSite.page.cdnUrl;
        var bghtml = '<div class="hv_bg" style="height:100%;width:100%;background: rgba(0,0,0,0.3);position:absolute;top:0;">' +
            '<div class="num" style="height: 66px;width: 66px;position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;background: url(' + cdnUrl + '/static/assets/images/bgicon36001.png);">' +
            '<div class="sq" style="width:66px;height:66px;background:url(' + cdnUrl + '/static/assets/images/bgicon36002.png);transition:transform .4s ease,-webkit-transform .3s ease;"></div><div>' +
            '</div>';

        $($("a[vr_flag=1]")).each(function () {
            if ($(this).find("img").length || $(this).prev().find("img").length) {
                $(this).append(bghtml)
            }
        });


        $("a[vr_flag=1]").off("mouseover").on("mouseover", function (e) {
            $(this).find(".sq").css("transform", "rotate(360deg)");
        });
        $("a[vr_flag=1]").off("mouseout").on("mouseout", function (e) {
            $(this).find(".sq").css("transform", "");
        });
        $("a[vr_flag=1]").off("click").on("click", function (e) {
            e.preventDefault();
            $(this).colorbox({
                opacity: 0.9,
                maxWidth: this.attributes.vrwidth.value + "px",
                maxHeight: this.attributes.vrheight.value + "px",
                width: "100%",
                height: "100%",
                iframe: true,
                fixed: true,
                className: 'videoBoxPlayWrap windowPlayWrap'
            });
        });

        //视频弹窗
        //区块图片模板兼容处理
        // base64加密解密
        var Base64 = {
            //加密
            encode(str) {
                return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                    function toSolidBytes(match, p1) {
                        return String.fromCharCode('0x' + p1);
                    }));
            },
            //解密
            decode(str) {
                // Going backwards: from bytestream, to percent-encoding, to original string.
                return decodeURIComponent(atob(str).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            }
        }
        var dataObj
        $("div[data-setting-base64]").each(function(){
            try {
                var base64Str = $(this).attr("data-setting-base64");
                dataObj = Base64.decode(base64Str)
                if(dataObj){
                    dataObj = JSON.parse(dataObj)
                    if(dataObj.sumType == "2" && dataObj.linkType == "24"){
                        $(this).find("a.blocks-image").attr("vr_flag","2")
                    }
                }
            }catch (e) {

            }
        })
        var bghtml2 = '<div class="hv_bg" style="height:100%;width:100%;background: rgba(0,0,0,0.3);position:absolute;top:0;">' +
            '<div class="video-icon" style="height: 66px;width: 66px;position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;background: url(' + cdnUrl + '/static/assets/images/video_button.png) no-repeat;"></div>' +
            '</div>';
        setTimeout(function () {
            $("a[vr_flag=2]").each(function () {
                if ($(this).find("img").length || $(this).prev().find("img").length) {
                    $(this).append(bghtml2)
                }
            });
        }, 2500);

        $("a[vr_flag=2]").off("click").on("click", function (e) {
            e.preventDefault();
            var player;
            var videoUrl = $(this).attr("href") || "";
            // 判断是否为m3u8视频
            if (videoUrl.lastIndexOf('?mediaType=m3u8') > -1) {
                var videoType = 'application/x-mpegurl';
                var videoDom = '<link rel="stylesheet" type="text/css" href="'+phoenixSite.page.cdnUrl +'/static/assets/widget/script/plugins/videojs/video-js.min.css" /><video id="new_vr_video" class="video-js vjs-big-play-centered" style="width: 100%;height: 100%;"></video>';
                $(this).colorbox({
                    opacity: 0.9,
                    maxHeight: "100%",
                    width: "100%",
                    height: e.view.innerWidth * 0.712,
                    html: videoDom,
                    fixed: true,
                    className: 'videoBoxPlayWrap windowPlayWrap 1',
                    onOpen:function(){

                    },
                    onComplete:function() {
                        $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/videojs/video.min.js", function() {
                            player = videojs('new_vr_video', {
                                autoplay: true,
                                loop: false,
                                controls: true,
                                width: e.view.innerWidth,
                                height: e.view.innerWidth * 0.712,
                                muted: false,
                                sources: [{
                                    src: videoUrl,
                                    type: videoType
                                }]
                            },function onPlayerReady() {
                                $("#new_vr_video_html5_api").attr("playsinline", true);
                                $("#new_vr_video_html5_api").attr("webkit-playsinline", true);
                                this.play();
                            })
                        });
                    },
                    onClosed:function() {
                        if(player){
                            player.dispose();
                        }
                    }
                });
            } else {
                // var iframe_t='<iframe frameborder="0" allow="autoplay" allowfullscreen="true" src="'+e.target.href+'" class="cboxIframe atpl"></iframe>'
                $(this).colorbox({
                    opacity: 0.9,
                    maxHeight: "100%",
                    width: "100%",
                    height: e.view.innerWidth * 0.712,
                    iframe: true,
                    // html:iframe_t,
                    fixed: true,
                    className: 'videoBoxPlayWrap windowPlayWrap 1'
                });
            }
        });

    });
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);

// 新方法给pc优化回填使用
(function (window, $, undefined) {
    $(function () {
        if (typeof phoenixSite == 'undefined' || typeof phoenixSite.page == 'undefined' || typeof phoenixSite.page.cdnUrl == 'undefined' || !!!phoenixSite.page.cdnUrl) {
            return;
        }
        phoenixSite['bindColorBox'] = bindColorBox;

        function bindColorBox(phoenixSite) {
            var cdnUrl = phoenixSite.page.cdnUrl;
            var bghtml = '<div class="hv_bg" style="height:100%;width:100%;background: rgba(0,0,0,0.3);position:absolute;top:0;">' +
                '<div class="num" style="height: 66px;width: 66px;position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;background: url(' + cdnUrl + '/static/assets/images/bgicon36001.png);">' +
                '<div class="sq" style="width:66px;height:66px;background:url(' + cdnUrl + '/static/assets/images/bgicon36002.png);transition:transform .4s ease,-webkit-transform .3s ease;"></div><div>' +
                '</div>';
            $($("a[vr_flag=1]")).each(function () {
                if ($(this).find("img").length || $(this).prev().find("img").length) {
                    if($(this).find(".hv_bg").length == 0){
                        $(this).append(bghtml)
                    }
                }
            });


            $("a[vr_flag=1]").off("mouseover").on("mouseover", function (e) {
                $(this).find(".sq").css("transform", "rotate(360deg)");
            });
            $("a[vr_flag=1]").off("mouseout").on("mouseout", function (e) {
                $(this).find(".sq").css("transform", "");
            });
            $("a[vr_flag=1]").off("click").on("click", function (e) {
                e.preventDefault();
                $(this).colorbox({
                    opacity: 0.9,
                    maxWidth: this.attributes.vrwidth.value + "px",
                    maxHeight: this.attributes.vrheight.value + "px",
                    width: "100%",
                    height: "100%",
                    iframe: true,
                    fixed: true,
                    className: 'videoBoxPlayWrap windowPlayWrap'
                });
            });

            //视频弹窗
            //区块图片模板兼容处理
            // base64加密解密
            var Base64 = {
                //加密
                encode(str) {
                    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                        function toSolidBytes(match, p1) {
                            return String.fromCharCode('0x' + p1);
                        }));
                },
                //解密
                decode(str) {
                    // Going backwards: from bytestream, to percent-encoding, to original string.
                    return decodeURIComponent(atob(str).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                }
            }
            var dataObj
            $("div[data-setting-base64]").each(function(){
                try {
                    var base64Str = $(this).attr("data-setting-base64");
                    dataObj = Base64.decode(base64Str)
                    if(dataObj){
                        dataObj = JSON.parse(dataObj)
                        if(dataObj.sumType == "2" && dataObj.linkType == "24"){
                            $(this).find("a.blocks-image").attr("vr_flag","2")
                        }
                    }
                }catch (e) {

                }
            })
            var bghtml2 = '<div class="hv_bg" style="height:100%;width:100%;background: rgba(0,0,0,0.3);position:absolute;top:0;">' +
                '<div class="video-icon" style="height: 66px;width: 66px;position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;background: url(' + cdnUrl + '/static/assets/images/video_button.png) no-repeat;"></div>' +
                '</div>';
            setTimeout(function () {
                $("a[vr_flag=2]").each(function () {
                    if ($(this).find("img").length || $(this).prev().find("img").length) {
                        if($(this).find(".hv_bg").length == 0){
                            $(this).append(bghtml2)
                        }
                    }
                });
            }, 2500);

            $("a[vr_flag=2]").off("click").on("click", function (e) {
                e.preventDefault();
                var player;
                var videoUrl = $(this).attr("href") || "";
                // 判断是否为m3u8视频
                if (videoUrl.lastIndexOf('?mediaType=m3u8') > -1) {
                    var videoType = 'application/x-mpegurl';
                    var videoDom = '<link rel="stylesheet" type="text/css" href="'+phoenixSite.page.cdnUrl +'/static/assets/widget/script/plugins/videojs/video-js.min.css" /><video id="new_vr_video" class="video-js vjs-big-play-centered" style="width: 100%;height: 100%;"></video>';
                    $(this).colorbox({
                        opacity: 0.9,
                        maxHeight: "100%",
                        width: "100%",
                        height: e.view.innerWidth * 0.712,
                        html: videoDom,
                        fixed: true,
                        className: 'videoBoxPlayWrap windowPlayWrap 1',
                        onOpen:function(){

                        },
                        onComplete:function() {
                            $.getScript(phoenixSite.page.cdnUrl + "/static/assets/widget/script/plugins/videojs/video.min.js", function() {
                                player = videojs('new_vr_video', {
                                    autoplay: true,
                                    loop: false,
                                    controls: true,
                                    width: e.view.innerWidth,
                                    height: e.view.innerWidth * 0.712,
                                    muted: false,
                                    sources: [{
                                        src: videoUrl,
                                        type: videoType
                                    }]
                                },function onPlayerReady() {
                                    $("#new_vr_video_html5_api").attr("playsinline", true);
                                    $("#new_vr_video_html5_api").attr("webkit-playsinline", true);
                                    this.play();
                                })
                            });
                        },
                        onClosed:function() {
                            if(player){
                                player.dispose();
                            }
                        }
                    });
                } else {
                    // var iframe_t='<iframe frameborder="0" allow="autoplay" allowfullscreen="true" src="'+e.target.href+'" class="cboxIframe atpl"></iframe>'
                    $(this).colorbox({
                        opacity: 0.9,
                        maxHeight: "100%",
                        width: "100%",
                        height: e.view.innerWidth * 0.712,
                        iframe: true,
                        // html:iframe_t,
                        fixed: true,
                        className: 'videoBoxPlayWrap windowPlayWrap 1'
                    });
                }
            });
        }


    });
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);
/**
 * 手机端页面背景处理
 *
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    $(function () {
        var _backgroundArr = [];
        var _backgroundTopArr = [];
        var background_windowHeight = $(window).height();
        //body fixed背景处理
        if ($(window).width() < 1050) {
            var _backgroundStyleDefault = $('<style id="backgroundSizeDefault"></style>');
            $('body').append(_backgroundStyleDefault);
            var body_backgroundNone = $('<style>@media screen and (max-width:1049px) {.body_backgroundNone{background-image:none!important;}}</style>');
            $('body').append(body_backgroundNone);
            var body_backgroundValue = $('body').css('background');
            if (body_backgroundValue.indexOf("url") != -1 && body_backgroundValue.indexOf("fixed") != -1) {
                $('#backgroundSizeDefault').html('@media screen and (max-width: 1049px) {body.backgroundImg:before{z-index:-1;content:"";position:fixed;top:0;right:0;bottom:0;left:0;background:' + body_backgroundValue + ';background-color:transparent!important;}}');
                $('body').addClass('body_backgroundNone').addClass('backgroundImg');
            }
        }

        $('.outerContainer').each(function () {
            var _background = $(this).css('background-image');
            var _attachment = $(this).css('background-attachment');
            if (_background.indexOf("url") != -1 && _attachment == 'fixed') {
                _backgroundArr.push($(this));
            }
        });
        if (_backgroundArr.length) {
            for (var i = 0; i < _backgroundArr.length; i++) {
                _backgroundTopArr.push($(_backgroundArr[i]).offset().top);
            }
            var _backgroundStyle = $('<style id="backgroundSize"></style>');
            $('body').append(_backgroundStyle);
            var _backgroundNone = $('<style>@media screen and (max-width: 1049px) {.backgroundNone{background-image:none!important;background-color: unset!important;}}</style>');
            $('body').append(_backgroundNone);
            var _background_timerDelay = null;
            $(window).scroll(function () {
                if ($(window).width() > 1049) {
                    return;
                }
                _backgroundTopArr = [];
                for (var i = 0; i < _backgroundArr.length; i++) {
                    _backgroundTopArr.push($(_backgroundArr[i]).offset().top);
                }
                var _background_scrollTop = $(this).scrollTop();
                if (_background_timerDelay) {
                    clearTimeout(_background_timerDelay)
                }
                _background_timerDelay = setTimeout(function () {
                    _backgroundFun(_background_scrollTop);
                }, 200);

                function _backgroundFun(scrollTop) {
                    for (var i = 0; i < _backgroundTopArr.length; i++) {
                        if (scrollTop > (_backgroundTopArr[i] - background_windowHeight / 2) && scrollTop < (_backgroundTopArr[i] + _backgroundArr[i].height())) {
                            var _backgroundValue_virtual = _backgroundArr[i].css('background');
                            if (_backgroundValue_virtual.indexOf("none") == -1) {
                                var _backgroundValue = _backgroundValue_virtual;
                                $('.backgroundNone').removeClass('backgroundNone');
                                // _backgroundArr[i].addClass('backgroundNone');
                                var _backgroundSizeValue = _backgroundArr[i].css('background-size');
                                $('#backgroundSize').html('@media screen and (max-width: 1049px) {body.backgroundImg' + i + ':before{z-index:-1;content:"";position:fixed;top:0;right:0;bottom:0;left:0;background:' + _backgroundValue + ';background-size:' + _backgroundSizeValue + ';background-color:transparent!important;}}');
                                // $('body').addClass('backgroundImg'+i);
                            }
                        } else {
                            // $('body').removeClass('backgroundImg'+i);
                            // _backgroundArr[i].removeClass('backgroundNone');
                        }
                    }
                }
            });
        }
    })
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);
/**
 * 图片懒加载处理
 *
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    window.lazySizesConfig = window.lazySizesConfig || {};
    window.lazySizesConfig.lazyClass = 'lazyimg';
    lazySizesConfig.srcAttr = 'data-original';
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);
/**
 * 加载第三方资源，可在同一页面防止重复加载
 *
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    // 前台全局命名空间
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    //定义一个全局script的标记数组，用来标记是否某个script已经下载到本地
    var scriptsArray = new Array();
    phoenixSite.getCachedScripts = function () {
        return scriptsArray;
    }
    //
    phoenixSite.cachedScript = function (url, options) {
        //循环script标记数组
        for (var s in scriptsArray) {
            //console.log(scriptsArray[s]);
            //如果某个数组已经下载到了本地
            if (scriptsArray[s] == url) {
                return { //则返回一个对象字面量，其中的done之所以叫做done是为了与下面$.ajax中的done相对应
                    done: function (method) {
                        if (typeof method == 'function') { //如果传入参数为一个方法
                            method();
                        }
                    }
                };
            }
        }
        //这里是jquery官方提供类似getScript实现的方法，也就是说getScript其实也就是对ajax方法的一个拓展
        options = $.extend(options || {}, {
            dataType: "script",
            url: url,
            cache: true
            //其实现在这缓存加与不加没多大区别
        });
        scriptsArray.push(url); //将url地址放入script标记数组中
        return $.ajax(options);
    };
})(this, typeof jQuery === 'undefined' ? undefined : jQuery);


/**
 * 记录登录注册的referer链接到localStorage，用于服务端登录及注册后续的页面精准跳转
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var registLoginReferer = phoenixSite.registLoginReferer || (phoenixSite.registLoginReferer = {});
    $.extend(registLoginReferer, {
        init: function () {
            if (typeof window.localStorage == 'undefined') {
                return;
            }
            //链接包含以下内容的则忽略，不予记录到localStorage中
            var notRecordUrls = ['/login.html', '/regist.html', '/regist-success.html', '/phoenix/admin/'];
            var referer = document.referrer;
            for (var url in notRecordUrls) {
                if (referer.indexOf(notRecordUrls[url]) != -1) {
                    return;
                }
            }
            localStorage.setItem('_LOGIN_REGIST_REFERER', referer);
        },
        get: function () {
            var referer = localStorage.getItem('_LOGIN_REGIST_REFERER');
            if (typeof referer == 'undefined' || $.trim(referer) == '' || referer == null) {
                referer = '';
            }
            return referer;
        },
        registCheckAndJump: function () {
            // 检测当前是否是注册成功页，如果不是则忽略
            var curUrl = location.href;
            if (curUrl.indexOf('/regist-success.html') == -1) {
                return;
            }
            // 获取需要的referer参数，如果有则5秒钟后页面跳转到对应的页面
            var referer = this.get();
            // 删除原有的key
            localStorage.removeItem('_LOGIN_REGIST_REFERER');
            if ($.trim(referer) != '') {
                setTimeout(function () {
                    location = referer;
                }, 5000);
            }
        }
    });
    // 每次页面加载，检查是否是注册成功页，根据是否有跳转参数链接，进行跳转
    $(function () {
        phoenixSite.registLoginReferer.registCheckAndJump();
    })
})(window, typeof jQuery === 'undefined' ? undefined : jQuery);

/**
 * 判断当前浏览是否支持aspectRatio熟属性
 *
 * @param {Object} window
 * @param {Object} $
 * @param {Object} undefined
 */
(function (window, $, undefined) {
    function isPropertySupported(property) {
        return property in document.body.style;
    }
    try{
        //由于js在head中加载，可能会存在body找不到报错的情况
        setTimeout(() => {
            if (!isPropertySupported('aspectRatio')) {
                // 浏览器不支持 aspectRatio 属性
                $("body").addClass('not-aspectRatio')
            }
        },1)
    }catch(err){}

})(this, typeof jQuery === 'undefined' ? undefined : jQuery);

