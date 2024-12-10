/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./transits","./transit"],function(g,k,n,t,m){return t.shake=function(n,t,e){var s=1,r=t.direction||"left",u=t.distance||20,i=t.times||3,a=Math.round(t.duration/(2*i+1)),o="up"===r||"down"===r?"top":"left",r="up"===r||"left"===r,f={},c={},l={},d={},h=g.Deferred;function p(t,e,s,r){return function(){var n=new h;return m(t,e,s,r,function(){n.resolve()}),n.promise}}for(start=k.relativePosition(n)[o],funcs=[],f[o]=start,c[o]=start+(r?-1:1)*u,l[o]=c[o]+(r?1:-1)*u*2,d[o]=l[o]+(r?-1:1)*u*2,funcs.push(p(n,c,a,t.easing));s<i;s++)funcs.push(p(n,l,a,t.easing)),funcs.push(p(n,d,a,t.easing));return funcs.push(p(n,f,a/2,t.easing)),funcs.push(e),funcs.reduce(function(n,t,e,s){return n.then(t)},h.resolve()),this}});
//# sourceMappingURL=sourcemaps/shake.js.map
