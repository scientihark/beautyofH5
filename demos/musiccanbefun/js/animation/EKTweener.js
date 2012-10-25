/**
*
* Version: 	0.01
* Author:	Edan Kwan
* Contact: 	info@edankwan.com
* Website:	http://www.edankwan.com/
* Twitter:	@edankwan
*
* Copyright (c) 2011 Edan Kwan
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
**/


var EKTweener = {
	/* @public */
	targetTweens: [],
	frameRate: 60,
	
	to: function(target, duration, delay, data){
		if(target.tweenId==undefined){//add a tweenId variable to the target object.
			target.tweenId = EKTweener.targetTweens.length;
			EKTweener.targetTweens[target.tweenId] = [];
		}
		var ekTween = new EKTween(target, duration, delay, data);
		EKTweener.targetTweens[target.tweenId].push(ekTween);
		return ekTween;
	},

	killTweensOf: function(target){
		var tween = EKTweener.targetTweens[target.tweenId];
		if(tween){
			while(tween[0]){
				tween[0].removeProperties();
				tween[0].kill();
				delete tween[0];
			}
			tween.splice(0, tween.length);
			//delete EKTweener.targetTweens[target.tweenId];
			//delete target.tweenId;
		}
	}
};

function EKTween(target, duration, delay, data){
	var itself = this;
	var count = 0;
	var target = target;
	var isPaused = false;
	var isStarted = false;
	this.isFinished = false;
	this.ease = EKTweenFunc.easeOutCirc;
	this.onStart = undefined;
	this.onStartParams = undefined;
	this.onUpdate = undefined;
	this.onUpdateParams = undefined;
	this.onComplete = undefined;
	this.onCompleteParams = undefined;
	this.properties = {};
	this.prefix = {};
	this.suffix = {};
	//Array[toValue, fromValue, prefix, suffix];
	for(var i in data){
		switch(i){
		case "prefix":case "suffix":case "ease": case "onStart":case "onStartParams":case "onUpdate":case "onUpdateParams":case "onComplete":case "onCompleteParams":
			this[i] = data[i];
			break;
		default:
			itself.properties[i] = [];
			itself.properties[i][0] = data[i];
		}
	};
	// REMOVE THE REPEATED ITEMS;
	this.tweens = EKTweener.targetTweens[target.tweenId];
	if(this.tweens){
		if(this.tweens.length!=0){
			var keyNames = [];
		    i = this.tweens.length;
			while(i--){
				if(this.tweens[i].removeProperties(itself.properties)==0){
					this.tweens[i].kill();
					this.tweens.splice(i, 1);
				};
			};
		};
	};
	var startCount = delay*1000/EKTweener.frameRate;
	var durationCount = duration*1000/EKTweener.frameRate;
	var update = function(){
		if (itself.onUpdate) {
			if (itself.onUpdateParams) {
				itself.onUpdate.apply(itself.itself, itself.onUpdateParams);
	        } else {
	        	itself.onUpdate();
	        }
		}
	};
	var onLoop = function(){
		if(itself.isFinished)return;
		if(!itself.isPaused){
			if(count>=startCount){
				if(itself.isStarted){
					if(count>=durationCount+startCount){
		            	for(var i in itself.properties){
		            		setValue(itself.properties[i][0], i, itself.properties[i]);
		            	}
		            	update();
			            if (itself.onComplete) {
							if (itself.onCompleteParams) {
								itself.onComplete.apply(itself, itself.onCompleteParams);
			                } else {
			                	itself.onComplete();
			                }
						}
			            itself.kill();
			        	i = itself.tweens.length;
			        	while(i--){
			        		if(itself.tweens[i])if(itself.tweens[i].isFinished) itself.tweens.splice(i, 1);
			        	}
						return;
					}else{
		            	for(var i in itself.properties){
		            		setEaseValue(i, itself.properties[i]);
		            	}
		            	update();
					}
				}else{
		           	for(var i in itself.properties){
		           		setProperty(i, itself.properties[i]);
		           	}
					
		               if (itself.onStart) {
		                   if (itself.onStartParams) {
		                	   itself.onStart.apply(itself, itself.onStartParams);
		                   } else {
		                	   itself.onStart();
		                   }
		               }
		               itself.isStarted = true;
				}
			};
			count++;
		};
		
		setTimeout(onLoop, 1000/EKTweener.frameRate);
		
	};
	var setProperty = function(keyName, property){
		var i;
		if(itself.prefix){
			if(itself.prefix[keyName]){
				property[2] = itself.prefix[keyName];
			}
		};
		if(itself.suffix){
			if(itself.suffix[keyName]){
				property[3] = itself.suffix[keyName];
			}
		};
		property[1] = parseFloat(target[keyName]); // NOT TESTED YET.
	};

	var setEaseValue = function(keyName, property){
		setValue(itself.ease(count-startCount, property[1], property[0]-property[1], durationCount), keyName, property);
	};
	var setValue = function(value, keyName, property){
		if(property[2]||property[3])
			target[keyName] = (property[2]?property[2]:"")+value+(property[3]?property[3]:"");
		else target[keyName] = value;
	};
	onLoop();

	this.kill = function(){
		itself.isFinished = true;
	};
	this.pause = function(){
		isPaused = true;
	};
	this.resume = function(){
		if(isPaused) isPaused = false;
	};
	this.removeProperties = function(keyNames){
		var i;
		if(keyNames){
			var size = 0;
			for(i in itself.properties){
				if(i in keyNames) delete itself.properties[i]; else size++;
			};
			return size;
		}else{
			for(i in itself.properties)delete itself.properties[i];
		}
	};
	this.changeFrom = function(property, value){
		if(itself.properties[property]) itself.properties[property][1] = value;
	};
	this.changeTo = function(property, value){
		if(itself.properties[property]) itself.properties[property][0] = value;
	};
};



