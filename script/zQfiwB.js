(function(e,g,h){var f=e.phoenixSite||(e.phoenixSite={});
var d=f.userFindPassword||(f.userFindPassword={});
var a={};
var b=e.$_phoenix==h;
var c="";
g.extend(d,{init:function(k){g.extend(a,k);
if(b){var j=a.className;
var l=g("."+j);
g("#formsubmit4reset",l).unbind("click").bind("click",function(){pwdInput=g("#password",l);
confpwdInput=g("#confirmPassword",l);
isCheck=true;
if(pwdInput.length){isCheck=isCheck&&checkPwd(pwdInput).isChecked
}if(confpwdInput.length){isCheck=isCheck&&checkCpwd(confpwdInput,pwdInput.val()).isChecked
}if(pwdInput.val()!=""){isCheck=isCheck&&checkPwd(pwdInput).isChecked
}if(confpwdInput.val()!=""){isCheck=isCheck&&checkCpwd(confpwdInput,pwdInput.val()).isChecked
}if(!isCheck){return
}document.forms.passwordResetForm.submit()
});
if(a.isAgentCn=="true"){d.bindEvent4AgentCn()
}else{d.bindEvent()
}var i="";
if(f.page!=h&&f.page._menu_prefix!=h){i=f.page._menu_prefix
}a._menu_prefix=i
}else{d.tabChange()
}},tabChange:function(){var i=a.className;
if(g("."+i+" .func_account_find_password_email").length==1){c="email"
}if(c==""&&g("."+i+" .func_account_find_password_mobile").length==1){c="mobile"
}g("."+i+" .func_account_find_password_navigate li").unbind("click").bind("click",function(){var j=g(this);
j.addClass("on");
j.siblings().removeClass("on");
if(j.attr("class").indexOf("email")!=-1){c="email";
g("."+i+" .func_account_find_password_email").removeClass("hide");
g("."+i+" .func_account_find_password_mobile").addClass("hide")
}else{if(j.attr("class").indexOf("mobile")!=-1){c="mobile";
g("."+i+" .func_account_find_password_email").addClass("hide");
g("."+i+" .func_account_find_password_mobile").removeClass("hide")
}}})
},submit4AgentCnStep1:function(){var k=a.className;
var n=g("."+k),j=true,m=g("#account4AgentCn",n);
var j=true;
if(m.length){j=checkAccount4AgentCn(m).isChecked
}if(!j){return
}var m=g("."+k+" #account4AgentCn").val();
var l=g("."+k+" #faptcha_response_field").val();
var i=g("."+k+" #faptcha_challenge_field").val();
g.ajax({url:a._menu_prefix+"/phoenix/admin/user/findPassword/step1",type:"post",data:{account:m,faptcha_response_field:l,faptcha_challenge_field:i},success:function(o){if(o=="verifyCode_error"){d.showError(k,"faptcha_response_field","请输入正确的验证码！");
f.faptcha.reload()
}else{if(o=="account_not_exist"){d.showError(k,"account4AgentCn","该登录名不存在！")
}else{g("."+k+" .sitewidget-bd").html(o);
d.submit4AgentCnStep2()
}}}})
},submit4AgentCnStep2:function(){var i=a.className;
var j=function(l){if(l=="phone"){d.submit4AgentCnStep3ByPhone()
}else{if(l=="email"){d.submit4AgentCnStep3ByEmail()
}}};
var k=function(m){var n=g("."+i+" #reset_account").val();
var l=g("."+i+" #token").val();
g.ajax({url:a._menu_prefix+"/phoenix/admin/user/findPassword/step2",type:"post",data:{account:n,findStyle:m,settingId:a.settingId,form_token_value:l},success:function(o){if(o=="error"){top.location.href=a._menu_prefix+"/find-password.html"
}else{g("."+i+" .sitewidget-bd").html(o);
j(m)
}}})
};
g("."+i+" #reset_by_phone").unbind("click").bind("click",function(){k("phone")
});
g("."+i+" #reset_by_email").unbind("click").bind("click",function(){g("."+i+" [name='form_token_value']").val(g("."+i+" #token").val());
document.forms.findByEmailForm.submit()
});
g("."+i+" #reset_by_service").unbind("click").bind("click",function(){top.open("//kefu.trademessenger.com/chat?domain=leadong&businessType=HisI7Xng2J4&referrer="+encodeURIComponent(e.location.href),"kefu","toolbar=no,location=no,directories=no,resizable=yes,status=yes,menubar=no,scrollbars=yes,width=860,height=600,left=0,top=0")
})
},submit4AgentCnStep3ByPhone:function(){var j=a.className;
initCheck.init("."+j);
d.sendSmsBind();
var i=function(){var r=g("."+a.className),m=true,p=g("#passwordMobile",r),o=g("#smsVerifyCode",r);
if(o.length){m=m&&checkMobCode(o).isChecked
}if(p.length){m=m&&checkPwd(p).isChecked
}if(!m){return
}var q=g("."+j+" #reset_account").val();
var k=g("."+j+" #token").val();
var l=g("."+j+" #passwordMobile").val();
var n=g("."+j+" #smsVerifyCode").val();
g.ajax({url:a._menu_prefix+"/phoenix/admin/user/findPassword/step3",dataType:"json",type:"post",data:{account:q,form_token_value:k,passwordMobile:l,smsVerifyCode:n},success:function(u){if(u.hasOwnProperty("error")){if("not_exist_user"==u.error){d.showError(j,"mobile",f.message(f.lanEdition,"phoenix_mobile_not_exist_error"))
}else{if("mobile_blank"==u.error){d.showError(j,"mobile",f.message(f.lanEdition,"phoenix_validate_enter_valid_mobile"))
}else{if("passwordMobile_blank"==u.error){d.showError(j,"passwordMobile",f.message(f.lanEdition,"phoenix_validate_required_password"))
}else{if("smsVerifyCode_error"==u.error){d.showError(j,"smsVerifyCode",f.message(f.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}else{if("smsVerifyCode_blank"==u.error){d.showError(j,"smsVerifyCode",f.message(f.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}else{if("mobile_error"==u.error){d.showError(j,"mobile",f.message(f.lanEdition,"phoenix_mobile_not_exist_error"))
}}}}}}}else{if(u.hasOwnProperty("findPassword_success")){var v=f.message(f.lanEdition,"phoenix_member_pwd_reset_success")+"<br/>";
var t=f.message(f.lanEdition,"phoenix_member_find_pwd_mail_jump");
var s=f.message(f.lanEdition,"phoenix_member_find_pwd_jump");
v+=t+'<a class="user-text-snippets-default" href=\''+a._menu_prefix+"/'>"+s+"</a>";
g(".sitewidget-userFindPassword .successInfo").html(v).siblings().remove();
e.setTimeout(function(){top.location.href=a._menu_prefix+"/"
},5000)
}}}})
};
g("."+j+" #formsubmit4mobileFindPassword").unbind("click").bind("click",function(){i()
})
},submit4AgentCnStep3ByEmail:function(){var i=a.className;
initCheck.init("."+i);
g("."+i+" #formsubmit4emailFindPassword").unbind("click").bind("click",function(){var l=g("."+i),k=true,j=g("#email",l);
if(j.length){k=checkEmail(j).isChecked
}if(!k){return
}document.forms.findByEmailForm.submit()
})
},bindEvent4AgentCn:function(){var i=a.className;
g("."+i+" #formsubmit4AgentCn").unbind("click").bind("click",function(){d.submit4AgentCnStep1()
})
},sendSmsBind:function(){var l=a.isAgentCn=="true";
var r=a.className;
initCheck.init("."+a.className);
var n=g("."+r+" .func_sms_send");
var p=g("."+r+" #reset_account");
var m=g("."+r+" #findPwdFaptcha #faptcha_response_field");
var i=g("."+r+" #findPwdFaptcha #faptcha_challenge_field");
var k=true;
var q=null;
var o=60;
var s=function(){if(o==0){e.clearInterval(q);
n.html("获取验证码");
k=true;
q=null;
o=60
}else{o--;
if(o!=0){n.html(o+"秒后重新获取")
}}};
var j=function(){var y=g("."+r),u=true,t=g("#mobile",y);
if(t.length){u=checkMobile(t).isChecked
}if(!u&&!l){return
}var x=t.val();
var w="1";
var v=a._menu_prefix+"/phoenix/admin/user/sms/verify/code";
if(l){w="3";
v=a._menu_prefix+"/phoenix/admin/user/sms/verify/code/"+p.val()
}g.ajax({url:v,dataType:"json",type:"post",data:{mobile:x,verifyCodeType:w,faptcha_response_field:m.val(),faptcha_challenge_field:i.val()},success:function(z){if(!z.faptchaResult){g("."+r+" #findPwdFaptchaError").html(f.message(f.lanEdition,"phoenix_verify_code_error"));
g("."+r+" #findPwdFaptcha #faptcha_response_field").val("");
g("."+r+" #findPwdFaptcha .refreshImg").click();
return false
}else{g("."+r+" #findPwdFaptchaError").html("");
g("."+r+" #findPwdFaptcha").hide();
g("."+r+" #findPwdFaptcha #faptcha_response_field").val("");
g("."+r+" #findPwdFaptcha .refreshImg").click()
}if(z.hasOwnProperty("error")){if("not_exist_user"==z.error){d.showError(r,"mobile",f.message(f.lanEdition,"phoenix_mobile_not_exist_error"))
}else{if("mobile_blank"==z.error){d.showError(r,"mobile",f.message(f.lanEdition,"phoenix_validate_enter_valid_mobile"))
}else{if("smsVerifyCode_error"==z.error){d.showError(r,"smsVerifyCode",f.message(f.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}else{if("sms_send_error"==z.error){d.showError(r,"smsVerifyCode",f.message(f.lanEdition,"phoenix_sms_send_error"))
}else{if("sms_send_time_limit_error"==z.error){d.showError(r,"smsVerifyCode",f.message(f.lanEdition,"phoenix_sms_send_time_limit_error"))
}else{if("sms_send_unit_time_limit_error"==z.error){d.showError(r,"smsVerifyCode",f.message(f.lanEdition,"phoenix_sms_send_unit_time_limit_error"))
}}}}}}}else{d.hideError(r,"smsVerifyCode");
k=false;
q=setInterval(function(){s()
},1000)
}}})
};
g("."+r+" .func_sms_send").unbind("click").bind("click",function(){mobile=g("."+r+" #mobile");
if(k&&(l||checkMobile(mobile).isChecked)){g("."+r+" #findPwdFaptcha").show()
}});
g("."+r+" #findPwdFaptcha #faptcha_response_field").bind("input propertychange",function(){if(g(this).val().length==4){j()
}})
},bindEvent:function(){var i=a.className;
initCheck.init("."+i);
d.tabChange();
d.sendSmsBind();
g("."+i+" #formsubmit4mobileFindPassword").unbind("click").bind("click",function(){if(c=="email"){}else{if(c=="mobile"){d.submitMobile()
}}})
},submitEmail:function(){var l=g("."+a.className),i=true,o=g("#email",l),p=g("#password",l),m=g("#confirmPassword",l);
if(o.length){i=checkEmail(o).isChecked
}if(p.length){i=i&&checkPwd(p).isChecked
}if(m.length){i=i&&checkCpwd(m,p.val()).isChecked
}if(!i){return
}var n=a.className;
var k=function(){var u=a.className;
var t=g("."+u+" #email").val();
var s=g("."+u+" #password").val();
var r=g("."+u+" #confirmPassword").val();
var w=g("."+u+" #emailTestFlag").val();
var v="";
if(g("."+u+" #invitationCode")[0]!=h){v=g("."+u+" #invitationCode").val()
}g.ajax({url:a._menu_prefix+"/phoenix/admin/user/findPassword",dataType:"json",type:"post",data:{email:t,invitationCode:v},success:function(x){if(x.hasOwnProperty("error")){if("not_exist_user"==x.error){d.showError(u,"email",f.message(f.lanEdition,"phoenix_email_not_exist_error"))
}else{if("email_blank"==x.error){d.showError(u,"email",f.message(f.lanEdition,"phoenix_validate_enter_valid_email"))
}}}}})
};
var q=true;
var j="faptcha_challenge_field="+g("."+n+" #faptcha_challenge_field").val()+"&faptcha_response_field="+g("."+n+" #faptcha_response_field").val();
g.ajax({url:a._menu_prefix+"/phoenix/admin/form/varifyCode",dataType:"json",type:"post",data:j,success:function(r){if(!r.result){g("."+n+" #faptcha_response_field").parent().siblings(".user-signup-tips").html('<span class="user-error-msg"><span class="user-signup-msgs">'+f.message(f.lanEdition,"phoenix_verify_code_error")+"</span></span>");
g("#faptcha_response_field").val("");
g("#imgVarifyCode .refreshImg").click()
}else{g("."+n+" #faptcha_response_field").parent().siblings(".user-signup-tips").html("").hide()
}q=q&&r.result;
if(q){k()
}}})
},submitMobile:function(){var p=g("."+a.className),k=true,j=g("#mobile",p),o=g("#passwordMobile",p),n=g("#smsVerifyCode",p);
if(j.length){k=checkMobile(j).isChecked
}if(n.length){k=k&&checkMobCode(n).isChecked
}if(o.length){k=k&&checkPwd(o).isChecked
}if(!k){return
}var m=a.className;
var j=g("."+m+" #mobile").val();
var i=g("."+m+" #passwordMobile").val();
var l=g("."+m+" #smsVerifyCode").val();
g.ajax({url:a._menu_prefix+"/phoenix/admin/user/findPassword/mobile",dataType:"json",type:"post",data:{mobile:j,passwordMobile:i,smsVerifyCode:l},success:function(s){if(s.hasOwnProperty("error")){if("not_exist_user"==s.error){d.showError(m,"mobile",f.message(f.lanEdition,"phoenix_mobile_not_exist_error"))
}else{if("mobile_blank"==s.error){d.showError(m,"mobile",f.message(f.lanEdition,"phoenix_validate_enter_valid_mobile"))
}else{if("passwordMobile_blank"==s.error){d.showError(m,"passwordMobile",f.message(f.lanEdition,"phoenix_validate_required_password"))
}else{if("smsVerifyCode_error"==s.error){d.showError(m,"smsVerifyCode",f.message(f.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}else{if("smsVerifyCode_blank"==s.error){d.showError(m,"smsVerifyCode",f.message(f.lanEdition,"phoenix_validate_enter_correct_sms_verify_code"))
}}}}}}else{if(s.hasOwnProperty("findPassword_success")){var t=f.message(f.lanEdition,"phoenix_member_pwd_reset_success")+"<br/>";
var r=f.message(f.lanEdition,"phoenix_member_find_pwd_mail_jump");
var q=f.message(f.lanEdition,"phoenix_member_find_pwd_jump");
t+=r+'<a class="user-text-snippets-default" href=\''+a._menu_prefix+"/'>"+q+"</a>";
g(".sitewidget-userFindPassword .successInfo").html(t).siblings().remove();
e.setTimeout(function(){top.location.href=a._menu_prefix+"/"
},5000)
}}}})
},showError:function(j,k,i){if(a.isAgentCn=="true"){g("."+j+" #"+k).parent().find(".member-error-msg").html(i).show()
}else{g("."+j+" #"+k).parent().parent().siblings(".user-signup-tips").html('<span class="user-error-msg"><span class="user-signup-msgs">'+i+"</span></span>")
}},hideError:function(i,j){if(a.isAgentCn=="true"){g("."+i+" #"+j).parent().find(".member-error-msg").html("").hide()
}else{g("."+i+" #"+j).parent().parent().siblings(".user-signup-tips").html("")
}}})
})(window,jQuery);