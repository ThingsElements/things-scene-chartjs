/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { html } from 'lit-element'

import '@polymer/iron-icon/iron-icon'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-tabs/paper-tabs'
import '@polymer/paper-icon-button/paper-icon-button'

import PropertyEditorChartJSMultiSeriesAbstract from './property-editor-chartjs-multi-series-abstract'

export default class PropertyEditorChartJSRadar extends PropertyEditorChartJSMultiSeriesAbstract {
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

      <div fullwidth><div fullwidth>${this.multiSeriesTabTemplate()}</div></div>

      <legend><things-i18n-msg msgid="label.axes">Axes</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.data-key">Data Key</things-i18n-msg> </label>
      <input type="text" value-key="labelDataKey" value=${this.labelDataKey} />
    `
  }
}

customElements.define(PropertyEditorChartJSRadar.is, PropertyEditorChartJSRadar)
