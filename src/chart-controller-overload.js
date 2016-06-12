import helpers from './chart-helpers-overload'

export default class ChartController extends Chart.Controller {
  constructor(instance) {
    super(instance)
  }

  resize() {}
  destroy() {}
  clear() {}

  draw(ease) {
    if(arguments.length > 1) {
      this.__ease__ = ease;
      this._component.invalidate()
      return;
    }

    super.draw(ease)
  }

  reset(width, height, context) {
    var changed = (this.chart.width !== width || this.chart.height !== height)

    this.chart.width = width;
    this.chart.height = height;
    this.chart.ctx = context;

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
}