var EKTweenFunc = {
	linear: function(t, b, c, d) {
		return c*t/d + b;
	},		
	easeInQuad: function(t, b, c, d) {
		return c*(t/=d)*t + b;
	},		
	easeOutQuad: function(t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},		
	easeInOutQuad: function(t, b, c, d) {
		if((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 *((--t)*(t-2) - 1) + b;
	},		
	easeInCubic: function(t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},		
	easeOutCubic: function(t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},		
	easeInOutCubic: function(t, b, c, d) {
		if((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},		
	easeOutInCubic: function(t, b, c, d) {
		if(t < d/2) return EKTweenFunc.easeOutCubic(t*2, b, c/2, d);
		return EKTweenFunc.easeInCubic((t*2)-d, b+c/2, c/2, d);
	},		
	easeInQuart: function(t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},		
	easeOutQuart: function(t, b, c, d) {
		return -c *((t=t/d-1)*t*t*t - 1) + b;
	},		
	easeInOutQuart: function(t, b, c, d) {
		if((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 *((t-=2)*t*t*t - 2) + b;
	},		
	easeOutInQuart: function(t, b, c, d) {
		if(t < d/2) return EKTweenFunc.easeOutQuart(t*2, b, c/2, d);
		return EKTweenFunc.easeInQuart((t*2)-d, b+c/2, c/2, d);
	},		
	easeInQuint: function(t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},		
	easeOutQuint: function(t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},		
	easeInOutQuint: function(t, b, c, d) {
		if((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},		
	easeOutInQuint: function(t, b, c, d) {
		if(t < d/2) return EKTweenFunc.easeOutQuint(t*2, b, c/2, d);
		return EKTweenFunc.easeInQuint((t*2)-d, b+c/2, c/2, d);
	},		
	easeInSine: function(t, b, c, d) {
		return -c * Math.cos(t/d *(Math.PI/2)) + c + b;
	},		
	easeOutSine: function(t, b, c, d) {
		return c * Math.sin(t/d *(Math.PI/2)) + b;
	},		
	easeInOutSine: function(t, b, c, d) {
		return -c/2 *(Math.cos(Math.PI*t/d) - 1) + b;
	},		
	easeOutInSine: function(t, b, c, d) {
		if(t < d/2) return EKTweenFunc.easeOutSine(t*2, b, c/2, d);
		return EKTweenFunc.easeInSine((t*2)-d, b+c/2, c/2, d);
	},		
	easeInExpo: function(t, b, c, d) {
		return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001;
	},		
	easeOutExpo: function(t, b, c, d) {
		return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b;
	},		
	easeInOutExpo: function(t, b, c, d) {
		if(t==0) return b;
		if(t==d) return b+c;
		if((t/=d/2) < 1) return c/2 * Math.pow(2, 10 *(t - 1)) + b - c * 0.0005;
		return c/2 * 1.0005 *(-Math.pow(2, -10 * --t) + 2) + b;
	},		
	easeOutInExpo: function(t, b, c, d) {
		if(t < d/2) return EKTweenFunc.easeOutExpo(t*2, b, c/2, d);
		return EKTweenFunc.easeInExpo((t*2)-d, b+c/2, c/2, d);
	},		
	easeInCirc: function(t, b, c, d) {
		return -c *(Math.sqrt(1 -(t/=d)*t) - 1) + b;
	},		
	easeOutCirc: function(t, b, c, d) {
		return c * Math.sqrt(1 -(t=t/d-1)*t) + b;
	},		
	easeInOutCirc: function(t, b, c, d) {
		if((t/=d/2) < 1) return -c/2 *(Math.sqrt(1 - t*t) - 1) + b;
		return c/2 *(Math.sqrt(1 -(t-=2)*t) + 1) + b;
	},		
	easeOutInCirc: function(t, b, c, d) {
		if(t < d/2) return EKTweenFunc.easeOutCirc(t*2, b, c/2, d);
		return EKTweenFunc.easeInCirc((t*2)-d, b+c/2, c/2, d);
	},		
	easeInElastic: function(t, b, c, d, a, p) {
		var s;
		if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3;
		if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b;
	},		
	easeOutElastic: function(t, b, c, d, a, p) {
		var s;
		if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3;
		if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a);
		return(a*Math.pow(2,-10*t) * Math.sin((t*d-s)*(2*Math.PI)/p ) + c + b);
	},		
	easeInOutElastic: function(t, b, c, d, a, p) {
		var s;
		if(t==0) return b;  if((t/=d/2)==2) return b+c;  if(!p) p=d*(.3*1.5);
		if(!a || a < Math.abs(c)) { a=c; s=p/4; }		   else s = p/(2*Math.PI) * Math.asin(c/a);
		if(t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},		
	easeOutInElastic: function(t, b, c, d, a, p) {
		if(t < d/2) return EKTweenFunc.easeOutElastic(t*2, b, c/2, d, a, p);
		return EKTweenFunc.easeInElastic((t*2)-d, b+c/2, c/2, d, a, p);
	},		
	easeInBack: function(t, b, c, d, s) {
		if(s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},		
	easeOutBack: function(t, b, c, d, s) {
		if(s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},		
	easeInOutBack: function(t, b, c, d, s) {
		if(s == undefined) s = 1.70158;
		if((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},		
	easeOutInBack: function(t, b, c, d, s) {
		if(t < d/2) return EKTweenFunc.easeOutBack(t*2, b, c/2, d, s);
		return EKTweenFunc.easeInBack((t*2)-d, b+c/2, c/2, d, s);
	},		
	easeInBounce: function(t, b, c, d) {
		return c - EKTweenFunc.easeOutBounce(d-t, 0, c, d) + b;
	},		
	easeOutBounce: function(t, b, c, d) {
		if((t/=d) <(1/2.75)) {
				return c*(7.5625*t*t) + b;
		} else if(t <(2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if(t <(2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},		
	easeInOutBounce: function(t, b, c, d) {
		if(t < d/2) return EKTweenFunc.easeInBounce(t*2, 0, c, d) * .5 + b;
		else return EKTweenFunc.easeOutBounce(t*2-d, 0, c, d) * .5 + c*.5 + b;
	},		
	easeOutInBounce: function(t, b, c, d) {
		if(t < d/2) return EKTweenFunc.easeOutBounce(t*2, b, c/2, d);
		return EKTweenFunc.easeInBounce((t*2)-d, b+c/2, c/2, d);
	}
};