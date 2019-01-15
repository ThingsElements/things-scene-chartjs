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
    var { chart: chartConfig } = this.state
    var element = this.element
    var data = this.data

    element.width = width
    element.height = height

    element.options = cloneDeep(chartConfig)
    element.data = data
  }

  /* component.property => element.property */
  setElementProperties(element) {
    var { chart: chartConfig } = this.state
    var { width, height } = this.bounds
    var data = this.data

    try {
      element.width = width
      element.height = height

      if (chartConfig && this._isChartChanged) {
        element.options = cloneDeep(chartConfig)

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

  onchange(after, before) {
    this._isChartChanged = false

    if ('chart' in after || 'fontSize' in after || 'fontFamily' in after) this._isChartChanged = true

    super.onchange(after, before)
  }

  onchangeData(data) {
    this._isDataChanged = true
  }
}

Component.register('chartjs', ChartJS)
