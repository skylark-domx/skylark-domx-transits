/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./fadeTo"],function(n,a,s,r){return s.fadeIn=function(n,s,t,e){var o=a.css(n,"opacity");return o>0?a.css(n,"opacity",0):o=1,a.show(n),r(n,s,o,t,e),this}});
//# sourceMappingURL=sourcemaps/fadeIn.js.map
