/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./transits","./fade-in","./fade-out"],function(n,a,e,r,s){return e.fadeToggle=function(n,e,i,t){return(a.isInvisible(n)?r:s)(n,e,i,t),this}});
//# sourceMappingURL=sourcemaps/fade-toggle.js.map
