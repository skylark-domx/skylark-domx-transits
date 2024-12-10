/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","skylark-domx-noder","./transits","./transit"],function(t,o,c,e,n){return e.throb=function(t,e){e=e||{};var n,l=e.time,r=e.callback,a=c.createElement("div",{class:e.className||"throbber"}),s=function(){n&&(clearTimeout(n),n=null),a&&(c.remove(a),a=null)},e=(e.style&&o.css(a,e.style),e.content||'<span class="throb"></span>');return c.html(a,e),t.appendChild(a),l&&(n=setTimeout(function(){s(),r&&r()},l)),{throbber:a,remove:s,update:function(t){t&&t.text&&a&&(textNode.nodeValue=t.text)}}}});
//# sourceMappingURL=sourcemaps/throb.js.map
