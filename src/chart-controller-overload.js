/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import Chart from 'chart.js'
import helpers from './chart-helpers-overload'

export default class ChartController extends Chart.Controller {
  constructor(item, config, instance) {
    super(item, config, instance)
  }

  acquireContext(item, config) {
    return item
  }

  resize() {}
  destroy() {
    delete this._component
    super.destroy()
  }
  clear() {}

  draw(ease) {
    if (arguments.length > 1) {
      this.__ease__ = ease
      this._component && this._component.invalidate()
      return
    }

    super.draw(ease)
  }

  reset(width, height, context) {
    // 특정 사이즈 이하가 될 경우 오류가 발생하는 문제를 회피하기 위함.
    if (width < 100 || height < 100) return

    var changed = this.chart.width !== width || this.chart.height !== height

    this.chart.width = width
    this.chart.height = height

    this.chart.ctx = context

    for (let i = 0; i < this.boxes.length; i++) {
      let box = this.boxes[i]
      box.ctx = context
    }

    changed && this.updateLayout()
  }
}

Chart.Controller = ChartController
