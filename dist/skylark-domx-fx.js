/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,i){var n=i.define,t=i.require,o="function"==typeof n&&n.amd,r=!o&&"undefined"!=typeof exports;if(!o&&!n){var a={};n=i.define=function(e,i,n){"function"==typeof n?(a[e]={factory:n,deps:i.map(function(i){return function(e,i){if("."!==e[0])return e;var n=i.split("/"),t=e.split("/");n.pop();for(var o=0;o<t.length;o++)"."!=t[o]&&(".."==t[o]?n.pop():n.push(t[o]));return n.join("/")}(i,e)}),resolved:!1,exports:null},t(e)):a[e]={factory:null,resolved:!0,exports:n}},t=i.require=function(e){if(!a.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var n=a[e];if(!n.resolved){var o=[];n.deps.forEach(function(e){o.push(t(e))}),n.exports=n.factory.apply(i,o)||null,n.resolved=!0}return n.exports}}if(!n)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,i){e("skylark-domx-fx/fx",["skylark-langx/skylark","skylark-langx/langx","skylark-domx-browser","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer"],function(e,i,n,t,o,r){var a,s,l,p,c,d,f,u=n.normalizeCssEvent("AnimationEnd"),m=n.normalizeCssEvent("TransitionEnd"),g=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,h=n.css3PropPrefix+"transform",y={};function v(e,n,v,w,x,k){var b,_,P,z={},B=[],C="",I=this,O=!1,j=!1;if(i.isPlainObject(v)&&(w=v.easing,x=v.complete,k=v.delay,v=v.duration),i.isString(v)&&(v=E.speeds[v]),void 0===v&&(v=E.speeds.normal),v/=1e3,E.off&&(v=0),i.isFunction(w)?(x=w,eace="swing"):w=w||"swing",k?k/=1e3:k=0,i.isString(n))z[a]=n,z[s]=v+"s",z[l]=w,_=u;else{for(b in n){var q=n[b];if(g.test(b))C+=b+"("+q+") ";else{if("scrollTop"===b&&(j=!0),"clip"==b&&i.isPlainObject(q)){if(z[b]="rect("+q.top+"px,"+q.right+"px,"+q.bottom+"px,"+q.left+"px)","auto"==o.css(e,"clip")){var D=t.size(e);o.css(e,"clip","rect(0px,"+D.width+"px,"+D.height+"px,0px)"),!0}}else z[b]=q;B.push(i.dasherize(b))}}_=m}return C&&(z[h]=C,B.push(h)),v>0&&i.isPlainObject(n)&&(z[p]=B.join(", "),z[c]=v+"s",z[f]=k+"s",z[d]=w),P=function(i){if(O=!0,i){if(i.target!==i.currentTarget)return;r.off(i.target,_,P)}else r.off(e,u,P);o.css(e,y),x&&x.call(this)},v>0&&(r.on(e,_,P),i.debounce(function(){O||P.call(I)},1e3*(v+k)+25)()),e.clientLeft,o.css(e,z),v<=0&&i.debounce(function(){O||P.call(I)},0)(),j&&T(e,n.scrollTop,v,x),this}function w(e,n,t){return o.show(e),n&&(!t&&i.isFunction(n)&&(t=n,n="normal"),o.css(e,"opacity",0),v(e,{opacity:1,scale:"1,1"},n,t)),this}function x(e,n,t){return n?(!t&&i.isFunction(n)&&(t=n,n="normal"),v(e,{opacity:0,scale:"0,0"},n,function(){o.hide(e),t&&t.call(e)})):o.hide(e),this}function T(e,n,t,o){var r=parseInt(e.scrollTop),a=0,s=1e3*t/5,l=parseInt(n),p=setInterval(function(){++a<=s&&(e.scrollTop=(l-r)/s*a+r),a>=s+1&&(clearInterval(p),o&&i.debounce(o,1e3)())},5)}function k(e,i,n,t,o){return v(e,{opacity:n},i,t,o),this}function b(e,i,n,t){var r=o.css(e,"opacity");return r>0?o.css(e,"opacity",0):r=1,o.show(e),k(e,i,r,n,t),this}function _(e,n,t,r){var a,s=o.css(e,"opacity"),l={};return i.isPlainObject(n)?(l.easing=n.easing,l.duration=n.duration,a=n.complete):(l.duration=n,r?(a=r,l.easing=t):a=t),l.complete=function(){o.css(e,"opacity",s),o.hide(e),a&&a.call(e)},k(e,l,0),this}function P(e,i,n){var t=o.css(e,"position");w(e),o.css(e,{position:"absolute",visibility:"hidden"});var r=o.css(e,"margin-top"),a=o.css(e,"margin-bottom"),s=o.css(e,"padding-top"),l=o.css(e,"padding-bottom"),p=o.css(e,"height");return o.css(e,{position:t,visibility:"visible",overflow:"hidden",height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0}),v(e,{height:p,marginTop:r,marginBottom:a,paddingTop:s,paddingBottom:l},{duration:i,complete:function(){n&&n.apply(e)}}),this}function z(e,i,n){if(t.height(e)>0){o.css(e,"position");var r=o.css(e,"height"),a=o.css(e,"margin-top"),s=o.css(e,"margin-bottom"),l=o.css(e,"padding-top"),p=o.css(e,"padding-bottom");o.css(e,{visibility:"visible",overflow:"hidden",height:r,marginTop:a,marginBottom:s,paddingTop:l,paddingBottom:p}),v(e,{height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0},{duration:i,queue:!1,complete:function(){x(e),o.css(e,{visibility:"visible",overflow:"hidden",height:r,marginTop:a,marginBottom:s,paddingTop:l,paddingBottom:p}),n&&n.apply(e)}})}return this}function E(){return E}return y[a=n.normalizeCssProperty("animation-name")]=y[s=n.normalizeCssProperty("animation-duration")]=y[n.normalizeCssProperty("animation-delay")]=y[l=n.normalizeCssProperty("animation-timing-function")]="",y[p=n.normalizeCssProperty("transition-property")]=y[c=n.normalizeCssProperty("transition-duration")]=y[f=n.normalizeCssProperty("transition-delay")]=y[d=n.normalizeCssProperty("transition-timing-function")]="",i.mixin(E,{off:!1,speeds:{normal:400,fast:200,slow:600},animate:v,emulateTransitionEnd:function(e,i){var t=!1;r.one(e,"transitionEnd",function(){t=!0});return setTimeout(function(){t||r.trigger(e,n.support.transition.end)},i),this},fadeIn:b,fadeOut:_,fadeTo:k,fadeToggle:function(e,i,n,t){o.isInvisible(e)?b(e,i,easing,callback):_(e,i,easing,callback);return this},hide:x,scrollToTop:T,slideDown:P,slideToggle:function(e,i,n){0==t.height(e)?P(e,i,n):z(e,i,n);return this},slideUp:z,show:w,toggle:function(e,i,n){o.isInvisible(e)?w(e,i,n):x(e,i,n);return this}}),e.attach("domx.fx",E)}),e("skylark-domx-fx/main",["./fx","skylark-domx-velm","skylark-domx-query"],function(e,i,n){return i.delegate(["animate","emulateTransitionEnd","fadeIn","fadeOut","fadeTo","fadeToggle","hide","scrollToTop","slideDown","slideToggle","slideUp","show","toggle"],e),$fn.hide=n.wraps.wrapper_every_act(e.hide,e),n.fn.animate=n.wraps.wrapper_every_act(e.animate,e),n.fn.emulateTransitionEnd=n.wraps.wrapper_every_act(e.emulateTransitionEnd,e),n.fn.show=n.wraps.wrapper_every_act(e.show,e),n.fn.hide=n.wraps.wrapper_every_act(e.hide,e),n.fn.toogle=n.wraps.wrapper_every_act(e.toogle,e),n.fn.fadeTo=n.wraps.wrapper_every_act(e.fadeTo,e),n.fn.fadeIn=n.wraps.wrapper_every_act(e.fadeIn,e),n.fn.fadeOut=n.wraps.wrapper_every_act(e.fadeOut,e),n.fn.fadeToggle=n.wraps.wrapper_every_act(e.fadeToggle,e),n.fn.slideDown=n.wraps.wrapper_every_act(e.slideDown,e),n.fn.slideToggle=n.wraps.wrapper_every_act(e.slideToggle,e),n.fn.slideUp=n.wraps.wrapper_every_act(e.slideUp,e),e}),e("skylark-domx-fx",["skylark-domx-fx/main"],function(e){return e})}(n),!o){var s=t("skylark-langx/skylark");r?module.exports=s:i.skylarkjs=s}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-domx-fx.js.map
