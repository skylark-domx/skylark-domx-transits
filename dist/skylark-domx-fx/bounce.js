/**
 * skylark-domx-fx - The skylark fx library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./fx","./animate"],function(e,n,t,o,i){return o.bounce=function(o,r,s){var u,a,c,p,f=r.mode,d="hide"===f,h="show"===f,l=r.direction||"up",m=r.distance,y=r.times||5,k=2*y+(h||d?1:0),v=r.duration/k,g=r.easing,w="up"===l||"down"===l?"top":"left",x="up"===l||"left"===l,b=0,z=e.Deferred,D=[];if(c=t.css(o,w),!m){var M=n.size(o);m=("top"===w?M.height:M.width)/3}function P(e,n,t,o){return function(){var r=new z;return i(e,n,t,o,function(){r.resolve()}),r.promise}}for(p=n.relativePosition(o)[w],h&&((a={opacity:1})[w]=c,t.css(o,"opacity",0),t.css(o,w,p+(x?2*-m:2*m)),D.push(P(o,a,v,g))),d&&(m/=Math.pow(2,y-1)),(a={})[w]=c;b<y;b++)(u={})[w]=p+(x?-m:m),D.push(P(o,u,v,g)),D.push(P(o,a,v,g)),m=d?2*m:m/2;d&&((u={opacity:0})[w]=p+(x?-1*m:m),D.push(P(o,u,v,g))),D.push(s),D.reduce(function(e,n,t,o){return e.then(n)},z.resolve())}});
//# sourceMappingURL=sourcemaps/bounce.js.map
