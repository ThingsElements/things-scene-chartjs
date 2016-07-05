(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _chartHelpersOverload = require('./chart-helpers-overload');

var _chartHelpersOverload2 = _interopRequireDefault(_chartHelpersOverload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartController = function (_Chart$Controller) {
  _inherits(ChartController, _Chart$Controller);

  function ChartController(instance) {
    _classCallCheck(this, ChartController);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ChartController).call(this, instance));
    // this.loadData();
  }

  _createClass(ChartController, [{
    key: 'resize',
    value: function resize() {}
  }, {
    key: 'destroy',
    value: function destroy() {}
  }, {
    key: 'clear',
    value: function clear() {}
  }, {
    key: 'bindEvents',
    value: function bindEvents() {}
  }, {
    key: 'draw',
    value: function draw(ease) {
      if (arguments.length > 1) {
        this.__ease__ = ease;
        this._component.invalidate();
        return;
      }

      _get(Object.getPrototypeOf(ChartController.prototype), 'draw', this).call(this, ease);
    }
  }, {
    key: 'reset',
    value: function reset(width, height, context) {
      var changed = this.chart.width !== width || this.chart.height !== height;

      this.chart.width = width;
      this.chart.height = height;

      this.chart.ctx = context;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.boxes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var box = _step.value;

          box.ctx = context;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      changed && this.updateLayout();
    }

    // render(duration, lazy) {
    //   Chart.pluginService.notifyPlugins('beforeRender', [this]);

    //   var animationOptions = this.options.animation;
    //   if (animationOptions && ((typeof duration !== 'undefined' && duration !== 0) || (typeof duration === 'undefined' && animationOptions.duration !== 0))) {
    //     var animation = new Chart.Animation();
    //     animation.numSteps = (duration || animationOptions.duration) / 16.66; //60 fps
    //     animation.easing = animationOptions.easing;

    //     // render function
    //     animation.render = function(chartInstance, animationObject) {
    //       var easingFunction = helpers.easingEffects[animationObject.easing];
    //       var stepDecimal = animationObject.currentStep / animationObject.numSteps;
    //       var easeDecimal = easingFunction(stepDecimal);

    //       chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
    //     };

    //     // user events
    //     animation.onAnimationProgress = animationOptions.onProgress;
    //     animation.onAnimationComplete = animationOptions.onComplete;

    //     Chart.animationService.addAnimation(this, animation, duration, lazy);
    //   } else {
    //     this.draw();
    //     if (animationOptions && animationOptions.onComplete && animationOptions.onComplete.call) {
    //       animationOptions.onComplete.call(this);
    //     }
    //   }
    //   return this;
    // }

    // update(animationDuration, lazy) {
    //   Chart.pluginService.notifyPlugins('beforeUpdate', [this]);

    //   // In case the entire data object changed
    //   this.tooltip._data = this.data;

    //   // Make sure dataset controllers are updated and new controllers are reset
    //   var newControllers = this.buildOrUpdateControllers();

    //   // Make sure all dataset controllers have correct meta data counts
    //   helpers.each(this.data.datasets, function(dataset, datasetIndex) {
    //     this.getDatasetMeta(datasetIndex).controller.buildOrUpdateElements();
    //   }, this);

    //   Chart.layoutService.update(this, this.chart.width, this.chart.height);

    //   // Apply changes to the dataets that require the scales to have been calculated i.e BorderColor chages
    //   Chart.pluginService.notifyPlugins('afterScaleUpdate', [this]);

    //   // Can only reset the new controllers after the scales have been updated
    //   helpers.each(newControllers, function(controller) {
    //     controller.reset();
    //   });

    //   // This will loop through any data and do the appropriate element update for the type
    //   helpers.each(this.data.datasets, function(dataset, datasetIndex) {
    //     this.getDatasetMeta(datasetIndex).controller.update();
    //   }, this);

    //   // Do this before render so that any plugins that need final scale updates can use it
    //   Chart.pluginService.notifyPlugins('afterUpdate', [this]);

    //   this.render(animationDuration, lazy);
    // }

  }]);

  return ChartController;
}(Chart.Controller);

