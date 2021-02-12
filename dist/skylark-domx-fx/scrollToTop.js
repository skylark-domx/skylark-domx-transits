/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./animate"],function(n,e,l,r){return l.scrollToTop=function(e,l,r,a){var o=parseInt(e.scrollTop),t=0,s=1e3*r/5,c=parseInt(l),f=setInterval(function(){++t<=s&&(e.scrollTop=(c-o)/s*t+o),t>=s+1&&(clearInterval(f),a&&n.debounce(a,1e3)())},5)}});
//# sourceMappingURL=sourcemaps/scrollToTop.js.map
