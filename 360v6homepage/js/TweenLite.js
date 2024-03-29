/**
* 功能参数如下：
* ease       --> 具体缓动类型
* onComplete --> 动作运行结束时调用
* onUpdate   --> 动作正在运行时调用
* delay      --> 动作延迟指定秒数后执行
* ------------->
* Z.Key
* 2012-05-10
* http://www.oozk.net/learn/
*/

var TweenLite ={};
TweenLite.to= function($target,$duration,$vars){
	var ease,
		onComplete,
		onUpdate,
		delay,
		vars = $vars,
		target = $target,
		speed = $duration;
	
	if(!target) return false;
	if(vars.ease){
		ease = vars.ease;
		delete vars.ease;
	}else{
		ease = Easing.Linear;
	}
	if(vars.onComplete){onComplete = vars.onComplete;delete vars.onComplete;}
	if(vars.onUpdate){onUpdate = vars.onUpdate;delete vars.onUpdate;}
	if(vars.delay){delay = vars.delay;delete vars.delay;}
	var ifstop = false;
	var attrArr = [];
	var curArr = [];
	var initArr = [];
	for(var at in vars){
		attrArr.push(at);
		curArr.push(vars[at]);
		/*var ato = at=='alpha' ? parseInt(parseFloat(getStyle(target,'opacity'))*100) : parseInt(getStyle(target,at));
		if(isNaN(ato))ato = 100;
		initArr.push(ato);*/
		var ato = 0;
		switch(at){
			case "alpha":
				ato = parseInt(parseFloat(getStyle(target,'opacity'))*100);
				if(isNaN(ato))ato = 100;
				break;
			case "rotation":
				ato = target.rotate ? target.rotate : 0;
				break;
			default:
				ato = parseInt(getStyle(target,at));
				break;	
		}
		initArr.push(ato);
	}
	if(delay){
		if(target.delay) clearTimeout(target.delay);
		target.delay = setTimeout(run,delay*1000);
	}else{
		run();	
	}
	function run(){
		var s = (new Date()).getTime() / 1000;
		for(var attr in vars){
			(function(){
				var t = (new Date()).getTime() / 1000 - s;
				for(var i=0;i<attrArr.length;i++){
					var easeVars = ease(t,initArr[i],curArr[i]-initArr[i],speed);
					if(attrArr[i]=='alpha'){
						target.style["opacity"] = easeVars / 100;
						target.style["filter"] = "alpha(opacity:"+easeVars+")";
						target.alpha = easeVars;
					}else if(attrArr[i]=='rotation'){
						target.rotate = easeVars;
						target.style.MozTransform = "rotateY("+ easeVars +"deg)";
						target.style.webkitTransform = "rotateY("+ easeVars +"deg)";
						target.style.OTransform = "rotateY("+ easeVars +"deg)";
						target.style.transform = "rotateY("+ easeVars +"deg)";
						rotate(target, easeVars)
					}else{
						target.style[attrArr[i]] = attrArr[i]=="zIndex" ? parseInt(easeVars) : parseInt(easeVars) + "px";
					}
				}
				if(target.timer) clearTimeout(target.timer);
				if(t<speed){
					target.timer = setTimeout(arguments.callee, 4);
					if(onUpdate)onUpdate();
				}else{
					if(!ifstop){
						ifstop = true;
//                        debugger;
						clearTimeout(target.timer);
                        delete target.timer;
						target.running=false;
						if(onComplete)onComplete();
					}else{
						target.running=true;
					}
				}
			})()
		}	
	}
	//设置角度 兼容IE
	function rotate(tar, angle){
		var rad = angle/(360/(2*Math.PI)),costheta = Math.cos(rad),sintheta = Math.sin(rad);
		var tw = tar.offsetWidth,th = tar.offsetHeight;
		if(tar && tar.filters) {
			tar.style.filter = "progid:DXImageTransform.Microsoft.Matrix() progid:DXImageTransform.Microsoft.Alpha()";
			tar.filters.item("DXImageTransform.Microsoft.Matrix").SizingMethod = "auto expand";
			tar.filters.item("DXImageTransform.Microsoft.Matrix").FilterType = "bilinear";
			tar.filters.item("DXImageTransform.Microsoft.Matrix").M11 = costheta;
			tar.filters.item("DXImageTransform.Microsoft.Matrix").M12 = -sintheta;
			tar.filters.item("DXImageTransform.Microsoft.Matrix").M21 = sintheta;
			tar.filters.item("DXImageTransform.Microsoft.Matrix").M22 = costheta;
			
			tar.filters.item("DXImageTransform.Microsoft.Alpha").opacity = target.alpha;
						
			tar.style.left = (tw - tar.offsetWidth ) / 2 + "px";
			tar.style.top = (th - tar.offsetHeight ) / 2 + "px";
		}
	}

	function getStyle(ta, at){
		return ta.currentStyle?ta.currentStyle[at]:getComputedStyle(ta, false)[at];
	}
}
TweenLite.killTweensOf=function(target){
	clearTimeout(target.timeout);
}
/**
* 以下是各种缓动公式算法
* t: current time（当前时间）；
* b: beginning value（初始值）；
* c: change in value（变化量）；
* d: duration（持续时间）
*/
var Easing = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - Easing.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return Easing.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return Easing.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}