exports.default = ChartController;

},{"./chart-helpers-overload":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function noop() {}

var helpers_backup = Chart.helpers;
var controller_backup = Chart.Controller;

var helpers = Object.assign({}, Chart.helpers);
helpers.retinaScale = noop;
helpers.addResizeListener = noop;
helpers.removeResizeListener = noop;

var originalGetRelativePosition = Chart.helpers.getRelativePosition;

Chart.helpers.getRelativePosition = function (e, chart) {
  var wrapper = e.chartJSWrapper;

  if (!wrapper) return originalGetRelativePosition(e, chart);

  var point = e.chartJSWrapper.transcoordC2S(e.offsetX, e.offsetY);

  return {
    x: point.x - wrapper.get('left'),
    y: point.y - wrapper.get('top')
  };
};

exports.default = helpers;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chartHelpersOverload = require('./chart-helpers-overload');

var _chartHelpersOverload2 = _interopRequireDefault(_chartHelpersOverload);

var _chartControllerOverload = require('./chart-controller-overload');

var _chartControllerOverload2 = _interopRequireDefault(_chartControllerOverload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var helpers_backup = Chart.helpers;
var controller_backup = Chart.Controller;

var SceneChart = function (_Chart) {
  _inherits(SceneChart, _Chart);

  function SceneChart(context, config, component) {
    _classCallCheck(this, SceneChart);

    SceneChart.backup();

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SceneChart).call(this, context, config));

    SceneChart.restore();

    _this._component = component;
    return _this;
  }

  _createClass(SceneChart, null, [{
    key: 'backup',
    value: function backup() {
      Chart.helpers = _chartHelpersOverload2.default;
      Chart.Controller = _chartControllerOverload2.default;
    }
  }, {
    key: 'restore',
    value: function restore() {
      Chart.helpers = helpers_backup;
      Chart.Controller = controller_backup;
    }
  }]);

  return SceneChart;
}(Chart);

exports.default = SceneChart;

},{"./chart-controller-overload":1,"./chart-helpers-overload":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chartOverload = require('./chart-overload');

var _chartOverload2 = _interopRequireDefault(_chartOverload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _scene = scene;
var Component = _scene.Component;
var Rect = _scene.Rect;

var ChartJSWrapper = function (_Rect) {
  _inherits(ChartJSWrapper, _Rect);

  function ChartJSWrapper() {
    _classCallCheck(this, ChartJSWrapper);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ChartJSWrapper).apply(this, arguments));
  }

  _createClass(ChartJSWrapper, [{
    key: '_draw',
    value: function _draw(context) {

      if (!this._chart) {
        var chart = this.model.chart;


        if (chart) this._chart = new _chartOverload2.default(context, JSON.parse(JSON.stringify(chart)), this);else return;
      }

      var _model = this.model;
      var width = _model.width;
      var height = _model.height;
      var left = _model.left;
      var top = _model.top;


      var self = this;

      context.translate(left, top);

      if (!this._draw_once) {
        this._chart.reset(width, height, context);
        this._chart.update(0);
        this._draw_once = true;
      } else {
        if (this._chart.chart.ctx != context) {
          this._chart.reset(width, height, context);
        }

        this._chart.draw(this._chart.__ease__);
      }

      context.translate(-left, -top);
    }
  }, {
    key: 'onchange',
    value: function onchange(after) {

      if (after.hasOwnProperty('chart')) {
        this._chart = null;
        this._draw_once = false;

        var datasets = this.model.chart.data.datasets;
        var seriesData = this.model.chart.data.rawData.seriesData;

        var data = [];

        if (datasets.length > seriesData.length) {
          for (var i = 0; i < this.model.chart.data.rawData.labelData.length; i++) {
            data.push(Math.floor(Math.random() * seriesData[0][i] / 2));
          }

          seriesData.push(data);
        }

        this.invalidate();
        return;
      }

      if (after.width || after.height) {
        this._draw_once = false;
        this.invalidate();
      }

      if (after.hasOwnProperty('data')) {
        this._chart.config.data.rawData = after.data || {};
        this._chart.update();
      }

      for (var key in after) {
        if (!after.hasOwnProperty(key)) {
          continue;
        }

        var lastObj = this.model;
        var lastChartObj = this;
        var keySplit = key.split('.');
        var value = after[key];

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value = JSON.parse(JSON.stringify(value));
        }

        if (keySplit.length > 0) {
          var isChartChanged = false;
          for (var i = 0; i < keySplit.length; i++) {
            var k = keySplit[i];

            if (k === 'chart') isChartChanged = true;

            k = k.replace('#', '');

            if (i === keySplit.length - 1) {
              lastObj[k] = value;
              lastChartObj[k] = value;
            }

            lastObj = lastObj[k];
            lastChartObj = lastChartObj[k] || lastChartObj["_" + k];
          }

          if (isChartChanged) {
            this._draw_once = false;
            this.invalidate();
          }
        }
      }
    }
  }, {
    key: 'onclick',
    value: function onclick(e) {
      e.chartJSWrapper = this;
      if (this._chart) this._chart.eventHandler(e);
    }
  }, {
    key: 'ondragstart',
    value: function ondragstart(e) {}
  }, {
    key: 'onmousemove',
    value: function onmousemove(e) {
      e.chartJSWrapper = this;
      if (this._chart) this._chart.eventHandler(e);
    }
  }, {
    key: 'controls',
    get: function get() {}
  }]);

  return ChartJSWrapper;
}(Rect);

