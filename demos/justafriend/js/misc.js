if (! ('indexOf' in Array.prototype)) {
	Array.prototype.indexOf = function(find, i) {
		if (i === undefined) i = 0;
		if (i < 0) i += this.length;
		if (i < 0) i = 0;
		for (var n = this.length; i < n; i++) if (i in this && this[i] === find) return i;
		return - 1;
	};
}
 (function(b) {
	function c() {}
	for (var d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), a; a = d.pop();) b[a] = b[a] || c
})(window.console = window.console || {});
$('html').removeClass('no-js').addClass('js');;
window.Modernizr = function(a, b, c) {
	function w(a) {
		i.cssText = a
	}
	function x(a, b) {
		return w(prefixes.join(a + ";") + (b || ""))
	}
	function y(a, b) {
		return typeof a === b
	}
	function z(a, b) {
		return !! ~ ("" + a).indexOf(b)
	}
	function A(a, b) {
		for (var d in a) if (i[a[d]] !== c) return b == "pfx" ? a[d] : !0;
		return ! 1
	}
	function B(a, b, d) {
		for (var e in a) {
			var f = b[a[e]];
			if (f !== c) return d === !1 ? a[e] : y(f, "function") ? f.bind(d || b) : f
		}
		return ! 1
	}
	function C(a, b, c) {
		var d = a.charAt(0).toUpperCase() + a.substr(1),
		e = (a + " " + m.join(d + " ") + d).split(" ");
		return y(b, "string") || y(b, "undefined") ? A(e, b) : (e = (a + " " + n.join(d + " ") + d).split(" "), B(e, b, c))
	}
	var d = "2.5.3",
	e = {},
	f = b.documentElement,
	g = "modernizr",
	h = b.createElement(g),
	i = h.style,
	j,
	k = {}.toString,
	l = "Webkit Moz O ms",
	m = l.split(" "),
	n = l.toLowerCase().split(" "),
	o = {},
	p = {},
	q = {},
	r = [],
	s = r.slice,
	t,
	u = {}.hasOwnProperty,
	v; ! y(u, "undefined") && !y(u.call, "undefined") ? v = function(a, b) {
		return u.call(a, b)
	}: v = function(a, b) {
		return b in a && y(a.constructor.prototype[b], "undefined")
	},
	Function.prototype.bind || (Function.prototype.bind = function(b) {
		var c = this;
		if (typeof c != "function") throw new TypeError;
		var d = s.call(arguments, 1),
		e = function() {
			if (this instanceof e) {
				var a = function() {};
				a.prototype = c.prototype;
				var f = new a,
				g = c.apply(f, d.concat(s.call(arguments)));
				return Object(g) === g ? g: f
			}
			return c.apply(b, d.concat(s.call(arguments)))
		};
		return e
	}),
	o.canvas = function() {
		var a = b.createElement("canvas");
		return !! a.getContext && !!a.getContext("2d")
	},
	o.backgroundsize = function() {
		return C("backgroundSize")
	},
	o.video = function() {
		var a = b.createElement("video"),
		c = !1;
		try {
			if (c = !!a.canPlayType) c = new Boolean(c),
			c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""),
			c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""),
			c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
		} catch(d) {}
		return c
	},
	o.audio = function() {
		var a = b.createElement("audio"),
		c = !1;
		try {
			if (c = !!a.canPlayType) c = new Boolean(c),
			c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
			c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
			c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
			c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "")
		} catch(d) {}
		return c
	};
	for (var D in o) v(o, D) && (t = D.toLowerCase(), e[t] = o[D](), r.push((e[t] ? "": "no-") + t));
	return w(""),
	h = j = null,
	function(a, b) {
		function g(a, b) {
			var c = a.createElement("p"),
			d = a.getElementsByTagName("head")[0] || a.documentElement;
			return c.innerHTML = "x<style>" + b + "</style>",
			d.insertBefore(c.lastChild, d.firstChild)
		}
		function h() {
			var a = k.elements;
			return typeof a == "string" ? a.split(" ") : a
		}
		function i(a) {
			var b = {},
			c = a.createElement,
			e = a.createDocumentFragment,
			f = e();
			a.createElement = function(a) {
				var e = (b[a] || (b[a] = c(a))).cloneNode();
				return k.shivMethods && e.canHaveChildren && !d.test(a) ? f.appendChild(e) : e
			},
			a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + h().join().replace(/\w+/g,
			function(a) {
				return b[a] = c(a),
				f.createElement(a),
				'c("' + a + '")'
			}) + ");return n}")(k, f)
		}
		function j(a) {
			var b;
			return a.documentShived ? a: (k.shivCSS && !e && (b = !!g(a, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")), f || (b = !i(a)), b && (a.documentShived = b), a)
		}
		var c = a.html5 || {},
		d = /^<|^(?:button|form|map|select|textarea)$/i,
		e,
		f; (function() {
			var a = b.createElement("a");
			a.innerHTML = "<xyz></xyz>",
			e = "hidden" in a,
			f = a.childNodes.length == 1 ||
			function() {
				try {
					b.createElement("a")
				} catch(a) {
					return ! 0
				}
				var c = b.createDocumentFragment();
				return typeof c.cloneNode == "undefined" || typeof c.createDocumentFragment == "undefined" || typeof c.createElement == "undefined"
			} ()
		})();
		var k = {
			elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
			shivCSS: c.shivCSS !== !1,
			shivMethods: c.shivMethods !== !1,
			type: "default",
			shivDocument: j
		};
		a.html5 = k,
		j(b)
	} (this, b),
	e._version = d,
	e._domPrefixes = n,
	e._cssomPrefixes = m,
	e.testProp = function(a) {
		return A([a])
	},
	e.testAllProps = C,
	e
} (this, this.document); (function(c, j) {
	function k(a, b) {
		var d = a.nodeName.toLowerCase();
		if ("area" === d) {
			b = a.parentNode;
			d = b.name;
			if (!a.href || !d || b.nodeName.toLowerCase() !== "map") return false;
			a = c("img[usemap=#" + d + "]")[0];
			return !! a && l(a)
		}
		return (/input|select|textarea|button|object/.test(d) ? !a.disabled: "a" == d ? a.href || b: b) && l(a)
	}
	function l(a) {
		return ! c(a).parents().andSelf().filter(function() {
			return c.curCSS(this, "visibility") === "hidden" || c.expr.filters.hidden(this)
		}).length
	}
	c.ui = c.ui || {};
	if (!c.ui.version) {
		c.extend(c.ui, {
			version: "1.8.16",
			keyCode: {
				ALT: 18,
				BACKSPACE: 8,
				CAPS_LOCK: 20,
				COMMA: 188,
				COMMAND: 91,
				COMMAND_LEFT: 91,
				COMMAND_RIGHT: 93,
				CONTROL: 17,
				DELETE: 46,
				DOWN: 40,
				END: 35,
				ENTER: 13,
				ESCAPE: 27,
				HOME: 36,
				INSERT: 45,
				LEFT: 37,
				MENU: 93,
				NUMPAD_ADD: 107,
				NUMPAD_DECIMAL: 110,
				NUMPAD_DIVIDE: 111,
				NUMPAD_ENTER: 108,
				NUMPAD_MULTIPLY: 106,
				NUMPAD_SUBTRACT: 109,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				PERIOD: 190,
				RIGHT: 39,
				SHIFT: 16,
				SPACE: 32,
				TAB: 9,
				UP: 38,
				WINDOWS: 91
			}
		});
		c.fn.extend({
			propAttr: c.fn.prop || c.fn.attr,
			_focus: c.fn.focus,
			focus: function(a, b) {
				return typeof a === "number" ? this.each(function() {
					var d = this;
					setTimeout(function() {
						c(d).focus();
						b && b.call(d)
					},
					a)
				}) : this._focus.apply(this, arguments)
			},
			scrollParent: function() {
				var a;
				a = c.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
					return /(relative|absolute|fixed)/.test(c.curCSS(this, "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
				}).eq(0) : this.parents().filter(function() {
					return /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
				}).eq(0);
				return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
			},
			zIndex: function(a) {
				if (a !== j) return this.css("zIndex", a);
				if (this.length) {
					a = c(this[0]);
					for (var b; a.length && a[0] !== document;) {
						b = a.css("position");
						if (b === "absolute" || b === "relative" || b === "fixed") {
							b = parseInt(a.css("zIndex"), 10);
							if (!isNaN(b) && b !== 0) return b
						}
						a = a.parent()
					}
				}
				return 0
			},
			disableSelection: function() {
				return this.bind((c.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
				function(a) {
					a.preventDefault()
				})
			},
			enableSelection: function() {
				return this.unbind(".ui-disableSelection")
			}
		});
		c.each(["Width", "Height"],
		function(a, b) {
			function d(f, g, m, n) {
				c.each(e,
				function() {
					g -= parseFloat(c.curCSS(f, "padding" + this, true)) || 0;
					if (m) g -= parseFloat(c.curCSS(f, "border" + this + "Width", true)) || 0;
					if (n) g -= parseFloat(c.curCSS(f, "margin" + this, true)) || 0
				});
				return g
			}
			var e = b === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
			h = b.toLowerCase(),
			i = {
				innerWidth: c.fn.innerWidth,
				innerHeight: c.fn.innerHeight,
				outerWidth: c.fn.outerWidth,
				outerHeight: c.fn.outerHeight
			};
			c.fn["inner" + b] = function(f) {
				if (f === j) return i["inner" + b].call(this);
				return this.each(function() {
					c(this).css(h, d(this, f) + "px")
				})
			};
			c.fn["outer" + b] = function(f, g) {
				if (typeof f !== "number") return i["outer" + b].call(this, f);
				return this.each(function() {
					c(this).css(h, d(this, f, true, g) + "px")
				})
			}
		});
		c.extend(c.expr[":"], {
			data: function(a, b, d) {
				return !! c.data(a, d[3])
			},
			focusable: function(a) {
				return k(a, !isNaN(c.attr(a, "tabindex")))
			},
			tabbable: function(a) {
				var b = c.attr(a, "tabindex"),
				d = isNaN(b);
				return (d || b >= 0) && k(a, !d)
			}
		});
		c(function() {
			var a = document.body,
			b = a.appendChild(b = document.createElement("div"));
			c.extend(b.style, {
				minHeight: "100px",
				height: "auto",
				padding: 0,
				borderWidth: 0
			});
			c.support.minHeight = b.offsetHeight === 100;
			c.support.selectstart = "onselectstart" in b;
			a.removeChild(b).style.display = "none"
		});
		c.extend(c.ui, {
			plugin: {
				add: function(a, b, d) {
					a = c.ui[a].prototype;
					for (var e in d) {
						a.plugins[e] = a.plugins[e] || [];
						a.plugins[e].push([b, d[e]])
					}
				},
				call: function(a, b, d) {
					if ((b = a.plugins[b]) && a.element[0].parentNode) for (var e = 0; e < b.length; e++) a.options[b[e][0]] && b[e][1].apply(a.element, d)
				}
			},
			contains: function(a, b) {
				return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16: a !== b && a.contains(b)
			},
			hasScroll: function(a, b) {
				if (c(a).css("overflow") === "hidden") return false;
				b = b && b === "left" ? "scrollLeft": "scrollTop";
				var d = false;
				if (a[b] > 0) return true;
				a[b] = 1;
				d = a[b] > 0;
				a[b] = 0;
				return d
			},
			isOverAxis: function(a, b, d) {
				return a > b && a < b + d
			},
			isOver: function(a, b, d, e, h, i) {
				return c.ui.isOverAxis(a, d, h) && c.ui.isOverAxis(b, e, i)
			}
		})
	}
})(jQuery);
jQuery.effects ||
function(f, j) {
	function m(c) {
		var a;
		if (c && c.constructor == Array && c.length == 3) return c;
		if (a = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c)) return [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3], 10)];
		if (a = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c)) return [parseFloat(a[1]) * 2.55, parseFloat(a[2]) * 2.55, parseFloat(a[3]) * 2.55];
		if (a = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c)) return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)];
		if (a = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c)) return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)];
		if (/rgba\(0, 0, 0, 0\)/.exec(c)) return n.transparent;
		return n[f.trim(c).toLowerCase()]
	}
	function s(c, a) {
		var b;
		do {
			b = f.curCSS(c, a);
			if (b != "" && b != "transparent" || f.nodeName(c, "body")) break;
			a = "backgroundColor"
		}
		while (c = c.parentNode);
		return m(b)
	}
	function o() {
		var c = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
		a = {},
		b,
		d;
		if (c && c.length && c[0] && c[c[0]]) for (var e = c.length; e--;) {
			b = c[e];
			if (typeof c[b] == "string") {
				d = b.replace(/\-(\w)/g,
				function(g, h) {
					return h.toUpperCase()
				});
				a[d] = c[b]
			}
		} else for (b in c) if (typeof c[b] === "string") a[b] = c[b];
		return a
	}
	function p(c) {
		var a,
		b;
		for (a in c) {
			b = c[a];
			if (b == null || f.isFunction(b) || a in t || /scrollbar/.test(a) || !/color/i.test(a) && isNaN(parseFloat(b))) delete c[a]
		}
		return c
	}
	function u(c, a) {
		var b = {
			_: 0
		},
		d;
		for (d in a) if (c[d] != a[d]) b[d] = a[d];
		return b
	}
	function k(c, a, b, d) {
		if (typeof c == "object") {
			d = a;
			b = null;
			a = c;
			c = a.effect
		}
		if (f.isFunction(a)) {
			d = a;
			b = null;
			a = {}
		}
		if (typeof a == "number" || f.fx.speeds[a]) {
			d = b;
			b = a;
			a = {}
		}
		if (f.isFunction(b)) {
			d = b;
			b = null
		}
		a = a || {};
		b = b || a.duration;
		b = f.fx.off ? 0: typeof b == "number" ? b: b in f.fx.speeds ? f.fx.speeds[b] : f.fx.speeds._default;
		d = d || a.complete;
		return [c, a, b, d]
	}
	function l(c) {
		if (!c || typeof c === "number" || f.fx.speeds[c]) return true;
		if (typeof c === "string" && !f.effects[c]) return true;
		return false
	}
	f.effects = {};
	f.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"],
	function(c, a) {
		f.fx.step[a] = function(b) {
			if (!b.colorInit) {
				b.start = s(b.elem, a);
				b.end = m(b.end);
				b.colorInit = true
			}
			b.elem.style[a] = "rgb(" + Math.max(Math.min(parseInt(b.pos * (b.end[0] - b.start[0]) + b.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[1] - b.start[1]) + b.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[2] - b.start[2]) + b.start[2], 10), 255), 0) + ")"
		}
	});
	var n = {
		aqua: [0, 255, 255],
		azure: [240, 255, 255],
		beige: [245, 245, 220],
		black: [0, 0, 0],
		blue: [0, 0, 255],
		brown: [165, 42, 42],
		cyan: [0, 255, 255],
		darkblue: [0, 0, 139],
		darkcyan: [0, 139, 139],
		darkgrey: [169, 169, 169],
		darkgreen: [0, 100, 0],
		darkkhaki: [189, 183, 107],
		darkmagenta: [139, 0, 139],
		darkolivegreen: [85, 107, 47],
		darkorange: [255, 140, 0],
		darkorchid: [153, 50, 204],
		darkred: [139, 0, 0],
		darksalmon: [233, 150, 122],
		darkviolet: [148, 0, 211],
		fuchsia: [255, 0, 255],
		gold: [255, 215, 0],
		green: [0, 128, 0],
		indigo: [75, 0, 130],
		khaki: [240, 230, 140],
		lightblue: [173, 216, 230],
		lightcyan: [224, 255, 255],
		lightgreen: [144, 238, 144],
		lightgrey: [211, 211, 211],
		lightpink: [255, 182, 193],
		lightyellow: [255, 255, 224],
		lime: [0, 255, 0],
		magenta: [255, 0, 255],
		maroon: [128, 0, 0],
		navy: [0, 0, 128],
		olive: [128, 128, 0],
		orange: [255, 165, 0],
		pink: [255, 192, 203],
		purple: [128, 0, 128],
		violet: [128, 0, 128],
		red: [255, 0, 0],
		silver: [192, 192, 192],
		white: [255, 255, 255],
		yellow: [255, 255, 0],
		transparent: [255, 255, 255]
	},
	q = ["add", "remove", "toggle"],
	t = {
		border: 1,
		borderBottom: 1,
		borderColor: 1,
		borderLeft: 1,
		borderRight: 1,
		borderTop: 1,
		borderWidth: 1,
		margin: 1,
		padding: 1
	};
	f.effects.animateClass = function(c, a, b, d) {
		if (f.isFunction(b)) {
			d = b;
			b = null
		}
		return this.queue(function() {
			var e = f(this),
			g = e.attr("style") || " ",
			h = p(o.call(this)),
			r,
			v = e.attr("class");
			f.each(q,
			function(w, i) {
				c[i] && e[i + "Class"](c[i])
			});
			r = p(o.call(this));
			e.attr("class", v);
			e.animate(u(h, r), {
				queue: false,
				duration: a,
				easing: b,
				complete: function() {
					f.each(q,
					function(w, i) {
						c[i] && e[i + "Class"](c[i])
					});
					if (typeof e.attr("style") == "object") {
						e.attr("style").cssText = "";
						e.attr("style").cssText = g
					} else e.attr("style", g);
					d && d.apply(this, arguments);
					f.dequeue(this)
				}
			})
		})
	};
	f.fn.extend({
		_addClass: f.fn.addClass,
		addClass: function(c, a, b, d) {
			return a ? f.effects.animateClass.apply(this, [{
				add: c
			},
			a, b, d]) : this._addClass(c)
		},
		_removeClass: f.fn.removeClass,
		removeClass: function(c, a, b, d) {
			return a ? f.effects.animateClass.apply(this, [{
				remove: c
			},
			a, b, d]) : this._removeClass(c)
		},
		_toggleClass: f.fn.toggleClass,
		toggleClass: function(c, a, b, d, e) {
			return typeof a == "boolean" || a === j ? b ? f.effects.animateClass.apply(this, [a ? {
				add: c
			}: {
				remove: c
			},
			b, d, e]) : this._toggleClass(c, a) : f.effects.animateClass.apply(this, [{
				toggle: c
			},
			a, b, d])
		},
		switchClass: function(c, a, b, d, e) {
			return f.effects.animateClass.apply(this, [{
				add: a,
				remove: c
			},
			b, d, e])
		}
	});
	f.extend(f.effects, {
		version: "1.8.16",
		save: function(c, a) {
			for (var b = 0; b < a.length; b++) a[b] !== null && c.data("ec.storage." + a[b], c[0].style[a[b]])
		},
		restore: function(c, a) {
			for (var b = 0; b < a.length; b++) a[b] !== null && c.css(a[b], c.data("ec.storage." + a[b]))
		},
		setMode: function(c, a) {
			if (a == "toggle") a = c.is(":hidden") ? "show": "hide";
			return a
		},
		getBaseline: function(c, a) {
			var b;
			switch (c[0]) {
			case "top":
				b = 0;
				break;
			case "middle":
				b = 0.5;
				break;
			case "bottom":
				b = 1;
				break;
			default:
				b = c[0] / a.height
			}
			switch (c[1]) {
			case "left":
				c = 0;
				break;
			case "center":
				c = 0.5;
				break;
			case "right":
				c = 1;
				break;
			default:
				c = c[1] / a.width
			}
			return {
				x: c,
				y: b
			}
		},
		createWrapper: function(c) {
			if (c.parent().is(".ui-effects-wrapper")) return c.parent();
			var a = {
				width: c.outerWidth(true),
				height: c.outerHeight(true),
				"float": c.css("float")
			},
			b = f("<div></div>").addClass("ui-effects-wrapper").css({
				fontSize: "100%",
				background: "transparent",
				border: "none",
				margin: 0,
				padding: 0
			}),
			d = document.activeElement;
			c.wrap(b);
			if (c[0] === d || f.contains(c[0], d)) f(d).focus();
			b = c.parent();
			if (c.css("position") == "static") {
				b.css({
					position: "relative"
				});
				c.css({
					position: "relative"
				})
			} else {
				f.extend(a, {
					position: c.css("position"),
					zIndex: c.css("z-index")
				});
				f.each(["top", "left", "bottom", "right"],
				function(e, g) {
					a[g] = c.css(g);
					if (isNaN(parseInt(a[g], 10))) a[g] = "auto"
				});
				c.css({
					position: "relative",
					top: 0,
					left: 0,
					right: "auto",
					bottom: "auto"
				})
			}
			return b.css(a).show()
		},
		removeWrapper: function(c) {
			var a,
			b = document.activeElement;
			if (c.parent().is(".ui-effects-wrapper")) {
				a = c.parent().replaceWith(c);
				if (c[0] === b || f.contains(c[0], b)) f(b).focus();
				return a
			}
			return c
		},
		setTransition: function(c, a, b, d) {
			d = d || {};
			f.each(a,
			function(e, g) {
				unit = c.cssUnit(g);
				if (unit[0] > 0) d[g] = unit[0] * b + unit[1]
			});
			return d
		}
	});
	f.fn.extend({
		effect: function(c) {
			var a = k.apply(this, arguments),
			b = {
				options: a[1],
				duration: a[2],
				callback: a[3]
			};
			a = b.options.mode;
			var d = f.effects[c];
			if (f.fx.off || !d) return a ? this[a](b.duration, b.callback) : this.each(function() {
				b.callback && b.callback.call(this)
			});
			return d.call(this, b)
		},
		_show: f.fn.show,
		show: function(c) {
			if (l(c)) return this._show.apply(this, arguments);
			else {
				var a = k.apply(this, arguments);
				a[1].mode = "show";
				return this.effect.apply(this, a)
			}
		},
		_hide: f.fn.hide,
		hide: function(c) {
			if (l(c)) return this._hide.apply(this, arguments);
			else {
				var a = k.apply(this, arguments);
				a[1].mode = "hide";
				return this.effect.apply(this, a)
			}
		},
		__toggle: f.fn.toggle,
		toggle: function(c) {
			if (l(c) || typeof c === "boolean" || f.isFunction(c)) return this.__toggle.apply(this, arguments);
			else {
				var a = k.apply(this, arguments);
				a[1].mode = "toggle";
				return this.effect.apply(this, a)
			}
		},
		cssUnit: function(c) {
			var a = this.css(c),
			b = [];
			f.each(["em", "px", "%", "pt"],
			function(d, e) {
				if (a.indexOf(e) > 0) b = [parseFloat(a), e]
			});
			return b
		}
	});
	f.easing.jswing = f.easing.swing;
	f.extend(f.easing, {
		def: "easeOutQuad",
		swing: function(c, a, b, d, e) {
			return f.easing[f.easing.def](c, a, b, d, e)
		},
		easeInQuad: function(c, a, b, d, e) {
			return d * (a /= e) * a + b
		},
		easeOutQuad: function(c, a, b, d, e) {
			return - d * (a /= e) * (a - 2) + b
		},
		easeInOutQuad: function(c, a, b, d, e) {
			if ((a /= e / 2) < 1) return d / 2 * a * a + b;
			return - d / 2 * (--a * (a - 2) - 1) + b
		},
		easeInCubic: function(c, a, b, d, e) {
			return d * (a /= e) * a * a + b
		},
		easeOutCubic: function(c, a, b, d, e) {
			return d * ((a = a / e - 1) * a * a + 1) + b
		},
		easeInOutCubic: function(c, a, b, d, e) {
			if ((a /= e / 2) < 1) return d / 2 * a * a * a + b;
			return d / 2 * ((a -= 2) * a * a + 2) + b
		},
		easeInQuart: function(c, a, b, d, e) {
			return d * (a /= e) * a * a * a + b
		},
		easeOutQuart: function(c, a, b, d, e) {
			return - d * ((a = a / e - 1) * a * a * a - 1) + b
		},
		easeInOutQuart: function(c, a, b, d, e) {
			if ((a /= e / 2) < 1) return d / 2 * a * a * a * a + b;
			return - d / 2 * ((a -= 2) * a * a * a - 2) + b
		},
		easeInQuint: function(c, a, b, d, e) {
			return d * (a /= e) * a * a * a * a + b
		},
		easeOutQuint: function(c, a, b, d, e) {
			return d * ((a = a / e - 1) * a * a * a * a + 1) + b
		},
		easeInOutQuint: function(c, a, b, d, e) {
			if ((a /= e / 2) < 1) return d / 2 * a * a * a * a * a + b;
			return d / 2 * ((a -= 2) * a * a * a * a + 2) + b
		},
		easeInSine: function(c, a, b, d, e) {
			return - d * Math.cos(a / e * (Math.PI / 2)) + d + b
		},
		easeOutSine: function(c, a, b, d, e) {
			return d * Math.sin(a / e * (Math.PI / 2)) + b
		},
		easeInOutSine: function(c, a, b, d, e) {
			return - d / 2 * (Math.cos(Math.PI * a / e) - 1) + b
		},
		easeInExpo: function(c, a, b, d, e) {
			return a == 0 ? b: d * Math.pow(2, 10 * (a / e - 1)) + b
		},
		easeOutExpo: function(c, a, b, d, e) {
			return a == e ? b + d: d * ( - Math.pow(2, -10 * a / e) + 1) + b
		},
		easeInOutExpo: function(c, a, b, d, e) {
			if (a == 0) return b;
			if (a == e) return b + d;
			if ((a /= e / 2) < 1) return d / 2 * Math.pow(2, 10 * (a - 1)) + b;
			return d / 2 * ( - Math.pow(2, -10 * --a) + 2) + b
		},
		easeInCirc: function(c, a, b, d, e) {
			return - d * (Math.sqrt(1 - (a /= e) * a) - 1) + b
		},
		easeOutCirc: function(c, a, b, d, e) {
			return d * Math.sqrt(1 - (a = a / e - 1) * a) + b
		},
		easeInOutCirc: function(c, a, b, d, e) {
			if ((a /= e / 2) < 1) return - d / 2 * (Math.sqrt(1 - a * a) - 1) + b;
			return d / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
		},
		easeInElastic: function(c, a, b, d, e) {
			c = 1.70158;
			var g = 0,
			h = d;
			if (a == 0) return b;
			if ((a /= e) == 1) return b + d;
			g || (g = e * 0.3);
			if (h < Math.abs(d)) {
				h = d;
				c = g / 4
			} else c = g / (2 * Math.PI) * Math.asin(d / h);
			return - (h * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g)) + b
		},
		easeOutElastic: function(c, a, b, d, e) {
			c = 1.70158;
			var g = 0,
			h = d;
			if (a == 0) return b;
			if ((a /= e) == 1) return b + d;
			g || (g = e * 0.3);
			if (h < Math.abs(d)) {
				h = d;
				c = g / 4
			} else c = g / (2 * Math.PI) * Math.asin(d / h);
			return h * Math.pow(2, -10 * a) * Math.sin((a * e - c) * 2 * Math.PI / g) + d + b
		},
		easeInOutElastic: function(c, a, b, d, e) {
			c = 1.70158;
			var g = 0,
			h = d;
			if (a == 0) return b;
			if ((a /= e / 2) == 2) return b + d;
			g || (g = e * 0.3 * 1.5);
			if (h < Math.abs(d)) {
				h = d;
				c = g / 4
			} else c = g / (2 * Math.PI) * Math.asin(d / h);
			if (a < 1) return - 0.5 * h * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g) + b;
			return h * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g) * 0.5 + d + b
		},
		easeInBack: function(c, a, b, d, e, g) {
			if (g == j) g = 1.70158;
			return d * (a /= e) * a * ((g + 1) * a - g) + b
		},
		easeOutBack: function(c, a, b, d, e, g) {
			if (g == j) g = 1.70158;
			return d * ((a = a / e - 1) * a * ((g + 1) * a + g) + 1) + b
		},
		easeInOutBack: function(c, a, b, d, e, g) {
			if (g == j) g = 1.70158;
			if ((a /= e / 2) < 1) return d / 2 * a * a * (((g *= 1.525) + 1) * a - g) + b;
			return d / 2 * ((a -= 2) * a * (((g *= 1.525) + 1) * a + g) + 2) + b
		},
		easeInBounce: function(c, a, b, d, e) {
			return d - f.easing.easeOutBounce(c, e - a, 0, d, e) + b
		},
		easeOutBounce: function(c, a, b, d, e) {
			return (a /= e) < 1 / 2.75 ? d * 7.5625 * a * a + b: a < 2 / 2.75 ? d * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + b: a < 2.5 / 2.75 ? d * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + b: d * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
		},
		easeInOutBounce: function(c, a, b, d, e) {
			if (a < e / 2) return f.easing.easeInBounce(c, a * 2, 0, d, e) * 0.5 + b;
			return f.easing.easeOutBounce(c, a * 2 - e, 0, d, e) * 0.5 + d * 0.5 + b
		}
	})
} (jQuery);;
jQuery.easing.def = 'easeOutQuint'; (function(f) {
	var a = document.createElement("div"),
	b = a.style,
	k = "transform",
	n = "Transform",
	e = ["O" + n, "ms" + n, "Webkit" + n, "Moz" + n, k],
	g = e.length,
	l,
	h,
	c,
	m = /Matrix([^)]*)/;
	while (g--) {
		if (e[g] in b) {
			f.support[k] = l = e[g];
			continue
		}
	}
	if (!l) {
		f.support.matrixFilter = h = b.filter === ""
	}
	a = b = null;
	f.cssNumber[k] = true;
	f.cssHooks[k] = c = {
		get: function(o) {
			var i = f.data(o, "transform") || {
				translate: [0, 0],
				rotate: 0,
				scale: [1, 1],
				skew: [0, 0]
			};
			i.toString = function() {
				return "translate(" + this.translate[0] + "px," + this.translate[1] + "px) rotate(" + this.rotate + "rad) scale(" + this.scale + ") skew(" + this.skew[0] + "rad," + this.skew[1] + "rad)"
			};
			return i
		},
		set: function(D, B, s) {
			if (typeof B === "string") {
				B = j(B)
			}
			var v = B.translate,
			C = B.rotate,
			F = B.scale,
			p = B.skew,
			E = D.style,
			x,
			t;
			f.data(D, "transform", B);
			if (!p[0] && !p[1]) {
				p = 0
			}
			if (l) {
				E[l] = "translate(" + v[0] + "px," + v[1] + "px) rotate(" + C + "rad) scale(" + F + ")" + (p ? " skew(" + p[0] + "rad," + p[1] + "rad)": "")
			} else {
				if (h) {
					if (!s) {
						E.zoom = 1
					}
					var o = Math.cos(C),
					i = Math.sin(C),
					r = o * F[0],
					q = -i * F[1],
					z = i * F[0],
					y = o * F[1],
					w,
					u,
					A;
					if (p) {
						w = Math.tan(p[0]);
						u = Math.tan(p[1]);
						r += q * u;
						q += r * w;
						z += y * u;
						y += z * w
					}
					A = ["Matrix(M11=" + r, "M12=" + q, "M21=" + z, "M22=" + y, "SizingMethod='auto expand'"].join();
					t = (x = D.currentStyle) && x.filter || E.filter || "";
					E.filter = m.test(t) ? t.replace(m, A) : t + " progid:DXImageTransform.Microsoft." + A + ")";
					if ((centerOrigin = f.transform.centerOrigin)) {
						E[centerOrigin == "margin" ? "marginLeft": "left"] = -(D.offsetWidth / 2) + (D.clientWidth / 2) + "px";
						E[centerOrigin == "margin" ? "marginTop": "top"] = -(D.offsetHeight / 2) + (D.clientHeight / 2) + "px"
					}
					E.left = v[0] + "px";
					E.top = v[1] + "px"
				}
			}
		}
	};
	f.fx.step.transform = function(q) {
		var p = q.elem,
		t = q.start,
		i = q.end,
		s = q.pos,
		o = {},
		r;
		if (!t || typeof i === "string") {
			if (!t) {
				t = c.get(p)
			}
			if (h) {
				p.style.zoom = 1
			}
			q.end = i = j(i)
		}
		o.translate = [(t.translate[0] + (i.translate[0] - t.translate[0]) * s + 0.5) | 0, (t.translate[1] + (i.translate[1] - t.translate[1]) * s + 0.5) | 0];
		o.rotate = t.rotate + (i.rotate - t.rotate) * s;
		o.scale = [t.scale[0] + (i.scale[0] - t.scale[0]) * s, t.scale[1] + (i.scale[1] - t.scale[1]) * s];
		o.skew = [t.skew[0] + (i.skew[0] - t.skew[0]) * s, t.skew[1] + (i.skew[1] - t.skew[1]) * s];
		c.set(p, o, true)
	};
	function j(o) {
		o = o.split(")");
		var p = [0, 0],
		s = 0,
		r = [1, 1],
		w = [0, 0],
		t = o.length - 1,
		q = f.trim,
		u,
		v;
		while (t--) {
			u = o[t].split("(");
			v = u[1];
			switch (q(u[0])) {
			case "translateX":
				p[0] += parseInt(v, 10);
				break;
			case "translateY":
				p[1] += parseInt(v, 10);
				break;
			case "translate":
				v = v.split(",");
				p[0] += parseInt(v[0], 10);
				p[1] += parseInt(v[1] || 0, 10);
				break;
			case "rotate":
				s += d(v);
				break;
			case "scaleX":
				r[0] *= v;
			case "scaleY":
				r[1] *= v;
			case "scale":
				v = v.split(",");
				r[0] *= v[0];
				r[1] *= (v.length > 1 ? v[1] : v[0]);
				break;
			case "skewX":
				w[0] += d(v);
				break;
			case "skewY":
				w[1] += d(v);
				break;
			case "skew":
				v = v.split(",");
				w[0] += d(v[0]);
				w[1] += d(v[1] || "0");
				break
			}
		}
		return {
			translate: p,
			rotate: s,
			scale: r,
			skew: w
		}
	}
	function d(i) {
		return~i.indexOf("deg") ? parseInt(i, 10) * (Math.PI * 2 / 360) : ~i.indexOf("grad") ? parseInt(i, 10) * (Math.PI / 200) : parseFloat(i)
	}
	f.transform = {
		centerOrigin: "margin",
		radToDeg: function(i) {
			return i * 180 / Math.PI
		}
	}
})(jQuery); (function($) {
	$.cookie = function(key, value, options) {
		if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
			options = $.extend({},
			options);
			if (value === null || value === undefined) {
				options.expires = -1
			}
			if (typeof options.expires === 'number') {
				var days = options.expires,
				t = options.expires = new Date();
				t.setDate(t.getDate() + days)
			}
			value = String(value);
			return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value: encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path: '', options.domain ? '; domain=' + options.domain: '', options.secure ? '; secure': ''].join(''))
		}
		options = value || {};
		var decode = options.raw ?
		function(s) {
			return s
		}: decodeURIComponent;
		var pairs = document.cookie.split('; ');
		for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
			if (decode(pair[0]) === key) return decode(pair[1] || '')
		}
		return null
	}
})(jQuery);

