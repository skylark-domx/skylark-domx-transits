/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(i,n){var t=n.define,o=n.require,e="function"==typeof t&&t.amd,s=!e&&"undefined"!=typeof exports;if(!e&&!t){var r={};t=n.define=function(i,n,t){"function"==typeof t?(r[i]={factory:t,deps:n.map(function(n){return function(i,n){if("."!==i[0])return i;var t=n.split("/"),o=i.split("/");t.pop();for(var e=0;e<o.length;e++)"."!=o[e]&&(".."==o[e]?t.pop():t.push(o[e]));return t.join("/")}(n,i)}),resolved:!1,exports:null},o(i)):r[i]={factory:null,resolved:!0,exports:t}},o=n.require=function(i){if(!r.hasOwnProperty(i))throw new Error("Module "+i+" has not been defined");var t=r[i];if(!t.resolved){var e=[];t.deps.forEach(function(i){e.push(o(i))}),t.exports=t.factory.apply(n,e)||null,t.resolved=!0}return t.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(i,n){i("skylark-domx-fx/fx",["skylark-langx/skylark","skylark-langx/langx","skylark-domx-browser","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer"],function(i,n,t,o,e,s){var r,a,l,c,p,d,u,f=t.normalizeCssEvent("AnimationEnd"),m=t.normalizeCssEvent("TransitionEnd"),g=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,h=t.css3PropPrefix+"transform",y={};function v(i,t,v,x,k,T){var w,P,z,B={},E=[],j="",I=this,O=!1,q=!1;if(n.isPlainObject(v)&&(x=v.easing,k=v.complete,T=v.delay,v=v.duration),n.isString(v)&&(v=C.speeds[v]),void 0===v&&(v=C.speeds.normal),v/=1e3,C.off&&(v=0),n.isFunction(x)?(k=x,eace="swing"):x=x||"swing",T?T/=1e3:T=0,n.isString(t))B[r]=t,B[a]=v+"s",B[l]=x,P=f;else{for(w in t){var F=t[w];if(g.test(w))j+=w+"("+F+") ";else{if("scrollTop"===w&&(q=!0),"clip"==w&&n.isPlainObject(F)){if(B[w]="rect("+F.top+"px,"+F.right+"px,"+F.bottom+"px,"+F.left+"px)","auto"==e.css(i,"clip")){var S=o.size(i);e.css(i,"clip","rect(0px,"+S.width+"px,"+S.height+"px,0px)"),!0}}else B[w]=F;E.push(n.dasherize(w))}}P=m}return j&&(B[h]=j,E.push(h)),v>0&&n.isPlainObject(t)&&(B[c]=E.join(", "),B[p]=v+"s",B[u]=T+"s",B[d]=x),z=function(n){if(O=!0,n){if(n.target!==n.currentTarget)return;s.off(n.target,P,z)}else s.off(i,f,z);e.css(i,y),k&&k.call(this)},v>0&&(s.on(i,P,z),n.debounce(function(){O||z.call(I)},1e3*(v+T)+25)()),i.clientLeft,e.css(i,B),v<=0&&n.debounce(function(){O||z.call(I)},0)(),q&&b(i,t.scrollTop,v,k),this}function x(i,t,o){return e.show(i),t&&(!o&&n.isFunction(t)&&(o=t,t="normal"),e.css(i,"opacity",0),v(i,{opacity:1,scale:"1,1"},t,o)),this}function k(i,t,o){return t?(!o&&n.isFunction(t)&&(o=t,t="normal"),v(i,{opacity:0,scale:"0,0"},t,function(){e.hide(i),o&&o.call(i)})):e.hide(i),this}function b(i,t,o,e){var s=parseInt(i.scrollTop),r=0,a=1e3*o/5,l=parseInt(t),c=setInterval(function(){++r<=a&&(i.scrollTop=(l-s)/a*r+s),r>=a+1&&(clearInterval(c),e&&n.debounce(e,1e3)())},5)}function T(i,n,t,o,e){return v(i,{opacity:t},n,o,e),this}function w(i,n,t,o){var s=e.css(i,"opacity");return s>0?e.css(i,"opacity",0):s=1,e.show(i),T(i,n,s,t,o),this}function P(i,t,o,s){var r,a=e.css(i,"opacity"),l={};return n.isPlainObject(t)?(l.easing=t.easing,l.duration=t.duration,r=t.complete):(l.duration=t,s?(r=s,l.easing=o):r=o),l.complete=function(){e.css(i,"opacity",a),e.hide(i),r&&r.call(i)},T(i,l,0),this}function z(i,n,t){var o=e.css(i,"position");x(i),e.css(i,{position:"absolute",visibility:"hidden"});var s=e.css(i,"margin-top"),r=e.css(i,"margin-bottom"),a=e.css(i,"padding-top"),l=e.css(i,"padding-bottom"),c=e.css(i,"height");return e.css(i,{position:o,visibility:"visible",overflow:"hidden",height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0}),v(i,{height:c,marginTop:s,marginBottom:r,paddingTop:a,paddingBottom:l},{duration:n,complete:function(){t&&t.apply(i)}}),this}function B(i,n,t){if(o.height(i)>0){e.css(i,"position");var s=e.css(i,"height"),r=e.css(i,"margin-top"),a=e.css(i,"margin-bottom"),l=e.css(i,"padding-top"),c=e.css(i,"padding-bottom");e.css(i,{visibility:"visible",overflow:"hidden",height:s,marginTop:r,marginBottom:a,paddingTop:l,paddingBottom:c}),v(i,{height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0},{duration:n,queue:!1,complete:function(){k(i),e.css(i,{visibility:"visible",overflow:"hidden",height:s,marginTop:r,marginBottom:a,paddingTop:l,paddingBottom:c}),t&&t.apply(i)}})}return this}function C(){return C}return y[r=t.normalizeCssProperty("animation-name")]=y[a=t.normalizeCssProperty("animation-duration")]=y[t.normalizeCssProperty("animation-delay")]=y[l=t.normalizeCssProperty("animation-timing-function")]="",y[c=t.normalizeCssProperty("transition-property")]=y[p=t.normalizeCssProperty("transition-duration")]=y[u=t.normalizeCssProperty("transition-delay")]=y[d=t.normalizeCssProperty("transition-timing-function")]="",n.mixin(C,{off:!1,speeds:{normal:400,fast:200,slow:600},animate:v,emulateTransitionEnd:function(i,n){var o=!1;s.one(i,"transitionEnd",function(){o=!0});return setTimeout(function(){o||s.trigger(i,t.support.transition.end)},n),this},fadeIn:w,fadeOut:P,fadeTo:T,fadeToggle:function(i,n,t,o){e.isInvisible(i)?w(i,n,easing,callback):P(i,n,easing,callback);return this},hide:k,scrollToTop:b,slideDown:z,slideToggle:function(i,n,t){0==o.height(i)?z(i,n,t):B(i,n,t);return this},slideUp:B,show:x,toggle:function(i,n,t){e.isInvisible(i)?x(i,n,t):k(i,n,t);return this}}),i.attach("domx.fx",C)}),i("skylark-domx-fx/main",["./fx"],function(i){return fx}),i("skylark-domx-fx",["skylark-domx-fx/main"],function(i){return i})}(t),!e){var a=o("skylark-langx/skylark");s?module.exports=a:n.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-domx-fx.js.map
