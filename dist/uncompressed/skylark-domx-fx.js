/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-domx-fx/fx',[
    "skylark-langx/skylark",
    "skylark-langx/langx"
], function(skylark,langx) {

    function fx() {
        return fx;
    }

    langx.mixin(fx, {
        off: false,
        speeds: {
            normal: 400,
            fast: 200,
            slow: 600
        }
    });

    return skylark.attach("domx.fx", fx);
});
define('skylark-domx-fx/animate',[
    "skylark-langx/langx",
    "skylark-domx-browser",
    "skylark-domx-noder",
    "skylark-domx-geom",
    "skylark-domx-styler",
    "skylark-domx-eventer",
    "./fx"
], function(langx, browser, noder, geom, styler, eventer,fx) {

    var animationName,
        animationDuration,
        animationTiming,
        animationDelay,
        transitionProperty,
        transitionDuration,
        transitionTiming,
        transitionDelay,

        animationEnd = browser.normalizeCssEvent('AnimationEnd'),
        transitionEnd = browser.normalizeCssEvent('TransitionEnd'),

        supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        transform = browser.css3PropPrefix + "transform",
        cssReset = {};


    cssReset[animationName = browser.normalizeCssProperty("animation-name")] =
        cssReset[animationDuration = browser.normalizeCssProperty("animation-duration")] =
        cssReset[animationDelay = browser.normalizeCssProperty("animation-delay")] =
        cssReset[animationTiming = browser.normalizeCssProperty("animation-timing-function")] = "";

    cssReset[transitionProperty = browser.normalizeCssProperty("transition-property")] =
        cssReset[transitionDuration = browser.normalizeCssProperty("transition-duration")] =
        cssReset[transitionDelay = browser.normalizeCssProperty("transition-delay")] =
        cssReset[transitionTiming = browser.normalizeCssProperty("transition-timing-function")] = "";

    /*   
     * Perform a custom animation of a set of CSS properties.
     * @param {Object} elm  
     * @param {Number or String} properties
     * @param {String} ease
     * @param {Number or String} duration
     * @param {Function} callback
     * @param {Number or String} delay
     */
    function animate(elm, properties, duration, ease, callback, delay) {
        var key,
            cssValues = {},
            cssProperties = [],
            transforms = "",
            that = this,
            endEvent,
            wrappedCallback,
            fired = false,
            hasScrollTop = false,
            resetClipAuto = false;

        if (langx.isPlainObject(duration)) {
            ease = duration.easing;
            callback = duration.complete;
            delay = duration.delay;
            duration = duration.duration;
        }

        if (langx.isString(duration)) {
            duration = fx.speeds[duration];
        }
        if (duration === undefined) {
            duration = fx.speeds.normal;
        }
        duration = duration / 1000;
        if (fx.off) {
            duration = 0;
        }

        if (langx.isFunction(ease)) {
            callback = ease;
            eace = "swing";
        } else {
            ease = ease || "swing";
        }

        if (delay) {
            delay = delay / 1000;
        } else {
            delay = 0;
        }

        if (langx.isString(properties)) {
            // keyframe animation
            cssValues[animationName] = properties;
            cssValues[animationDuration] = duration + "s";
            cssValues[animationTiming] = ease;
            endEvent = animationEnd;
        } else {
            // CSS transitions
            for (key in properties) {
                var v = properties[key];
                if (supportedTransforms.test(key)) {
                    transforms += key + "(" + v + ") ";
                } else {
                    if (key === "scrollTop") {
                        hasScrollTop = true;
                    }
                    if (key == "clip" && langx.isPlainObject(v)) {
                        cssValues[key] = "rect(" + v.top+"px,"+ v.right +"px,"+ v.bottom +"px,"+ v.left+"px)";
                        if (styler.css(elm,"clip") == "auto") {
                            var size = geom.size(elm);
                            styler.css(elm,"clip","rect("+"0px,"+ size.width +"px,"+ size.height +"px,"+"0px)");  
                            resetClipAuto = true;
                        }

                    } else {
                        cssValues[key] = v;
                    }
                    cssProperties.push(langx.dasherize(key));
                }
            }
            endEvent = transitionEnd;
        }

        if (transforms) {
            cssValues[transform] = transforms;
            cssProperties.push(transform);
        }

        if (duration > 0 && langx.isPlainObject(properties)) {
            cssValues[transitionProperty] = cssProperties.join(", ");
            cssValues[transitionDuration] = duration + "s";
            cssValues[transitionDelay] = delay + "s";
            cssValues[transitionTiming] = ease;
        }

        wrappedCallback = function(event) {
            fired = true;
            if (event) {
                if (event.target !== event.currentTarget) {
                    return // makes sure the event didn't bubble from "below"
                }
                eventer.off(event.target, endEvent, wrappedCallback)
            } else {
                eventer.off(elm, animationEnd, wrappedCallback) // triggered by setTimeout
            }
            styler.css(elm, cssReset);
            if (resetClipAuto) {
 //               styler.css(elm,"clip","auto");
            }
            callback && callback.call(this);
        };

        if (duration > 0) {
            eventer.on(elm, endEvent, wrappedCallback);
            // transitionEnd is not always firing on older Android phones
            // so make sure it gets fired
            langx.debounce(function() {
                if (fired) {
                    return;
                }
                wrappedCallback.call(that);
            }, ((duration + delay) * 1000) + 25)();
        }

        // trigger page reflow so new elements can animate
        elm.clientLeft;

        styler.css(elm, cssValues);

        if (duration <= 0) {
            langx.debounce(function() {
                if (fired) {
                    return;
                }
                wrappedCallback.call(that);
            }, 0)();
        }

        if (hasScrollTop) {
            scrollToTop(elm, properties["scrollTop"], duration, callback);
        }

        return this;
    }

    return fx.animate = animate;

});
define('skylark-domx-fx/bounce',[
    "skylark-langx/langx",
    "skylark-domx-geom",
    "skylark-domx-styler",
    "./fx",
    "./animate"
],function(langx,geom,styler,fx,animate) {

    function bounce(elm, options, done ) {
        var upAnim, downAnim, refValue,
            // Defaults:
            mode = options.mode,
            hide = mode === "hide",
            show = mode === "show",
            direction = options.direction || "up",
            start,
            distance = options.distance,
            times = options.times || 5,

            // Number of internal animations
            anims = times * 2 + ( show || hide ? 1 : 0 ),
            speed = options.duration / anims,
            easing = options.easing,

            // Utility:
            ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
            motion = ( direction === "up" || direction === "left" ),
            i = 0;

        //createPlaceholder(elm);

        var Deferred = langx.Deferred;
        var funcs = [];

        refValue = styler.css(elm,ref );

        // Default distance for the BIGGEST bounce is the outer Distance / 3
        if ( !distance ) {
            var msize = geom.size(elm);
            distance = (ref === "top" ? msize.height : msize.width) / 3;
        }

        start = geom.relativePosition(elm)[ref];

        if ( show ) {
            downAnim = { opacity: 1 };
            downAnim[ ref ] = refValue;

            // If we are showing, force opacity 0 and set the initial position
            // then do the "first" animation
            styler.css(elm, "opacity", 0 );
            styler.css(elm, ref, start + (motion ? -distance * 2 : distance * 2 ));

            funcs.push(doAnimate(elm,downAnim, speed, easing));
        }

        // Start at the smallest distance if we are hiding
        if ( hide ) {
            distance = distance / Math.pow( 2, times - 1 );
        }

        downAnim = {};
        downAnim[ ref ] = refValue;


        function doAnimate(elm,properties, duration, easing) {
            return function() {
                var d = new Deferred();

                animate(elm,properties, duration, easing ,function(){
                    d.resolve();
                });
                return d.promise;

            }
        }

        // Bounces up/down/left/right then back to 0 -- times * 2 animations happen here
        for ( ; i < times; i++ ) {
            upAnim = {};
            upAnim[ ref ] = start + ( motion ? -distance : distance) ;

            funcs.push(doAnimate(elm,upAnim, speed, easing));

            funcs.push(doAnimate(elm,downAnim, speed, easing));

            distance = hide ? distance * 2 : distance / 2;
        }

        // Last Bounce when Hiding
        if ( hide ) {
            upAnim = { opacity: 0 };
            upAnim[ ref ] = start + ( motion ? -1 * distance : distance) ;

            funcs.push(doAnimate(elm,upAnim, speed, easing ));
        }

        funcs.push(done);
        funcs.reduce(function(prev, curr, index, array) {
            return prev.then(curr);
        }, Deferred.resolve());

    } 

    return fx.bounce = bounce;
});
define('skylark-domx-fx/emulateTransitionEnd',[
    "skylark-langx/langx",
    "skylark-domx-eventer",
    "./fx"
],function(langx,eventer,fx) {
    
    function emulateTransitionEnd(elm,duration) {
        var called = false;
        eventer.one(elm,'transitionEnd', function () { 
            called = true;
        })
        var callback = function () { 
            if (!called) {
                eventer.trigger(elm,browser.support.transition.end) 
            }
        };
        setTimeout(callback, duration);
        
        return this;
    } 



    return fx.emulateTransitionEnd = emulateTransitionEnd;
});
define('skylark-domx-fx/fade',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./animate"
],function(langx,styler,fx,animate) {
    /*   
     * Adjust the opacity of an element.
     * @param {Object} elm  
     * @param {Number or String} speed
     * @param {Number or String} opacity
     * @param {String} easing
     * @param {Function} callback
     */
    function fade(elm, speed, opacity, easing, callback) {
        animate(elm, { opacity: opacity }, speed, easing, callback);
        return this;
    }


    return fx.fade = fade;
});
define('skylark-domx-fx/fadeIn',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./fade"
],function(langx,styler,fx,fadeTo) {
    /*   
     * Display an element by fading them to opaque.
     * @param {Object} elm  
     * @param {Number or String} speed
     * @param {String} easing
     * @param {Function} callback
     */
    function fadeIn(elm, speed, easing, callback) {
        var target = styler.css(elm, "opacity");
        if (target > 0) {
            styler.css(elm, "opacity", 0);
        } else {
            target = 1;
        }
        styler.show(elm);

        fadeTo(elm, speed, target, easing, callback);

        return this;
    }


    return fx.fadeIn = fadeIn;
});
define('skylark-domx-fx/fadeOut',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./fade"
],function(langx,styler,fx,fadeTo) {
    /*   
     * Hide an element by fading them to transparent.
     * @param {Object} elm  
     * @param {Number or String} speed
     * @param {String} easing
     * @param {Function} callback
     */
    function fadeOut(elm, speed, easing, callback) {
        var _elm = elm,
            complete,
            opacity = styler.css(elm,"opacity"),
            options = {};

        if (langx.isPlainObject(speed)) {
            options.easing = speed.easing;
            options.duration = speed.duration;
            complete = speed.complete;
        } else {
            options.duration = speed;
            if (callback) {
                complete = callback;
                options.easing = easing;
            } else {
                complete = easing;
            }
        }
        options.complete = function() {
            styler.css(elm,"opacity",opacity);
            styler.hide(elm);
            if (complete) {
                complete.call(elm);
            }
        }

        fadeTo(elm, options, 0);

        return this;
    }

    return fx.fadeOut = fadeOut;
});
define('skylark-domx-fx/fadeToggle',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./fadeIn",
    "./fadeOut"
],function(langx,styler,fx,fadeIn,fadeOut) {

    /*   
     * Display or hide an element by animating its opacity.
     * @param {Object} elm  
     * @param {Number or String} speed
     * @param {String} ceasing
     * @param {Function} callback
     */
    function fadeToggle(elm, speed, easing, callback) {
        if (styler.isInvisible(elm)) {
            fadeIn(elm, speed, easing, callback);
        } else {
            fadeOut(elm, speed, easing, callback);
        }
        return this;
    }


    return fx.fadeToggle = fadeToggle;
});
define('skylark-domx-fx/hide',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./animate"
],function(langx,styler,fx,animate) {
    /*   
     * Hide an element.
     * @param {Object} elm  
     * @param {String} speed
     * @param {Function} callback
     */
    function hide(elm, speed, callback) {
        if (speed) {
            if (!callback && langx.isFunction(speed)) {
                callback = speed;
                speed = "normal";
            }
            animate(elm, { opacity: 0, scale: "0,0" }, speed, function() {
                styler.hide(elm);
                if (callback) {
                    callback.call(elm);
                }
            });
        } else {
            styler.hide(elm);
        }
        return this;
    }

    return fx.hide = hide;
});
define('skylark-domx-fx/show',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./animate"
],function(langx,styler,fx,animate) {
    /*   
     * Display an element.
     * @param {Object} elm  
     * @param {String} speed
     * @param {Function} callback
     */
    function show(elm, speed, callback) {
        styler.show(elm);
        if (speed) {
            if (!callback && langx.isFunction(speed)) {
                callback = speed;
                speed = "normal";
            }
            styler.css(elm, "opacity", 0)
            animate(elm, { opacity: 1, scale: "1,1" }, speed, callback);
        }
        return this;
    }

    return fx.show = show;
});
define('skylark-domx-fx/slide',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./animate",
    "./show",
    "./hide"
],function(langx,styler,fx,animate,show,hide) {

    function slide(elm,options, callback ) {
    	if (langx.isFunction(options)) {
    		callback = options;
    		options = {};
    	}
		var direction = options.direction || "down",
			isHide = ( direction === "up" || direction === "left" ),
			isVert = ( direction === "up" || direction === "down" ),
			duration = options.duration || fx.speeds.normal;


        // get the element position to restore it then
        var position = styler.css(elm, 'position');

        if (isHide) {
            // active the function only if the element is visible
        	if (styler.isInvisible(elm)) {
        		return this;
        	}
        } else {
	        // show element if it is hidden
	        show(elm);        	
	        // place it so it displays as usually but hidden
	        styler.css(elm, {
	            position: 'absolute',
	            visibility: 'hidden'
	        });
        }



        if (isVert) { // up--down
	        // get naturally height, margin, padding
	        var marginTop = styler.css(elm, 'margin-top');
	        var marginBottom = styler.css(elm, 'margin-bottom');
	        var paddingTop = styler.css(elm, 'padding-top');
	        var paddingBottom = styler.css(elm, 'padding-bottom');
	        var height = styler.css(elm, 'height');

	        if (isHide) {  	// slideup
	            // set initial css for animation
	            styler.css(elm, {
	                visibility: 'visible',
	                overflow: 'hidden',
	                height: height,
	                marginTop: marginTop,
	                marginBottom: marginBottom,
	                paddingTop: paddingTop,
	                paddingBottom: paddingBottom
	            });

	            // animate element height, margin and padding to zero
	            animate(elm, {
	                height: 0,
	                marginTop: 0,
	                marginBottom: 0,
	                paddingTop: 0,
	                paddingBottom: 0
	            }, {
	                // callback : restore the element position, height, margin and padding to original values
	                duration: duration,
	                queue: false,
	                complete: function() {
	                    hide(elm);
	                    styler.css(elm, {
	                        visibility: 'visible',
	                        overflow: 'hidden',
	                        height: height,
	                        marginTop: marginTop,
	                        marginBottom: marginBottom,
	                        paddingTop: paddingTop,
	                        paddingBottom: paddingBottom
	                    });
	                    if (callback) {
	                        callback.apply(elm);
	                    }
	                }
	            });
	        } else {     	// slidedown
		        // set initial css for animation
		        styler.css(elm, {
		            position: position,
		            visibility: 'visible',
		            overflow: 'hidden',
		            height: 0,
		            marginTop: 0,
		            marginBottom: 0,
		            paddingTop: 0,
		            paddingBottom: 0
		        });

		        // animate to gotten height, margin and padding
		        animate(elm, {
		            height: height,
		            marginTop: marginTop,
		            marginBottom: marginBottom,
		            paddingTop: paddingTop,
		            paddingBottom: paddingBottom
		        }, {
		            duration: duration,
		            complete: function() {
		                if (callback) {
		                    callback.apply(elm);
		                }
		            }
		        });

	        }

        } else { // left--right
	        // get naturally height, margin, padding
	        var marginLeft = styler.css(elm, 'margin-left');
	        var marginRight = styler.css(elm, 'margin-right');
	        var paddingLeft = styler.css(elm, 'padding-left');
	        var paddingRight = styler.css(elm, 'padding-right');
	        var width = styler.css(elm, 'width');

	        if (isHide) {  	// slideleft
	            // set initial css for animation
	            styler.css(elm, {
	                visibility: 'visible',
	                overflow: 'hidden',
	                width: width,
	                marginLeft: marginLeft,
	                marginRight: marginRight,
	                paddingLeft: paddingLeft,
	                paddingRight: paddingRight
	            });

	            // animate element height, margin and padding to zero
	            animate(elm, {
	                width: 0,
	                marginLeft: 0,
	                marginRight: 0,
	                paddingLeft: 0,
	                paddingRight: 0
	            }, {
	                // callback : restore the element position, height, margin and padding to original values
	                duration: duration,
	                queue: false,
	                complete: function() {
	                    hide(elm);
	                    styler.css(elm, {
	                        visibility: 'visible',
	                        overflow: 'hidden',
	                        width: width,
	                        marginLeft: marginLeft,
	                        marginRight: marginRight,
	                        paddingLeft: paddingLeft,
	                        paddingRight: paddingRight
	                    });
	                    if (callback) {
	                        callback.apply(elm);
	                    }
	                }
	            });
	        } else {     	// slideright
		        // set initial css for animation
		        styler.css(elm, {
		            position: position,
		            visibility: 'visible',
		            overflow: 'hidden',
		            width: 0,
		            marginLeft: 0,
		            marginRight: 0,
		            paddingLeft: 0,
		            paddingRight: 0
		        });

		        // animate to gotten width, margin and padding
		        animate(elm, {
		            width: width,
		            marginLeft: marginLeft,
		            marginRight: marginRight,
		            paddingLeft: paddingLeft,
		            paddingRight: paddingRight
		        }, {
		            duration: duration,
		            complete: function() {
		                if (callback) {
		                    callback.apply(elm);
		                }
		            }
		        });

	        }       	
        }

        return this;
    }

    return fx.slide = slide;

});

