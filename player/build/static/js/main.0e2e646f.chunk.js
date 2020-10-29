(this.webpackJsonpreactplayer=this.webpackJsonpreactplayer||[]).push([[0],{39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),l=a.n(i),s=a(2),c=a(10),o=a(11),u=a(14),d=a(13),m=a(12),f=a.n(m),g=a(4),h=(a(39),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={progress:-1,duration:-1,gotoAfterStopSec:-1,endSec:-1,playing:!0},n.$player=r.a.createRef(),n}return Object(o.a)(a,[{key:"_handleDuration",value:function(e){this.setState({duration:e})}},{key:"_stopAndReturn",value:function(){var e=this.state.gotoAfterStopSec;this.setState({endSec:-1,gotoAfterStopSec:-1,playing:!1}),this.$player.current.seekTo(e,"seconds")}},{key:"_handleProgress",value:function(e){var t=e.playedSeconds;this.state.endSec>0&&t>this.state.endSec&&this._stopAndReturn(),this.setState({progress:t}),this.props.onProgressUpdate(t)}},{key:"_handleOnPlay",value:function(){this.setState({playing:!0})}},{key:"_handleStop",value:function(){this.setState({playing:!1})}},{key:"playFragment",value:function(e,t,a){this.$player.current.seekTo(e,"seconds"),this.setState({gotoAfterStopSec:Math.max("STAY_AT_END"===a?t:e,0),endSec:Math.max(t,.01),playing:!0})}},{key:"render",value:function(){return r.a.createElement("div",{className:"playWithNavButtons"},r.a.createElement(f.a,{ref:this.$player,url:this.props.videoUrl,width:"100%",height:"100%",onDuration:this._handleDuration.bind(this),onProgress:this._handleProgress.bind(this),onPlay:this._handleOnPlay.bind(this),progressInterval:100,onPause:this._handleStop.bind(this),onEnded:this._handleStop.bind(this),playing:this.state.playing,controls:!0,config:{youtube:{playerVars:{origin:window.location.origin}}}}),r.a.createElement("div",{className:"positionAndControls"},"Current position: ",r.a.createElement("span",{className:"position"},Object(g.a)(this.state.progress))))}}]),a}(r.a.Component));a(40);var p=function(e){var t=e.fragments,a=e.playInterval,i=e.activeFragments,l=Object(n.useState)(""),c=Object(s.a)(l,2),o=c[0],u=c[1],d=function(e){u(e.target.value)},m=function(e){d({target:{value:e+1+":"+(e+1)}}),a(t[e].startSec,t[e].endSec)},f=function(e){var a=(e=e.split("-").join("+-")).split("+"),n=parseInt(a[0]);if(n!=a[0])return[!1,!1];if(n<=0||n>t.length)return console.error("Fragment "+n+" is out of range. Max="+t.length),[!1,!1];if(1==a.length)return[n,0];if(2==a.length){var r=a[1].split("s").join("").trim();return function(e){return"string"==typeof e&&!isNaN(e)&&!isNaN(parseFloat(e))}(r)?[n,parseFloat(r)]:(console.error(r+" is not a number"),[!1,!1])}return[!1,!1]},g=function(e){var t=e.split(":");if(2!=t.length)return!1;var a=t[0],n=t[1],r=f(a),i=Object(s.a)(r,2),l=i[0],c=i[1];if(!l)return!1;var o=f(n),u=Object(s.a)(o,2),d=u[0],m=u[1];return!!d&&[l,c,d,m]};return r.a.createElement("div",{className:"fragments"},r.a.createElement("div",null,"Fragments:"),r.a.createElement("div",{className:"scrolling"},t.map((function(e,t){e.startSec,e.endSec;return r.a.createElement("div",{className:"button ".concat(i.indexOf(t)>=0?"active":""),key:t,onClick:m.bind(null,t)},"#",t+1)}))),r.a.createElement("div",null,"Play fragments: ",r.a.createElement("input",{onChange:d,value:o})),g(o)?r.a.createElement("button",{onClick:function(){var e=g(o),n=Object(s.a)(e,4),r=n[0],i=n[1],l=n[2],c=n[3];a(t[r-1].startSec+i,t[l-1].endSec+c)}},"Play"):r.a.createElement("div",null,r.a.createElement("div",{className:"error"},"Invalid format!"),r.a.createElement("div",null,"Allowed formats: ",r.a.createElement("br",null),r.a.createElement("span",null,"1:1")," - Play fragment 1 ",r.a.createElement("br",null),r.a.createElement("span",null,"1:3")," - Play fragments 1, 2 and 3",r.a.createElement("br",null),r.a.createElement("span",null,"1-10s:2+15.2s")," - Play fragments 1 and 2; start 10 seconds earlier and finish 15.2 seconds later")))};a(41);var v=function(e){var t,a,i=e.title,l=e.image,s=e.width,c=e.areas,o=Object(n.useRef)(null);l&&l.width&&l.height?(t=1*s/l.width,a=parseInt(l.height*t)):(t=-1,a=-1);var u=function(){if(l&&l.width&&l.height&&o&&o.current){var e=o.current.getContext("2d");e.drawImage(l,0,0,l.width,l.height,0,0,s,a),c.forEach((function(a,n){e.fillStyle="rgba(255, 255, 0, 0.5)",e.fillRect(a.x*t,a.y*t,a.width*t,a.height*t)}))}};return Object(n.useEffect)((function(){u()})),l&&l.width&&l.height?(u(),r.a.createElement("div",{className:"imageAreas"},r.a.createElement("div",{className:"canvas"},r.a.createElement("div",{className:"title"},i),r.a.createElement("canvas",{width:s,height:a,ref:o})))):r.a.createElement("div",{className:"imageAreas"},r.a.createElement("div",{className:"canvas"},r.a.createElement("div",{className:"title"},i),r.a.createElement("div",null,"Error loading")))};a(42);var E=function(e){var t=e.images,a=e.pages,i=(e.fragmentPages,e.fragmentPageAreas),l=Object(n.useState)(1),c=Object(s.a)(l,2),o=c[0],u=c[1],d=Object(n.useState)(""),m=Object(s.a)(d,2),f=m[0],g=m[1],h=Object(n.useRef)(),p=JSON.stringify(i);if(f!=p&&h.current){g(p);for(var E=-1,y=0;y<a.length;y++){var b=a[y].id;if(i[b]&&i[b].length){E=y;break}}if(E>=0){for(var S=null,w=h.current.firstChild,N=0,O=0;O<w.childNodes.length;O++)if("page"==w.childNodes[O].className){if(N==E){S=w.childNodes[O];break}N++}S.scrollIntoView()}}var j={height:parseInt(500*o*297/210+20)+"px"};return r.a.createElement("div",null,r.a.createElement("div",null,"Zoom: ",r.a.createElement("span",{onClick:function(){u(o+.1)}},"+")," ",r.a.createElement("span",{onClick:function(){u(o-.1)}},"-")," ",r.a.createElement("span",{onClick:function(){u(1)}},"reset")),r.a.createElement("div",{className:"fragmentPages",ref:h,style:j},r.a.createElement("div",{className:"scrollArea"},a.map((function(e,a){return r.a.createElement("div",{className:"page",key:"fragmentpage"+a},r.a.createElement(v,{title:"Page #".concat(a+1),image:t[a],width:parseInt(500*o),areas:i[e.id]||[]}))})))))};a(43);var y=function(e){var t=e.fragments,a=e.images,i=e.pages,l=e.videoUrl,c=Object(n.useState)([]),o=Object(s.a)(c,2),u=o[0],d=o[1],m=Object(n.useState)(0),f=Object(s.a)(m,2),g=(f[0],f[1]),v=Object(n.useRef)(null);return r.a.createElement("div",{className:"player"},r.a.createElement("div",null,r.a.createElement(E,{images:a,pages:i||[],fragmentPages:function(){var e=[];return u.forEach((function(a){e=e.concat(t[a].pages)})),e}(),fragmentPageAreas:function(){var e={};return u.forEach((function(a){for(var n in t[a].pageAreas){var r=t[a].pageAreas[n];e[n]?e[n]=e[n].concat(r):e[n]=r}})),e}()})),r.a.createElement("div",null,r.a.createElement(h,{videoUrl:l,onProgressUpdate:function(e){g(parseFloat(e.toFixed(1)));var a=[];t.forEach((function(t,n){t.startSec<=e&&t.endSec>=e&&a.push(n)})),d(a)},ref:v}),r.a.createElement(p,{fragments:t,playInterval:function(e,t){v.current.playFragment(e,t)},activeFragments:u})))};window.fragmentsPlayer={initialized:!1,interval:!1},window.fragmentsPlayer.interval=setInterval((function(){if(document.getElementById("playerData")){if(window.fragmentsPlayer.initialized)return clearInterval(window.fragmentsPlayer.interval),void window.location.reload();window.fragmentsPlayer.initialized=!0;var e=JSON.parse(document.getElementById("playerData").innerHTML),t=document.getElementById("playerData").parentNode;document.getElementById("playerData").remove(),function(e,t){var a=0,n=[];e.innerText="Loading, please wait...";var i=function(i){(a+=1)==t.pages.length&&l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,Object.assign({images:n},Object(g.b)(t)))),e)};t.pages.forEach((function(e,t){var a=new Image;a.src=e.url,a.onload=function(){i()},a.onerror=function(e){console.error(e),i()},n.push(a)}))}(t,e)}}),100)}},[[44,1,2]]]);
//# sourceMappingURL=main.0e2e646f.chunk.js.map