import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

export default class PropertyEditorChartJSAbstract extends PolymerElement {

  static get is() {
    return 'property-editor-chartjs-abstract';
  }

  static get template() {
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
        @apply(--things-fieldset-legend);

        grid-column: 1 / -1;

        display: inline-block;

        text-align: left;
        text-transform: capitalize;
      }

      .tab-content {
        background-color: rgba(255,255,255,.5);
        border: 1px solid rgba(0,0,0,.2);
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

      label, .tab-content > label {
        grid-column: span 3;

        text-align: right;

        color:var(--primary-text-color);
        font-size: 0.8em;
        line-height: 2.0;
        text-transform: capitalize;
      }

      input[type=checkbox], .tab-content > input[type=checkbox] {
        grid-column: span 4;

        justify-self: end;
        align-self: center;
      }

      input[type=checkbox] + label, .tab-content > input[type=checkbox] + label {
        grid-column: span 6;

        text-align: left;
      }

      [fullwidth] {
        grid-column: 1 / -1;
        margin: 0;
        border: 0;
      }

      select {
        @apply(--things-select);
        background:url(/images/bg-input-select.png) 100% 50% no-repeat #fff;
      }

      things-editor-script {
        width:94%;
        height:300px;
        margin:0 0 7px 7px;
        overflow:auto;
      }

      paper-tabs {
        border: 0 solid rgba(0,0,0,.2);
        border-width:1px 1px 0 1px;
      }

      paper-tab {
        background-color: rgba(0,0,0,.2);
        border: 1px solid rgba(0,0,0,.07);
        border-width: 1px 1px 0 1px;
        padding: 0 5px;
        color: #fff;
        font-size: 13px;
      }

      paper-tab[disabled] {
        background-color: rgba(0,0,0,.1);
      }
      
      paper-tab:last-child {
        border-width: 0;
      }
      
      paper-tab.iron-selected {
        background-color: rgba(255,255,255,.5);
        border: 1px solid rgba(0,0,0,.2);
        color: #585858;
      }
    </style>

    ${this.editorTemplate}
    `;
  }

  static get editorTemplate() {
    return html``;
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
      },

      currentSeriesIndex: {
        type: Number,
        value: -1
      },

      _changedBySelf: {
        type: Boolean,
        value: false
      }
    }
  }

  static get observers() {
    return [
      'onValuesChanged(values.*)',
      'onCurrentSeriesIndexChanged(currentSeriesIndex)'
    ];
  }

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

  onTapAddTab(e) {
    if (!this.get('values.data.datasets'))
      return

    var lastSeriesIndex = this.values.data.datasets.length;

    this.values.data.datasets.push({
      label: 'new series',
      data: [],
      borderWidth: 0,
      dataKey: '',
      yAxisID: 'left'
    })

    this.notifySplices('values.data.datasets', [
      { index: lastSeriesIndex, removed: [], addedCount: 1, object: this.values.data.datasets, type: 'splice' }
    ]);

    this.set('currentSeriesIndex', -1)
    this.set('currentSeriesIndex', lastSeriesIndex)

    this.fire('change')
  }

  onTapRemoveCurrentTab(e) {

    if (!this.get('values.data.datasets'))
      return

    var currIndex = this.currentSeriesIndex;
    var removed = this.values.data.datasets.splice(currIndex, 1);

    this.notifySplices('values.data.datasets', [
      { index: currIndex, removed: removed, addedCount: 0, object: this.values.data.datasets, type: 'splice' }
    ]);

    currIndex--

    if (currIndex < 0)
      currIndex = 0

    this.set('currentSeriesIndex', -1)
    this.set('currentSeriesIndex', currIndex)

    this.fire('change')
  }

  isOnly(datasets) {
    if (datasets && datasets.length === 1)
      return true
  }

  _computeSeriesTabIndex(index) {
    return index + 1
  }
}
