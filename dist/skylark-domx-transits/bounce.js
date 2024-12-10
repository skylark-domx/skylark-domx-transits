/**
 * skylark-domx-transits - The skylark transits library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-geom","skylark-domx-styler","./transits","./transit"],function(v,w,x,e,b){return e.bounce=function(e,t,n){var r,s,i,o="hide"===(u=t.mode),u="show"===u,a=t.direction||"up",c=t.distance,p=t.times||5,h=t.duration/(2*p+(u||o?1:0)),d=t.easing,f="up"===a||"down"===a?"top":"left",l="up"===a||"left"===a,y=0,k=v.Deferred,m=[];function g(t,n,r,s){return function(){var e=new k;return b(t,n,r,s,function(){e.resolve()}),e.promise}}for(t=x.css(e,f),c||(a=w.size(e),c=("top"==f?a.height:a.width)/3),i=w.relativePosition(e)[f],u&&((s={opacity:1})[f]=t,x.css(e,"opacity",0),x.css(e,f,i+(l?2*-c:2*c)),m.push(g(e,s,h,d))),o&&(c/=Math.pow(2,p-1)),(s={})[f]=t;y<p;y++)(r={})[f]=i+(l?-c:c),m.push(g(e,r,h,d)),m.push(g(e,s,h,d)),c=o?2*c:c/2;return o&&((r={opacity:0})[f]=i+(l?-1*c:c),m.push(g(e,r,h,d))),m.push(n),m.reduce(function(e,t,n,r){return e.then(t)},k.resolve()),this}});
//# sourceMappingURL=sourcemaps/bounce.js.map
