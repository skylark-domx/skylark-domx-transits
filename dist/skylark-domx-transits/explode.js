/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-styler","skylark-domx-geom","skylark-domx-noder","skylark-domx-query","./transits","./transit","./show","./hide"],function(i,g,x,e,b,t,s,o,a){return t.explode=function(i,e,t){g.show(i),g.css(i,"visibility","hidden");var s,o,a,l,n,r=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=r,h="show"===e.mode,p=x.pagePosition(i),c=x.marginSize(i),f=Math.ceil(c.width/d),y=Math.ceil(c.height/r),u=[];function v(){u.push(this),u.length===r*d&&(g.css(i,{visibility:"visible"}),b(u).remove(),t())}for(var k=0;k<r;k++)for(a=p.top+k*y,n=k-(r-1)/2,s=0;s<d;s++)o=p.left+s*f,l=s-(d-1)/2,b(i).clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-s*f,top:-k*y}).parent().addClass(e.explodeClass||"ui-effects-explode").css({position:"absolute",overflow:"hidden",width:f,height:y,left:o+(h?l*f:0),top:a+(h?n*y:0),opacity:h?0:1}).transit({left:o+(h?0:l*f),top:a+(h?0:n*y),opacity:h?1:0},e.duration||500,e.easing,v);return this}});
//# sourceMappingURL=sourcemaps/explode.js.map
