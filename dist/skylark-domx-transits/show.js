/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./transits","./transit"],function(a,i,n,r){return n.show=function(n,s,t){return i.show(n),s&&(!t&&a.isFunction(s)&&(t=s,s="normal"),i.css(n,"opacity",0),r(n,{opacity:1,scale:"1,1"},s,t)),this}});
//# sourceMappingURL=sourcemaps/show.js.map
