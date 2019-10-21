/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-pages/iron-pages'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-tabs/paper-tabs'
import { html } from 'lit-element'
import PropertyEditorChartJSMultiSeriesAbstract from './property-editor-chartjs-multi-series-abstract'

export default class PropertyEditorChartJSMixed extends PropertyEditorChartJSMultiSeriesAbstract {
  static get is() {
    return 'property-editor-chartjs-mixed'
  }

  static get styles() {
    return PropertyEditorChartJSMultiSeriesAbstract.styles
  }

  constructor() {
    super()

    this.value = {
      options: {
        legend: {},
        scales: {
          xAxes: [
            {
              ticks: {}
            }
          ],
          yAxes: [
            {
              ticks: {}
            }
          ]
        }
      },
      data: {
        datasets: []
      }
    }
  }

  get xAxes0() {
    return this.scales.xAxes[0]
  }

  set xAxes0(xAxes0) {
    this.scales.xAxes[0] = xAxes0
  }

  get yAxes0() {
    return this.scales.yAxes[0]
  }

  set yAxes0(yAxes0) {
    this.scales.yAxes[0] = yAxes0
  }

  get yAxes1() {
    return this.scales.yAxes[1]
  }

  set yAxes1(yAxes1) {
    this.scales.yAxes[1] = yAxes1
  }

  get multiAxis() {
    return this.value.options.multiAxis
  }

  set multiAxis(multiAxis) {
    this.value.options.multiAxis = multiAxis
  }

  editorTemplate(props) {
    return html`
      <input type="checkbox" value-key="multiAxis" .checked=${this.multiAxis} />
      <label> <i18n-msg msgid="label.multi-axis">Multi Axis</i18n-msg> </label>

      <legend><i18n-msg msgid="label.series">Series</i18n-msg></legend>

      <div fullwidth>${this.multiSeriesTabTemplate()}</div>

      <legend><i18n-msg msgid="label.x-axes">X Axes</i18n-msg></legend>

      <label> <i18n-msg msgid="label.data-key">Data Key</i18n-msg> </label>
      <input type="text" value-key="labelDataKey" .value=${this.labelDataKey} />

      <label> <i18n-msg msgid="label.title">Title</i18n-msg> </label>
      <input type="text" value-key="xAxes0.axisTitle" .value=${this.xAxes0.axisTitle || ''} />

      ${this._hasBarSeries(this.value)
        ? html`
            <label><i18n-msg msgid="label.bar-spacing">Bar Spacing</i18n-msg></label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value-key="xAxes0.barSpacing"
              .value=${this.xAxes0.barSpacing || NaN}
            />
            <label><i18n-msg msgid="label.tick-spacing">Tick Spacing</i18n-msg></label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value-key="xAxes0.categorySpacing"
              .value=${this.xAxes0.categorySpacing || NaN}
            />
          `
        : html``}

      <input type="checkbox" value-key="value.options.xGridLine" .checked=${props.value.options.xGridLine} />
      <label> <i18n-msg msgid="label.grid-line">Grid Line</i18n-msg> </label>

      <input type="checkbox" value-key="xAxes0.ticks.display" .checked=${this.xAxes0.ticks.display} />
      <label> <i18n-msg msgid="label.display-tick">Display Tick</i18n-msg> </label>

      <legend><i18n-msg msgid="label.y-axes">Y Axes</i18n-msg></legend>

      <label> <i18n-msg msgid="label.title">Title</i18n-msg> </label>
      <input type="text" value-key="yAxes0.axisTitle" .value=${this.yAxes0.axisTitle || ''} />

      <input type="checkbox" value-key="yAxes0.ticks.autoMin" .checked=${this.yAxes0.ticks.autoMin} />
      <label> <i18n-msg msgid="label.axis-min-auto">Min Auto</i18n-msg> </label>

      <input type="checkbox" value-key="yAxes0.ticks.autoMax" .checked=${this.yAxes0.ticks.autoMax} />
      <label> <i18n-msg msgid="label.axis-max-auto">Max Auto</i18n-msg> </label>

      ${!this.yAxes0.ticks.autoMin
        ? html`
            <label> <i18n-msg msgid="label.axis-min">Min</i18n-msg> </label>
            <input type="number" value-key="yAxes0.ticks.min" .value=${this.yAxes0.ticks.min} />
          `
        : html``}
      ${!this.yAxes0.ticks.autoMax
        ? html`
            <label> <i18n-msg msgid="label.axis-max">Max</i18n-msg> </label>
            <input type="number" value-key="yAxes0.ticks.max" .value=${this.yAxes0.ticks.max} />
          `
        : html``}

      <label> <i18n-msg msgid="label.axis-step-size">StepSize</i18n-msg> </label>
      <input type="number" value-key="yAxes0.ticks.stepSize" .value=${this.yAxes0.ticks.stepSize} />

      <input type="checkbox" value-key="value.options.yGridLine" .checked=${props.value.options.yGridLine} />
      <label> <i18n-msg msgid="label.grid-line">Grid Line</i18n-msg> </label>

      <input type="checkbox" value-key="yAxes0.ticks.display" .checked=${this.yAxes0.ticks.display} />
      <label> <i18n-msg msgid="label.display-tick">Display Tick</i18n-msg> </label>

      ${props.value.options.multiAxis
        ? html`
            <legend><i18n-msg msgid="label.y-2nd-axes">Y 2nd Axes</i18n-msg></legend>

            <label> <i18n-msg msgid="label.title">Title</i18n-msg> </label>
            <input type="text" value-key="yAxes1.axisTitle" .value=${this.yAxes1.axisTitle || ''} />

            <input type="checkbox" value-key="yAxes1.ticks.autoMin" .checked=${this.yAxes1.ticks.autoMin} />
            <label> <i18n-msg msgid="label.axis-min-auto">Min Auto</i18n-msg> </label>

            <input type="checkbox" value-key="yAxes1.ticks.autoMax" .checked=${this.yAxes1.ticks.autoMax} />
            <label> <i18n-msg msgid="label.axis-max-auto">Max Auto</i18n-msg> </label>

            ${!this.yAxes1.ticks.autoMin
              ? html`
                  <label> <i18n-msg msgid="label.axis-min">Min</i18n-msg> </label>
                  <input type="number" value-key="yAxes1.ticks.min" .value=${this.yAxes1.ticks.min} />
                `
              : html``}
            ${!this.yAxes1.ticks.autoMax
              ? html`
                  <label> <i18n-msg msgid="label.axis-max">Max</i18n-msg> </label>
                  <input type="number" value-key="yAxes1.ticks.max" .value=${this.yAxes1.ticks.max} />
                `
              : html``}

            <label> <i18n-msg msgid="label.axis-step-size">StepSize</i18n-msg> </label>
            <input type="number" value-key="yAxes1.ticks.stepSize" .value=${this.yAxes1.ticks.stepSize} />

            <input
              type="checkbox"
              value-key="value.options.y2ndGridLine"
              .checked=${props.value.options.y2ndGridLine}
            />
            <label> <i18n-msg msgid="label.grid-line">Grid Line</i18n-msg> </label>

            <input type="checkbox" value-key="yAxes1.ticks.display" .checked=${this.yAxes1.ticks.display} />
            <label> <i18n-msg msgid="label.display-tick">Display Tick</i18n-msg> </label>
          `
        : html``}
    `
  }

  _hasBarSeries(chart) {
    var hasBarSeries = false
    hasBarSeries = chart.data.datasets.some(s => s.type == 'bar')

    return hasBarSeries
  }
}

customElements.define(PropertyEditorChartJSMixed.is, PropertyEditorChartJSMixed)
