!function e(t,r,a){function n(i,s){if(!r[i]){if(!t[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(o)return o(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=r[i]={exports:{}};t[i][0].call(u.exports,function(e){var r=t[i][1][e];return n(r?r:e)},u,u.exports,e,t,r,a)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<a.length;i++)n(a[i]);return n}({1:[function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(r,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),l=function h(e,t,r){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,t);if(void 0===a){var n=Object.getPrototypeOf(e);return null===n?void 0:h(n,t,r)}if("value"in a)return a.value;var o=a.get;return void 0===o?void 0:o.call(r)},c=e("./chart-helpers-overload"),u=(a(c),function(e){function t(e,r,a){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r,a))}return i(t,e),s(t,[{key:"acquireContext",value:function(e){return e}},{key:"resize",value:function(){}},{key:"destroy",value:function(){}},{key:"clear",value:function(){}},{key:"draw",value:function(e){return arguments.length>1?(this.__ease__=e,void this._component.invalidate()):void l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"draw",this).call(this,e)}},{key:"reset",value:function(e,t,r){var a=this.chart.width!==e||this.chart.height!==t;this.chart.width=e,this.chart.height=t,this.chart.ctx=r;var n=!0,o=!1,i=void 0;try{for(var s,l=this.boxes[Symbol.iterator]();!(n=(s=l.next()).done);n=!0){var c=s.value;c.ctx=r}}catch(u){o=!0,i=u}finally{try{!n&&l["return"]&&l["return"]()}finally{if(o)throw i}}a&&this.updateLayout()}}]),t}(Chart.Controller));r["default"]=u},{"./chart-helpers-overload":2}],2:[function(e,t,r){"use strict";function a(){}Object.defineProperty(r,"__esModule",{value:!0});var n=(Chart.helpers,Chart.Controller,Object.assign({},Chart.helpers));n.retinaScale=a,n.addResizeListener=a,n.removeResizeListener=a;var o=Chart.helpers.getRelativePosition;Chart.helpers.getRelativePosition=function(e,t){var r=e.chartJSWrapper;if(!r)return o(e,t);var a=e.chartJSWrapper.transcoordC2S(e.offsetX,e.offsetY);return{x:a.x-r.get("left"),y:a.y-r.get("top")}},r["default"]=n},{}],3:[function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(r,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),l=e("./chart-helpers-overload"),c=a(l),u=e("./chart-controller-overload"),h=a(u),f=Chart.helpers,d=Chart.Controller,p=function(e){function t(e,r,a){n(this,t),t.backup();var i=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));return t.restore(),i._component=a,i}return i(t,e),s(t,null,[{key:"backup",value:function(){Chart.helpers=c["default"],Chart.Controller=h["default"]}},{key:"restore",value:function(){Chart.helpers=f,Chart.Controller=d}}]),t}(Chart);r["default"]=p},{"./chart-controller-overload":1,"./chart-helpers-overload":2}],4:[function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(r,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),l=e("./chart-overload"),c=a(l),u=scene,h=u.Component,f=u.RectPath;Chart.defaults.global.defaultFontSize=10;var d={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"chartjs-properties",label:"",name:"chart"}]},p=function(e){function t(){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"_draw",value:function(e){var t=this.bounds,r=t.left,a=t.top,n=t.width,o=t.height;if(e.beginPath(),e.rect(r,a,n,o),this.drawFill(e),this.drawStroke(e),e.closePath(),!this._chart){var i=this.model,s=i.chart,l=i.data;s&&this.initChart(e)}var c=this.model,n=c.width,o=c.height,r=c.left,a=c.top;e.translate(r,a);var l=this.get("data");l&&(this._chart.data.rawData=this.convertObject(l)),this._draw_once?(this._chart.chart.ctx!=e&&this._chart.reset(n,o,e),this._chart.draw(this._chart.__ease__)):(this._chart.reset(n,o,e),this._chart.update(0),this._draw_once=!0),e.translate(-r,-a)}},{key:"initChart",value:function(e){var t=this.model.chart;t.options&&this.convertOptions(t),this._chart=new c["default"](e,JSON.parse(JSON.stringify(t)),this)}},{key:"destroyChart",value:function(){this._chart.destroy(),this._chart=null}},{key:"convertObject",value:function(e){if(!e)return null;if(!(e instanceof Array))return e instanceof Object?e:null;e[0].hasOwnProperty("__field1")&&(e=this.toObjectArrayValue(e));var t=this.model.chart.data.labelDataKey,r=[];for(var a in this.model.chart.data.datasets)r.push(this.model.chart.data.datasets[a].dataKey);var n=[],o=[],i={seriesData:n,labelData:o};for(var s in e){var l=e[s];o.push(l[t]);for(var c in r)n[c]||(n[c]=[]),n[c].push(l[r[c]])}return i}},{key:"toObjectArrayValue",value:function(e){if(!e||0===e.length)return null;var t={},r=[];for(var a in e[0])t[a]=e[0][a];for(var n=1;n<e.length;n++){var o={},i=e[n];for(var s in t){var l=t[s],c=i[s];o[l]=c}r.push(o)}return r}},{key:"convertOptions",value:function(e){this.setStacked(e.options),this.setMultiAxis(e),this.setFontSize(e.options),this.setTheme(e.options)}},{key:"setStacked",value:function(e){if(e){var t=e.stacked;if(e.scales||(e.scales={}),e.scales&&e.scales.xAxes){var r=!0,a=!1,n=void 0;try{for(var o,i=e.scales.xAxes[Symbol.iterator]();!(r=(o=i.next()).done);r=!0){var s=o.value;s.stacked=t}}catch(l){a=!0,n=l}finally{try{!r&&i["return"]&&i["return"]()}finally{if(a)throw n}}}if(e.scales&&e.scales.yAxes){var c=!0,u=!1,h=void 0;try{for(var f,d=e.scales.yAxes[Symbol.iterator]();!(c=(f=d.next()).done);c=!0){var p=f.value;p.stacked=t}}catch(l){u=!0,h=l}finally{try{!c&&d["return"]&&d["return"]()}finally{if(u)throw h}}}}}},{key:"setMultiAxis",value:function(e){if(e){var t=e.options;if(t){var r=t.multiAxis;if(t.scales||(t.scales={}),t.scales.yAxes){var a=e.data.datasets;if(r)1===t.scales.yAxes.length&&t.scales.yAxes.push({position:"right",id:"right"});else{if(a){var n=!0,o=!1,i=void 0;try{for(var s,l=a[Symbol.iterator]();!(n=(s=l.next()).done);n=!0){var c=s.value;"right"==c.yAxisID&&(c.yAxisID="left")}}catch(u){o=!0,i=u}finally{try{!n&&l["return"]&&l["return"]()}finally{if(o)throw i}}}t.scales.yAxes.length>1&&(t.scales.yAxes=[t.scales.yAxes[0]])}}}}}},{key:"setTheme",value:function(e){if(e){var t,r=e.theme,a="#000",n="#fff";switch(r){case"light":t=n;break;case"dark":default:t=a}t=tinycolor(t);{t.isDark()}if(e.legend||(e.legend={}),e.legend.labels||(e.legend.labels={}),e.legend.labels.fontColor=t.clone().setAlpha(.5).toString(),e.scales||(e.scales={}),e.scales&&e.scales.xAxes){var o=!0,i=!1,s=void 0;try{for(var l,c=e.scales.xAxes[Symbol.iterator]();!(o=(l=c.next()).done);o=!0){var u=l.value;u.gridLines||(u.gridLines={}),u.gridLines.display=e.xGridLine,u.gridLines.zeroLineColor=t.clone().setAlpha(.5).toString(),u.gridLines.color=t.clone().setAlpha(.1).toString(),u.ticks||(u.ticks={}),u.ticks.fontColor=t.clone().setAlpha(.5).toString()}}catch(h){i=!0,s=h}finally{try{!o&&c["return"]&&c["return"]()}finally{if(i)throw s}}}if(e.scales&&e.scales.yAxes){var f=!0,d=!1,p=void 0;try{for(var v,y=e.scales.yAxes[Symbol.iterator]();!(f=(v=y.next()).done);f=!0){var g=v.value;g.gridLines||(g.gridLines={}),g.gridLines.display=e.yGridLine,g.gridLines.zeroLineColor=t.clone().setAlpha(.5).toString(),g.gridLines.color=t.clone().setAlpha(.1).toString(),g.ticks||(g.ticks={}),g.ticks.fontColor=t.clone().setAlpha(.5).toString()}}catch(h){d=!0,p=h}finally{try{!f&&y["return"]&&y["return"]()}finally{if(d)throw p}}}}}},{key:"setFontSize",value:function(e){if(e){var t=e.fontSize;if(e.legend||(e.legend={}),e.legend.labels||(e.legend.labels={}),e.legend.labels.fontSize=t,e.scales||(e.scales={}),e.scales&&e.scales.xAxes){var r=!0,a=!1,n=void 0;try{for(var o,i=e.scales.xAxes[Symbol.iterator]();!(r=(o=i.next()).done);r=!0){var s=o.value;s.ticks||(s.ticks={}),s.ticks.fontSize=t}}catch(l){a=!0,n=l}finally{try{!r&&i["return"]&&i["return"]()}finally{if(a)throw n}}}if(e.scales&&e.scales.yAxes){var c=!0,u=!1,h=void 0;try{for(var f,d=e.scales.yAxes[Symbol.iterator]();!(c=(f=d.next()).done);c=!0){var p=f.value;p.ticks||(p.ticks={}),p.ticks.fontSize=t}}catch(l){u=!0,h=l}finally{try{!c&&d["return"]&&d["return"]()}finally{if(u)throw h}}}}}},{key:"onchange",value:function(e){var t=!1;e.hasOwnProperty("chart")&&(t=!0,this.model.chart=JSON.parse(JSON.stringify(e.chart))),e.hasOwnProperty("data")&&this._chart&&(this._chart.config.data.rawData=e.data||{},this._chart.update()),t&&this.destroyChart(),this._draw_once=!1,this.invalidate()}},{key:"onclick",value:function(e){e.chartJSWrapper=this,this._chart&&this._chart.eventHandler(e)}},{key:"ondragstart",value:function(){}},{key:"onmousemove",value:function(e){e.chartJSWrapper=this,this._chart&&this._chart.eventHandler(e)}},{key:"nature",get:function(){return d}}]),t}(f(h));r["default"]=p,h.register("chartjs",p)},{"./chart-overload":3}],5:[function(require,module,exports){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function updateSeriesDatas(e){if(e.data.rawData){{var t=e.data.rawData.seriesData;e.id}t&&0!==t.length||(t=[null]);for(var r in t)e.data.datasets[r]&&(e.data.datasets[r].data=t[r]||[])}}function updateLabelDatas(e){var t=e.data.rawData.labelData;e.config.data.labels=t||[]}function seriesHighlight(chartInstance,seriesData){chartInstance.data.datasets.forEach(function(dataset){var highlight=dataset.highlight;if(highlight){var highlightColor=highlight.color,highlightCondition=highlight.condition;seriesData.forEach(function(sdata,sIndex){sdata.forEach(function(data,i){if(eval(highlightCondition)){var meta=chartInstance.getDatasetMeta(sIndex);meta.data[i]._model.backgroundColor=highlightColor,meta.data[i]._model.hoverBackgroundColor=highlightColor}})})}})}Object.defineProperty(exports,"__esModule",{value:!0});var _chartOverload=require("./chart-overload");Object.defineProperty(exports,"SceneChart",{enumerable:!0,get:function(){return _interopRequireDefault(_chartOverload)["default"]}});var _chartjsWrapper=require("./chartjs-wrapper");Object.defineProperty(exports,"ChartJSWrapper",{enumerable:!0,get:function(){return _interopRequireDefault(_chartjsWrapper)["default"]}}),Chart.plugins.register({beforeInit:function(){},beforeUpdate:function(e){if(e.data.rawData){{e.data.rawData.seriesData}updateLabelDatas(e),updateSeriesDatas(e)}},beforeRender:function(){},beforeDraw:function(e){if(e.data.rawData){var t=e.data.rawData.seriesData;seriesHighlight(e,t)}}})},{"./chart-overload":3,"./chartjs-wrapper":4}]},{},[5]);