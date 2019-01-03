import { LitElement, html } from '@polymer/lit-element'
import { Chart } from 'chart.js'

export default class ChartJS extends LitElement {
  static get is() {
    return 'things-chartjs'
  }

  static get properties() {
    return {
      width: Number,
      height: Number,
      options: Object
    }
  }

  constructor() {
    super()
  }

  firstUpdated() {
    const { data, options, type } = this.options
    options.maintainAspectRatio = false

    const ctx = this.shadowRoot.querySelector('#chart').getContext('2d')
    this.chart = new Chart(ctx, {
      type,
      data,
      options
    })
  }

  render() {
    return html`
      <style>
        div {
          overflow: hidden;
        }
        canvas {
          width: 100%;
          height: 100%;
        }
      </style>
      <div style="width:${this.width}px;height:${this.height}px;"><canvas id="chart"></canvas></div>
    `
  }

  updated(changedProperties) {
    if (changedProperties.has('options')) {
      console.log(changedProperties.get('options'))
      // this.updateChartConfig()
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.update()
    }
  }

  updateChartConfig() {
    this.chart.type = type
    this.chart.data = data
    this.chart.options = options
    this.chart.update()
  }
}

customElements.define(ChartJS.is, ChartJS)
