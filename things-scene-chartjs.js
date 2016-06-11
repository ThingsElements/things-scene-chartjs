(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _scene = scene;
var Component = _scene.Component;

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartJSLine = undefined;

var _line = require('./line');

Object.defineProperty(exports, 'ChartJSLine', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_line).default;
  }
});

var _monkeyPatch = require('./monkey-patch');

var _monkeyPatch2 = _interopRequireDefault(_monkeyPatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined') window.monkeyPatch = _monkeyPatch2.default;

if (typeof global !== 'undefined') {
  global.monkeyPatch = _monkeyPatch2.default;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./line":3,"./monkey-patch":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _scene = scene;
var Component = _scene.Component;
var Rect = _scene.Rect;

var ChartJSLine = function (_Rect) {
    _inherits(ChartJSLine, _Rect);

    function ChartJSLine() {
        _classCallCheck(this, ChartJSLine);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ChartJSLine).apply(this, arguments));
    }

    _createClass(ChartJSLine, [{
        key: "_draw",
        value: function _draw(context) {
            if (!this._chart) {

                this._chart = new Chart(context, {
                    type: 'bar',
                    data: {
                        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                        datasets: [{
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }

            var _model = this.model;
            var width = _model.width;
            var height = _model.height;
            var left = _model.left;
            var top = _model.top;


            context.translate(left, top);

            this._chart.reset(width, height, context);
            var ease = 1;
            this._chart.draw(ease, context);

            context.translate(-left, -top);
        }
    }, {
        key: "controls",
        get: function get() {}
    }]);

    return ChartJSLine;
}(Rect);

exports.default = ChartJSLine;


Component.register('chartjs-line', ChartJSLine);

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = monkeyPatch;
function noop() {}

function monkeyPatch(Chart) {

  Chart.Controller.prototype.update = noop;
  Chart.Controller.prototype.resize = noop;
  Chart.Controller.prototype.destroy = noop;

  Chart.helpers.retinaScale = noop;
  Chart.helpers.clear = noop;
  Chart.helpers.addResizeListener = noop;
  Chart.helpers.removeResizeListener = noop;

  // Chart.Controller.prototype.initialize = function initialize() {
  //   // Before init plugin notification
  //   Chart.pluginService.notifyPlugins('beforeInit', [this]);

  //   this.bindEvents();

  //   // Make sure controllers are built first so that each dataset is bound to an axis before the scales
  //   // are built
  //   this.ensureScalesHaveIDs();
  //   this.buildOrUpdateControllers();
  //   this.buildScales();
  //   this.buildSurroundingItems();
  //   // this.updateLayout();
  //   this.resetElements();
  //   this.initToolTip();
  //   // this.update();

  //   // After init plugin notification
  //   Chart.pluginService.notifyPlugins('afterInit', [this]);

  //   return this;
  // }

  var helpers = Chart.helpers;

  // Chart.Controller.prototype.draw = function(ease, context) {
  //   var easingDecimal = ease || 1;
  //   this.clear();

  //   Chart.pluginService.notifyPlugins('beforeDraw', [this, easingDecimal]);

  //   // Draw all the scales
  //   helpers.each(this.boxes, function(box) {
  //     box.draw(this.chartArea);
  //   }, this);
  //   if (this.scale) {
  //     this.scale.draw();
  //   }

  //   console.log('scale', this.scale)

  //   console.log(this.chartArea)

  //   // Clip out the chart area so that anything outside does not draw. This is necessary for zoom and pan to function
  //   // var context = this.chart.ctx;
  //   context.save();
  //   context.beginPath();
  //   context.rect(this.chartArea.left, this.chartArea.top, this.chartArea.right - this.chartArea.left, this.chartArea.bottom - this.chartArea.top);
  //   context.clip();

  //   // Draw each dataset via its respective controller (reversed to support proper line stacking)
  //   helpers.each(this.data.datasets, function(dataset, datasetIndex) {
  //     if (this.isDatasetVisible(datasetIndex)) {
  //       this.getDatasetMeta(datasetIndex).controller.draw(ease);
  //     }
  //   }, this, true);

  //   // Restore from the clipping operation
  //   context.restore();

  //   // Finally draw the tooltip
  //   this.tooltip.transition(easingDecimal).draw();

  //   Chart.pluginService.notifyPlugins('afterDraw', [this, easingDecimal]);
  // }

  Chart.Controller.prototype.reset = function (width, height, context) {
    var changed = this.chart.width !== width || this.chart.height !== height;

    this.chart.width = width;
    this.chart.height = height;
    this.chart.ctx = context;

    changed && this.updateLayout();
  };
}

},{}]},{},[1,2,3,4]);
