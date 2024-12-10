/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-noder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","./transits"],function(g,t,e,k,h,P,v){var z,b,T,w,C=t.normalizeCssEvent("TransitionEnd"),j=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,E=t.css3PropPrefix+"transform",O={};return O[z=t.normalizeCssProperty("transition-property")]=O[b=t.normalizeCssProperty("transition-duration")]=O[w=t.normalizeCssProperty("transition-delay")]=O[T=t.normalizeCssProperty("transition-timing-function")]="",v.transit=function(e,t,r,s,i,n){var o,a,l,c={},p=[],d="",f=this,u=!1,m=!1;for(o in g.isPlainObject(r)&&(s=r.easing,i=r.complete,n=r.delay,r=r.duration),void 0===(r=g.isString(r)?v.speeds[r]:r)&&(r=v.speeds.normal),r/=1e3,v.off&&(r=0),g.isFunction(s)?(i=s,eace="swing"):s=s||"swing",n?n/=1e3:n=0,t){var x,y=t[o];j.test(o)?d+=o+"("+y+") ":("scrollTop"===o&&(m=!0),"clip"==o&&g.isPlainObject(y)?(c[o]="rect("+y.top+"px,"+y.right+"px,"+y.bottom+"px,"+y.left+"px)","auto"==h.css(e,"clip")&&(x=k.size(e),h.css(e,"clip","rect(0px,"+x.width+"px,"+x.height+"px,0px)"),0)):c[o]=y,p.push(g.dasherize(o)))}return a=C,d&&(c[E]=d,p.push(E)),0<r&&(c[z]=p.join(", "),c[b]=r+"s",c[w]=n+"s",c[T]=s),l=function(t){if(u=!0,t){if(t.target!==t.currentTarget)return;P.off(t.target,a,l)}else P.off(e,a,l);h.css(e,O),i&&i.call(this)},0<r&&(P.on(e,a,l),g.debounce(function(){u||l.call(f)},1e3*(r+n)+25)()),e.clientLeft,h.css(e,c),r<=0&&g.debounce(function(){u||l.call(f)},0)(),m&&k.scrollToTop(e,t.scrollTop,r,i),this}});
//# sourceMappingURL=sourcemaps/transit.js.map
