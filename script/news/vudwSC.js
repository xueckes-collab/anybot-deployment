/**
 * 链接组件弹窗表单
 */
(function(window, $, undefined){
	// 前台全局命名空间
    var phoenixSite = window.phoenixSite || (window.phoenixSite = {});
    var name = "linkPopUp";
    var form = phoenixSite[name] || (phoenixSite[name] = {});
	var popAjaxLoading = false;
    form.version = "1.0.0";
    // 弹窗方法
    $.extend(form, {
    	popup: function(formId, formName, redirectUrl, pageId, resultPage,style=''){
			if (popAjaxLoading) return;
			popAjaxLoading = true;
    		var curBackendPageId;
    		if(!!!redirectUrl){
    			curBackendPageId = phoenixSite.page._pId;
    		}
    		 var productId = "";
    		 var articleId = "";
    		 var skuParam = "";
    		 var quantity = "";
    		 var inquireParam = {};
    		 var inquireParams;
    		 var array = new Array();
    		 var productIdHidden = $(".linkPopupForm_idHidden_product");
    		 var articleIdHidden = $(".linkPopupForm_idHidden_article");
    		 if (productIdHidden.length>=1) {
    			 productId = $(productIdHidden).attr("value");
    			 skuParam = $(".linkPopupForm_skuHidden").attr("value");
    			 quantity = $(".order-quan-input").attr("value");
    			 var inquireParam = {
    					 'prodId': productId,
    					 'skuParam': skuParam,
    					 'quantity': quantity
    			 };
    			 array.push(inquireParam);
    			 inquireParams = $.toJSON(array);
    		 }
    		 if (articleIdHidden.length>=1) {
    			 articleId = $(articleIdHidden).attr("value");
    		 }
    		 var date = new Date();
		     var currentdate = date.getTime().toString();
		     if(!!!redirectUrl){
		    	 var data = {
		     			'formId': formId,
		     			'formName': formName,
		     			'resultPage': resultPage,
		     			'productId': productId,
		     			'articleId': articleId,
		     			'inquireParams': inquireParams,
		     			'cur_backend_pageId': curBackendPageId,
		     			'currentdate': "t_" + currentdate,
					 	'style':JSON.stringify(style),
		              }
		     }else{
		    	 var data = {
			     			'formId': formId,
			     			'formName': formName,
			     			'resultPage': resultPage,
			     			'productId': productId,
			     			'articleId': articleId,
			     			'inquireParams': inquireParams,
			     			'redirectUrl': redirectUrl,
			     			'cur_backend_pageId': pageId,
			     			'currentdate': "t_" + currentdate,
					 		'style': JSON.stringify(style),
				 }
		     }
             var _options = {
                 url: '/phoenix/admin/linkForm/popup',
                 type: 'post',
                 data: data,
                 done: function(xhr){
	    			 $('#link_form_popup_div').remove();
	                 $('body').append(xhr);
	                 $("#link_form_popup_div").fadeIn();
					 popAjaxLoading = false;
	               //模拟添加按钮消除手机端因为绝对定位或是固定定位软键盘弹起产生的定位影响
					if($(".pop-inquire .pop-main .control-group.submitGroup").length>0 && $("#formsubmitClone").length == 0){
	             		var submitGroupAdd = $(".pop-inquire .pop-main .control-group.submitGroup").clone();
	                 	$(".pop-inquire .pop-box").append(submitGroupAdd);
	                 	if($(".pop-inquire .pop-box>.submitGroup").find("button").length == 1){
	                 		$(".pop-inquire .pop-box>.submitGroup").find("button").eq(0).attr("id","formsubmitClone");
	                 	}
	                 	if($(".pop-inquire .pop-box>.submitGroup").find("button").length == 2){
	                 		$(".pop-inquire .pop-box>.submitGroup").find("button").eq(0).attr("id","formsubmitClone");
	                 		$(".pop-inquire .pop-box>.submitGroup").find("button").eq(1).attr("id","formresetClone")
	                 	}
	             	}
                 },
				 fail: function(xhr, textStatus, errorThrown){
					 // 请求失败时的处理逻辑
					 console.log("请求失败: " + textStatus + ", " + errorThrown);
					 popAjaxLoading = false;
				 }
             }
             phoenixSite.ajax(_options);
           //按钮点击委托
             //提交
             $(document).on("click","#formsubmitClone",function(ev){
             	$(".form_inquire_popup #formsubmit").click();
             })
             //重置
             $(document).on("click","#formresetClone",function(ev){
             	$(".form_inquire_popup #formreset").click();
             })
    	}
    })
})(window, jQuery);