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
      <canvas id="chart" style="width:${Math.floor(this.width)}px;height:${Math.floor(this.height)}px;"></canvas>
    `
  }

  updated(changedProperties) {
    if (!this.initialized) return

    if (changedProperties.has('width') || changedProperties.has('height')) {
      this.chart.resize()
    }

    if (changedProperties.has('options')) {
      this.updateChartConfig()
    }

    if (changedProperties.has('data')) {
      this.chart.data.rawData = this.data
      this.chart.update()
    }
  }

  initChart() {
    const { data, options, type } = this.options
    options.maintainAspectRatio = false

    const chartCanvas = this.shadowRoot.querySelector('#chart')
    this.chart = new Chart(chartCanvas, {
      type,
      data,
      options,
      plugins: {
        'chart-data-binder': true,
        'chart-value-display': true
      }
    })

    this.initialized = true
  }

  updateChart() {
    if (this.chart) {
      this.chart.update()
    }
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
