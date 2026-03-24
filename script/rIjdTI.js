var checkList={checkEmail:function(a){var c=a.attr("class").indexOf("required")!=-1;
var d=a.val()?a.val().trim():"";
a.val(d);
var b={isChecked:false,msg:""};
if(c&&d===""){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_valid_email")
}else{if(!/^([a-zA-Z0-9_-])*([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]+)+)\s*$/i.test(d)){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_valid_email")
}else{b.isChecked=true;
b.msg=""
}}return b
},checkMobile:function(a){var c=a.attr("class").indexOf("required")!=-1;
var d=a.val();
var b={isChecked:false,msg:""};
if(c&&d===""){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_valid_mobile")
}else{if(!/(^1[3|4|5|6|7|8|9][0-9]{9}$)/i.test(d)){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_valid_mobile")
}else{b.isChecked=true;
b.msg=""
}}return b
},checkUsername:function(a){var c=a.attr("class").indexOf("required")!=-1;
var d=a.val()?a.val().trim():"";
a.val(d);
var b={isChecked:false,msg:""};
if(c&&d===""){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_required_account")
}else{if(/.*[\u4e00-\u9fa5]+.*$/.test(d)){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_profile_userName_error")
}else{b.isChecked=true;
b.msg=""
}}return b
},checkAccount4AgentCn:function(a){var c=a.attr("class").indexOf("required")!=-1;
var d=a.val();
var b={isChecked:false,msg:""};
if(c&&d===""){b.isChecked=false;
b.msg="请输入登录名"
}else{b.isChecked=true;
b.msg=""
}return b
},checkOriginPwd:function(a){var c=a.attr("class").indexOf("required")!=-1;
var d=a.val();
var b={isChecked:false,msg:""};
if(c&&d===""){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_required_old_password")
}else{b.isChecked=true;
b.msg=""
}return b
},checkUsercheckcode:function(b,a){var d=b.attr("class").indexOf("required")!=-1;
var e=b.val();
var c={isChecked:false,msg:""};
if(d&&e===""){c.isChecked=false;
c.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_required_verify_code")
}else{if(e.length!==a){c.isChecked=false;
c.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_correct_verify_code")
}else{c.isChecked=true;
c.msg=""
}}return c
},checkMobCode:function(a){var c=a.attr("class").indexOf("required")!=-1;
var d=a.val();
var b={isChecked:false,msg:""};
if(c&&d===""){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_required_sms_verify_code")
}else{if(!/^[\d]{6}$/.test(d)){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_correct_sms_verify_code")
}else{b.isChecked=true;
b.msg=""
}}return b
},checkPingMarker:function(a){var c=a.attr("class").indexOf("required")!=-1;
var d=a.val();
var b={isChecked:false,msg:""};
if(c&&d===""){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_required_sms_verify_code")
}else{b.isChecked=true;
b.msg=""
}return b
},checkPwd:function(c){var e=c.attr("class").indexOf("required")!=-1;
var f=c.val();
var d={isChecked:false,msg:""},a=f.length;
if(e&&a===0){d.isChecked=false;
d.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_required_password")
}else{if(this.checkPwdLegitimate(f)){d.isChecked=false;
d.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_password_simple")
}else{var b=this.checkPwdStrength(f);
d.isChecked=true;
d.msg=b.htmlMsg
}}return d
},checkPwdLegitimate:function(a){return a.length<6||a.length>18||!/^(?=.*[A-Za-z])(?=.*[0-9]).*$/.test(a)
},checkPwdStrength:function(e){var c={strength:0,htmlMsg:""},b=/[a-zA-Z]+/,d=/[0-9]+/,a=/[^a-zA-Z0-9]+/;
if(b.test(e)&&d.test(e)&&a.test(e)){c.strength=3;
var f=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_password_strong");
c.htmlMsg="<span class='pwdStrength pwdStrength-high'><i class='pwd-dash light'></i><i class='pwd-dash light'></i><i class='pwd-dash light'></i></span>"
}else{if((b.test(e)&&d.test(e))||(b.test(e)&&a.test(e))||(d.test(e)&&a.test(e))){c.strength=2;
var f=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_password_middle");
c.htmlMsg="<span class='pwdStrength pwdStrength-mid'><i class='pwd-dash light'></i><i class='pwd-dash light'></i><i class='pwd-dash'></i></span>"
}else{c.strength=1;
var f=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_password_weak");
c.htmlMsg="<span class='pwdStrength pwdStrength-low'><i class='pwd-dash light'></i><i class='pwd-dash'></i><i class='pwd-dash'></i></span>"
}}return c
},isAllSameChar:function(e){var d=e.charAt(0),b=true;
for(var c=1,a=e.length;
c<a;
c++){if(d!==e.charAt(c)){b=false;
break
}}return b
},isSimplePwd:function(n){var m=false;
var a=/^\d+$/;
var b=/^[a-zA-Z]+$/;
if(a.test(n)){var e=n.split(""),h=1,k=1;
for(var d=1;
d<e.length;
d++){if(e[d]-e[d-1]==1){h++
}if(e[d]-e[d-1]==0){k++
}}if(h==e.length||k==e.length){return true
}}if(b.test(n)){var l=n.split(""),g=1,f=1;
for(var c=1;
c<l.length;
c++){if(l[c].charCodeAt(0)-l[c-1].charCodeAt(0)==1){g++
}if(l[c].charCodeAt(0)-l[c-1].charCodeAt(0)==0){f++
}}if(g==l.length||f==l.length){return true
}}return m
},checkCpwd:function(a,e){var c=a.attr("class").indexOf("required")!=-1;
var d=a.val();
var b={isChecked:false,msg:""};
if(c&&d===""){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_enter_password_again")
}else{if(d!==e){b.isChecked=false;
b.msg=phoenixSite.message(phoenixSite.lanEdition,"phoenix_validate_password_not_match")
}else{b.isChecked=true;
b.msg=""
}}return b
}};