import Chart from '../bower_components/Chart.js/src/chart'
import helpers from './chart-helpers-overload'

/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
export default class SceneChart extends Chart {
  constructor(context, config, component) {
    super(context, config)

    this._component = component
  }

  acquireContext(item, config) {
    return item
  }

  resize() {}
  destroy() {
    delete this._component
    super.destroy()
  }
  // clear() {}

  draw(ease) {
    if(arguments.length > 1) {
      this.__ease__ = ease;
      this._component && this._component.invalidate()
      return;
    }

    super.draw(ease)
  }

  reset(width, height, context) {
    var changed = (this.chart.width !== width || this.chart.height !== height)

    this.chart.width = width;
    this.chart.height = height;

    this.chart.ctx = context;

    for(let i = 0;i < this.boxes.length;i++) {
      let box = this.boxes[i];
      box.ctx = context;
    }

    changed && this.updateLayout();
  }
}
