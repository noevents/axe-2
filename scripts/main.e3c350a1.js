webpackJsonp([0],{0:function(){},1:function(){},"3qiv":function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var e=c("PExH"),f=c.n(e),g=c("GYcQ"),h=c.n(g),i=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();var j=function(){function a(){d(this,a),this.zeroX=36,this.zeroY=176,this.points=[],this.arcs=[],this.axe=document.getElementById("axe"),this.initBtn=document.getElementById("init-btn"),this.firstDigit=document.getElementById("first-digit"),this.secondDigit=document.getElementById("second-digit"),this.inputContainer=document.getElementById("input-container"),this.result=document.getElementById("result"),this.aVal=null,this.bVal=null}return i(a,[{key:"randomInteger",value:function(a,b){var c=a-0.5+Math.random()*(b-a+1);return c=Math.round(c),c}},{key:"raiseError",value:function(a){this[a].style.backgroundColor="orange"}},{key:"resetStyle",value:function(a){this[a].style.backgroundColor=""}},{key:"createInput",value:function(a,b,c){var d=this,f=document.createElement("input");return f.className="value-input",f.style.top=b+"px",f.style.left=a+"px",f.addEventListener("input",function(a){a.preventDefault(),d.inputChecker(a.target.value,f,c)}),f}},{key:"renderArc",value:function(a,b,c){var d=new h.a.Point(a.x+(b.x-a.x)/2,c),e=b.subtract(d),f=new h.a.Point(39>e.angle?b.x-2:b.x,b.y-5),g=new h.a.Path.RegularPolygon(f,3,5);g.rotate(e.angle+5),g.fillColor="red";var i=new h.a.Path.Arc(a,d,b);return i.strokeColor="red",this.arcs.push(i),this.arcs.push(g),d}},{key:"inputChecker",value:function(a,b,c){var d="firstDigit"===c?this.aVal:this.bVal;if(+a!==d)this.raiseError(c),b.style.color="red";else{this.resetStyle(c);var e=document.createElement("span");e.className=b.className,e.style.top=b.style.top,e.style.left=b.style.left,e.innerHTML=a,b.parentNode.replaceChild(e,b),this.nextState(c)}}},{key:"initialState",value:function(){for(this.result=document.getElementById("result"),this.result.innerHTML="?",this.firstDigit.innerHTML=this.aVal,this.secondDigit.innerHTML=this.bVal;this.inputContainer.firstChild;)this.inputContainer.removeChild(this.inputContainer.firstChild);this.arcs.map(function(a){return a.remove()});var a=this.renderArc(this.points[0],this.points[this.aVal],80);this.inputContainer.appendChild(this.createInput(a.x-10,0,"firstDigit"))}},{key:"nextState",value:function(a){var b=this;if("firstDigit"===a){var c=this.renderArc(this.points[this.aVal],this.points[this.bVal+this.aVal],120);this.inputContainer.appendChild(this.createInput(c.x-10,40,"secondDigit"))}else{var d=document.createElement("input");d.className=this.result.className,d.addEventListener("input",function(a){if(a.preventDefault(),d.style.color="",!(2>a.target.value.length))if(+a.target.value===+b.aVal+b.bVal){var c=document.createElement("span");c.className=b.result.className,c.id=b.result.id,c.innerHTML=a.target.value,d.parentNode.replaceChild(c,d)}else d.style.color="red"}),this.result.parentNode.replaceChild(d,this.result)}}},{key:"init",value:function(){var a=this;this.initBtn.addEventListener("click",function(){a.aVal=a.randomInteger(6,9),a.bVal=a.randomInteger(11,14)-a.aVal,a.initialState()}),h.a.setup(this.axe);var b=new h.a.Raster("axe-sprite");b.position=h.a.view.center,this.points.push(new h.a.Point(this.zeroX,this.zeroY));for(var c=0;20>c;c++)this.points.push(new h.a.Point(this.zeroX+=39,this.zeroY));h.a.view.draw()}}]),a}(),k=new j;k.init()},PExH:function(){}},["3qiv"]);