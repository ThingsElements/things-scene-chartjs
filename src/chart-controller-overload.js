import helpers from './chart-helpers-overload'

export default class ChartController extends Chart.Controller {
  constructor(item, config, instance) {
    super(item, config, instance)
  }

  acquireContext(item, config) {
    return item
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

    console.log('boxes', this.boxes);
    console.log('context', context);
    
    for (let box of this.boxes) {
      box.ctx = context;
    }

    changed && this.updateLayout();
  }
}

Chart.Controller = ChartController;
