/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./animate","./show"],function(i,o,t,n,s){return t.slideDown=function(i,t,a){var d=o.css(i,"position");s(i),o.css(i,{position:"absolute",visibility:"hidden"});var p=o.css(i,"margin-top"),e=o.css(i,"margin-bottom"),g=o.css(i,"padding-top"),r=o.css(i,"padding-bottom"),m=o.css(i,"height");return o.css(i,{position:d,visibility:"visible",overflow:"hidden",height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0}),n(i,{height:m,marginTop:p,marginBottom:e,paddingTop:g,paddingBottom:r},{duration:t,complete:function(){a&&a.apply(i)}}),this}});
//# sourceMappingURL=sourcemaps/slideDown.js.map
