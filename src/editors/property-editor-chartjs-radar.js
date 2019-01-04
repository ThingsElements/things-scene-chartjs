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
        <paper-tabs
          @iron-select="${e => (this.currentSeriesIndex = e.target.selected)}"
          selected=${props.currentSeriesIndex}
          fullwidth
        >
          ${
            this.data.datasets.map(
              (dataset, index) => html`
                <paper-tab data-series="${index + 1}">${index + 1}</paper-tab>
              `
            )
          }
          <paper-tab>
            <paper-icon-button icon="add-circle" @tap="${e => this.onTapAddTab(e)}"></paper-icon-button>
          </paper-tab>
        </paper-tabs>

        <div class="tab-content">
          <label> <things-i18n-msg msgid="label.data-key">Data Key</things-i18n-msg> </label>
          <input type="text" value-key="series.dataKey" value=${this.series.dataKey} />

          <label> <things-i18n-msg msgid="label.label">label</things-i18n-msg> </label>
          <input type="text" value-key="series.label" value=${this.series.label} />

          <label> <things-i18n-msg msgid="label.border-color">border color</things-i18n-msg> </label>
          <things-editor-color value-key="series.borderColor" value=${this.series.borderColor}></things-editor-color>

          <label> <things-i18n-msg msgid="label.border-width">border width</things-i18n-msg> </label>
          <input type="number" value-key="series.borderWidth" value=${this.series.borderWidth} />

          <label> <things-i18n-msg msgid="label.background-color">background color</things-i18n-msg> </label>
          <things-editor-color
            value-key="series.backgroundColor"
            value=${this.series.backgroundColor}
          ></things-editor-color>

          <label> <things-i18n-msg msgid="label.point-size">Point Size</things-i18n-msg> </label>
          <input type="number" value-key="series.pointRadius" value=${this.series.pointRadius} />

          <label> <things-i18n-msg msgid="label.point-bg-color">point BG color</things-i18n-msg> </label>
          <things-editor-color
            value-key="series.pointBackgroundColor"
            value=${this.series.pointBackgroundColor}
          ></things-editor-color>

          <input type="checkbox" value-key="series.fill" checked=${this.series.fill} />
          <label> <things-i18n-msg msgid="label.fill">fill</things-i18n-msg> </label>

          <label> <things-i18n-msg msgid="label.value-prefix">Value Prefix</things-i18n-msg> </label>
          <input type="text" value-key="series.valuePrefix" value=${this.series.valuePrefix} />

          <label> <things-i18n-msg msgid="label.value-suffix">Value suffix</things-i18n-msg> </label>
          <input type="text" value-key="series.valueSuffix" value=${this.series.valueSuffix} />

          <input type="checkbox" value-key="series.displayValue" checked=${this.series.displayValue} />
          <label> <things-i18n-msg msgid="label.value-display">Value Display</things-i18n-msg> </label>

          ${
            this.series.displayValue
              ? html`
                  <label> <things-i18n-msg msgid="label.font-color">Font Color</things-i18n-msg> </label>
                  <things-editor-color
                    value-key="series.defaultFontColor"
                    value=${this.series.defaultFontColor}
                  ></things-editor-color>

                  <label> <things-i18n-msg msgid="label.font-size">Font Size</things-i18n-msg> </label>
                  <input type="number" value-key="series.defaultFontSize" value=${this.series.defaultFontSize} />
                `
              : html``
          }
          ${
            !this.data.datasets || this.data.datasets.length != 1
              ? html`
                  <paper-button @tap="${e => this.onTapRemoveCurrentTab(e)}">
                    <iron-icon icon="icons:delete"></iron-icon>Remove Tab
                  </paper-button>
                `
              : html``
          }
        </div>
      </div>

      <legend><things-i18n-msg msgid="label.axes">Axes</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.data-key">Data Key</things-i18n-msg> </label>
      <input type="text" value-key="labelDataKey" value=${this.labelDataKey} />
    `
  }
}

customElements.define(PropertyEditorChartJSRadar.is, PropertyEditorChartJSRadar)
