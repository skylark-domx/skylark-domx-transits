/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./fade"],function(n,a,e,i){return e.fadeOut=function(e,t,s,c){var o,r=a.css(e,"opacity"),l={};return n.isPlainObject(t)?(l.easing=t.easing,l.duration=t.duration,o=t.complete):(l.duration=t,c?(o=c,l.easing=s):o=s),l.complete=function(){a.css(e,"opacity",r),a.hide(e),o&&o.call(e)},i(e,l,0),this}});
//# sourceMappingURL=sourcemaps/fadeOut.js.map
