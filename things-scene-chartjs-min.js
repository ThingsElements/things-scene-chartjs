!function e(t,r,a){function o(i,l){if(!r[i]){if(!t[i]){var s="function"==typeof require&&require;if(!l&&s)return s(i,!0);if(n)return n(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=r[i]={exports:{}};t[i][0].call(u.exports,function(e){var r=t[i][1][e];return o(r?r:e)},u,u.exports,e,t,r,a)}return r[i].exports}for(var n="function"==typeof require&&require,i=0;i<a.length;i++)o(a[i]);return o}({1:[function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(r,"__esModule",{value:!0});var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),s=function h(e,t,r){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,t);if(void 0===a){var o=Object.getPrototypeOf(e);return null===o?void 0:h(o,t,r)}if("value"in a)return a.value;var n=a.get;return void 0===n?void 0:n.call(r)},c=e("./chart-helpers-overload"),u=(a(c),function(e){function t(e){return o(this,t),n(this,Object.getPrototypeOf(t).call(this,e))}return i(t,e),l(t,[{key:"resize",value:function(){}},{key:"destroy",value:function(){}},{key:"clear",value:function(){}},{key:"bindEvents",value:function(){}},{key:"draw",value:function(e){return arguments.length>1?(this.__ease__=e,void this._component.invalidate()):void s(Object.getPrototypeOf(t.prototype),"draw",this).call(this,e)}},{key:"reset",value:function(e,t,r){var a=this.chart.width!==e||this.chart.height!==t;this.chart.width=e,this.chart.height=t,this.chart.ctx=r;var o=!0,n=!1,i=void 0;try{for(var l,s=this.boxes[Symbol.iterator]();!(o=(l=s.next()).done);o=!0){var c=l.value;c.ctx=r}}catch(u){n=!0,i=u}finally{try{!o&&s["return"]&&s["return"]()}finally{if(n)throw i}}a&&this.updateLayout()}}]),t}(Chart.Controller));r["default"]=u},{"./chart-helpers-overload":2}],2:[function(e,t,r){"use strict";function a(){}Object.defineProperty(r,"__esModule",{value:!0});var o=(Chart.helpers,Chart.Controller,Object.assign({},Chart.helpers));o.retinaScale=a,o.addResizeListener=a,o.removeResizeListener=a;var n=Chart.helpers.getRelativePosition;Chart.helpers.getRelativePosition=function(e,t){var r=e.chartJSWrapper;if(!r)return n(e,t);var a=e.chartJSWrapper.transcoordC2S(e.offsetX,e.offsetY);return{x:a.x-r.get("left"),y:a.y-r.get("top")}},r["default"]=o},{}],3:[function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(r,"__esModule",{value:!0});var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),s=e("./chart-helpers-overload"),c=a(s),u=e("./chart-controller-overload"),h=a(u),f=Chart.helpers,d=Chart.Controller,p=function(e){function t(e,r,a){o(this,t),t.backup();var i=n(this,Object.getPrototypeOf(t).call(this,e,r));return t.restore(),i._component=a,i}return i(t,e),l(t,null,[{key:"backup",value:function(){Chart.helpers=c["default"],Chart.Controller=h["default"]}},{key:"restore",value:function(){Chart.helpers=f,Chart.Controller=d}}]),t}(Chart);r["default"]=p},{"./chart-controller-overload":1,"./chart-helpers-overload":2}],4:[function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(r,"__esModule",{value:!0});var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},s=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),c=e("./chart-overload"),u=a(c),h=scene,f=h.Component,d=h.Rect;Chart.defaults.global.defaultFontSize=10;var p={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"select",label:"theme",name:"chart.options.theme",property:{options:["dark","light"]}},{type:"checkbox",label:"legend",name:"chart.options.legend.display",value:!0,property:"checkbox"},{type:"select",label:"position",name:"chart.options.legend.position",property:{options:["top","left","bottom","right"]}},{type:"number",label:"font-size",name:"chart.options.fontSize",property:"fontSize"},{type:"checkbox",label:"stacked",name:"chart.options.stacked",value:!1,property:"stacked"},{type:"checkbox",label:"multi-axis",name:"chart.options.multiAxis",value:!1,property:"multiAxis"},{type:"chart-series-editor"},{type:"checkbox",label:"x-grid-line",name:"chart.options.xGridLine",property:"x-grid-line"},{type:"checkbox",label:"y-grid-line",name:"chart.options.yGridLine",property:"y-grid-line"},{type:"editor-script",name:"data",property:"data"}]},y=function(e){function t(){return o(this,t),n(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),s(t,[{key:"_draw",value:function(){}},{key:"_post_draw",value:function(e){var t=this.bounds,r=t.left,a=t.top,o=t.width,n=t.height;if(e.beginPath(),e.rect(r,a,o,n),this.drawFill(e),this.drawStroke(e),e.closePath(),!this._chart){var i=this.model,l=i.chart,s=i.data;l&&(l.options&&this.convertOptions(l),this._chart=new u["default"](e,JSON.parse(JSON.stringify(l)),this)),s&&(this._chart.data.rawData=s)}var c=this.model,o=c.width,n=c.height,r=c.left,a=c.top;e.translate(r,a),this._draw_once?(this._chart.chart.ctx!=e&&this._chart.reset(o,n,e),this._chart.draw(this._chart.__ease__)):(this._chart.reset(o,n,e),this._chart.update(0),this._draw_once=!0),e.translate(-r,-a)}},{key:"convertOptions",value:function(e){this.setStacked(e.options),this.setMultiAxis(e),this.setFontSize(e.options),this.setTheme(e.options)}},{key:"setStacked",value:function(e){if(e){var t=e.stacked;if(e.scales||(e.scales={}),e.scales&&e.scales.xAxes){var r=!0,a=!1,o=void 0;try{for(var n,i=e.scales.xAxes[Symbol.iterator]();!(r=(n=i.next()).done);r=!0){var l=n.value;l.stacked=t}}catch(s){a=!0,o=s}finally{try{!r&&i["return"]&&i["return"]()}finally{if(a)throw o}}}if(e.scales&&e.scales.yAxes){var c=!0,u=!1,h=void 0;try{for(var f,d=e.scales.yAxes[Symbol.iterator]();!(c=(f=d.next()).done);c=!0){var p=f.value;p.stacked=t}}catch(s){u=!0,h=s}finally{try{!c&&d["return"]&&d["return"]()}finally{if(u)throw h}}}}}},{key:"setMultiAxis",value:function(e){if(e){var t=e.options;if(t){var r=t.multiAxis;if(t.scales||(t.scales={}),t.scales.yAxes){var a=e.data.datasets;if(r)1===t.scales.yAxes.length&&t.scales.yAxes.push({position:"right",id:"right"});else{if(a){var o=!0,n=!1,i=void 0;try{for(var l,s=a[Symbol.iterator]();!(o=(l=s.next()).done);o=!0){var c=l.value;"right"==c.yAxisID&&(c.yAxisID="left")}}catch(u){n=!0,i=u}finally{try{!o&&s["return"]&&s["return"]()}finally{if(n)throw i}}}t.scales.yAxes.length>1&&(t.scales.yAxes=[t.scales.yAxes[0]])}}}}}},{key:"setTheme",value:function(e){if(e){var t,r=e.theme,a="#000",o="#fff";switch(r){case"light":t=o;break;case"dark":default:t=a}t=tinycolor(t);{t.isDark()}if(e.legend||(e.legend={}),e.legend.labels||(e.legend.labels={}),e.legend.labels.fontColor=t.clone().setAlpha(.5).toString(),e.scales||(e.scales={}),e.scales&&e.scales.xAxes){var n=!0,i=!1,l=void 0;try{for(var s,c=e.scales.xAxes[Symbol.iterator]();!(n=(s=c.next()).done);n=!0){var u=s.value;u.gridLines||(u.gridLines={}),u.gridLines.zeroLineColor=t.clone().setAlpha(.5).toString(),u.gridLines.color=t.clone().setAlpha(.1).toString(),u.ticks||(u.ticks={}),u.ticks.fontColor=t.clone().setAlpha(.5).toString()}}catch(h){i=!0,l=h}finally{try{!n&&c["return"]&&c["return"]()}finally{if(i)throw l}}}if(e.scales&&e.scales.yAxes){var f=!0,d=!1,p=void 0;try{for(var y,v=e.scales.yAxes[Symbol.iterator]();!(f=(y=v.next()).done);f=!0){var g=y.value;g.gridLines||(g.gridLines={}),g.gridLines.zeroLineColor=t.clone().setAlpha(.5).toString(),g.gridLines.color=t.clone().setAlpha(.1).toString(),g.ticks||(g.ticks={}),g.ticks.fontColor=t.clone().setAlpha(.5).toString()}}catch(h){d=!0,p=h}finally{try{!f&&v["return"]&&v["return"]()}finally{if(d)throw p}}}}}},{key:"setFontSize",value:function(e){if(e){var t=e.fontSize;if(e.legend||(e.legend={}),e.legend.labels||(e.legend.labels={}),e.legend.labels.fontSize=t,e.scales||(e.scales={}),e.scales&&e.scales.xAxes){var r=!0,a=!1,o=void 0;try{for(var n,i=e.scales.xAxes[Symbol.iterator]();!(r=(n=i.next()).done);r=!0){var l=n.value;l.ticks||(l.ticks={}),l.ticks.fontSize=t}}catch(s){a=!0,o=s}finally{try{!r&&i["return"]&&i["return"]()}finally{if(a)throw o}}}if(e.scales&&e.scales.yAxes){var c=!0,u=!1,h=void 0;try{for(var f,d=e.scales.yAxes[Symbol.iterator]();!(c=(f=d.next()).done);c=!0){var p=f.value;p.ticks||(p.ticks={}),p.ticks.fontSize=t}}catch(s){u=!0,h=s}finally{try{!c&&d["return"]&&d["return"]()}finally{if(u)throw h}}}}}},{key:"onchange",value:function(e){if(e.hasOwnProperty("chart")){this._chart=null,this._draw_once=!1;var t=this.model.chart.data.datasets,r=this.model.chart.data.rawData.seriesData,a=[];if(t.length>r.length){for(var o=0;o<this.model.chart.data.rawData.labelData.length;o++)a.push(Math.floor(Math.random()*r[0][o]/2));r.push(a)}return void this.invalidate()}e.hasOwnProperty("data")&&(this.model.data=e.data,this._chart&&(this._chart.config.data.rawData=e.data||{},this._chart.update()));for(var n in e)if(e.hasOwnProperty(n)){var i=this.model,s=this,c=n.split("."),u=e[n];if("object"===("undefined"==typeof u?"undefined":l(u))&&(u=JSON.parse(JSON.stringify(u))),c.length>0){for(var h=!1,o=0;o<c.length;o++){var f=c[o];"chart"===f&&(h=!0),f=f.replace("#",""),o===c.length-1&&(i[f]=u,s[f]=u),i=i[f],s=s[f]||s["_"+f]}h&&(this._chart=null,this._draw_once=!1,this.invalidate())}}this._draw_once=!1,this.invalidate()}},{key:"onclick",value:function(e){e.chartJSWrapper=this,this._chart&&this._chart.eventHandler(e)}},{key:"ondragstart",value:function(){}},{key:"onmousemove",value:function(e){e.chartJSWrapper=this,this._chart&&this._chart.eventHandler(e)}},{key:"volatile",get:function(){return[]}},{key:"nature",get:function(){return p}},{key:"controls",get:function(){}}]),t}(d);r["default"]=y,f.register("chartjs",y)},{"./chart-overload":3}],5:[function(require,module,exports){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function updateSeriesDatas(e){if(e.data.rawData){{var t=e.data.rawData.seriesData;e.id}t&&0!==t.length||(t=[null]);for(var r in t)e.data.datasets[r]&&(e.data.datasets[r].data=t[r]||[])}}function updateLabelDatas(e){var t=e.data.rawData.labelData;e.config.data.labels=t||[]}function seriesHighlight(chartInstance,seriesData){chartInstance.data.datasets.forEach(function(dataset){var highlight=dataset.highlight;if(highlight){var highlightColor=highlight.color,highlightCondition=highlight.condition;seriesData.forEach(function(sdata,sIndex){sdata.forEach(function(data,i){if(eval(highlightCondition)){console.log(dataset.backgroundColor,highlightColor);var meta=chartInstance.getDatasetMeta(sIndex);meta.data[i]._model.backgroundColor=highlightColor,meta.data[i]._model.hoverBackgroundColor=highlightColor}})})}})}Object.defineProperty(exports,"__esModule",{value:!0});var _chartOverload=require("./chart-overload");Object.defineProperty(exports,"SceneChart",{enumerable:!0,get:function(){return _interopRequireDefault(_chartOverload)["default"]}});var _chartjsWrapper=require("./chartjs-wrapper");Object.defineProperty(exports,"ChartJSWrapper",{enumerable:!0,get:function(){return _interopRequireDefault(_chartjsWrapper)["default"]}}),Chart.plugins.register({beforeInit:function(){},beforeUpdate:function(e){if(e.data.rawData){{e.data.rawData.seriesData}updateLabelDatas(e),updateSeriesDatas(e)}},beforeRender:function(){},beforeDraw:function(e){if(e.data.rawData){var t=e.data.rawData.seriesData;seriesHighlight(e,t)}}})},{"./chart-overload":3,"./chartjs-wrapper":4}]},{},[5]);