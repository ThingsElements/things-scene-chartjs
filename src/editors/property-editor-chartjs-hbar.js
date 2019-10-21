/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import '@polymer/iron-icon/iron-icon'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-tabs/paper-tabs'
import { html } from 'lit-element'
import PropertyEditorChartJSMultiSeriesAbstract from './property-editor-chartjs-multi-series-abstract'

export default class PropertyEditorChartJSHBar extends PropertyEditorChartJSMultiSeriesAbstract {
  static get is() {
    return 'property-editor-chartjs-hbar'
  }

  editorTemplate() {
    return html`
      <legend><i18n-msg msgid="label.series">Series</i18n-msg></legend>
      ${this.multiSeriesTabTemplate()}

      <legend><i18n-msg msgid="label.y-axes">Y Axes</i18n-msg></legend>

      <label> <i18n-msg msgid="label.data-key">Data Key</i18n-msg> </label>
      <input type="text" value-key="labelDataKey" .value=${this.labelDataKey} />

      <label> <i18n-msg msgid="label.title">Title</i18n-msg> </label>
      <input type="text" value-key="yAxes0.axisTitle" .value=${this.yAxes0.axisTitle || ''} />

      <label><i18n-msg msgid="label.bar-spacing">Bar Spacing</i18n-msg></label>
      <input
        type="number"
        min="0"
        max="1"
        step="0.1"
        value-key="yAxes0.barSpacing"
        .value=${this.yAxes0.barSpacing || NaN}
      />
      <label><i18n-msg msgid="label.tick-spacing">Tick Spacing</i18n-msg></label>
      <input
        type="number"
        min="0"
        max="1"
        step="0.1"
        value-key="yAxes0.categorySpacing"
        .value=${this.yAxes0.categorySpacing || NaN}
      />

      <input type="checkbox" value-key="value.options.xGridLine" .checked=${this.value.options.xGridLine} />
      <label> <i18n-msg msgid="label.grid-line">Grid Line</i18n-msg> </label>

      <input type="checkbox" value-key="xAxes0.ticks.display" .checked=${this.xAxes0.ticks.display} />
      <label> <i18n-msg msgid="label.display-tick">Display Tick</i18n-msg> </label>

      <legend><i18n-msg msgid="label.x-axes">X Axes</i18n-msg></legend>

      <label> <i18n-msg msgid="label.title">Title</i18n-msg> </label>
      <input type="text" value-key="xAxes0.title" .value=${this.xAxes0.axisTitle || ''} />

      <input type="checkbox" value-key="xAxes0.ticks.autoMin" .checked=${this.xAxes0.ticks.autoMin} />
      <label> <i18n-msg msgid="label.axis-min-auto">Axis Min Auto</i18n-msg> </label>

      <input type="checkbox" value-key="xAxes0.ticks.autoMax" .checked=${this.xAxes0.ticks.autoMax} />
      <label> <i18n-msg msgid="label.axis-max-auto">Axis Max Auto</i18n-msg> </label>

      ${!this.xAxes0.ticks.autoMin
        ? html`
            <label> <i18n-msg msgid="label.axis-min">Axis Min</i18n-msg> </label>
            <input type="number" value-key="xAxes0.ticks.min" .value=${this.xAxes0.ticks.min} />
          `
        : html``}
      ${!this.xAxes0.ticks.autoMax
        ? html`
            <label> <i18n-msg msgid="label.axis-max">Axis Max</i18n-msg> </label>
            <input type="number" value-key="xAxes0.ticks.max" .value=${this.xAxes0.ticks.max} />
          `
        : html``}

      <label> <i18n-msg msgid="label.axis-step-size">Axis Step Size</i18n-msg> </label>
      <input type="number" value-key="yAxes0.ticks.stepSize" .value=${this.yAxes0.ticks.stepSize} />

      <input type="checkbox" .checked=${this.value.options.yGridLine} />
      <label> <i18n-msg msgid="label.grid-line">Grid Line</i18n-msg> </label>

      <input type="checkbox" value-key="yAxes0.ticks.display" .checked=${this.yAxes0.ticks.display} />
      <label> <i18n-msg msgid="label.display-tick">Display Tick</i18n-msg> </label>
    `
  }

  multiSeriesTabTemplate() {
    return html`
      <div id="series-properties-container" fullwidth>
        <div id="tab-header">
          <paper-icon-button
            id="tab-nav-left-button"
            icon="chevron-left"
            @click=${e => {
              this._onTabScrollNavLeft(e)
            }}
            disabled
          ></paper-icon-button>
          <paper-tabs
            id="tabs"
            @iron-select="${e => (this.currentSeriesIndex = e.target.selected)}"
            .selected=${this.currentSeriesIndex}
            no-bar
            noink
            scrollable
            hide-scroll-buttons
            fit-container
          >
            ${this.datasets.map(
              (dataset, index) => html`
                <paper-tab data-series="${index + 1}" noink
                  >${index + 1}
                  ${!this.datasets || (this.datasets.length != 1 && this.currentSeriesIndex == index)
                    ? html`
                        <paper-icon-button icon="close" @tap="${e => this.onTapRemoveCurrentTab(e)}">
                        </paper-icon-button>
                      `
                    : html``}
                </paper-tab>
              `
            )}
          </paper-tabs>
          <paper-icon-button
            id="tab-nav-right-button"
            icon="chevron-right"
            @click=${e => {
              this._onTabScrollNavRight(e)
            }}
            disabled
          ></paper-icon-button>
        </div>
        <div id="add-series-button-container">
          <paper-icon-button id="add-series-button" icon="add" @tap="${e => this.onTapAddTab(e)}"></paper-icon-button>
        </div>

        <iron-pages .selected=${this.currentSeriesIndex} .attr-for-selected="series-index">
          ${this.datasets.map(
            (dataset, index) => html`
              <div class="tab-content" series-index="${index}">
                <label> <i18n-msg msgid="label.data-key">Data Key</i18n-msg> </label>
                <input type="text" value-key="dataKey" .value=${this.dataKey} />
                <label> <i18n-msg msgid="label.label">Label</i18n-msg> </label>
                <input type="text" value-key="series.label" .value=${this.series.label} />
                <label> <i18n-msg msgid="label.color">Color</i18n-msg> </label>
                <things-editor-color value-key="color" .value=${this.color}></things-editor-color>
                <label> <i18n-msg msgid="label.stack-group">Stack Group</i18n-msg> </label>
                <input type="text" value-key="series.stack" .value=${this.series.stack || ''} />
                ${this.displayValueTemplate()}
              </div>
            `
          )}
        </iron-pages>
      </div>
    `
  }
}

customElements.define(PropertyEditorChartJSHBar.is, PropertyEditorChartJSHBar)
