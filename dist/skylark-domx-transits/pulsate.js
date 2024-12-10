/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./transits","./transit"],function(d,e,h,n,p){return n.pulsate=function(e,n,r){var s=n.mode,t="show"===s||!s,i=2*(n.times||5)+(t||"hide"===s?1:0),o=n.duration/i,u=0,a=1,c=((t||h.isInvisible(e))&&(h.css(e,"opacity",0),h.show(e),u=1),d.Deferred),l=[];function f(n,r,s,t){return function(){var e=new c;return p(n,r,s,t,function(){e.resolve()}),e.promise}}for(;a<i;a++)l.push(f(e,{opacity:u},o,n.easing)),u=1-u;return l.push(f(e,{opacity:u},o,n.easing)),l.push(r),l.reduce(function(e,n,r,s){return e.then(n)},c.resolve()),this}});
//# sourceMappingURL=sourcemaps/pulsate.js.map
