/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { random as randomColor, TinyColor } from '@ctrl/tinycolor'
import { html, LitElement } from 'lit-element'
import { PropertyEditorChartJSStyles } from './property-editor-chartjs-styles'

export default class PropertyEditorChartJSAbstract extends LitElement {
  static get properties() {
    return {
      value: Object,
      currentSeriesIndex: Number
    }
  }

  static get styles() {
    return [PropertyEditorChartJSStyles]
  }

  constructor() {
    super()

    this.value = {}
    this.currentSeriesIndex = 0

    this.renderRoot.addEventListener('change', this.onValuesChanged.bind(this))
  }

  render() {
    return html`
      <legend><i18n-msg msgid="label.chart">Chart</i18n-msg></legend>

      <label> <i18n-msg msgid="label.theme">theme</i18n-msg> </label>
      <select value-key="theme" class="select-content" .value=${this.theme}>
        <option value="dark">dark</option>
        <option value="light">light</option>
      </select>

      <input type="checkbox" value-key="display" .checked=${this.display} />
      <label> <i18n-msg msgid="label.legend">Legend</i18n-msg> </label>

      ${this.display
        ? html`
            <label> <i18n-msg msgid="label.position">Position</i18n-msg> </label>
            <select value-key="position" class="select-content" .value=${this.position}>
              <option value="top">top</option>
              <option value="right">right</option>
              <option value="bottom">bottom</option>
              <option value="left">left</option>
            </select>
          `
        : html``}
      ${this.editorTemplate(this)}
    `
  }

  displayValueTemplate() {
    return html`
      <label> <i18n-msg msgid="label.value-prefix">Value Prefix</i18n-msg> </label>
      <input type="text" value-key="series.valuePrefix" .value=${this.series.valuePrefix || ''} />

      <label> <i18n-msg msgid="label.value-suffix">Value suffix</i18n-msg> </label>
      <input type="text" value-key="series.valueSuffix" .value=${this.series.valueSuffix || ''} />

      <input type="checkbox" value-key="series.displayValue" .checked=${this.series.displayValue || false} />
      <label> <i18n-msg msgid="label.value-display">Value Display</i18n-msg> </label>

      ${this.series.displayValue
        ? html`
            <label> <i18n-msg msgid="label.font-color">Font Color</i18n-msg> </label>
            <things-editor-color
              value-key="series.defaultFontColor"
              .value=${this.series.defaultFontColor || '#000'}
            ></things-editor-color>
            <label> <i18n-msg msgid="label.font-size">Font Size</i18n-msg> </label>
            <input type="number" value-key="series.defaultFontSize" .value=${this.series.defaultFontSize || 10} />
            <label> <i18n-msg msgid="label.position">Position</i18n-msg> </label>
            <select value-key="series.dataLabelAnchor" .value=${this.series.dataLabelAnchor || 'center'}>
              <option value="start">Start</option>
              <option value="center" selected>Center</option>
              <option value="end">End</option>
            </select>
          `
        : html``}
    `
  }

  editorTemplate() {
    return html``
  }

  get data() {
    return this.value.data
  }

  set data(data) {
    this.value.data = data
  }

  get datasets() {
    if (!this.data.datasets) this.data.datasets = []

    return this.data.datasets
  }

  set datasets(datasets) {
    this.datasets = datasets
  }

  get series() {
    if (!this.datasets[this.currentSeriesIndex]) this.datasets[this.currentSeriesIndex] = {}
    return this.datasets[this.currentSeriesIndex]
  }

  set series(series) {
    !this.data ? (this.data = { dataset: [series] }) : (this.datasets[this.currentSeriesIndex] = series)
  }

  set dataKey(key) {
    this.series.dataKey = key
  }

  get dataKey() {
    return this.series.dataKey
  }

  get legend() {
    !this.value.options && (this.value.options = {})
    return this.value.options.legend
  }

  set legend(legend) {
    this.value.options.legend = legend
  }

  get theme() {
    return this.value.options && this.value.options.theme
  }

  set theme(theme) {
    !this.value.options && (this.value.options = {})
    this.value.options.theme = theme
  }

  get scales() {
    return this.value.options.scales
  }

  set scales(scales) {
    !this.value.options && (this.value.options = {})
    this.value.options.scales = scales
  }

  get display() {
    return this.legend && this.legend.display
  }

  set display(display) {
    this.legend.display = display
  }

  get position() {
    return this.legend.position
  }

  set position(position) {
    this.legend.position = position
  }

  get stacked() {
    return this.value.options.stacked
  }

  set stacked(stacked) {
    this.value.options.stacked = stacked
  }

  get labelDataKey() {
    return this.data && this.data.labelDataKey
  }

  set labelDataKey(labelDataKey) {
    this.data.labelDataKey = labelDataKey
  }

  set options(options) {
    this.value.options = options
  }

  get options() {
    return this.value.options
  }

  onValuesChanged(e) {
    var element = e.target
    var key = element.getAttribute('value-key')
    var value = element.value

    if (!key) {
      return
    }

    value = this._getElementValue(element)

    var attrs = key.split('.')
    var attr = attrs.shift()
    var variable = this

    while (attrs.length > 0) {
      variable = variable[attr]
      attr = attrs.shift()
    }

    variable[attr] = value

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
    this.requestUpdate()
  }

  onTapAddTab(e) {
    if (!this.value.data.datasets) return

    var lastSeriesIndex = this.value.data.datasets.length
    var chartType = this.series.type || this.value.type
    var lastSeriesColor = new TinyColor(this.datasets[lastSeriesIndex - 1].backgroundColor)

    var seriesModel = this._getSeriesModel({
      chartType,
      datasetsLength: lastSeriesIndex,
      lastSeriesColor
    })

    this.value.data.datasets.push(seriesModel)
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
    this.currentSeriesIndex = lastSeriesIndex
  }

  onTapRemoveCurrentTab(e) {
    if (!this.value.data.datasets) return

    var currIndex = this.currentSeriesIndex
    this.value.data.datasets.splice(currIndex, 1)

    currIndex--

    if (currIndex < 0) currIndex = 0

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
    this.currentSeriesIndex = currIndex

    this.requestUpdate()
  }

  _getSeriesModel({ chartType, datasetsLength, lastSeriesColor }) {
    var addSeriesOption = {
      label: `series ${datasetsLength + 1}`,
      data: [],
      borderWidth: 1,
      dataKey: '',
      yAxisID: 'left',
      color: randomColor({
        hue: lastSeriesColor
      }).toRgbString()
    }

    addSeriesOption.type = addSeriesOption.chartType = chartType
    return addSeriesOption
  }

  _getElementValue(element) {
    switch (element.tagName) {
      case 'INPUT':
        switch (element.type) {
          case 'checkbox':
            return element.checked
          case 'number':
            return Number(element.value) || 0
          case 'text':
            return String(element.value)
        }

      case 'PAPER-BUTTON':
        return element.active

      case 'PAPER-LISTBOX':
        return element.selected

      case 'THINGS-EDITOR-MULTIPLE-COLOR':
        return element.values

      case 'THINGS-EDITOR-ANGLE-INPUT':
        return Number(element.radian) || 0

      default:
        return element.value
    }
  }
}
