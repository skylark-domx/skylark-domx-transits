/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./fadeTo"],function(n,a,e,i){return e.fadeOut=function(e,t,o,s){var c,r=a.css(e,"opacity"),l={};return n.isPlainObject(t)?(l.easing=t.easing,l.duration=t.duration,c=t.complete):(l.duration=t,s?(c=s,l.easing=o):c=o),l.complete=function(){a.css(e,"opacity",r),a.hide(e),c&&c.call(e)},i(e,l,0),this}});
//# sourceMappingURL=sourcemaps/fadeOut.js.map
