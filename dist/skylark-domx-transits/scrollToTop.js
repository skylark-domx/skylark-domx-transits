/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./transits"],function(n,r,e){return e.scrollToTop=function(r,e,l,t){var o=parseInt(r.scrollTop),s=0,a=1e3*l/5,c=parseInt(e),i=setInterval(function(){++s<=a&&(r.scrollTop=(c-o)/a*s+o),s>=a+1&&(clearInterval(i),t&&n.debounce(t,1e3)())},5);return this}});
//# sourceMappingURL=sourcemaps/scrollToTop.js.map
