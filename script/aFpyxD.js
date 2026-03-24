(function(g,e,b){var c=g.phoenixSite||(g.phoenixSite={});
var i=c.smsSend||(c.smsSend={});
var m={};
var l=g.$_phoenix==b;
var a=true;
var h=null;
var f=60;
var j=g.requestAnimationFrame==b&&g.webkitRequestAnimationFrame==b&&g.mozRequestAnimationFrame==b&&g.oRequestAnimationFrame==b&&g.msRequestAnimationFrame==b;
var d=function(){e(".member-popup-wrap").unbind("click").bind("click",function(n){return
})
};
var k=function(n){if(e(".member-popup-wrap#"+n).length){e(".member-popup-wrap#"+n).children(".member-popup-box.is-shown").addClass("is-hidden");
if(j){if(e(".member-popup-wrap#"+n).children(".member-popup-box.is-shown").hasClass("is-hidden")){e(this).parents(".member-popup-wrap").hide(0,function(){e(this).children(".member-popup-box").removeClass("is-hidden is-shown")
})
}}else{e(".member-popup-wrap#"+n).children(".member-popup-box.is-hidden").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){if(e(this).hasClass("is-hidden")){e(this).parents(".member-popup-wrap").hide(0,function(){e(this).children(".member-popup-box").removeClass("is-hidden is-shown")
})
}})
}}};
e.extend(i,{init:function(q){m={};
g.clearInterval(h);
h=null;
f=60;
e.extend(m,q);
a=true;
var p="";
if(m.urlAppend!=b){p=m.urlAppend
}var n="";
if(c.page!=b&&c.page._menu_prefix!=b){n=c.page._menu_prefix
}m._menu_prefix=n;
var o=n+"/phoenix/admin/user/sms/pop"+p;
e.ajax({url:o,type:"get",success:function(s){if(s=="need_login"){top.location=n+"/login.html";
return
}var r=e("#sms-popup");
if(r.length==1){r.remove()
}r=e(s);
e(document.body).append(r);
d();
e("#sms-popup .member-popup-close").click(function(t){t.stopPropagation();
k("sms-popup")
});
e("#sms-popup").show(0,function(){e(this).children(".member-popup-box").addClass("is-shown")
});
e("#sms-popup .func_sms_send",r).bind("click",function(){if(a){e("#userPhoneFaptcha",r).show()
}});
e(".func_sms_send",r).unbind("click").bind("click",function(){var t=e("#sms-popup #verifyPhone");
if(t.length==0||checkMobile(t).isChecked){e("#userPhoneFaptcha",r).show()
}});
e("#userPhoneFaptcha #faptcha_response_field",r).bind("input propertychange",function(){if(e(this).val().length==4){i.send()
}});
e("#sms-popup .func_sms_send_confirm").bind("click",function(){if(m.confirmFunc){i.verifyAndCallFunc()
}else{k("sms-popup")
}})
}})
},initForCallFunc:function(n){m={};
e.extend(m,n);
i.verifyAndCallFunc()
},send:function(){a=false;
var n=function(){if(f==0){g.clearInterval(h);
e("#sms-popup .func_sms_send").html("获取验证码");
a=true;
h=null;
f=60
}else{f--;
if(f!=0){e("#sms-popup .func_sms_send").html(f+"秒后重新获取")
}}};
var p="2";
if(typeof m.verifyCodeType!="undefined"){p="2"
}var o=function(){var t=true,u=e("#sms-popup #verifyPhone");
if(u.length){t=checkMobile(u).isChecked
}if(!t){return
}var v="";
var q="0";
if(u.length==1){v=u.val();
if(e.trim(v)==""){i.showError("verifyPhone",c.message(c.lanEdition,"phoenix_validate_enter_valid_mobile"));
return
}}else{q="1"
}var s="";
if(m.encodeUserId!==b){s=m.encodeUserId
}var r="";
if(c.page!=b&&c.page._menu_prefix!=b){r=c.page._menu_prefix
}m._menu_prefix=r;
e.ajax({url:m._menu_prefix+"/phoenix/admin/user/sms/verify/code",dataType:"json",type:"post",data:{mobile:v,verifyCodeType:p,encodeUserId:s,useHasVerifyPhone:q,faptcha_response_field:e("#userPhoneFaptcha #faptcha_response_field").val(),faptcha_challenge_field:e("#userPhoneFaptcha #faptcha_challenge_field").val()},success:function(w){if(!w.faptchaResult){e("#verifyCode_error").show();
e("#userPhoneFaptcha #faptcha_response_field").val("");
e("#userPhoneFaptcha .refreshImg").click();
return false
}else{e("#verifyCode_error").hide();
e("#userPhoneFaptcha").hide();
e("#userPhoneFaptcha #faptcha_response_field").val("");
e("#userPhoneFaptcha .refreshImg").click();
if(w.codeVerifyToken!==b&&w.codeVerifyToken!==""){e("#verifyToken").val(w.codeVerifyToken)
}}if(w.hasOwnProperty("error")){if("need_login"==w.error){top.location=m._menu_prefix+"/login.html";
return
}else{if("mobile_blank"==w.error){i.showError("mobile",c.message(c.lanEdition,"phoenix_validate_enter_valid_mobile"))
}else{if("smsVerifyCode_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}else{if("sms_send_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_sms_send_error"))
}else{if("sms_send_time_limit_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_sms_send_time_limit_error"))
}else{if("sms_send_unit_time_limit_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_sms_send_unit_time_limit_error"))
}else{if("smsVerifyCode_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}else{if("smsVerifyCode_blank"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}}}}}}}}}else{i.hideError("verifyPhone");
i.hideError("smsVerifyCode");
h=setInterval(function(){n()
},1000)
}}})
};
o()
},verifyAndCallFunc:function(){var s=e("#sms-popup #verifyPhone");
var r=e("#sms-popup #smsVerifyCode").val();
var u="";
var o="0";
var n=e("#newAccount").val();
if(s.length==1){u=s.val();
if(e.trim(u)==""){i.showError("verifyPhone",c.message(c.lanEdition,"phoenix_validate_enter_valid_mobile"));
return
}}else{o="1"
}if(e.trim(r)==""){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"));
return
}var q="";
if(m.encodeUserId!==b){q=m.encodeUserId
}var p="";
if(c.page!=b&&c.page._menu_prefix!=b){p=c.page._menu_prefix
}m._menu_prefix=p;
var t="";
if(e("#verifyToken").length){t=e("#verifyToken").val()
}e.ajax({url:m._menu_prefix+"/phoenix/admin/user/sms/verify",dataType:"json",type:"post",data:{mobile:u,smsVerifyCode:r,encodeUserId:q,useHasVerifyPhone:o,newAccount:n,forwardUrl:m.forwardUrl,verifyToken:t},success:function(w){if(w.hasOwnProperty("error")){if("need_login"==w.error){top.location=m._menu_prefix+"/login.html";
return
}else{if("mobile_blank"==w.error){i.showError("mobile",c.message(c.lanEdition,"phoenix_validate_enter_valid_mobile"))
}else{if("smsVerifyCode_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}else{if("sms_send_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_sms_send_error"))
}else{if("sms_send_time_limit_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_sms_send_time_limit_error"))
}else{if("sms_send_unit_time_limit_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_sms_send_unit_time_limit_error"))
}else{if("smsVerifyCode_error"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}else{if("smsVerifyCode_blank"==w.error){i.showError("smsVerifyCode",c.message(c.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}}}}}}}}}else{if(w.smsVerifyToken){var v=w.smsVerifyToken;
e("[name='verify_token_value']").val(v)
}if(m.forwardUrl!=b&&m.forwardCallback!=b){m.forwardCallback();
k("sms-popup")
}else{m.confirmFunc();
k("sms-popup")
}}}})
},showError:function(o,n){e("#sms-popup #"+o+"_error").html(n).show()
},hideError:function(n){e("#sms-popup #"+n+"_error").html("").hide()
},onlineService:function(){var n="http://kefu.trademessenger.com/chat?domain=leadong&businessType=CQrZsSwiESg&referrer="+encodeURIComponent(g.location.href);
top.open(n,"kefu","toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,width=800,height=600,left=50,top=50")
}})
})(window,jQuery);