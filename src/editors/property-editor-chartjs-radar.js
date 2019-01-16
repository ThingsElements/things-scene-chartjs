/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { html } from '@polymer/lit-element'

import '@polymer/iron-icon/iron-icon'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-tabs/paper-tabs'
import '@polymer/paper-icon-button/paper-icon-button'

import PropertyEditorChartJSAbstract from './property-editor-chartjs-abstract'

export default class PropertyEditorChartJSRadar extends PropertyEditorChartJSAbstract {
  static get is() {
    return 'property-editor-chartjs-radar'
  }

  constructor() {
    super()

    this.value = {
      options: {
        legend: {}
      },
      data: {
        datasets: []
      }
    }
  }

  editorTemplate(props) {
    return html`
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

          <label> <things-i18n-msg msgid="label.border-color">border color</things-i18n-msg> </label>
          <things-editor-color value-key="series.borderColor" .value=${this.series.borderColor}></things-editor-color>

          <label> <things-i18n-msg msgid="label.border-width">border width</things-i18n-msg> </label>
          <input type="number" value-key="series.borderWidth" value=${this.series.borderWidth} />

          <label> <things-i18n-msg msgid="label.background-color">background color</things-i18n-msg> </label>
          <things-editor-color
            value-key="series.backgroundColor"
            .value=${this.series.backgroundColor}
          ></things-editor-color>

          <label> <things-i18n-msg msgid="label.point-size">Point Size</things-i18n-msg> </label>
          <input type="number" value-key="series.pointRadius" value=${this.series.pointRadius} />

          <label> <things-i18n-msg msgid="label.point-bg-color">point BG color</things-i18n-msg> </label>
          <things-editor-color
            value-key="series.pointBackgroundColor"
            .value=${this.series.pointBackgroundColor}
          ></things-editor-color>

          <input type="checkbox" value-key="series.fill" ?checked=${this.series.fill} />
          <label> <things-i18n-msg msgid="label.fill">fill</things-i18n-msg> </label>

          ${this.displayValueTemplate()}
        </div>
      </div>

      <legend><things-i18n-msg msgid="label.axes">Axes</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.data-key">Data Key</things-i18n-msg> </label>
      <input type="text" value-key="labelDataKey" value=${this.labelDataKey} />
    `
  }
}

customElements.define(PropertyEditorChartJSRadar.is, PropertyEditorChartJSRadar)
