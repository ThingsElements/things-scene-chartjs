function noop() {}

export default function monkeyPatch(Chart) {

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

  Chart.Controller.prototype.reset = function(width, height, context) {
    var changed = (this.chart.width !== width || this.chart.height !== height)

    this.chart.width = width;
    this.chart.height = height;
    this.chart.ctx = context;

    changed && this.updateLayout();
  }

}
