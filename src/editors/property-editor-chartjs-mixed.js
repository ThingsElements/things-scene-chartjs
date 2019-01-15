/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { html } from '@polymer/lit-element'

import PropertyEditorChartJSAbstract from './property-editor-chartjs-abstract'

import '@polymer/iron-icon/iron-icon'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-tabs/paper-tabs'
import '@polymer/paper-icon-button/paper-icon-button'

export default class PropertyEditorChartJSMixed extends PropertyEditorChartJSAbstract {
  static get is() {
    return 'property-editor-chartjs-mixed'
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
      <input type="checkbox" value-key="stacked" ?checked=${this.stacked} />
      <label> <things-i18n-msg msgid="label.stacked">Stacked</things-i18n-msg> </label>

      <input type="checkbox" value-key="multiAxis" ?checked=${this.multiAxis} />
      <label> <things-i18n-msg msgid="label.multi-axis">Multi Axis</things-i18n-msg> </label>

      <legend><things-i18n-msg msgid="label.series">Series</things-i18n-msg></legend>

      <div fullwidth>
        <div class="tab-header">
          <paper-tabs
            class="hide-scroll-arrow"
            @iron-select="${e => (this.currentSeriesIndex = e.target.selected)}"
            .selected=${this.currentSeriesIndex}
            no-bar
            noink
            scrollable
          >
            ${
              this.datasets.map(
                (dataset, index) => html`
                  <paper-tab data-series="${index + 1}" noink
                    >${index + 1}
                    ${
                      !this.datasets || (this.datasets.length != 1 && this.currentSeriesIndex == index)
                        ? html`
                            <paper-icon-button icon="close" @tap="${e => this.onTapRemoveCurrentTab(e)}">
                            </paper-icon-button>
                          `
                        : html``
                    }
                  </paper-tab>
                `
              )
            }
          </paper-tabs>
          <paper-icon-button icon="add" @tap="${e => this.onTapAddTab(e)}"></paper-icon-button>
        </div>

        <div class="tab-content">
          <label> <things-i18n-msg msgid="label.data-key">Data Key</things-i18n-msg> </label>
          <input type="text" value-key="dataKey" value=${this.dataKey} />

          ${
            this.value.type == 'bar'
              ? html`
                  <label> <things-i18n-msg msgid="label.type">type</things-i18n-msg> </label>
                  <select class="select-content" value-key="series.type" value=${this.series.type}>
                    <option value="bar" selected>bar</option>
                    <option value="line">line</option>
                  </select>
                `
              : html``
          }

          <label> <things-i18n-msg msgid="label.label">label</things-i18n-msg> </label>
          <input type="text" value-key="series.label" value=${this.series.label} />

          ${
            this.series.type == 'line'
              ? html`
                  <label> <things-i18n-msg msgid="label.line-tension">line tension</things-i18n-msg> </label>
                  <select class="select-content" value-key="series.lineTension" value=${this.series.lineTension}>
                    <option value="0.4">smooth</option>
                    <option value="0">angled</option>
                  </select>
                `
              : html``
          }
          ${
            this.series.type == 'line'
              ? html`
                  <label> <things-i18n-msg msgid="label.border-color">border color</things-i18n-msg> </label>
                  <things-editor-color
                    value-key="series.borderColor"
                    .value=${this.series.borderColor}
                  ></things-editor-color>
                  <label> <things-i18n-msg msgid="label.border-width">border width</things-i18n-msg> </label>
                  <input type="number" value-key="series.borderWidth" value=${this.series.borderWidth} />
                `
              : html``
          }

          <label> <things-i18n-msg msgid="label.background-color">background color</things-i18n-msg> </label>
          <things-editor-color
            value-key="series.backgroundColor"
            .value=${this.series.backgroundColor}
          ></things-editor-color>

          ${
            this.series.type == 'line'
              ? html`
                  <label> <things-i18n-msg msgid="label.point-shape">point shape</things-i18n-msg> </label>
                  <select class="select-content" value-key="series.pointStyle" value=${this.series.pointStyle}>
                    <option value="circle">circle</option>
                    <option value="triangle">triangle</option>
                    <option value="rect">rect</option>
                    <option value="rectRot">diamond</option>
                    <option value="cross">cross</option>
                    <option value="crossRot">X</option>
                    <option value="star">star</option>
                    <option value="line">Line</option>
                    <option value="dash">Dash</option>
                  </select>

                  <label> <things-i18n-msg msgid="label.point-size">point size</things-i18n-msg> </label>
                  <input type="number" value-key="series.pointRadius" value=${this.series.pointRadius} />

                  <label> <things-i18n-msg msgid="label.point-bg-color">point BG color</things-i18n-msg> </label>
                  <things-editor-color
                    value-key="series.pointBackgroundColor"
                    .value=${this.series.pointBackgroundColor}
                  ></things-editor-color>
                `
              : html``
          }
          ${
            this.series.type == 'line'
              ? html`
                  <input type="checkbox" value-key="series.fill" ?checked=${this.series.fill} />
                  <label> <things-i18n-msg msgid="label.fill">fill</things-i18n-msg> </label>
                `
              : html``
          }

          <label> <things-i18n-msg msgid="label.target-axis">target axis</things-i18n-msg> </label>
          <select class="select-content" value-key="series.yAxisID" value=${this.series.yAxisID}>
            <option value="left">left</option>
            <option value="right">right</option>
          </select>

          <label> <things-i18n-msg msgid="label.value-prefix">Value Prefix</things-i18n-msg> </label>
          <input type="text" value-key="series.valuePrefix" value=${this.series.valuePrefix || ''} />

          <label> <things-i18n-msg msgid="label.value-suffix">Value suffix</things-i18n-msg> </label>
          <input type="text" value-key="series.valueSuffix" value=${this.series.valueSuffix || ''} />

          <input type="checkbox" value-key="series.displayValue" ?checked=${this.series.displayValue} />
          <label> <things-i18n-msg msgid="label.value-display">Value Display</things-i18n-msg> </label>

          ${
            this.series.displayValue
              ? html`
                  <label> <things-i18n-msg msgid="label.font-color">Font Color</things-i18n-msg> </label>
                  <things-editor-color
                    value-key="series.defaultFontColor"
                    .value=${this.series.defaultFontColor || '#000'}
                  ></things-editor-color>
                  <label> <things-i18n-msg msgid="label.font-size">Font Size</things-i18n-msg> </label>
                  <input type="number" value-key="series.defaultFontSize" value=${this.series.defaultFontSize || 10} />
                  <label> <things-i18n-msg msgid="label.position">Position</things-i18n-msg> </label>
                  <select value-key="series.dataLabelAnchor" value=${this.series.dataLabelAnchor}>
                    <option value="start">Start</option>
                    <option value="center" selected>Center</option>
                    <option value="end">End</option>
                  </select>
                `
              : html``
          }
        </div>
      </div>

      <legend><things-i18n-msg msgid="label.x-axes">X Axes</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.data-key">Data Key</things-i18n-msg> </label>
      <input type="text" value-key="labelDataKey" value=${this.labelDataKey} />

      <label> <things-i18n-msg msgid="label.title">Title</things-i18n-msg> </label>
      <input type="text" value-key="xAxes0.axisTitle" value=${this.xAxes0.axisTitle} />

      <label> <things-i18n-msg msgid="label.thickness">Thickness</things-i18n-msg> </label>
      <input type="number" value-key="xAxes0.barThickness" value=${this.xAxes0.barThickness} />

      <input type="checkbox" value-key="value.options.xGridLine" ?checked=${props.value.options.xGridLine} />
      <label> <things-i18n-msg msgid="label.grid-line">Grid Line</things-i18n-msg> </label>

      <input type="checkbox" value-key="xAxes0.ticks.display" ?checked=${this.xAxes0.ticks.display} />
      <label> <things-i18n-msg msgid="label.display-tick">Display Tick</things-i18n-msg> </label>

      <legend><things-i18n-msg msgid="label.y-axes">Y Axes</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.title">Title</things-i18n-msg> </label>
      <input type="text" value-key="yAxes0.axisTitle" value=${this.yAxes0.axisTitle} />

      <input type="checkbox" value-key="yAxes0.ticks.autoMin" ?checked=${this.yAxes0.ticks.autoMin} />
      <label> <things-i18n-msg msgid="label.axis-min-auto">Min Auto</things-i18n-msg> </label>

      <input type="checkbox" value-key="yAxes0.ticks.autoMax" ?checked=${this.yAxes0.ticks.autoMax} />
      <label> <things-i18n-msg msgid="label.axis-max-auto">Max Auto</things-i18n-msg> </label>

      ${
        !this.yAxes0.ticks.autoMin
          ? html`
              <label> <things-i18n-msg msgid="label.axis-min">Min</things-i18n-msg> </label>
              <input type="number" value-key="yAxes0.ticks.min" value=${this.yAxes0.ticks.min} />
            `
          : html``
      }
      ${
        !this.yAxes0.ticks.autoMax
          ? html`
              <label> <things-i18n-msg msgid="label.axis-max">Max</things-i18n-msg> </label>
              <input type="number" value-key="yAxes0.ticks.max" value=${this.yAxes0.ticks.max} />
            `
          : html``
      }

      <label> <things-i18n-msg msgid="label.axis-step-size">StepSize</things-i18n-msg> </label>
      <input type="number" value-key="yAxes0.ticks.stepSize" value=${this.yAxes0.ticks.stepSize} />

      <input type="checkbox" value-key="value.options.yGridLine" ?checked=${props.value.options.yGridLine} />
      <label> <things-i18n-msg msgid="label.grid-line">Grid Line</things-i18n-msg> </label>

      <input type="checkbox" value-key="yAxes0.ticks.display" ?checked=${this.yAxes0.ticks.display} />
      <label> <things-i18n-msg msgid="label.display-tick">Display Tick</things-i18n-msg> </label>

      ${
        props.value.options.multiAxis
          ? html`
              <legend><things-i18n-msg msgid="label.y-2nd-axes">Y 2nd Axes</things-i18n-msg></legend>

              <label> <things-i18n-msg msgid="label.title">Title</things-i18n-msg> </label>
              <input type="text" value-key="yAxes1.axisTitle" value=${this.yAxes1.axisTitle} />

              <input type="checkbox" value-key="yAxes1.ticks.autoMin" ?checked=${this.yAxes1.ticks.autoMin} />
              <label> <things-i18n-msg msgid="label.axis-min-auto">Min Auto</things-i18n-msg> </label>

              <input type="checkbox" value-key="yAxes1.ticks.autoMax" ?checked=${this.yAxes1.ticks.autoMax} />
              <label> <things-i18n-msg msgid="label.axis-max-auto">Max Auto</things-i18n-msg> </label>

              ${
                !this.yAxes1.ticks.autoMin
                  ? html`
                      <label> <things-i18n-msg msgid="label.axis-min">Min</things-i18n-msg> </label>
                      <input type="number" value-key="yAxes1.ticks.min" value=${this.yAxes1.ticks.min} />
                    `
                  : html``
              }
              ${
                !this.yAxes1.ticks.autoMax
                  ? html`
                      <label> <things-i18n-msg msgid="label.axis-max">Max</things-i18n-msg> </label>
                      <input type="number" value-key="yAxes1.ticks.max" value=${this.yAxes1.ticks.max} />
                    `
                  : html``
              }

              <label> <things-i18n-msg msgid="label.axis-step-size">StepSize</things-i18n-msg> </label>
              <input type="number" value-key="yAxes1.ticks.stepSize" value=${this.yAxes1.ticks.stepSize} />

              <input
                type="checkbox"
                value-key="value.options.y2ndGridLine"
                ?checked=${props.value.options.y2ndGridLine}
              />
              <label> <things-i18n-msg msgid="label.grid-line">Grid Line</things-i18n-msg> </label>

              <input type="checkbox" value-key="yAxes1.ticks.display" ?checked=${this.yAxes1.ticks.display} />
              <label> <things-i18n-msg msgid="label.display-tick">Display Tick</things-i18n-msg> </label>
            `
          : html``
      }
    `
  }

  onTapAddTab(e) {
    if (!this.value.data.datasets) return

    var lastSeriesIndex = this.value.data.datasets.length
    var chartType = this.value.type

    var addSeriesOption
    if (chartType == 'line') {
      addSeriesOption = {
        label: 'new series',
        type: 'line',
        data: [],
        borderWidth: 4,
        borderPointRadius: 4,
        dataKey: '',
        yAxisID: 'left',
        fill: false
      }
    } else {
      addSeriesOption = {
        label: 'new series',
        type: 'bar',
        data: [],
        borderWidth: 0,
        dataKey: '',
        yAxisID: 'left'
      }
    }

    this.value.data.datasets.push(addSeriesOption)
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
    this.currentSeriesIndex = lastSeriesIndex
  }
}

customElements.define(PropertyEditorChartJSMixed.is, PropertyEditorChartJSMixed)