define('skylark-domx-fx/slideDown',[
    "./fx",
    "./slide"
],function(fx,slide) {
    /*   
     * Display an element with a sliding motion.
     * @param {Object} elm  
     * @param {Number or String} duration
     * @param {Function} callback
     */
    function slideDown(elm, duration, callback) {
        return slide(elm,{
            direction : "down",
            duration : duration
        },callback);
    }

    return fx.slideDown = slideDown;
});
define('skylark-domx-fx/slideUp',[
    "./fx",
    "./slide"
],function(fx,slide) {
    /*   
     * Hide an element with a sliding motion.
     * @param {Object} elm  
     * @param {Number or String} duration
     * @param {Function} callback
     */
    function slideUp(elm, duration, callback) {
        return slide(elm,{
            direction : "up",
            duration : duration
        },callback);
    }



    return fx.slideUp = slideUp;
});
define('skylark-domx-fx/slideToggle',[
    "skylark-langx/langx",
    "skylark-domx-geom",
    "./fx",
    "./slideDown",
    "./slideUp"
],function(langx,geom,fx,slideDown,slideUp) {

    /*   
     * Display or hide an element with a sliding motion.
     * @param {Object} elm  
     * @param {Number or String} duration
     * @param {Function} callback
     */
    function slideToggle(elm, duration, callback) {

        // if the element is hidden, slideDown !
        if (geom.height(elm) == 0) {
            slideDown(elm, duration, callback);
        }
        // if the element is visible, slideUp !
        else {
            slideUp(elm, duration, callback);
        }
        return this;
    }

    return fx.slideToggle = slideToggle;
});
define('skylark-domx-fx/throb',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "skylark-domx-noder",
    "./fx",
    "./animate"
],function(langx,styler,noder,fx,animate) {

    
    /*   
     * Replace an old node with the specified node.
     * @param {HTMLElement} elm
     * @param {Node} params
     */
    function throb(elm, params) {
        params = params || {};
        var self = this,
            text = params.text,
            style = params.style,
            time = params.time,
            callback = params.callback,
            timer,

            throbber = noder.createElement("div", {
                "class": params.className || "throbber"
            }),
            //_overlay = overlay(throbber, {
            //    "class": 'overlay fade'
            //}),
            throb = noder.createElement("div", {
                "class": params.throb && params.throb.className || "throb"
            }),
            textNode = noder.createTextNode(text || ""),
            remove = function() {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                if (throbber) {
                    noder.remove(throbber);
                    throbber = null;
                }
            },
            update = function(params) {
                if (params && params.text && throbber) {
                    textNode.nodeValue = params.text;
                }
            };
        if (params.style) {
            styler.css(throbber,params.style);
        }
        throb.appendChild(textNode);
        throbber.appendChild(throb);
        elm.appendChild(throbber);
        var end = function() {
            remove();
            if (callback) callback();
        };
        if (time) {
            timer = setTimeout(end, time);
        }

        return {
            remove: remove,
            update: update
        };
    }

    return fx.throb = throb;
});
define('skylark-domx-fx/toggle',[
    "skylark-langx/langx",
    "skylark-domx-styler",
    "./fx",
    "./show",
    "./hide"
],function(langx,styler,fx,show,hide) {
    /*   
     * Display or hide an element.
     * @param {Object} elm  
     * @param {Number or String} speed
     * @param {Function} callbacke
     */
    function toggle(elm, speed, callback) {
        if (styler.isInvisible(elm)) {
            show(elm, speed, callback);
        } else {
            hide(elm, speed, callback);
        }
        return this;
    }

    return fx.toggle = toggle;
});
define('skylark-domx-fx/main',[
	"./fx",
	"skylark-domx-velm",
	"skylark-domx-query",
    "./animate",
    "./bounce",
    "./emulateTransitionEnd",
    "./fadeIn",
    "./fadeOut",
    "./fade",
    "./fadeToggle",
    "./hide",
    "./show",
    "./slide",
    "./slideDown",
    "./slideToggle",
    "./slideUp",
    "./throb",
    "./toggle"
],function(fx,velm,$){
    // from ./fx
    velm.delegate([
        "animate",
        "emulateTransitionEnd",
        "fadeIn",
        "fadeOut",
        "fade",
        "fadeToggle",
        "hide",
        "scrollToTop",
        "slideDown",
        "slideToggle",
        "slideUp",
        "show",
        "toggle"
    ], fx);

    $.fn.hide =  $.wraps.wrapper_every_act(fx.hide, fx);

    $.fn.animate = $.wraps.wrapper_every_act(fx.animate, fx);
    $.fn.emulateTransitionEnd = $.wraps.wrapper_every_act(fx.emulateTransitionEnd, fx);

    $.fn.show = $.wraps.wrapper_every_act(fx.show, fx);
    $.fn.hide = $.wraps.wrapper_every_act(fx.hide, fx);
    $.fn.toogle = $.wraps.wrapper_every_act(fx.toogle, fx);
    $.fn.fadeTo = $.wraps.wrapper_every_act(fx.fadeTo, fx);
    $.fn.fadeIn = $.wraps.wrapper_every_act(fx.fadeIn, fx);
    $.fn.fadeOut = $.wraps.wrapper_every_act(fx.fadeOut, fx);
    $.fn.fadeToggle = $.wraps.wrapper_every_act(fx.fadeToggle, fx);

    $.fn.slideDown = $.wraps.wrapper_every_act(fx.slideDown, fx);
    $.fn.slideToggle = $.wraps.wrapper_every_act(fx.slideToggle, fx);
    $.fn.slideUp = $.wraps.wrapper_every_act(fx.slideUp, fx);

	return fx;
});
define('skylark-domx-fx', ['skylark-domx-fx/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-fx.js.map
