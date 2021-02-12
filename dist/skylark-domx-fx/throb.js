/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","skylark-domx-noder","./fx","./animate"],function(e,t,l,a,n){return a.throb=function(e,a){var n,r=(a=a||{}).text,o=(a.style,a.time),s=a.callback,c=l.createElement("div",{class:a.className||"throbber"}),d=l.createElement("div",{class:a.throb&&a.throb.className||"throb"}),i=l.createTextNode(r||""),u=function(){n&&(clearTimeout(n),n=null),c&&(l.remove(c),c=null)};return a.style&&t.css(c,a.style),d.appendChild(i),c.appendChild(d),e.appendChild(c),o&&(n=setTimeout(function(){u(),s&&s()},o)),{remove:u,update:function(e){e&&e.text&&c&&(i.nodeValue=e.text)}}}});
//# sourceMappingURL=sourcemaps/throb.js.map
