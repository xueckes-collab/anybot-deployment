var initCheck={init:function(b){var a=$(b);
checkInputs(a);
checkForm(a)
}};
function checkInputs(a){var g=$("#password",a),d=$("#confirmPassword",a),c=$("#oriPassword",a),b=$("#account",a);
var j=$("#email",a);
var i=$("#mobile",a);
var h=$("#passwordMobile",a);
var k=$("#smsVerifyCode",a);
var f=$("#faptcha_response_field",a);
var e=$("#account4AgentCn",a);
if(e.length){e.blur(function(){var l=$(this);
checkAccount4AgentCn(l)
})
}if(j.length){j.blur(function(){var l=$(this);
checkEmail(l)
})
}if(i.length){i.blur(function(){var l=$(this);
checkMobile(l)
})
}if(b.length){b.blur(function(){var l=$(this);
checkUsername(l);
checkEmail(l)
})
}if(k.length){k.focus(function(){}).blur(function(){var l=$(this);
checkMobCode(l)
})
}if(c.length){c.focus(function(){}).blur(function(){var l=$(this);
checkOriginPwd(l)
})
}if(c.length){c.focus(function(){}).blur(function(){var l=$(this);
checkOriginPwd(l)
})
}if(f.length){f.focus(function(){}).blur(function(){var l=$(this);
checkUsercheckcode(l)
})
}if(g.length){g.focus(function(){}).blur(function(){var l=$(this);
checkPwd(l)
})
}if(d.length){d.focus(function(){}).blur(function(){var l=$(this);
checkCpwd(l,g.val())
})
}if(h.length){h.focus(function(){}).blur(function(){var l=$(this);
checkPwd(l)
})
}}function checkForm(a){$("#formsubmit",a).click(function(i){var j=$(this),g=j.parents("form"),d=true,h=$("#password",g),c=$("#oriPassword",a),b=$("#confirmPassword",g);
var f=$("#account",g);
if(f.length){d=checkUsername(f).isChecked
}if(c.length){d=d&&checkOriginPwd(c).isChecked
}if(h.length){d=d&&checkPwd(h).isChecked
}if(b.length){d=d&&checkCpwd(b,h.val()).isChecked
}if(f.length){d=d&&checkEmail(f).isChecked
}if(d){g.submit()
}i.preventDefault()
})
}function checkEmail(c){var e=checkList.checkEmail(c);
var g=$(c);
if(e.isChecked){var d=c.attr("class").indexOf("unique_validate")!=-1;
var b=c.attr("id");
var a=$("#"+b+"_unique_validate_url");
if(d&&a.length==1&&$.trim(a.html())!=""){var f=$.trim(a.html());
f=f+"?logonName="+c.val();
$.getJSON(f,function(h){if(h.hasOwnProperty("error")){if("repeat_user"==h.error){var i=phoenixSite.message(phoenixSite.lanEdition,"phoenix_email_regist_error");
checkMsgShow(c,i)
}else{if("logonName_blank"==h.error){var i=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_valid_email");
checkMsgShow(c,i)
}}}else{checkMsgHide(c,e.msg)
}})
}else{checkMsgHide(c)
}}else{checkMsgShow(c,e.msg)
}return e
}function checkMobile(c){var e=checkList.checkMobile(c);
var g=$(c);
if(e.isChecked){var d=c.attr("class").indexOf("unique_validate")!=-1;
var b=c.attr("id");
var a=$("#"+b+"_unique_validate_url");
if(d&&a.length==1&&$.trim(a.html())!=""){var f=$.trim(a.html());
f=f+"?logonName="+c.val();
$.getJSON(f,function(h){if(h.hasOwnProperty("error")){if("repeat_user"==h.error){var i=phoenixSite.message(phoenixSite.lanEdition,"phoenix_mobile_regist_error");
checkMsgShow(c,i)
}else{if("logonName_blank"==h.error){var i=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_valid_mobile");
checkMsgShow(c,i)
}}}else{checkMsgHide(c,e.msg)
}})
}else{checkMsgHide(c)
}}else{checkMsgShow(c,e.msg)
}return e
}function checkMobCode(a){var b=checkList.checkMobCode(a);
if(b.isChecked){checkMsgHide(a)
}else{checkMsgShow(a,b.msg)
}return b
}function checkPwd(a){var b=checkList.checkPwd(a);
if(b.isChecked){checkMsgHide(a)
}else{checkMsgShow(a,b.msg)
}return b
}function checkCpwd(a,c){var b=checkList.checkCpwd(a,c);
if(b.isChecked){checkMsgHide(a)
}else{checkMsgShow(a,b.msg)
}return b
}function checkOriginPwd(a){var b=checkList.checkOriginPwd(a);
if(b.isChecked){checkMsgHide(a)
}else{checkMsgShow(a,b.msg)
}return b
}function checkUsername(a){var b=checkList.checkUsername(a);
if(b.isChecked){checkMsgHide(a)
}else{checkMsgShow(a,b.msg)
}return b
}function checkUsercheckcode(a){var b=checkList.checkUsercheckcode(a,4);
if(b.isChecked){checkMsgHide(a)
}else{checkMsgShow(a,b.msg)
}return b
}function checkAccount4AgentCn(a){var b=checkList.checkAccount4AgentCn(a);
if(b.isChecked){checkMsgHide(a)
}else{checkMsgShow(a,b.msg)
}return b
}function checkMsgHide(a){var c=a.parent().find(".member-error-msg");
var b=a.parents(".user-signup-hori-controls").siblings(".user-signup-tips");
if(c.length==1){c.html("").hide()
}else{if(b.length==1){a.siblings().remove();
a.removeClass("error-input");
a.after('<i class="user-status icon-yes"></i>');
b.html('<span class="user-ok-msg"></span>')
}}}function checkMsgShow(a,d){var c=a.parent().find(".member-error-msg");
var b=a.parents(".user-signup-hori-controls").siblings(".user-signup-tips");
if(c.length==1){c.html(d).show()
}else{if(b.length==1){a.siblings().remove();
a.addClass("error-input");
a.after('<i class="user-status icon-no"></i>');
b.html('<span class="user-error-msg"><span class="user-signup-msgs">'+d+"</span></span>")
}}};