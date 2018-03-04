import { html } from '@polymer/polymer/polymer-element';

import PropertyEditorChartJSAbstract from './property-editor-chartjs-abstract';

export default class PropertyEditorChartJSPie extends PropertyEditorChartJSAbstract {

  static get is() {
    return 'property-editor-chartjs-pie';
  }

  static get editorTemplate() {
    return html`

    <legend>
      <things-i18n-msg msgid="label.chart" auto>Chart</things-i18n-msg>
    </legend>

    <label>
      <things-i18n-msg msgid="label.theme" auto>theme</things-i18n-msg>
    </label>
    <select class="select-content" value="{{values.options.theme::change}}">
      <option value="dark">dark</option>
      <option value="light">light</option>
    </select>

    <input type="checkbox" checked="{{values.options.legend.display::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.legend" auto>Legend</things-i18n-msg>
    </label>

    <template is="dom-if" if="[[values.options.legend.display]]">
      <label>
        <things-i18n-msg msgid="label.position" auto>Position</things-i18n-msg>
      </label>
      <select class="select-content" value="{{values.options.legend.position::change}}">
        <option value="top">top</option>
        <option value="right">right</option>
        <option value="bottom">bottom</option>
        <option value="left">left</option>
      </select>
    </template>

    <label>
      <things-i18n-msg msgid="label.text-size" auto>Text Size</things-i18n-msg>
    </label>
    <input is="things-editor-number-input" number="{{values.options.defaultFontSize::change}}"></input>

    <legend>
      <things-i18n-msg msgid="label.series" auto>Series</things-i18n-msg>
    </legend>

    <label>
      <things-i18n-msg msgid="label.data-key" auto>Data Key</things-i18n-msg>
    </label>
    <input type="text" value="{{series.dataKey::change}}"></input>
    
    <label>
      <things-i18n-msg msgid="label.background-color" auto>background color</things-i18n-msg>
    </label>
    <things-editor-multiple-color values="{{series.backgroundColor}}"></things-editor-multiple-color>
    
    <label>
      <things-i18n-msg msgid="label.value-prefix" auto>Value Prefix</things-i18n-msg>
    </label>
    <input type="text" value="{{series.valuePrefix::change}}"></input>
    
    <label>
      <things-i18n-msg msgid="label.value-suffix" auto>Value suffix</things-i18n-msg>
    </label>
    <input type="text" value="{{series.valueSuffix::change}}"></input>

    <input type="checkbox" checked="{{series.displayValue::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.value-display" auto>Value Display</things-i18n-msg>
    </label>

    <template is="dom-if" if="[[series.displayValue]]">
      <label>
        <things-i18n-msg msgid="label.font-color" auto>Font Color</things-i18n-msg>
      </label>
      <things-editor-color value="{{series.defaultFontColor::change}}"></things-editor-color>

      <label>
        <things-i18n-msg msgid="label.font-size" auto>Font Size</things-i18n-msg>
      </label>
      <input is="things-editor-number-input" number="{{series.defaultFontSize::change}}"></input>
    </template>

    <legend>
      <things-i18n-msg msgid="label.axes" auto>Axes</things-i18n-msg>
    </legend>

    <label>
      <things-i18n-msg msgid="label.data-key" auto>Data Key</things-i18n-msg>
    </label>
    <input type="text" value="{{values.data.labelDataKey::change}}"></input>
    `;
  }

  static get properties() {
    return {
      values: {
        type: Object,
        notify: true
      },
      series: {
        type: Object,
        value: {}
      }
    }
  }

  // observers: [
  //   'onValuesChanged(values.*)'
  // ],

  onValuesChanged(values) {
    if (values.path == 'values') {
      // values가 바뀌었으므로 path를 다시 link한다.
      this.unlinkPaths('series')
      this.set('series', this.values.data.datasets[0])
      this.linkPaths('series', 'values.data.datasets.0')
      this._valueChanging = false
      return;
    }

    // values 하위의 무언가가 변경되면 values를 deep clone하여 다시 set.
    this.set('values', Object.assign({}, values.base))
  }
}

customElements.define(PropertyEditorChartJSPie.is, PropertyEditorChartJSPie);