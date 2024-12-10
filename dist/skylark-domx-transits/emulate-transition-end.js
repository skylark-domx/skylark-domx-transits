/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","./transits"],function(n,e,i,t){return t.emulateTransitionEnd=function(n,t){var r=!1;return i.one(n,"transitionEnd",function(){r=!0}),setTimeout(function(){r||i.trigger(n,e.support.transition.end)},t),this}});
//# sourceMappingURL=sourcemaps/emulate-transition-end.js.map
