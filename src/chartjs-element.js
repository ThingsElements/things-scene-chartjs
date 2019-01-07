/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html } from '@polymer/lit-element'
import { Chart } from 'chart.js'
import ChartDataBinderPlugin from './plugins/chart-data-binder'
import ChartValueDisplayPlugin from './plugins/chart-value-display'
import ChartSeriesHighlightPlugin from './plugins/chart-series-highlight'

Chart.plugins.register(ChartDataBinderPlugin)
Chart.plugins.register(ChartValueDisplayPlugin)
Chart.plugins.register(ChartSeriesHighlightPlugin)

export default class ChartJS extends LitElement {
  static get is() {
    return 'things-chartjs'
  }

  static get properties() {
    return {
      width: Number,
      height: Number,
      options: Object,
      data: Array
    }
  }

  get initialized() {
    return this._initialized
  }

  set initialized(initialized) {
    this._initialized = initialized
  }

  firstUpdated() {
    this.initChart()
  }

  render() {
    return html`
      <canvas id="chart"></canvas>
    `
  }

  updated(changedProperties) {
    if (changedProperties.has('width') || changedProperties.has('height')) {
      this.updateChartSize()
    }

    if (changedProperties.has('options')) {
      this.updateChartConfig()
    }

    if (changedProperties.has('data')) {
      this.chart.data.rawData = this.data
      this.chart.update(0)
    }
  }

  initChart() {
    const { data, options, type } = this.options
    options.maintainAspectRatio = false

    this.canvas = this.shadowRoot.querySelector('#chart')
    this.chart = new Chart(this.canvas, {
      type,
      data,
      options,
      plugins: {
        'chart-data-binder': true,
        'chart-value-display': true
      }
    })

    this.updateChartSize()

    this.initialized = true
  }

  updateChartSize() {
    const width = Math.floor(this.width)
    const height = Math.floor(this.height)

    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`

    const _ = () => {
      if (this.canvas.offsetWidth == 0 || this.canvas.offsetHeight == 0) {
        requestAnimationFrame(_)
      } else {
        /* 
        주의 : chart.resize() 내에서 pixel ratio를 감안해서, canvas 의 width, height를 설정하기때문에,
        별도 처리가 필요하지 않다.
        */
        this.chart.resize()
      }
    }

    requestAnimationFrame(_)
  }

  updateChartConfig() {
    if (!this.chart) return

    const { data, options, type } = this.options
    options.maintainAspectRatio = false

    this.chart.type = type
    this.chart.data = data
    this.chart.options = options
    this.chart.data.rawData = this.data
    this.chart.update(0)
  }
}

customElements.define(ChartJS.is, ChartJS)
