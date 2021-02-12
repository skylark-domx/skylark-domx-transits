/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","./fx","./animate","./hide"],function(i,o,t,n,s){return t.slideUp=function(i,t,a){if(geom.height(i)>0){o.css(i,"position");var d=o.css(i,"height"),e=o.css(i,"margin-top"),g=o.css(i,"margin-bottom"),p=o.css(i,"padding-top"),m=o.css(i,"padding-bottom");o.css(i,{visibility:"visible",overflow:"hidden",height:d,marginTop:e,marginBottom:g,paddingTop:p,paddingBottom:m}),n(i,{height:0,marginTop:0,marginBottom:0,paddingTop:0,paddingBottom:0},{duration:t,queue:!1,complete:function(){s(i),o.css(i,{visibility:"visible",overflow:"hidden",height:d,marginTop:e,marginBottom:g,paddingTop:p,paddingBottom:m}),a&&a.apply(i)}})}return this}});
//# sourceMappingURL=sourcemaps/slideUp.js.map
