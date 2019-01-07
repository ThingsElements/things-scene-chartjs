/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { html } from '@polymer/lit-element'

import '@polymer/iron-icon/iron-icon'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-tabs/paper-tabs'
import '@polymer/paper-icon-button/paper-icon-button'

import PropertyEditorChartJSAbstract from './property-editor-chartjs-abstract'

export default class PropertyEditorChartJSHBar extends PropertyEditorChartJSAbstract {
  static get is() {
    return 'property-editor-chartjs-hbar'
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

  get dataKey() {
    return this.series.dataKey
  }

  set dataKey(dataKey) {
    this.series.dataKey = dataKey
  }

  get label() {
    return this.series.label
  }

  set label(label) {
    this.series.label = label
  }

  get backgroundColor() {
    return this.series.backgroundColor
  }

  set backgroundColor(backgroundColor) {
    this.series.backgroundColor = backgroundColor
  }

  editorTemplate(props) {
    return html`
      <input type="checkbox" value-key="stacked" ?checked=${this.stacked} />
      <label> <things-i18n-msg msgid="label.stacked">Stacked</things-i18n-msg> </label>
      <legend><things-i18n-msg msgid="label.series">Series</things-i18n-msg></legend>
      <div fullwidth>
        <div class="tab-header">
          <paper-tabs
            class="hide-scroll-arrow"
            @iron-select="${e => (this.currentSeriesIndex = e.target.selected)}"
            .selected=${props.currentSeriesIndex}
            no-bar
            noink
            scrollable
          >
            ${
              this.data.datasets.map(
                (dataset, index) => html`
                  <paper-tab data-series="${index + 1}" noink
                    >${index + 1}
                    ${
                      !this.data.datasets || (this.data.datasets.length != 1 && this.currentSeriesIndex == index)
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
          <input type="text" value-key="series.dataKey" value=${this.series.dataKey} />
          <label> <things-i18n-msg msgid="label.label">label</things-i18n-msg> </label>
          <input type="text" value-key="series.label" value=${this.series.label} />
          <label> <things-i18n-msg msgid="label.background-color">background color</things-i18n-msg> </label>
          <things-editor-color
            value-key="series.backgroundColor"
            .value=${this.series.backgroundColor}
          ></things-editor-color>
          <label> <things-i18n-msg msgid="label.value-prefix">Value Prefix</things-i18n-msg> </label>
          <input type="text" value-key="series.valuePrefix" value=${this.series.valuePrefix} />
          <label> <things-i18n-msg msgid="label.value-suffix">Value suffix</things-i18n-msg> </label>
          <input type="text" value-key="series.valueSuffix" value=${this.series.valueSuffix} />

          <input type="checkbox" value-key="series.displayValue" ?checked=${this.series.displayValue} />
          <label> <things-i18n-msg msgid="label.value-display">Value Display</things-i18n-msg> </label>

          ${
            this.series.displayValue
              ? html`
                  <label> <things-i18n-msg msgid="label.font-color">Font Color</things-i18n-msg> </label>
                  <things-editor-color
                    value-key="series.defaultFontColor"
                    .value=${this.series.defaultFontColor}
                  ></things-editor-color>

                  <label> <things-i18n-msg msgid="label.font-size">Font Size</things-i18n-msg> </label>
                  <input type="number" value-key="series.defaultFontSize" value=${this.series.defaultFontSize} />
                `
              : html``
          }
        </div>
      </div>

      <legend><things-i18n-msg msgid="label.y-axes">Y Axes</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.data-key">Data Key</things-i18n-msg> </label>
      <input type="text" value-key="labelDataKey" value=${this.labelDataKey} />

      <label> <things-i18n-msg msgid="label.title">Title</things-i18n-msg> </label>
      <input type="text" value-key="yAxes0.axisTitle" value=${this.yAxes0.axisTitle} />

      <label> <things-i18n-msg msgid="label.thickness">Thickness</things-i18n-msg> </label>
      <input type="number" value-key="yAxes0.barThickness" value=${this.yAxes0.barThickness} />

      <input type="checkbox" value-key="value.options.xGridLine" ?checked=${props.value.options.xGridLine} />
      <label> <things-i18n-msg msgid="label.grid-line">Grid Line</things-i18n-msg> </label>

      <input type="checkbox" value-key="xAxes0.ticks.display" ?checked=${this.xAxes0.ticks.display} />
      <label> <things-i18n-msg msgid="label.display-tick">Display Tick</things-i18n-msg> </label>

      <legend><things-i18n-msg msgid="label.x-axes">X Axes</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.title">Title</things-i18n-msg> </label>
      <input type="text" value-key="x0AxisTitle" value=${this.xAxes0.axisTitle} />

      <input type="checkbox" value-key="xAxes0.ticks.autoMin" ?checked=${this.xAxes0.ticks.autoMin} />
      <label> <things-i18n-msg msgid="label.axis-min-auto">Min Auto</things-i18n-msg> </label>

      <input type="checkbox" value-key="xAxes0.ticks.autoMax" ?checked=${this.xAxes0.ticks.autoMax} />
      <label> <things-i18n-msg msgid="label.axis-max-auto">Max Auto</things-i18n-msg> </label>

      ${
        !this.xAxes0.ticks.autoMin
          ? html`
              <label> <things-i18n-msg msgid="label.axis-min">Min</things-i18n-msg> </label>
              <input type="number" value-key="xAxes0.ticks.min" value=${this.xAxes0.ticks.min} />
            `
          : html``
      }
      ${
        !this.xAxes0.ticks.autoMax
          ? html`
              <label> <things-i18n-msg msgid="label.axis-max">Max</things-i18n-msg> </label>
              <input type="number" value-key="xAxes0.ticks.max" value=${this.xAxes0.ticks.max} />
            `
          : html``
      }

      <label> <things-i18n-msg msgid="label.axis-step-size">StepSize</things-i18n-msg> </label>
      <input type="number" value-key="yAxes0.ticks.stepSize" value=${this.yAxes0.ticks.stepSize} />

      <input type="checkbox" ?checked=${props.value.options.yGridLine} />
      <label> <things-i18n-msg msgid="label.grid-line">Grid Line</things-i18n-msg> </label>

      <input type="checkbox" value-key="yAxes0.ticks.display" ?checked=${this.yAxes0.ticks.display} />
      <label> <things-i18n-msg msgid="label.display-tick">Display Tick</things-i18n-msg> </label>
    `
  }
}

customElements.define(PropertyEditorChartJSHBar.is, PropertyEditorChartJSHBar)
