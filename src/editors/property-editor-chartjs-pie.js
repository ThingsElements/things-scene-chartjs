/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { html } from '@polymer/lit-element'

import PropertyEditorChartJSAbstract from './property-editor-chartjs-abstract'

export default class PropertyEditorChartJSPie extends PropertyEditorChartJSAbstract {
  static get is() {
    return 'property-editor-chartjs-pie'
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

    this.currentSeriesIndex = 0
  }

  get valuePrefix() {
    return this.series.valuePrefix
  }

  set valuePrefix(valuePrefix) {
    this.series.valuePrefix = valuePrefix
  }

  get valueSuffix() {
    return this.series.valueSuffix
  }

  set valueSuffix(valueSuffix) {
    this.series.valueSuffix = valueSuffix
  }

  get backgroundColor() {
    return this.series.backgroundColor
  }

  set backgroundColor(backgroundColor) {
    this.series.backgroundColor = backgroundColor
  }

  get displayValue() {
    return this.series.displayValue
  }

  set displayValue(displayValue) {
    this.series.displayValue = displayValue
  }

  editorTemplate(props) {
    return html`
      <legend><things-i18n-msg msgid="label.series">Series</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.data-key">Data Key</things-i18n-msg> </label>
      <input type="text" value-key="dataKey" value=${this.series.dataKey} />

      <label> <things-i18n-msg msgid="label.background-color">background color</things-i18n-msg> </label>
      <things-editor-multiple-color
        value-key="series.backgroundColor"
        .values=${this.series.backgroundColor}
      ></things-editor-multiple-color>

      ${this.displayValueTemplate()}

      <legend><things-i18n-msg msgid="label.axes">Axes</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.data-key">Data Key</things-i18n-msg> </label>
      <input type="text" value-key="labelDataKey" value=${this.labelDataKey} />
    `
  }
}

customElements.define(PropertyEditorChartJSPie.is, PropertyEditorChartJSPie)
