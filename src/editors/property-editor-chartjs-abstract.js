/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { LitElement, html } from '@polymer/lit-element'

export default class PropertyEditorChartJSAbstract extends LitElement {
  static get properties() {
    return {
      value: Object,
      currentSeriesIndex: Number
    }
  }

  constructor() {
    super()

    this.value = {}
    this.currentSeriesIndex = 0

    this.shadowRoot.addEventListener('change', this.onValuesChanged.bind(this))
  }

  render() {
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-gap: 5px;
        }

        :host > * {
          box-sizing: border-box;
          grid-column: span 7;
        }

        legend {
          @apply (--things-fieldset-legend);
          grid-column: 1 / -1;
          display: inline-block;
          text-align: left;
          text-transform: capitalize;
        }

        .tab-header {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-gap: 1px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-bottom: 0;
          background-color: #ccc;
          box-sizing: border-box;
          padding-top: 3px;
          align-items: center;
        }

        .tab-header > paper-tabs {
          grid-column: 1 / -2;
          height: 25px;
        }

        .tab-header > paper-tabs.hide-scroll-arrow {
          position: relative;
          --paper-tabs-container: {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-color: #ccc;
          }
          --paper-tabs-content: {
            display: flex;
          }
        }

        .tab-header paper-icon-button {
          justify-self: center;
          --paper-icon-button: {
            width: 20px;
            height: 20px;
            padding: 0;
            color: #fff;
          }
        }

        .tab-header paper-tabs paper-icon-button {
          display: flex;
          margin-left: 5px;
          --paper-icon-button: {
            width: 15px;
            height: 15px;
            padding: 2px;
            color: #585858;
          }
        }

        .tab-content {
          background-color: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-width: 0 1px 1px 1px;
          padding: 5px;
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-gap: 5px;
        }

        .tab-content > * {
          box-sizing: border-box;
          grid-column: span 7;
        }

        label,
        .tab-content > label {
          grid-column: span 3;
          text-align: right;
          color: var(--primary-text-color);
          font-size: 0.8em;
          line-height: 2;
          text-transform: capitalize;
        }

        input[type='checkbox'],
        .tab-content > input[type='checkbox'] {
          grid-column: span 4;
          justify-self: end;
          align-self: center;
        }

        input[type='checkbox'] + label,
        .tab-content > input[type='checkbox'] + label {
          grid-column: span 6;

          text-align: left;
        }

        [fullwidth] {
          grid-column: 1 / -1;
          margin: 0;
          border: 0;
        }

        select {
          @apply (--things-select);
          background: url(/images/bg-input-select.png) 100% 50% no-repeat #fff;
        }

        things-editor-script {
          width: 94%;
          height: 300px;
          margin: 0 0 7px 7px;
          overflow: auto;
        }

        paper-tab {
          background-color: rgba(0, 0, 0, 0.2);
          border-width: 1px 1px 0 1px;
          padding: 0 5px;
          color: #fff;
          font-size: 13px;
          box-sizing: border-box;
        }

        paper-tabs.hide-scroll-arrow paper-tab {
          background-color: #ccc;
          min-width: 30px;
        }

        paper-tab[disabled] {
          background-color: rgba(0, 0, 0, 0.1);
        }

        paper-tab:last-child {
          border-width: 0;
        }

        paper-tabs paper-tab.iron-selected {
          background-color: #f6f8f9;
          border-radius: 10px 10px 0 0;
          color: #585858;
        }
      </style>

      <legend><things-i18n-msg msgid="label.chart">Chart</things-i18n-msg></legend>

      <label> <things-i18n-msg msgid="label.theme">theme</things-i18n-msg> </label>
      <select value-key="theme" class="select-content" value=${this.theme}>
        <option value="dark">dark</option>
        <option value="light">light</option>
      </select>

      <input type="checkbox" value-key="display" checked=${this.display} />
      <label> <things-i18n-msg msgid="label.legend">Legend</things-i18n-msg> </label>

      ${
        this.display
          ? html`
              <label> <things-i18n-msg msgid="label.position">Position</things-i18n-msg> </label>
              <select value-key="position" class="select-content" value=${this.position}>
                <option value="top">top</option>
                <option value="right">right</option>
                <option value="bottom">bottom</option>
                <option value="left">left</option>
              </select>
            `
          : html``
      }

      <label> <things-i18n-msg msgid="label.text-size">Text Size</things-i18n-msg> </label>
      <input type="number" value-key="value.options.defaultFontSize" value=${this.value.options.defaultFontSize} />

      ${this.editorTemplate(this)}
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

  get series() {
    return (this.value.data && this.value.data.datasets[this.currentSeriesIndex]) || {}
  }

  set series(series) {
    !this.value.data
      ? (this.value.data = { dataset: [series] })
      : (this.value.data.datasets[this.currentSeriesIndex] = series)
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

  onValuesChanged(e) {
    var element = e.target
    var key = element.getAttribute('value-key')
    var value = element.value

    if (!key) {
      return
    }

    switch (element.tagName) {
      case 'THINGS-EDITOR-ANGLE-INPUT':
        value = Number(element.radian) || 0
        break

      case 'INPUT':
        switch (element.type) {
          case 'checkbox':
            value = element.checked
            break
          case 'number':
            value = Number(element.value) || 0
            break
          case 'text':
            value = String(element.value)
        }
        break

      case 'PAPER-BUTTON':
        value = element.active
        break

      case 'PAPER-LISTBOX':
        value = element.selected
        break

      default:
        value = element.value
        break
    }

    var attrs = key.split('.')
    var attr = attrs.shift()
    var variable = this

    while (attrs.length > 0) {
      variable = variable[attr]
      attr = attrs.shift()
    }

    variable[attr] = value

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }

  onTapAddTab(e) {
    if (!this.value.data.datasets) return

    var lastSeriesIndex = this.value.data.datasets.length

    this.value.data.datasets.push({
      label: 'new series',
      data: [],
      borderWidth: 0,
      dataKey: '',
      yAxisID: 'left',
      fill: false
    })

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
}
