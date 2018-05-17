import { html } from '@polymer/polymer/polymer-element';

import PropertyEditorChartJSAbstract from './property-editor-chartjs-abstract';

import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-icon-button/paper-icon-button';

export default class PropertyEditorChartJSMixed extends PropertyEditorChartJSAbstract {

  static get is() {
    return 'property-editor-chartjs-mixed';
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
    
    <input type="checkbox" checked="{{values.options.stacked::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.stacked" auto>Stacked</things-i18n-msg>
    </label>
    
    <input type="checkbox" checked="{{values.options.multiAxis::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.multi-axis" auto>Multi Axis</things-i18n-msg>
    </label>
    
    <legend>
      <things-i18n-msg msgid="label.series" auto>Series</things-i18n-msg>
    </legend>
    
    <div fullwidth>
      <paper-tabs selected="{{currentSeriesIndex}}" fullwidth>
        <template is="dom-repeat" items="{{values.data.datasets}}" index-as="index">
          <paper-tab data-series="[[_computeSeriesTabIndex(index)]]">[[_computeSeriesTabIndex(index)]]</paper-tab>
        </template>
    
        <paper-tab>
          <paper-icon-button icon="add-circle" on-tap="onTapAddTab"></paper-icon-button>
        </paper-tab>
      </paper-tabs>
    
      <div class="tab-content">
        <label>
          <things-i18n-msg msgid="label.data-key" auto>Data Key</things-i18n-msg>
        </label>
        <input type="text" value="{{series.dataKey::change}}"></input>
    
        <template is="dom-if" if="[[_isTypeof(values.type, 'bar')]]">
          <label>
            <things-i18n-msg msgid="label.type" auto>type</things-i18n-msg>
          </label>
          <select class="select-content" value="{{series.type::change}}">
            <option value="bar" selected>bar</option>
            <option value="line">line</option>
          </select>
        </template>
    
        <label>
          <things-i18n-msg msgid="label.label" auto>label</things-i18n-msg>
        </label>
        <input type="text" value="{{series.label::change}}"></input>
    
        <template is="dom-if" if="[[_isTypeof(series.type, 'line')]]">
          <label>
            <things-i18n-msg msgid="label.line-tension" auto>line tension</things-i18n-msg>
          </label>
          <select class="select-content" value="{{series.lineTension::change}}">
            <option value="0.4">smooth</option>
            <option value="0">angled</option>
          </select>
        </template>
    
        <template is="dom-if" if="[[_isTypeof(series.type, 'line')]]">
          <label>
            <things-i18n-msg msgid="label.border-color" auto>border color</things-i18n-msg>
          </label>
          <things-editor-color value="{{series.borderColor::change}}"></things-editor-color>
          <label>
            <things-i18n-msg msgid="label.border-width" auto>border width</things-i18n-msg>
          </label>
          <input is="things-editor-number-input" number="{{series.borderWidth::change}}"></input>
        </template>
    
        <label>
          <things-i18n-msg msgid="label.background-color" auto>background color</things-i18n-msg>
        </label>
        <things-editor-color value="{{series.backgroundColor::change}}"></things-editor-color>
    
        <template is="dom-if" if="[[_isTypeof(series.type, 'line')]]">
          <label>
            <things-i18n-msg msgid="label.point-shape" auto>point shape</things-i18n-msg>
          </label>
          <select class="select-content" value="{{series.pointStyle::change}}">
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
    
          <label>
            <things-i18n-msg msgid="label.point-size" auto>point size</things-i18n-msg>
          </label>
          <input type="number" value-as-number="{{series.pointRadius::change}}"></input>
    
          <label>
            <things-i18n-msg msgid="label.point-bg-color" auto>point BG color</things-i18n-msg>
          </label>
          <things-editor-color value="{{series.pointBackgroundColor::change}}"></things-editor-color>
        </template>
    
        <template is="dom-if" if="[[_isTypeof(series.type, 'line')]]">
          <input type="checkbox" checked="{{series.fill::change}}" required></input>
          <label>
            <things-i18n-msg msgid="label.fill" auto>fill</things-i18n-msg>
          </label>
        </template>
    
        <label>
          <things-i18n-msg msgid="label.target-axis" auto>target axis</things-i18n-msg>
        </label>
        <select class="select-content" value="{{series.yAxisID::change}}">
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
    
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
          <div>
            <label>
              <things-i18n-msg msgid="label.font-color" auto>Font Color</things-i18n-msg>
            </label>
            <things-editor-color value="{{series.defaultFontColor::change}}"></things-editor-color>
            <label>
              <things-i18n-msg msgid="label.font-size" auto>Font Size</things-i18n-msg>
            </label>
            <input is="things-editor-number-input" number="{{series.defaultFontSize::change}}"></input>
          </div>
        </template>
    
        <template is="dom-if" if="[[!isOnly(values.data.datasets)]]">
          <paper-button on-tap="onTapRemoveCurrentTab">
            <iron-icon icon="icons:delete"></iron-icon>Remove Tab
          </paper-button>
        </template>
      </div>
    </div>
    
    <legend>
      <things-i18n-msg msgid="label.x-axes" auto>X Axes</things-i18n-msg>
    </legend>
    
    <label>
      <things-i18n-msg msgid="label.data-key" auto>Data Key</things-i18n-msg>
    </label>
    <input type="text" value="{{values.data.labelDataKey::change}}"></input>
    
    <label>
      <things-i18n-msg msgid="label.title" auto>Title</things-i18n-msg>
    </label>
    <input type="text" value="{{values.options.scales.xAxes.0.axisTitle::change}}"></input>
    
    <label>
      <things-i18n-msg msgid="label.thickness" auto>Thickness</things-i18n-msg>
    </label>
    <input type="number" value-as-number="{{values.options.scales.xAxes.0.barThickness::change}}"></input>
    
    <input type="checkbox" checked="{{values.options.xGridLine::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.grid-line" auto>Grid Line</things-i18n-msg>
    </label>
    
    <input type="checkbox" checked="{{values.options.scales.xAxes.0.ticks.display::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.display-tick" auto>Display Tick</things-i18n-msg>
    </label>
    
    
    <legend>
      <things-i18n-msg msgid="label.y-axes" auto>Y Axes</things-i18n-msg>
    </legend>
    
    <label>
      <things-i18n-msg msgid="label.title" auto>Title</things-i18n-msg>
    </label>
    <input type="text" value="{{values.options.scales.yAxes.0.axisTitle::change}}"></input>
    
    <input type="checkbox" checked="{{values.options.scales.yAxes.0.ticks.autoMin::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.axis-min-auto" auto>Min Auto</things-i18n-msg>
    </label>
    
    <input type="checkbox" checked="{{values.options.scales.yAxes.0.ticks.autoMax::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.axis-max-auto" auto>Max Auto</things-i18n-msg>
    </label>
    
    <template is="dom-if" if="[[!values.options.scales.yAxes.0.ticks.autoMin]]">
      <label>
        <things-i18n-msg msgid="label.axis-min" auto>Min</things-i18n-msg>
      </label>
      <input type="number" value="{{values.options.scales.yAxes.0.ticks.min::change}}"></input>
    </template>
    
    <template is="dom-if" if="[[!values.options.scales.yAxes.0.ticks.autoMax]]">
      <label>
        <things-i18n-msg msgid="label.axis-max" auto>Max</things-i18n-msg>
      </label>
      <input type="number" value="{{values.options.scales.yAxes.0.ticks.max::change}}"></input>
    </template>
    
    <label>
      <things-i18n-msg msgid="label.axis-step-size" auto>StepSize</things-i18n-msg>
    </label>
    <input type="number" value="{{values.options.scales.yAxes.0.ticks.stepSize::change}}"></input>
    
    <input type="checkbox" checked="{{values.options.yGridLine::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.grid-line" auto>Grid Line</things-i18n-msg>
    </label>
    
    <input type="checkbox" checked="{{values.options.scales.yAxes.0.ticks.display::change}}" required></input>
    <label>
      <things-i18n-msg msgid="label.display-tick" auto>Display Tick</things-i18n-msg>
    </label>
    
    <template is="dom-if" if="[[values.options.multiAxis]]">
      <legend>
        <things-i18n-msg msgid="label.y-2nd-axes" auto>Y 2nd Axes</things-i18n-msg>
      </legend>
    
      <label>
        <things-i18n-msg msgid="label.title" auto>Title</things-i18n-msg>
      </label>
      <input type="text" value="{{values.options.scales.yAxes.1.axisTitle::change}}"></input>
    
      <input type="checkbox" checked="{{values.options.scales.yAxes.1.ticks.autoMin::change}}" required></input>
      <label>
        <things-i18n-msg msgid="label.axis-min-auto" auto>Min Auto</things-i18n-msg>
      </label>
    
      <input type="checkbox" checked="{{values.options.scales.yAxes.1.ticks.autoMax::change}}" required></input>
      <label>
        <things-i18n-msg msgid="label.axis-max-auto" auto>Max Auto</things-i18n-msg>
      </label>
    
      <template is="dom-if" if="[[!values.options.scales.yAxes.1.ticks.autoMin]]">
        <label>
          <things-i18n-msg msgid="label.axis-min" auto>Min</things-i18n-msg>
        </label>
        <input type="number" value="{{values.options.scales.yAxes.1.ticks.min::change}}"></input>
      </template>
    
      <template is="dom-if" if="[[!values.options.scales.yAxes.1.ticks.autoMax]]">
        <label>
          <things-i18n-msg msgid="label.axis-max" auto>Max</things-i18n-msg>
        </label>
        <input type="number" value="{{values.options.scales.yAxes.1.ticks.max::change}}"></input>
      </template>
    
      <label>
        <things-i18n-msg msgid="label.axis-step-size" auto>StepSize</things-i18n-msg>
      </label>
      <input type="number" value="{{values.options.scales.yAxes.1.ticks.stepSize::change}}"></input>
    
      <input type="checkbox" checked="{{values.options.y2ndGridLine::change}}" required></input>
      <label>
        <things-i18n-msg msgid="label.grid-line" auto>Grid Line</things-i18n-msg>
      </label>
    
      <input type="checkbox" checked="{{values.options.scales.yAxes.1.ticks.display::change}}" required></input>
      <label>
        <things-i18n-msg msgid="label.display-tick" auto>Display Tick</things-i18n-msg>
      </label>
    </template>
    `;
  }

  // observers: [
  //   'onValuesChanged(values.*)',
  //   'onCurrentSeriesIndexChanged(currentSeriesIndex)'
  // ],

  onValuesChanged(values) {

    if (values.path == 'values') {
      if (this._changedBySelf) {
        // values가 바뀌었으므로 path를 다시 link한다.
        this.unlinkPaths('series')
        this.set('series', this.values.data.datasets[this.currentSeriesIndex])
        this.linkPaths('series', 'values.data.datasets.' + this.currentSeriesIndex)
        return
      }

      // values가 바뀌면 datasets[0]을 선택한다.
      this.set('currentSeriesIndex', -1);
      this.set('currentSeriesIndex', 0);

      return;
    }

    // values 하위의 무언가가 변경되면 values를 deep clone하여 다시 set.
    this._changedBySelf = true
    this.set('values', Object.assign({}, values.base))
    this._changedBySelf = false
  }

  onCurrentSeriesIndexChanged(currentSeriesIndex) {
    if (currentSeriesIndex < 0)
      return

    // currentSeriesIndex가 바뀌면 series와 datasets[currentSeriesIndex]의 path를 link
    this.unlinkPaths('series')
    this.set('series', {})

    if (!this.get('values.data.datasets'))
      return

    this.set('series', this.values.data.datasets[currentSeriesIndex])
    this.linkPaths('series', 'values.data.datasets.' + currentSeriesIndex)
  }

  _isTypeof(seriesType, type) {
    if (seriesType == type)
      return true
  }

  onTapAddTab(e) {
    if (!this.get('values.data.datasets'))
      return

    var lastSeriesIndex = this.values.data.datasets.length;
    var chartType = this.values.type;

    var addSeriesOption;
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

    this.values.data.datasets.push(addSeriesOption)

    this.notifySplices('values.data.datasets', [{
      index: lastSeriesIndex,
      removed: [],
      addedCount: 1,
      object: this.values.data.datasets,
      type: 'splice'
    }]);

    this.set('currentSeriesIndex', -1)
    this.set('currentSeriesIndex', lastSeriesIndex)
  }

  onTapRemoveCurrentTab(e) {

    if (!this.get('values.data.datasets'))
      return

    var currIndex = this.currentSeriesIndex;
    var removed = this.values.data.datasets.splice(currIndex, 1);

    this.notifySplices('values.data.datasets', [{
      index: currIndex,
      removed: removed,
      addedCount: 0,
      object: this.values.data.datasets,
      type: 'splice'
    }]);

    currIndex--

    if (currIndex < 0)
      currIndex = 0

    this.set('currentSeriesIndex', -1)
    this.set('currentSeriesIndex', currIndex)
  }

  isOnly(datasets) {
    if (datasets && datasets.length === 1)
      return true
  }

  _computeSeriesTabIndex(index) {
    return index + 1
  }
}

customElements.define(PropertyEditorChartJSMixed.is, PropertyEditorChartJSMixed);
