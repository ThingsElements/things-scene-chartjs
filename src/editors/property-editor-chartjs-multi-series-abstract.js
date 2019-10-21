/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-pages/iron-pages'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-tabs/paper-tabs'
import { css, html } from 'lit-element'
import PropertyEditorChartJSAbstract from './property-editor-chartjs-abstract'

export default class PropertyEditorChartJSMultiSeriesAbstract extends PropertyEditorChartJSAbstract {
  static get is() {
    return 'property-editor-chartjs-multi-series-abstract'
  }

  static get styles() {
    return [
      ...PropertyEditorChartJSAbstract.styles,
      css`
        paper-tabs {
          background-color: rgb(204, 204, 204);
        }
      `
    ]
  }

  constructor() {
    super()

    this.value = {
      options: {
        legend: {},
        scales: {
          xAxes: [
            {
              ticks: {}
            }
          ],
          yAxes: [
            {
              ticks: {}
            }
          ]
        }
      },
      data: {
        datasets: []
      }
    }
  }

  get color() {
    var oldVersionColor = this.series.backgroundColor
    if (this.series.type == 'line') oldVersionColor = this.series.borderColor
    if (this.series.type == 'radar') oldVersionColor = this.series.borderColor
    return this.series.color || oldVersionColor
  }

  set color(color) {
    this.series.color = color
    delete this.series.backgroundColor
    delete this.series.borderColor
  }

  get xAxes0() {
    return this.scales.xAxes[0]
  }

  set xAxes0(xAxes0) {
    this.scales.xAxes[0] = xAxes0
  }

  get yAxes0() {
    return this.scales.yAxes[0]
  }

  set yAxes0(yAxes0) {
    this.scales.yAxes[0] = yAxes0
  }

  get yAxes1() {
    return this.scales.yAxes[1]
  }

  set yAxes1(yAxes1) {
    this.scales.yAxes[1] = yAxes1
  }

  get multiAxis() {
    return this.value.options.multiAxis
  }

  set multiAxis(multiAxis) {
    this.value.options.multiAxis = multiAxis
  }

  get tabContainer() {
    return this.renderRoot.querySelector('#tabs').shadowRoot.querySelector('#tabsContainer')
  }

  firstUpdated() {
    this.tabContainer.addEventListener('scroll', e => {
      this._onTabScroll(e)
    })
  }

