/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./transits","./transit"],function(a,r,n,e){return n.hide=function(n,i,t){return i?(!t&&a.isFunction(i)&&(t=i,i="normal"),e(n,{opacity:0,scale:"0,0"},i,function(){r.hide(n),t&&t.call(n)})):r.hide(n),this}});
//# sourceMappingURL=sourcemaps/hide.js.map
