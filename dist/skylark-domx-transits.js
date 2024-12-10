/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals,define,require) {
  var isAmd = (typeof define === 'function' && define.amd),
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

define("skylark-domx-transits/transits",["skylark-langx/skylark","skylark-langx/langx"],function(t,n){function e(){return e}return n.mixin(e,{off:!1,speeds:{normal:400,fast:200,slow:600}}),t.attach("domx.transits",e)}),define("skylark-domx-transits/transit",["skylark-langx/langx","skylark-domx-browser","skylark-domx-noder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","./transits"],function(m,t,n,y,x,w,v){var b,T,_,L,P=t.normalizeCssEvent("TransitionEnd"),B=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,R=t.css3PropPrefix+"transform",z={};return z[b=t.normalizeCssProperty("transition-property")]=z[T=t.normalizeCssProperty("transition-duration")]=z[L=t.normalizeCssProperty("transition-delay")]=z[_=t.normalizeCssProperty("transition-timing-function")]="",v.transit=function(n,t,e,i,s,r){var a,o,l,d={},u=[],p="",c=this,f=!1,g=!1;for(a in m.isPlainObject(e)&&(i=e.easing,s=e.complete,r=e.delay,e=e.duration),void 0===(e=m.isString(e)?v.speeds[e]:e)&&(e=v.speeds.normal),e/=1e3,v.off&&(e=0),m.isFunction(i)?(s=i,eace="swing"):i=i||"swing",r?r/=1e3:r=0,t){var k,h=t[a];B.test(a)?p+=a+"("+h+") ":("scrollTop"===a&&(g=!0),"clip"==a&&m.isPlainObject(h)?(d[a]="rect("+h.top+"px,"+h.right+"px,"+h.bottom+"px,"+h.left+"px)","auto"==x.css(n,"clip")&&(k=y.size(n),x.css(n,"clip","rect(0px,"+k.width+"px,"+k.height+"px,0px)"),0)):d[a]=h,u.push(m.dasherize(a)))}return o=P,p&&(d[R]=p,u.push(R)),0<e&&(d[b]=u.join(", "),d[T]=e+"s",d[L]=r+"s",d[_]=i),l=function(t){if(f=!0,t){if(t.target!==t.currentTarget)return;w.off(t.target,o,l)}else w.off(n,o,l);x.css(n,z),s&&s.call(this)},0<e&&(w.on(n,o,l),m.debounce(function(){f||l.call(c)},1e3*(e+r)+25)()),n.clientLeft,x.css(n,d),e<=0&&m.debounce(function(){f||l.call(c)},0)(),g&&y.scrollToTop(n,t.scrollTop,e,s),this}}),define("skylark-domx-transits/bounce",["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./transits","./transit"],function(x,w,v,t,b){return t.bounce=function(t,n,e){var i,s,r,a="hide"===(o=n.mode),o="show"===o,l=n.direction||"up",d=n.distance,u=n.times||5,p=n.duration/(2*u+(o||a?1:0)),c=n.easing,f="up"===l||"down"===l?"top":"left",g="up"===l||"left"===l,k=0,h=x.Deferred,m=[];function y(n,e,i,s){return function(){var t=new h;return b(n,e,i,s,function(){t.resolve()}),t.promise}}for(n=v.css(t,f),d||(l=w.size(t),d=("top"==f?l.height:l.width)/3),r=w.relativePosition(t)[f],o&&((s={opacity:1})[f]=n,v.css(t,"opacity",0),v.css(t,f,r+(g?2*-d:2*d)),m.push(y(t,s,p,c))),a&&(d/=Math.pow(2,u-1)),(s={})[f]=n;k<u;k++)(i={})[f]=r+(g?-d:d),m.push(y(t,i,p,c)),m.push(y(t,s,p,c)),d=a?2*d:d/2;return a&&((i={opacity:0})[f]=r+(g?-1*d:d),m.push(y(t,i,p,c))),m.push(e),m.reduce(function(t,n,e,i){return t.then(n)},h.resolve()),this}}),define("skylark-domx-transits/emulate-transition-end",["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","./transits"],function(t,i,s,n){return n.emulateTransitionEnd=function(t,n){var e=!1;return s.one(t,"transitionEnd",function(){e=!0}),setTimeout(function(){e||s.trigger(t,i.support.transition.end)},n),this}}),define("skylark-domx-transits/show",["skylark-langx/langx","skylark-domx-styler","./transits","./transit"],function(i,s,t,r){return t.show=function(t,n,e){return s.show(t),n&&(!e&&i.isFunction(n)&&(e=n,n="normal"),s.css(t,"opacity",0),r(t,{opacity:1,scale:"1,1"},n,e)),this}}),define("skylark-domx-transits/hide",["skylark-langx/langx","skylark-domx-styler","./transits","./transit"],function(i,s,t,r){return t.hide=function(t,n,e){return n?(!e&&i.isFunction(n)&&(e=n,n="normal"),r(t,{opacity:0,scale:"0,0"},n,function(){s.hide(t),e&&e.call(t)})):s.hide(t),this}}),define("skylark-domx-transits/explode",["skylark-langx/langx","skylark-domx-styler","skylark-domx-geom","skylark-domx-noder","skylark-domx-query","./transits","./transit","./show","./hide"],function(t,y,x,n,w,e,i,s,r){return e.explode=function(t,n,e){y.show(t),y.css(t,"visibility","hidden");var i,s,r,a,o,l=n.pieces?Math.round(Math.sqrt(n.pieces)):3,d=l,u="show"===n.mode,p=x.pagePosition(t),c=x.marginSize(t),f=Math.ceil(c.width/d),g=Math.ceil(c.height/l),k=[];function h(){k.push(this),k.length===l*d&&(y.css(t,{visibility:"visible"}),w(k).remove(),e())}for(var m=0;m<l;m++)for(r=p.top+m*g,o=m-(l-1)/2,i=0;i<d;i++)s=p.left+i*f,a=i-(d-1)/2,w(t).clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-i*f,top:-m*g}).parent().addClass(n.explodeClass||"ui-effects-explode").css({position:"absolute",overflow:"hidden",width:f,height:g,left:s+(u?a*f:0),top:r+(u?o*g:0),opacity:u?0:1}).transit({left:s+(u?0:a*f),top:r+(u?0:o*g),opacity:u?1:0},n.duration||500,n.easing,h);return this}}),define("skylark-domx-transits/fade",["skylark-langx/langx","skylark-domx-styler","./transits","./transit"],function(t,n,e,r){return e.fade=function(t,n,e,i,s){return r(t,{opacity:n},e,i,s),this}}),define("skylark-domx-transits/fade-in",["skylark-langx/langx","skylark-domx-styler","./transits","./fade"],function(t,r,n,a){return n.fadeIn=function(t,n,e,i){var s=r.css(t,"opacity");return 0<s?r.css(t,"opacity",0):s=1,r.show(t),a(t,s,n,e,i),this}}),define("skylark-domx-transits/fade-out",["skylark-langx/langx","skylark-domx-styler","./transits","./fade"],function(t,n,e,s){return e.fadeOut=function(t,n,e,i){return s(t,0,n,e,i),this}}),define("skylark-domx-transits/fade-toggle",["skylark-langx/langx","skylark-domx-styler","./transits","./fade-in","./fade-out"],function(t,s,n,r,a){return n.fadeToggle=function(t,n,e,i){return(s.isInvisible(t)?r:a)(t,n,e,i),this}}),define("skylark-domx-transits/pulsate",["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./transits","./transit"],function(c,t,f,n,g){return n.pulsate=function(t,n,e){var i=n.mode,s="show"===i||!i,r=2*(n.times||5)+(s||"hide"===i?1:0),a=n.duration/r,o=0,l=1,d=((s||f.isInvisible(t))&&(f.css(t,"opacity",0),f.show(t),o=1),c.Deferred),u=[];function p(n,e,i,s){return function(){var t=new d;return g(n,e,i,s,function(){t.resolve()}),t.promise}}for(;l<r;l++)u.push(p(t,{opacity:o},a,n.easing)),o=1-o;return u.push(p(t,{opacity:o},a,n.easing)),u.push(e),u.reduce(function(t,n,e,i){return t.then(n)},d.resolve()),this}}),define("skylark-domx-transits/shake",["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./transits","./transit"],function(k,h,t,n,m){return n.shake=function(t,n,e){var i=1,s=n.direction||"left",r=n.distance||20,a=n.times||3,o=Math.round(n.duration/(2*a+1)),l="up"===s||"down"===s?"top":"left",s="up"===s||"left"===s,d={},u={},p={},c={},f=k.Deferred;function g(n,e,i,s){return function(){var t=new f;return m(n,e,i,s,function(){t.resolve()}),t.promise}}for(start=h.relativePosition(t)[l],funcs=[],d[l]=start,u[l]=start+(s?-1:1)*r,p[l]=u[l]+(s?1:-1)*r*2,c[l]=p[l]+(s?-1:1)*r*2,funcs.push(g(t,u,o,n.easing));i<a;i++)funcs.push(g(t,p,o,n.easing)),funcs.push(g(t,c,o,n.easing));return funcs.push(g(t,d,o/2,n.easing)),funcs.push(e),funcs.reduce(function(t,n,e,i){return t.then(n)},f.resolve()),this}}),define("skylark-domx-transits/slide",["skylark-langx/langx","skylark-domx-styler","./transits","./transit"],function(h,m,y,x){return y.slide=function(t,n,e){h.isFunction(n)&&(e=n,n={});var i,s,r,a,o,l,d,u,p,c,f="up"===(g=(n=n||{}).direction||"down")||"left"===g,g="up"===g||"down"===g,n=n.duration||y.speeds.normal,k=m.css(t,"position");if(f){if(m.isInvisible(t))return this}else m.show(t),m.css(t,{position:"absolute",visibility:"hidden"});return g?(i=m.css(t,"margin-top"),s=m.css(t,"margin-bottom"),r=m.css(t,"padding-top"),a=m.css(t,"padding-bottom"),o=m.css(t,"height"),f?(m.css(t,{visibility:"visible",overflow:"hidden",height:o,marginTop:i,marginBottom:s,paddingTop:r,paddingBottom:a}),x(t,{height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0},{duration:n,queue:!1,complete:function(){m.hide(t),m.css(t,{visibility:"visible",overflow:"hidden",height:o,marginTop:i,marginBottom:s,paddingTop:r,paddingBottom:a}),e&&e.apply(t)}})):(m.css(t,{position:k,visibility:"visible",overflow:"hidden",height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0}),x(t,{height:o,marginTop:i,marginBottom:s,paddingTop:r,paddingBottom:a},{duration:n,complete:function(){e&&e.apply(t)}}))):(l=m.css(t,"margin-left"),d=m.css(t,"margin-right"),u=m.css(t,"padding-left"),p=m.css(t,"padding-right"),c=m.css(t,"width"),f?(m.css(t,{visibility:"visible",overflow:"hidden",width:c,marginLeft:l,marginRight:d,paddingLeft:u,paddingRight:p}),x(t,{width:0,marginLeft:0,marginRight:0,paddingLeft:0,paddingRight:0},{duration:n,queue:!1,complete:function(){m.hide(t),m.css(t,{visibility:"visible",overflow:"hidden",width:c,marginLeft:l,marginRight:d,paddingLeft:u,paddingRight:p}),e&&e.apply(t)}})):(m.css(t,{position:k,visibility:"visible",overflow:"hidden",width:0,marginLeft:0,marginRight:0,paddingLeft:0,paddingRight:0}),x(t,{width:c,marginLeft:l,marginRight:d,paddingLeft:u,paddingRight:p},{duration:n,complete:function(){e&&e.apply(t)}}))),this}}),define("skylark-domx-transits/slide-down",["./transits","./slide"],function(t,i){return t.slideDown=function(t,n,e){return i(t,{direction:"down",duration:n},e)}}),define("skylark-domx-transits/slide-up",["./transits","./slide"],function(t,i){return t.slideUp=function(t,n,e){return i(t,{direction:"up",duration:n},e)}}),define("skylark-domx-transits/slide-toggle",["skylark-langx/langx","skylark-domx-geom","./transits","./slide-down","./slide-up"],function(t,i,n,s,r){return n.slideToggle=function(t,n,e){return(0==i.height(t)?s:r)(t,n,e),this}}),define("skylark-domx-transits/throb",["skylark-langx/langx","skylark-domx-styler","skylark-domx-noder","./transits","./transit"],function(t,o,l,n,e){return n.throb=function(t,n){n=n||{};var e,i=n.time,s=n.callback,r=l.createElement("div",{class:n.className||"throbber"}),a=function(){e&&(clearTimeout(e),e=null),r&&(l.remove(r),r=null)},n=(n.style&&o.css(r,n.style),n.content||'<span class="throb"></span>');return l.html(r,n),t.appendChild(r),i&&(e=setTimeout(function(){a(),s&&s()},i)),{throbber:r,remove:a,update:function(t){t&&t.text&&r&&(textNode.nodeValue=t.text)}}}}),define("skylark-domx-transits/toggle",["skylark-langx/langx","skylark-domx-styler","./transits","./show","./hide"],function(t,i,n,s,r){return n.toggle=function(t,n,e){return(i.isInvisible(t)?s:r)(t,n,e),this}}),define("skylark-domx-transits/main",["./transits","skylark-domx-velm","skylark-domx-query","./transit","./bounce","./emulate-transition-end","./explode","./fade-in","./fade-out","./fade","./fade-toggle","./hide","./pulsate","./shake","./show","./slide","./slide-down","./slide-toggle","./slide-up","./throb","./toggle"],function(t,n,e){return n.delegate(["transit","emulateTransitionEnd","fadeIn","fadeOut","fade","fadeToggle","hide","scrollToTop","slideDown","slideToggle","slideUp","show","toggle"],t),e.fn.hide=e.wraps.wrapper_every_act(t.hide,t),e.fn.transit=e.wraps.wrapper_every_act(t.transit,t),e.fn.emulateTransitionEnd=e.wraps.wrapper_every_act(t.emulateTransitionEnd,t),e.fn.show=e.wraps.wrapper_every_act(t.show,t),e.fn.hide=e.wraps.wrapper_every_act(t.hide,t),e.fn.toogle=e.wraps.wrapper_every_act(t.toogle,t),e.fn.fadeTo=e.wraps.wrapper_every_act(t.fadeTo,t),e.fn.fadeIn=e.wraps.wrapper_every_act(t.fadeIn,t),e.fn.fadeOut=e.wraps.wrapper_every_act(t.fadeOut,t),e.fn.fadeToggle=e.wraps.wrapper_every_act(t.fadeToggle,t),e.fn.slideDown=e.wraps.wrapper_every_act(t.slideDown,t),e.fn.slideToggle=e.wraps.wrapper_every_act(t.slideToggle,t),e.fn.slideUp=e.wraps.wrapper_every_act(t.slideUp,t),t}),define("skylark-domx-transits",["skylark-domx-transits/main"],function(t){return t});
},this,define,require);
//# sourceMappingURL=sourcemaps/skylark-domx-transits.js.map
