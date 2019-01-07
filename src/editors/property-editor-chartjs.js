import { html } from '@polymer/lit-element'
import { ThingsEditorProperty } from '@hatiolab/things-shell/things-module'

import './property-editor-chartjs-hbar'
import './property-editor-chartjs-mixed'
import './property-editor-chartjs-pie'
import './property-editor-chartjs-radar'

export default class ChartJSEditor extends ThingsEditorProperty {
  static get is() {
    return 'property-editor-chartjs'
  }

  editorTemplate(props) {
    return html`
      <style>
        :host > label {
          box-sizing: border-box;
          grid-column: span 3;
        }

        :host > input {
          box-sizing: border-box;
          grid-column: span 7;
        }
      </style>
      ${
        props.value
          ? html`
              <label> <things-i18n-msg msgid="label.chart-type">Chart Type</things-i18n-msg> </label>
              <input type="text" value=${props.value.type} readonly />
            `
          : html``
      }
      ${
        !props.value
          ? html``
          : props.value.type == 'line'
          ? html`
              <property-editor-chartjs-mixed .value=${props.value} fullwidth></property-editor-chartjs-mixed>
            `
          : props.value.type == 'horizontalBar'
          ? html`
              <property-editor-chartjs-hbar .value=${props.value} fullwidth></property-editor-chartjs-hbar>
            `
          : props.value.type == 'bar'
          ? html`
              <property-editor-chartjs-mixed .value=${props.value} fullwidth></property-editor-chartjs-mixed>
            `
          : props.value.type == 'pie'
          ? html`
              <property-editor-chartjs-pie .value=${props.value} fullwidth></property-editor-chartjs-pie>
            `
          : props.value.type == 'doughnut'
          ? html`
              <property-editor-chartjs-pie .value=${props.value} fullwidth></property-editor-chartjs-pie>
            `
          : props.value.type == 'polarArea'
          ? html`
              <property-editor-chartjs-pie .value=${props.value} fullwidth></property-editor-chartjs-pie>
            `
          : props.value.type == 'radar'
          ? html`
              <property-editor-chartjs-radar .value=${props.value} fullwidth></property-editor-chartjs-radar>
            `
          : html``
      }
    `
  }
}

customElements.define(ChartJSEditor.is, ChartJSEditor)