  editorTemplate(props) {
    return html`
      <input type="checkbox" value-key="multiAxis" .checked=${this.multiAxis} />
      <label> <i18n-msg msgid="label.multi-axis">Multi Axis</i18n-msg> </label>

      <legend><i18n-msg msgid="label.series">Series</i18n-msg></legend>

      ${this.multiSeriesTabTemplate()}

      <legend><i18n-msg msgid="label.x-axes">X Axes</i18n-msg></legend>

      <label> <i18n-msg msgid="label.data-key">Data Key</i18n-msg> </label>
      <input type="text" value-key="labelDataKey" .value=${this.labelDataKey} />

      <label> <i18n-msg msgid="label.title">Title</i18n-msg> </label>
      <input type="text" value-key="xAxes0.axisTitle" .value=${this.xAxes0.axisTitle || ''} />

      <label> <i18n-msg msgid="label.thickness">Thickness</i18n-msg> </label>
      <input type="number" value-key="xAxes0.barPercentage" .value=${this.xAxes0.barPercentage} />

      <input type="checkbox" value-key="value.options.xGridLine" .checked=${this.value.options.xGridLine} />
      <label> <i18n-msg msgid="label.grid-line">Grid Line</i18n-msg> </label>

      <input type="checkbox" value-key="xAxes0.ticks.display" .checked=${this.xAxes0.ticks.display} />
      <label> <i18n-msg msgid="label.display-tick">Display Tick</i18n-msg> </label>

      <legend><i18n-msg msgid="label.y-axes">Y Axes</i18n-msg></legend>

      <label> <i18n-msg msgid="label.title">Title</i18n-msg> </label>
      <input type="text" value-key="yAxes0.axisTitle" .value=${this.yAxes0.axisTitle || ''} />

      <input type="checkbox" value-key="yAxes0.ticks.autoMin" .checked=${this.yAxes0.ticks.autoMin} />
      <label> <i18n-msg msgid="label.axis-min-auto">Min Auto</i18n-msg> </label>

      <input type="checkbox" value-key="yAxes0.ticks.autoMax" .checked=${this.yAxes0.ticks.autoMax} />
      <label> <i18n-msg msgid="label.axis-max-auto">Max Auto</i18n-msg> </label>

      ${!this.yAxes0.ticks.autoMin
        ? html`
            <label> <i18n-msg msgid="label.axis-min">Min</i18n-msg> </label>
            <input type="number" value-key="yAxes0.ticks.min" .value=${this.yAxes0.ticks.min} />
          `
        : html``}
      ${!this.yAxes0.ticks.autoMax
        ? html`
            <label> <i18n-msg msgid="label.axis-max">Max</i18n-msg> </label>
            <input type="number" value-key="yAxes0.ticks.max" .value=${this.yAxes0.ticks.max} />
          `
        : html``}

      <label> <i18n-msg msgid="label.axis-step-size">StepSize</i18n-msg> </label>
      <input type="number" value-key="yAxes0.ticks.stepSize" .value=${this.yAxes0.ticks.stepSize} />

      <input type="checkbox" value-key="value.options.yGridLine" .checked=${this.value.options.yGridLine} />
      <label> <i18n-msg msgid="label.grid-line">Grid Line</i18n-msg> </label>

      <input type="checkbox" value-key="yAxes0.ticks.display" .checked=${this.yAxes0.ticks.display} />
      <label> <i18n-msg msgid="label.display-tick">Display Tick</i18n-msg> </label>

      ${this.value.options.multiAxis
        ? html`
            <legend><i18n-msg msgid="label.y-2nd-axes">Y 2nd Axes</i18n-msg></legend>

            <label> <i18n-msg msgid="label.title">Title</i18n-msg> </label>
            <input type="text" value-key="yAxes1.axisTitle" .value=${this.yAxes1.axisTitle || ''} />

            <input type="checkbox" value-key="yAxes1.ticks.autoMin" .checked=${this.yAxes1.ticks.autoMin} />
            <label> <i18n-msg msgid="label.axis-min-auto">Min Auto</i18n-msg> </label>

            <input type="checkbox" value-key="yAxes1.ticks.autoMax" .checked=${this.yAxes1.ticks.autoMax} />
            <label> <i18n-msg msgid="label.axis-max-auto">Max Auto</i18n-msg> </label>

            ${!this.yAxes1.ticks.autoMin
              ? html`
                  <label> <i18n-msg msgid="label.axis-min">Min</i18n-msg> </label>
                  <input type="number" value-key="yAxes1.ticks.min" .value=${this.yAxes1.ticks.min} />
                `
              : html``}
            ${!this.yAxes1.ticks.autoMax
              ? html`
                  <label> <i18n-msg msgid="label.axis-max">Max</i18n-msg> </label>
                  <input type="number" value-key="yAxes1.ticks.max" .value=${this.yAxes1.ticks.max} />
                `
              : html``}

            <label> <i18n-msg msgid="label.axis-step-size">StepSize</i18n-msg> </label>
            <input type="number" value-key="yAxes1.ticks.stepSize" .value=${this.yAxes1.ticks.stepSize} />

            <input type="checkbox" value-key="value.options.y2ndGridLine" .checked=${this.value.options.y2ndGridLine} />
            <label> <i18n-msg msgid="label.grid-line">Grid Line</i18n-msg> </label>

            <input type="checkbox" value-key="yAxes1.ticks.display" .checked=${this.yAxes1.ticks.display} />
            <label> <i18n-msg msgid="label.display-tick">Display Tick</i18n-msg> </label>
          `
        : html``}
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

                ${this.value.type == 'bar'
                  ? html`
                      <label> <i18n-msg msgid="label.type">type</i18n-msg> </label>
                      <select class="select-content" value-key="series.type" .value=${this.series.type}>
                        <option value="bar" selected>bar</option>
                        <option value="line">line</option>
                      </select>
                    `
                  : html``}

                <label> <i18n-msg msgid="label.label">label</i18n-msg> </label>
                <input type="text" value-key="series.label" .value=${this.series.label} />

                ${this.series.type == 'line'
                  ? html`
                      <label> <i18n-msg msgid="label.line-tension">line tension</i18n-msg> </label>
                      <select class="select-content" value-key="series.lineTension" .value=${this.series.lineTension}>
                        <option value="0.4">smooth</option>
                        <option value="0">angled</option>
                      </select>
                    `
                  : html``}
                ${this.series.type == 'line'
                  ? html`
                      <label> <i18n-msg msgid="label.border-width">border width</i18n-msg> </label>
                      <input type="number" value-key="series.borderWidth" .value=${this.series.borderWidth} />
                    `
                  : html``}

                <label> <i18n-msg msgid="label.color">color</i18n-msg> </label>
                <things-editor-color value-key="color" .value=${this.color}></things-editor-color>

                ${this.series.type == 'line'
                  ? html`
                      <label> <i18n-msg msgid="label.point-shape">point shape</i18n-msg> </label>
                      <select class="select-content" value-key="series.pointStyle" .value=${this.series.pointStyle}>
                        <option value="circle">⚬</option>
                        <option value="triangle">▵</option>
                        <option value="rect">□</option>
                        <option value="rectRot">◇</option>
                        <option value="cross">+</option>
                        <option value="crossRot">⨉</option>
                        <option value="star">✱</option>
                        <option value="line">―</option>
                        <option value="dash">┄</option>
                      </select>

                      <label> <i18n-msg msgid="label.point-size">point size</i18n-msg> </label>
                      <input type="number" value-key="series.pointRadius" .value=${this.series.pointRadius} />
                    `
                  : html``} <label> <i18n-msg msgid="label.stack-group">Stack group</i18n-msg> </label>
                <input type="text" value-key="series.stack" .value=${this.series.stack || ''} /> ${this.series.type ==
                'line'
                  ? html`
                      <input type="checkbox" value-key="series.fill" .checked=${this.series.fill} />
                      <label> <i18n-msg msgid="label.fill">fill</i18n-msg> </label>
                    `
                  : html``}
                ${this.multiAxis
                  ? html`
                      <label> <i18n-msg msgid="label.target-axis">target axis</i18n-msg> </label>
                      <select class="select-content" value-key="series.yAxisID" .value=${this.series.yAxisID}>
                        <option value="left">left</option>
                        <option value="right">right</option>
                      </select>
                    `
                  : html``}
                ${this.displayValueTemplate()}
              </div>
            `
          )}
        </iron-pages>
      </div>
    `
  }

  _onTabScroll(e) {
    var tabNavLeftButton = this.renderRoot.querySelector('#tab-nav-left-button')
    var tabNavRightButton = this.renderRoot.querySelector('#tab-nav-right-button')

    if (this.tabContainer.clientWidth == this.tabContainer.scrollWidth) {
      tabNavLeftButton.disabled = true
      tabNavRightButton.disabled = true
    }
    // left-end
    else if (this.tabContainer.scrollLeft == 0) {
      tabNavLeftButton.disabled = true
      tabNavRightButton.disabled = false
    }
    // right-end
    else if (this.tabContainer.scrollLeft + this.tabContainer.clientWidth >= this.tabContainer.scrollWidth) {
      tabNavLeftButton.disabled = false
      tabNavRightButton.disabled = true
    } else {
      tabNavLeftButton.disabled = false
      tabNavRightButton.disabled = false
    }
  }

  _onTabScrollNavLeft(e) {
    this.tabContainer.style.scrollBehavior = 'smooth'
    this.tabContainer.scrollLeft -= this.tabContainer.clientWidth
    this.tabContainer.style.scrollBehavior = 'auto'
  }

  _onTabScrollNavRight(e) {
    this.tabContainer.style.scrollBehavior = 'smooth'
    this.tabContainer.scrollLeft += this.tabContainer.clientWidth
    this.tabContainer.style.scrollBehavior = 'auto'
  }
}
