(function(f,h,j,d){if(typeof f=="undefined"||!!!f){return
}var b=function(l){if(!!h.__datalazyload__debug__){}};
var i=h.requestAnimationFrame;
var a=h.__pc_opt_modules__||(h.__pc_opt_modules__={});
var e=a.modules||(a.modules={});
var k=["scroll","resize"];
var c="pcOptimization";
var g=true;
f.extend(a,{init:function(){if(f.isEmptyObject(e)){return
}f.each(k,function(n,m){var l=m+"."+c;
f(h).unbind(l).bind(l,a.check)
});
setTimeout(function(){b("pcOptimization triggerDefault!");
f(h).trigger("scroll.pcOptimization")
},1000)
},check:function(){i(function(){if(!g){return
}g=false;
setTimeout(function(){i(function(){g=true;
a.checkInviewport()
})
},100)
})
},checkInviewport:function(){if(f.isEmptyObject(e)){a.unbindEvents();
return
}b("pcOptimization checkInviewport!");
f.each(e,function(n,l){var o=l.id,m=f("#"+o);
i(function(){a.loadModule(m,l)
})
})
}});
f.extend(a,{loadModule:function(n,p){var l=a.checkCssInviewport(n,p);
var m=a.checkJsInviewport(n,p);
if(l&&m){var o=p.uuid;
delete e[o];
b("module removes::key:: "+o)
}}});
f.extend(a,{checkJsInviewport:function(l,o){if(!!l.data("pcOptimization_check_js")){return true
}var m=o.js_threshold;
if(!!!m){m="0"
}var n={threshold:m,container:h};
b(o.uuid+" JS is inViewPort: "+LABHelper.inviewport(l,n)+", js_threshold::"+m);
if(m=="-1"||LABHelper.inviewport(l,n)){a.loadJs(l,o);
return true
}return false
},checkCssInviewport:function(m,o){if(!!m.data("pcOptimization_check_css")){return true
}var l=o.css_threshold;
if(!!!l){l="0"
}var n={threshold:l,container:h};
b(o.uuid+" css is inViewPort: "+LABHelper.inviewport(m,n)+", css_threshold::"+l);
if(l=="-1"||LABHelper.inviewport(m,n)){m.data("pcOptimization_check_css",true);
a.loadCss(o.uuid,o.css_depand);
return true
}return false
}});
f.extend(a,{loadCss:function(l,n){n=f.trim(n);
try{n=f.parseJSON(n)
}catch(m){n=""
}if(!!!n||!f.isArray(n)){return
}b(l+", css_depand::"+n);
f.each(n,function(q,o){var p={};
p.url=o;
p.callback=function(){};
LABHelper.loadCss(p)
})
},loadJs:function(m,o){var n=o.uuid;
var l=f.trim(o.js_depand);
try{l=f.parseJSON(l)
}catch(q){l=""
}if(typeof o.func!="function"){var r=f("script[type=text\\/x-pc-opt-script][data-jsOptimization][data-id="+o.settingId+"]");
if(!!r.length){o.func=function(){f.globalEval(r.html())
}
}}var s=typeof o.func=="function"?o.func:function(){};
if(!!!l||!f.isArray(l)){if(!!m.data("pcOptimization_check_js")){return
}m.data("pcOptimization_check_js",true);
b("js_depand empty callback "+n);
s();
return
}b(n+", js_depand::"+l);
var p={AlwaysPreserveOrder:true};
$LAB.setOptions(p).script(l).wait(function(){if(!!m.data("pcOptimization_check_js")){return
}m.data("pcOptimization_check_js",true);
b("callback "+n);
s()
})
}});
f.extend(a,{unbindEvents:function(){b("pcOptimization unbindEvents!");
f.each(k,function(n,m){var l=m+"."+c;
f(h).unbind(l)
})
}});
f(function(){if(typeof datalazyloadDefaultOptions!="undefined"&&(datalazyloadDefaultOptions.isMobileViewer==="false")){a.init()
}})
})(jQuery,window,document);