exports.default = ChartJSWrapper;


Component.register('chartjs', ChartJSWrapper);

},{"./chart-overload":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chartOverload = require('./chart-overload');

Object.defineProperty(exports, 'SceneChart', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_chartOverload).default;
  }
});

var _chartjsWrapper = require('./chartjs-wrapper');

Object.defineProperty(exports, 'ChartJSWrapper', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_chartjsWrapper).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function updateSeriesDatas(chartInstance) {
//   let seriesData = chartInstance.data.rawData.seriesData;
//   let chartId = chartInstance.id;
//
//   if(!seriesData || seriesData.length === 0)
//     seriesData = [null];
//
//   let seriesOptions = chartInstance.seriesOptions || [];
//
//   chartInstance.data.datasets = [];
//
//   for(let key in seriesData) {
//     var opt = seriesOptions
//     if(seriesOptions.length > 0)
//       opt = seriesOptions[key % seriesOptions.length]
//
//     var dataset = Object.assign({}, opt);
//     opt.data = seriesData[key] || [];
//
//     chartInstance.data.datasets.push(opt);
//   }
// }

function updateSeriesDatas(chartInstance) {
  if (!chartInstance.data.rawData) {
    return;
  }

  var seriesData = chartInstance.data.rawData.seriesData;
  var chartId = chartInstance.id;

  if (!seriesData || seriesData.length === 0) seriesData = [null];

  for (var key in seriesData) {
    if (chartInstance.data.datasets[key]) chartInstance.data.datasets[key].data = seriesData[key] || [];
  }
}

function updateLabelDatas(chartInstance) {
  var labelData = chartInstance.data.rawData.labelData;
  chartInstance.config.data.labels = labelData || [];
}

Chart.plugins.register({
  beforeInit: function beforeInit(chartInstance) {

    // chartInstance.chartSeries = [];
    //
    // for(let dataset of chartInstance.data.datasets) {
    //   chartInstance.chartSeries.push(dataset);
    // }
  },
  beforeUpdate: function beforeUpdate(chartInstance) {
    if (!chartInstance.data.rawData) {
      return;
    }

    var seriesData = chartInstance.data.rawData.seriesData;
    updateLabelDatas(chartInstance);
    updateSeriesDatas(chartInstance);
  },
  beforeRender: function beforeRender(chartInstance) {}
});

},{"./chart-overload":3,"./chartjs-wrapper":4}]},{},[5]);
