/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, HTMLOverlayElement, error } from '@hatiolab/things-scene'
import cloneDeep from 'lodash/cloneDeep'
import './chartjs-element'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'chartjs',
      label: '',
      name: 'chart'
    }
  ],
  'value-property': 'data'
}

export default class ChartJS extends HTMLOverlayElement {
  get nature() {
    return NATURE
  }

  get hasTextProperty() {
    return false
  }

  get tagName() {
    return 'things-chartjs'
  }

  createElement() {
    super.createElement()

    var { width, height } = this.bounds
    var element = this.element
    var data = this.data

    element.width = width
    element.height = height

    this._setChartConfig(element)
    element.data = data
  }

  /* component.property => element.property */
  setElementProperties(element) {
    this.set('lineWidth', 0) // border 표현이 자연스럽게 바뀌면 지울것.

    var { chart: chartConfig } = this.state
    var { width, height } = this.bounds
    var data = this.data

    try {
      element.width = width
      element.height = height

      if (chartConfig && this._isChartChanged) {
        this._setChartConfig(element)
        this._isChartChanged = false
      }

      if (this._isDataChanged) {
        element.data = data
        this._isDataChanged = false
      }
    } catch (e) {
      error(e)
    }
  }

  _setChartConfig(element) {
    var { chart: chartConfig, fontSize = 12, fontFamily, fontColor } = this.state
    var cloneChartConf = cloneDeep(chartConfig)
    cloneChartConf.options.defaultFontSize = fontSize
    cloneChartConf.options.defaultFontFamily = fontFamily
    cloneChartConf.options.defaultFontColor = fontColor
    element.options = cloneChartConf
  }

  onchange(after, before) {
    this._isChartChanged = false

    if ('chart' in after || 'fontSize' in after || 'fontFamily' in after || 'fontColor' in after)
      this._isChartChanged = true

    super.onchange(after, before)
  }

  onchangeData(data) {
    this._isDataChanged = true
  }
}

Component.register('chartjs', ChartJS)
