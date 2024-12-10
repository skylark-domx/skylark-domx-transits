/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./transits","./fade"],function(n,e,s,i){return s.fadeIn=function(n,s,a,t){var r=e.css(n,"opacity");return 0<r?e.css(n,"opacity",0):r=1,e.show(n),i(n,r,s,a,t),this}});
//# sourceMappingURL=sourcemaps/fade-in.js.map
