(()=>{var t={43:()=>{if("Microsoft Internet Explorer"===navigator.appName||navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/rv:11/)){var t=document.createElement("div");t.innerHTML='Používáte zastaralý Internet Explorer, takže vám části tohoto webu nemusí fungovat. Navíc to <a target="_blank" style="color:white;" rel="noopener noreferrer" href="https://www.zive.cz/clanky/microsoft-internet-explorer-neni-prohlizec-prestante-ho-tak-pouzivat/sc-3-a-197149/default.aspx">není bezpečné</a>, zvažte přechod na <a target="_blank" style="color:white;" rel="noopener noreferrer" href="https://www.mozilla.org/cs/firefox/new/">jiný prohlížeč</a>.',t.style.cssText="text-align:center;position:absolute;width:100%;height:auto;opacity:1;z-index:100;background-color:#d52834;top:37px;padding-top:4px;padding-bottom:3px;color:white;",document.body.appendChild(t)}},750:(t,e,r)=>{"use strict";r(43);var n={ucast:[.3936,.5487,.6315,.6952,.7617],part_4:[.0592,.091,.122,.1596,.2174],part_8:[.0134,.0275,.0434,.0727,.16],part_12:[.027,.0468,.0689,.1085,.2126],part_13:[.1526,.215,.2727,.3345,.4071],part_17:[.0839,.125,.1641,.21,.2692],part_18:[.0216,.0389,.0585,.0866,.1357],part_20:[.1806,.2439,.2976,.3552,.4319],part_5:[.0265,.045,.0648,.0947,.152],part_3:[.0061,.0148,.0253,.0427,.0811],part_10:[.0014,.0048,.0111,.0233,.0476],part_1:[.0039,.01,.0168,.0276,.0517],part_22:[.0029,.0093,.0194,.0388,.0824],part_21:[.0027,.0077,.0152,.029,.0656],part_2:[.0019,.0059,.0118,.0222,.05],part_14:[.0011,.0037,.0081,.0172,.0345],part_15:[.0012,.0039,.0083,.0161,.0303],part_9:[.0015,.0051,.0114,.0231,.0513],part_16:[.0017,.0061,.0152,.0367,.0811],part_7:[.0014,.0052,.0132,.0308,.0588],part_19:[.0013,.0047,.0098,.0179,.0303],part_11:[9e-4,.003,.0063,.0127,.02],part_6:[8e-4,.0023,.004,.0079,.015]},a=["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],o="#f2f0f7",i="#a50f15",c={part_20:["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#756bb1","#54278f"],part_13:["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"],part_17:["#edf8e9","#c7e9c0","#a1d99b","#74c476","#31a354","#006d2c"],part_4:["#ffffd4","#fee391","#fec44f","#fe9929","#d95f0e","#993404"],part_12:["#feebe2","#fcc5c0","#fa9fb5","#f768a1","#c51b8a","#7a0177"],part_18:["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#de2d26","#a50f15"],part_5:["#f1eef6","#d4b9da","#c994c7","#df65b0","#dd1c77","#980043"]};function s(t,e){return t in c?c[t][e]:a[e]}function l(t){return"ucast"===t?function(t){return["case",["has","zapsani"],["interpolate",["linear"],["/",["get","hlasy_platne"],["get","zapsani"]],0,o,n[t][0],s(t,0),n[t][1],s(t,1),n[t][2],s(t,2),n[t][3],s(t,3),n[t][4],s(t,4),1,i],"white"]}(t):function(t){return["case",["has",t],["interpolate",["linear"],["/",["get",t],["get","hlasy_platne"]],0,o,n[t][0],s(t,0),n[t][1],s(t,1),n[t][2],s(t,2),n[t][3],s(t,3),n[t][4],s(t,4),1,i],"white"]}(t)}var u={part_1:{naz:"Strana zelených",zkr:"Zelení"},part_2:{naz:"Švýcarská demokracie",zkr:"Švýcar. demokr."},part_3:{naz:"VOLNÝ blok",zkr:"Volný blok"},part_4:{naz:"Svoboda a př. demokracie (SPD)",zkr:"SPD"},part_5:{naz:"Česká str.sociálně demokrat.",zkr:"ČSSD"},part_6:{naz:"Volte Pr.Blok www.cibulka.net",zkr:"PB"},part_7:{naz:"ALIANCE NÁRODNÍCH SIL",zkr:"ANS"},part_8:{naz:"Trikolora Svobodní Soukromníci",zkr:"TSS"},part_9:{naz:"Aliance pro budoucnost",zkr:"APB"},part_10:{naz:"Hnutí Prameny",zkr:"PRAMENY"},part_11:{naz:"Levice",zkr:"Levice"},part_12:{naz:"PŘÍSAHA Roberta Šlachty",zkr:"PŘÍSAHA"},part_13:{naz:"SPOLU – ODS, KDU-ČSL, TOP 09",zkr:"SPOLU"},part_14:{naz:"SENIOŘI 21",zkr:"SENIOŘI"},part_15:{naz:"Urza.cz: Nechceme vaše hlasy",zkr:"Nevolte Urza.cz"},part_16:{naz:"Koruna Česká (monarch.strana)",zkr:"Monarchiste.cz"},part_17:{naz:"PIRÁTI a STAROSTOVÉ",zkr:"Piráti+STAN"},part_18:{naz:"Komunistická str.Čech a Moravy",zkr:"KSČM"},part_19:{naz:"Moravské zemské hnutí",zkr:"MZH"},part_20:{naz:"ANO 2011",zkr:"ANO"},part_21:{naz:"Otevřeme ČR normálnímu životu",zkr:"OtČe"},part_22:{naz:"Moravané",zkr:"Moravané"}};function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function p(t,e,r,n,a,o,i){try{var c=t[o](i),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function v(t,e,r){return e&&d(t.prototype,e),r&&d(t,r),t}var y="ucast",m=function(){function t(e,r,n,a,o){f(this,t),this.containerId=e,this.container=document.getElementById(e),this.centerLng=r,this.centerLat=n,this.zoom=a,this.selectedParty=o,this.map=null,this.geocoder=null,this.selector=null,this.legend=null}return v(t,[{key:"createMap",value:function(){var t=this.container.querySelectorAll(".".concat("map"));if(0===t.length)throw new Error("Element with class ".concat("map"," missing from map container with id ").concat(this.containerId));if(t.length>1)throw new Error("Only one map element should be present in map container ".concat(this.containerId));this.map=new maplibregl.Map({container:t[0],style:"https://data.irozhlas.cz/mapa-domu/map_styl/style.json",zoom:this.zoom,center:[this.centerLng,this.centerLat],maxZoom:15,attributionControl:!1}),""===this.centerLng&&this.map.fitBounds([[12,48.55],[18.85,51.06]]),this.map.scrollZoom.disable(),this.map.addControl(new maplibregl.NavigationControl),this.map.addControl(new w,"top-left"),this.addEvents(),this.createSelector(),this.createLegend()}},{key:"getContainer",value:function(t){var e=this.container.getElementsByClassName(t);if(0===e.length)throw new Error("Element with class ".concat(t," missing from map container with id").concat(this.containerId));if(e.length>1)throw new Error("Only one ".concat(t," element should be present in map container ").concat(this.containerId));return e[0]}},{key:"addInitialLayer",value:function(){this.map.addLayer({id:"data",type:"fill",source:{type:"vector",tiles:["".concat("https://data.irozhlas.cz","/okrsky21/tiles/{z}/{x}/{y}.pbf")]},"source-layer":"data",paint:{"fill-color":l(this.selectedParty),"fill-opacity":.8,"fill-outline-color":"hsla(0, 0%, 52%, 0.4)"}})}},{key:"changeLayer",value:function(t){var e=l(t);this.map.setPaintProperty("data","fill-color",e)}},{key:"addEvents",value:function(){var t=this;this.map.on("load",(function(){return t.addInitialLayer()})),this.map.on("mousemove",(function(e){var r=t.map.queryRenderedFeatures(e.point,{layers:["data"]}),n=0===r.length?null:r[0];t.legend.update(n,t.selector.selected)}))}},{key:"createLegend",value:function(){var t=this.getContainer("legend");this.legend=new g(t,this.map),this.legend.create()}},{key:"createSelector",value:function(){var t=this.getContainer("selector"),e=this.getContainer("scale");this.selector=new b(t,this,this.selectedParty,e),this.selector.create()}}]),t}(),g=function(){function t(e,r){f(this,t),this.container=e,this.map=r,this.legend=null,this.baseText="Vyberte okrsek v mapě.<br>&nbsp;",this.text=this.baseText,this.lastRegionData=null}return v(t,[{key:"create",value:function(){this.legend=document.createElement("div"),this.legend.innerHTML=this.text,this.container.appendChild(this.legend)}},{key:"setText",value:function(t){this.text=t,this.legend.innerHTML=this.text}},{key:"update",value:function(t,e){null===t&&(t=this.lastRegionData),null===t?this.setText(this.baseText):e===y?(this.setText(this.getAttendanceText(t)),this.lastRegionData=t):(this.setText(this.getPartyText(t,e)),this.lastRegionData=t)}},{key:"getAttendanceText",value:function(t){var e=Math.round(t.properties.hlasy_platne/t.properties.zapsani*1e3)/10||0,r="<b>Okrsek č. ".concat(t.properties.Cislo," | ").concat(t.properties.nazob,"</b><br><b>").concat(e," %</b> (").concat(t.properties.hlasy_platne," z ").concat(t.properties.zapsani," zapsaných voličů)");return void 0===t.properties.hlasy_platne&&(r="Okrsek zatím není sečtený.<br>&nbsp"),r}},{key:"getPartyText",value:function(t,e){var r=t.properties[e]||0,n=Math.round(r/t.properties.hlasy_platne*1e3)/10,a="<b>Okrsek č. ".concat(t.properties.Cislo," | ").concat(t.properties.nazob,"</b><br><b>").concat(n," %</b> (").concat(r," z ").concat(t.properties.hlasy_platne," platných hlasů)");return void 0===t.properties.hlasy_platne&&(a="Okrsek zatím není sečtený.<br>&nbsp"),a}}]),t}(),b=function(){function t(e,r,n,a){f(this,t),this.container=e,this.map=r,this.selected=n,this.scale=a}return v(t,[{key:"createOption",value:function(t){var e=document.createElement("option");return e.innerHTML=function(t){return"ucast"===t?"Účast":u[t].naz}(t),e.value=t,e}},{key:"makeScale",value:function(){var t=document.createElement("div");t.setAttribute("class","scale-holder");var e=n[this.selected],r=c[this.selected]||a;return e.forEach((function(e,n){t.innerHTML+='<div><span style="background-color: '.concat(r[n],'"></span>').concat(Math.round(1e3*e)/10," %</div>")})),t}},{key:"create",value:function(){var t=document.createElement("select"),e=this.createOption(y);for(var r in t.appendChild(e),u){var n=this.createOption(r);t.appendChild(n)}this.container.appendChild(t),this.addEvents(t),t.value=this.selected,this.scale.appendChild(this.makeScale(this.selected))}},{key:"addEvents",value:function(t){var e=this;t.addEventListener("change",(function(t){var r=t.currentTarget.selectedOptions[0].value;e.map.changeLayer(r),e.selected=r,e.scale.innerHTML="",e.scale.appendChild(e.makeScale(e.selected)),e.map.legend.update(null,e.selected)}))}}]),t}(),w=function(){function t(){f(this,t)}var e,r;return v(t,[{key:"onAdd",value:function(t){var e=this;this._map=t,this._container=document.createElement("div"),this._container.className="mapboxgl-ctrl-group mapboxgl-ctrl gcode_form";var r=document.createElement("input");r.setAttribute("type","text"),r.setAttribute("placeholder","Vyhledejte obec či adresu v mapě"),r.setAttribute("size",r.getAttribute("placeholder").length+1),this._container.append(r);var n=document.createElement("button");return n.textContent="Hledat",n.addEventListener("click",(function(){return e.findAndMove(r.value,e._map)})),this._container.append(n),this._container}},{key:"onRemove",value:function(){this._container.parentNode.removeChild(this._container),this._map=void 0}},{key:"findAndMove",value:(e=regeneratorRuntime.mark((function t(e,r){var n,a,o,i,c,s,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=[[12,48.55],[18.85,51.06]],this._map=r,t.next=4,fetch("https://api.mapy.cz/geocode?query=".concat(e));case 4:return a=t.sent,t.next=7,a.text();case 7:o=t.sent,i=(new window.DOMParser).parseFromString(o,"text/xml"),0===(c=i.firstChild.children[0]).children.length&&r.fitBounds(n),void 0===c.children[0].attributes.x?r.fitBounds(n):(s=parseFloat(c.children[0].attributes.x.value),l=parseFloat(c.children[0].attributes.y.value),s<12||s>19||l<48||l>52?r.fitBounds(n):this._map.flyTo({center:[s,l],zoom:12}));case 12:case"end":return t.stop()}}),t,this)})),r=function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function i(t){p(o,n,a,i,c,"next",t)}function c(t){p(o,n,a,i,c,"throw",t)}i(void 0)}))},function(t,e){return r.apply(this,arguments)})}]),t}(),k=function(){function t(){f(this,t),this.defaultLng=15.3350758,this.defaultLat=49.7417517,this.defaultZoom=7,this.defaultParty=y}return v(t,[{key:"embedAllMaps",value:function(){var t,e=function(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return h(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){c=!0,o=t},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw o}}}}(document.getElementsByClassName("container"));try{for(e.s();!(t=e.n()).done;){var r=t.value,n=r.id,a=r.dataset.centerLng,o=r.dataset.centerLat,i=r.dataset.zoom,c=r.dataset.party?r.dataset.party:this.defaultParty;new m(n,a,o,i,c).createMap()}}catch(t){e.e(t)}finally{e.f()}}}]),t}();window.onload=function(){(new k).embedAllMaps()}},666:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var a=e&&e.prototype instanceof y?e:y,o=Object.create(a.prototype),i=new O(n||[]);return o._invoke=function(t,e,r){var n=h;return function(a,o){if(n===f)throw new Error("Generator is already running");if(n===d){if("throw"===a)throw o;return T()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var c=L(i,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var s=u(t,e,r);if("normal"===s.type){if(n=r.done?d:p,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=d,r.method="throw",r.arg=s.arg)}}}(t,r,i),o}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var h="suspendedStart",p="suspendedYield",f="executing",d="completed",v={};function y(){}function m(){}function g(){}var b={};s(b,o,(function(){return this}));var w=Object.getPrototypeOf,k=w&&w(w(A([])));k&&k!==r&&n.call(k,o)&&(b=k);var _=g.prototype=y.prototype=Object.create(b);function z(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function r(a,o,i,c){var s=u(t[a],t,o);if("throw"!==s.type){var l=s.arg,h=l.value;return h&&"object"==typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(h).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}var a;this._invoke=function(t,n){function o(){return new e((function(e,a){r(t,n,e,a)}))}return a=a?a.then(o,o):o()}}function L(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var a=u(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,v;var o=a.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function A(t){if(t){var r=t[o];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){for(;++a<t.length;)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:T}}function T(){return{value:e,done:!0}}return m.prototype=g,s(_,"constructor",g),s(g,"constructor",m),m.displayName=s(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,c,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},z(x.prototype),s(x.prototype,i,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new x(l(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},z(_),s(_,c,"Generator"),s(_,o,(function(){return this})),s(_,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=A,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return c.type="throw",c.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(s&&l){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;S(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:A(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}}},e={};function r(n){var a=e[n];if(void 0!==a)return a.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}r(666),r(750)})();